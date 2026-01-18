'use client'

import { Suspense } from 'react';
import { PlanDetailContainer } from "@/features/planDetail/PlanDetailContainer";
import { RequirePlanGuard } from "@/shared/guards";

function PlanPageContent() {
  return (
    <RequirePlanGuard>
      <main>
        <PlanDetailContainer />
      </main>
    </RequirePlanGuard>
  );
}

export default function PlanPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gradient-to-b from-sky-50 to-amber-50/30 flex items-center justify-center">
        <div className="text-sky-600">読み込み中...</div>
      </div>
    }>
      <PlanPageContent />
    </Suspense>
  );
}