import { TripPlanResponse, TripPlanDay, TripPlanItem, TripPlanIssue, TripPlanAlternative, TransportMode, Pace } from '@/features/planCreate/ai/createTripPlan';

// Re-export types for convenience
export type { TripPlanResponse, TripPlanDay, TripPlanItem, TripPlanIssue, TripPlanAlternative, TransportMode, Pace };

// Presentation用のProps型
export interface PlanSummaryProps {
  title: string;
  startDate: string;
  endDate: string;
  totalDays: number;
  startLocation: string;
  startTime: string;
  baseStay: string;
  spotCount: number;
  isFeasible: boolean;
  feasibilitySummary: string;
  // 新しいフィールド
  endLocation?: string | null;
  endTime?: string | null;
  transportMode: TransportMode;
  pace: Pace;
}

export interface DayPlanProps {
  day: TripPlanDay;
  isLastDay: boolean;
}

export interface TimelineItemProps {
  item: TripPlanItem;
  isLast: boolean;
}

export interface IssueCardProps {
  issue: TripPlanIssue;
}

export interface AlternativeCardProps {
  alternative: TripPlanAlternative;
}
