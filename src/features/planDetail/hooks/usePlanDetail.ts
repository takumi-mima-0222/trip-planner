import { useRouter } from 'next/navigation';
import { useTripPlanStore, selectTripPlan, selectTripPlanStatus, selectPlanDays, selectIssues, selectAlternatives } from '@/shared/store/useTripPlanStore';
import { useSearchConditionStore, selectSearchCondition } from '@/shared/store/useSearchConditionStore';
import { PlanSummaryProps } from '../planDetail.type';

/**
 * プラン詳細画面用のカスタムフック
 * ストアからプランデータを取得し、表示用に整形する
 */
export const usePlanDetail = () => {
  const router = useRouter();
  const plan = useTripPlanStore(selectTripPlan);
  const status = useTripPlanStore(selectTripPlanStatus);
  const days = useTripPlanStore(selectPlanDays);
  const issues = useTripPlanStore(selectIssues);
  const alternatives = useTripPlanStore(selectAlternatives);
  const searchCondition = useSearchConditionStore(selectSearchCondition);

  // プランがなく、かつidleまたはerror状態の場合はトップページへリダイレクト
  const shouldRedirect = !plan && (status === 'idle' || status === 'error');
  
  // ローディング中かどうか
  const isLoading = status === 'loading';

  // サマリー情報を整形
  const summary: PlanSummaryProps | null = plan ? {
    title: plan.plan.title,
    startDate: plan.request.startDate,
    endDate: plan.request.endDate,
    totalDays: plan.plan.totalDays,
    startLocation: plan.request.startLocation,
    startTime: plan.request.startTime,
    baseStay: plan.request.baseStay,
    spotCount: plan.request.spots.length,
    isFeasible: plan.feasibility.isFeasible,
    feasibilitySummary: plan.feasibility.summary,
  } : null;

  // 実現可能性の値を安全に取得
  const isFeasible = plan?.feasibility.isFeasible ?? null;

  // 新規プラン作成へ戻る（検索条件は保持）
  const handleBackToCreate = () => {
    router.push('/');
  };

  // ストアをリセットして新規作成
  const handleCreateNew = () => {
    useTripPlanStore.getState().reset();
    useSearchConditionStore.getState().clearCondition();
    router.push('/');
  };

  return {
    plan,
    status,
    summary,
    isFeasible,
    days,
    issues,
    alternatives,
    searchCondition,
    isLoading,
    shouldRedirect,
    handleBackToCreate,
    handleCreateNew,
  };
};
