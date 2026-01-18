"use client";

import { usePlanDetail } from './hooks/usePlanDetail';
import PlanDetailPresentation from './PlanDetailPresentation';

export const PlanDetailContainer = () => {
  const {
    summary,
    days,
    issues,
    alternatives,
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
      alternatives={alternatives}
      onBackToCreate={handleBackToCreate}
      onCreateNew={handleCreateNew}
      onSharePlan={handleSharePlan}
      isShareCopied={isShareCopied}
    />
  );
};
