import { TripPlanResponse } from '@/features/planCreate/ai/createTripPlan';

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
 */
export function decodePlanFromUrl(encoded: string): TripPlanResponse | null {
  try {
    const jsonString = decompressFromBase64(encoded);
    if (!jsonString) return null;
    
    const plan = JSON.parse(jsonString) as TripPlanResponse;
    
    // 基本的なバリデーション
    if (!validatePlanStructure(plan)) {
      console.error('Invalid plan structure');
      return null;
    }
    
    return plan;
  } catch (error) {
    console.error('Failed to decode plan:', error);
    return null;
  }
}

/**
 * プランデータの構造をバリデーション
 */
function validatePlanStructure(plan: unknown): plan is TripPlanResponse {
  if (typeof plan !== 'object' || plan === null) return false;
  
  const p = plan as Record<string, unknown>;
  
  // 必須フィールドの存在チェック
  if (p.version !== 'trip-plan.v2') return false;
  if (!p.request || typeof p.request !== 'object') return false;
  if (!p.feasibility || typeof p.feasibility !== 'object') return false;
  if (!p.plan || typeof p.plan !== 'object') return false;
  
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
