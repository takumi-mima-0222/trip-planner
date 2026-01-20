import { getOpenaiClient } from "@/shared/ai/openaiClient";
import { tripPlanJsonSchema } from "./tripPlan.schema";
import { TRIP_PLANNER_SYSTEM_PROMPT } from "./systemPrompt";

export type TransportMode = "car" | "transit" | "walk";
export type Pace = "relaxed" | "normal" | "packed";

export type TripPlanRequest = {
  startDate: string; // "YYYY-MM-DD"
  endDate: string; // "YYYY-MM-DD"
  startLocation: string;
  startTime: string; // "HH:mm"
  baseStay: string;
  spots: string[];
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

export type TripPlanIssue = {
  type: "time" | "distance" | "constraint" | "capacity";
  severity: "critical" | "warning" | "info";
  description: string;
  affectedSpots: string[];
};

export type TripPlanAlternative = {
  id: string;
  title: string;
  description: string;
  changes: string[];
};

export type TripPlanResponse = {
  version: "trip-plan.v2";
  timezone: "Asia/Tokyo";
  request: TripPlanRequest;
  feasibility: {
    isFeasible: boolean;
    summary: string;
  };
  plan: {
    title: string;
    totalDays: number;
    days: TripPlanDay[];
  };
  issues: TripPlanIssue[];
  alternatives: TripPlanAlternative[];
};

export async function createTripPlan(input: TripPlanRequest): Promise<TripPlanResponse> {
  const model = process.env.OPENAI_MODEL ?? "gpt-4o";

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
          spots: input.spots,
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
