'use client'

import { PlanDetailContainer } from "@/features/planDetail/PlanDetailContainer";
import { RequirePlanGuard } from "@/shared/guards";

export default function PlanPage() {
  return (
    <RequirePlanGuard>
      <main>
        <PlanDetailContainer />
      </main>
    </RequirePlanGuard>
  );
}