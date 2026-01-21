import { getOpenaiClient } from "@/shared/ai/openaiClient";
import { tripPlanJsonSchema } from "./tripPlan.schema";
import { TRIP_PLANNER_SYSTEM_PROMPT } from "./systemPrompt";

export type TransportMode = "car" | "transit" | "walk";
export type Pace = "relaxed" | "normal" | "packed";
export type SpotPriority = "must" | "nice";

// スポット入力型（v3: priority付き）
export type TripSpotInput = {
  name: string;
  priority: SpotPriority;
};

export type TripPlanRequest = {
  startDate: string; // "YYYY-MM-DD"
  endDate: string; // "YYYY-MM-DD"
  startLocation: string;
  startTime: string; // "HH:mm"
  baseStay: string;
  spots: TripSpotInput[];  // v3: priority付きスポット配列
  // 終了条件（任意）
  endLocation?: string;
  endTime?: string; // "HH:mm"
  // 交通手段
  transportMode: TransportMode;
  // 旅のペース
  pace: Pace;
};

export type TripPlanItemType = "spot" | "meal" | "hotel" | "travel";

export type TripPlanItem = {
  spotId: string;
  type: TripPlanItemType;
  startTime: string; // "HH:mm"
  endTime: string; // "HH:mm"
  name: string;
  stayMinutes: number;
  detail: string;
};

export type TripPlanDay = {
  dayNumber: number;
  date: string; // "YYYY-MM-DD"
  theme: string;
  items: TripPlanItem[];
};

export type TripPlan = {
  title: string;
  totalDays: number;
  days: TripPlanDay[];
};

export type TripPlanIssue = {
  type: "time" | "distance" | "constraint" | "capacity";
  severity: "critical" | "warning" | "info";
  description: string;
  affectedSpots: string[];
};

// v3: プランバリエーション
export type TripPlanVariant = {
  id: "A" | "B";
  title: string;
  rationale: string;
  includedSpots: string[];
  excludedSpots: string[];
  plan: TripPlan;
};

// v3 レスポンス型
export type TripPlanResponse = {
  version: "trip-plan.v3";
  timezone: "Asia/Tokyo";
  request: TripPlanRequest;
  feasibility: {
    isFeasible: boolean;
    summary: string;
  };
  plans: TripPlanVariant[];  // 1〜2件
  issues: TripPlanIssue[];
};

// v2 互換用のレガシー型（共有URL互換用）
export type TripPlanAlternative = {
  id: string;
  title: string;
  description: string;
  changes: string[];
};

export type TripPlanResponseV2 = {
  version: "trip-plan.v2";
  timezone: "Asia/Tokyo";
  request: {
    startDate: string;
    endDate: string;
    startLocation: string;
    startTime: string;
    baseStay: string;
    spots: string[];  // v2は文字列配列
    endLocation?: string | null;
    endTime?: string | null;
    transportMode: TransportMode;
    pace: Pace;
  };
  feasibility: {
    isFeasible: boolean;
    summary: string;
  };
  plan: TripPlan;
  issues: TripPlanIssue[];
  alternatives: TripPlanAlternative[];
};

export async function createTripPlan(input: TripPlanRequest): Promise<TripPlanResponse> {
  // gpt-5-mini はReasoningモデルで遅いため、高速なgpt-4.1-miniをデフォルトに
  const model = process.env.OPENAI_MODEL ?? "gpt-4.1-mini";

  const response = await getOpenaiClient().responses.create({
    model,
    input: [
      { role: "system", content: TRIP_PLANNER_SYSTEM_PROMPT },
      {
        role: "user",
        content: JSON.stringify({
          startDate: input.startDate,
          endDate: input.endDate,
          startLocation: input.startLocation,
          startTime: input.startTime,
          baseStay: input.baseStay,
          spots: input.spots,  // v3: TripSpotInput[]
          // 新しいフィールド
          endLocation: input.endLocation || null,
          endTime: input.endTime || null,
          transportMode: input.transportMode,
          pace: input.pace
        })
      }
    ],
    // Structured Outputs（Responses APIでは text.format に置く）
    text: {
      format: {
        type: "json_schema",
        name: tripPlanJsonSchema.name,
        schema: tripPlanJsonSchema.schema,
        strict: true
      }
    }
  });

  const jsonText = response.output_text;
  if (!jsonText) throw new Error("OpenAI response has no output_text");

  try {
    return JSON.parse(jsonText) as TripPlanResponse;
  } catch {
    throw new Error(`Failed to parse JSON: ${jsonText}`);
  }
}
