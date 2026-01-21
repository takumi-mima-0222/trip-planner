import { create } from 'zustand';
import type { TransportMode, Pace, SpotPriority } from '@/features/planCreate/planCreate.type';

/**
 * スポット入力型（v3: priority付き）
 */
export interface SpotInput {
  name: string;
  priority: SpotPriority;
}

/**
 * 検索条件（フォーム入力値）の型
 */
export interface SearchCondition {
  startDate: string;
  endDate: string;
  departure: string;
  departureTime: string;
  baseStay: string;
  spots: SpotInput[];  // v3: priority付きスポット配列
  // 終了条件（任意）
  endLocation?: string;
  endTime?: string;
  // 交通手段
  transportMode: TransportMode;
  // 旅のペース
  pace: Pace;
}

interface SearchConditionState {
  /** 検索条件 */
  condition: SearchCondition | null;
}

interface SearchConditionActions {
  /** 検索条件をセット */
  setCondition: (condition: SearchCondition) => void;
  /** 検索条件をクリア */
  clearCondition: () => void;
}

type SearchConditionStore = SearchConditionState & SearchConditionActions;

const initialState: SearchConditionState = {
  condition: null,
};

export const useSearchConditionStore = create<SearchConditionStore>((set) => ({
  ...initialState,

  setCondition: (condition) => set({ condition }),

  clearCondition: () => set({ condition: null }),
}));

// セレクター
export const selectSearchCondition = (state: SearchConditionStore) => state.condition;
export const selectStartDate = (state: SearchConditionStore) => state.condition?.startDate ?? '';
export const selectEndDate = (state: SearchConditionStore) => state.condition?.endDate ?? '';
export const selectDeparture = (state: SearchConditionStore) => state.condition?.departure ?? '';
export const selectDepartureTime = (state: SearchConditionStore) => state.condition?.departureTime ?? '';
export const selectBaseStay = (state: SearchConditionStore) => state.condition?.baseStay ?? '';
export const selectSpots = (state: SearchConditionStore) => state.condition?.spots ?? [];
export const selectEndLocation = (state: SearchConditionStore) => state.condition?.endLocation;
export const selectEndTime = (state: SearchConditionStore) => state.condition?.endTime;
export const selectTransportMode = (state: SearchConditionStore) => state.condition?.transportMode ?? 'transit';
export const selectPace = (state: SearchConditionStore) => state.condition?.pace ?? 'normal';
