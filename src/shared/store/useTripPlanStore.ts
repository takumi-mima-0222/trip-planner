import { create } from 'zustand';
import { TripPlanResponse } from '@/features/planCreate/ai/createTripPlan';

type TripPlanStatus = 'idle' | 'loading' | 'success' | 'error';

interface TripPlanState {
  /** 現在のプラン結果 */
  plan: TripPlanResponse | null;
  /** 処理状態 */
  status: TripPlanStatus;
  /** エラーメッセージ */
  error: string | null;
}

interface TripPlanActions {
  /** プラン生成を開始 */
  setLoading: () => void;
  /** プラン生成成功 */
  setPlan: (plan: TripPlanResponse) => void;
  /** プラン生成失敗 */
  setError: (error: string) => void;
  /** ストアをリセット */
  reset: () => void;
}

type TripPlanStore = TripPlanState & TripPlanActions;

const initialState: TripPlanState = {
  plan: null,
  status: 'idle',
  error: null,
};

export const useTripPlanStore = create<TripPlanStore>((set) => ({
  ...initialState,

  setLoading: () =>
    set({
      status: 'loading',
      error: null,
    }),

  setPlan: (plan) =>
    set({
      plan,
      status: 'success',
      error: null,
    }),

  setError: (error) =>
    set({
      status: 'error',
      error,
    }),

  reset: () => set(initialState),
}));

// セレクター（パフォーマンス最適化用）
export const selectTripPlan = (state: TripPlanStore) => state.plan;
export const selectTripPlanStatus = (state: TripPlanStore) => state.status;
export const selectTripPlanError = (state: TripPlanStore) => state.error;
export const selectIsFeasible = (state: TripPlanStore) => state.plan?.feasibility.isFeasible ?? null;
export const selectPlanDays = (state: TripPlanStore) => state.plan?.plan.days ?? [];
export const selectIssues = (state: TripPlanStore) => state.plan?.issues ?? [];
export const selectAlternatives = (state: TripPlanStore) => state.plan?.alternatives ?? [];
