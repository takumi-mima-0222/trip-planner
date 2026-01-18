"use client";

import { usePlanDetail } from './hooks/usePlanDetail';
import PlanDetailPresentation from './PlanDetailPresentation';

export const PlanDetailContainer = () => {
  const {
    summary,
    days,
    issues,
    alternatives,
    handleBackToCreate,
    handleCreateNew,
  } = usePlanDetail();

  return (
    <PlanDetailPresentation
      summary={summary}
      days={days}
      issues={issues}
      alternatives={alternatives}
      onBackToCreate={handleBackToCreate}
      onCreateNew={handleCreateNew}
    />
  );
};
