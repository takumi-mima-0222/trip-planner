import { TripPlanResponse, TripPlanDay, TripPlanItem, TripPlanIssue, TripPlanVariant, TripPlan, TransportMode, Pace, TripSpotInput } from '@/features/planCreate/ai/createTripPlan';

// Re-export types for convenience
export type { TripPlanResponse, TripPlanDay, TripPlanItem, TripPlanIssue, TripPlanVariant, TripPlan, TransportMode, Pace, TripSpotInput };

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

// v3: プランバリエーションの表示用Props
export interface PlanVariantDisplayProps {
  variant: TripPlanVariant;
  isRecommended: boolean;  // Plan Aの場合true
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
