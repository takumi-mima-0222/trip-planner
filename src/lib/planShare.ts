import { TripPlanResponse, TripPlanResponseV2 } from '@/features/planCreate/ai/createTripPlan';

/**
 * v2のプランデータをv3形式に変換する
 */
function convertV2ToV3(v2Plan: TripPlanResponseV2): TripPlanResponse {
  return {
    version: "trip-plan.v3",
    timezone: "Asia/Tokyo",
    request: {
      startDate: v2Plan.request.startDate,
      endDate: v2Plan.request.endDate,
      startLocation: v2Plan.request.startLocation,
      startTime: v2Plan.request.startTime,
      baseStay: v2Plan.request.baseStay,
      // v2のstring[]をv3のTripSpotInput[]に変換（全て"nice"として扱う）
      spots: v2Plan.request.spots.map(name => ({ name, priority: "nice" as const })),
      endLocation: v2Plan.request.endLocation ?? undefined,
      endTime: v2Plan.request.endTime ?? undefined,
      transportMode: v2Plan.request.transportMode,
      pace: v2Plan.request.pace,
    },
    feasibility: v2Plan.feasibility,
    // v2のplanをPlan Aとして変換
    plans: [{
      id: "A",
      title: v2Plan.plan.title,
      rationale: "既存のプランから変換されました",
      includedSpots: v2Plan.request.spots,
      excludedSpots: [],
      plan: v2Plan.plan,
    }],
    issues: v2Plan.issues,
  };
}

/**
 * プランデータをURLセーフな文字列にエンコードする
 * LZ圧縮 + Base64エンコードを使用してURL長を短縮
 */
export function encodePlanToUrl(plan: TripPlanResponse): string {
  try {
    const jsonString = JSON.stringify(plan);
    // TextEncoderでバイト配列に変換し、Base64エンコード
    const compressed = compressToBase64(jsonString);
    return compressed;
  } catch (error) {
    console.error('Failed to encode plan:', error);
    throw new Error('プランのエンコードに失敗しました');
  }
}

/**
 * URLパラメータからプランデータをデコードする
 * v2/v3両対応
 */
export function decodePlanFromUrl(encoded: string): TripPlanResponse | null {
  try {
    const jsonString = decompressFromBase64(encoded);
    if (!jsonString) return null;
    
    const plan = JSON.parse(jsonString) as TripPlanResponse | TripPlanResponseV2;
    
    // v2形式の場合はv3に変換
    if (plan.version === 'trip-plan.v2') {
      return convertV2ToV3(plan as TripPlanResponseV2);
    }
    
    // v3形式のバリデーション
    if (!validatePlanStructure(plan)) {
      console.error('Invalid plan structure');
      return null;
    }
    
    return plan as TripPlanResponse;
  } catch (error) {
    console.error('Failed to decode plan:', error);
    return null;
  }
}

/**
 * プランデータの構造をバリデーション（v3形式）
 */
function validatePlanStructure(plan: unknown): plan is TripPlanResponse {
  if (typeof plan !== 'object' || plan === null) return false;
  
  const p = plan as Record<string, unknown>;
  
  // v3の必須フィールドの存在チェック
  if (p.version !== 'trip-plan.v3') return false;
  if (!p.request || typeof p.request !== 'object') return false;
  if (!p.feasibility || typeof p.feasibility !== 'object') return false;
  if (!p.plans || !Array.isArray(p.plans) || p.plans.length === 0) return false;
  
  return true;
}

/**
 * 共有URLを生成する
 */
export function generateShareUrl(plan: TripPlanResponse): string {
  const encoded = encodePlanToUrl(plan);
  const baseUrl = typeof window !== 'undefined' ? window.location.origin : '';
  return `${baseUrl}/plan?data=${encodeURIComponent(encoded)}`;
}

/**
 * クリップボードにURLをコピーする
 */
export async function copyShareUrlToClipboard(plan: TripPlanResponse): Promise<boolean> {
  try {
    const url = generateShareUrl(plan);
    await navigator.clipboard.writeText(url);
    return true;
  } catch (error) {
    console.error('Failed to copy to clipboard:', error);
    return false;
  }
}

// LZ-string風の簡易圧縮・Base64エンコード
// 注意: 本番環境ではlz-stringライブラリの使用を推奨

function compressToBase64(input: string): string {
  // UTF-8でエンコードしてからBase64に変換
  const encoder = new TextEncoder();
  const data = encoder.encode(input);
  
  // バイト配列をBase64文字列に変換
  let binary = '';
  for (let i = 0; i < data.length; i++) {
    binary += String.fromCharCode(data[i]);
  }
  
  // URLセーフなBase64に変換
  const base64 = btoa(binary)
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=+$/, '');
  
  return base64;
}

function decompressFromBase64(input: string): string | null {
  try {
    // URLセーフなBase64を通常のBase64に戻す
    let base64 = input
      .replace(/-/g, '+')
      .replace(/_/g, '/');
    
    // パディングを追加
    while (base64.length % 4) {
      base64 += '=';
    }
    
    // Base64デコード
    const binary = atob(base64);
    const bytes = new Uint8Array(binary.length);
    for (let i = 0; i < binary.length; i++) {
      bytes[i] = binary.charCodeAt(i);
    }
    
    // UTF-8デコード
    const decoder = new TextDecoder();
    return decoder.decode(bytes);
  } catch {
    return null;
  }
}
