"use client";

import { usePlanDetail } from './hooks/usePlanDetail';
import PlanDetailPresentation from './PlanDetailPresentation';

export const PlanDetailContainer = () => {
  const {
    summary,
    days,
    issues,
    planA,
    planB,
    hasPlanB,
    isShareCopied,
    handleBackToCreate,
    handleCreateNew,
    handleSharePlan,
  } = usePlanDetail();

  return (
    <PlanDetailPresentation
      summary={summary}
      days={days}
      issues={issues}
      planA={planA}
      planB={planB}
      hasPlanB={hasPlanB}
      onBackToCreate={handleBackToCreate}
      onCreateNew={handleCreateNew}
      onSharePlan={handleSharePlan}
      isShareCopied={isShareCopied}
    />
  );
};
