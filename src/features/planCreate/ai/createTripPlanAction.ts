"use server";

import { createTripPlan, TripPlanRequest, TripPlanResponse } from "./createTripPlan";

export async function createTripPlanAction(
  input: TripPlanRequest
): Promise<TripPlanResponse> {
  return await createTripPlan(input);
}
