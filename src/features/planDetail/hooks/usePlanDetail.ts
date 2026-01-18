import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState, useCallback, useMemo } from 'react';
import { useTripPlanStore, selectTripPlan, selectTripPlanStatus, selectPlanDays, selectIssues, selectAlternatives } from '@/shared/store/useTripPlanStore';
import { useSearchConditionStore, selectSearchCondition } from '@/shared/store/useSearchConditionStore';
import { PlanSummaryProps } from '../planDetail.type';
import { decodePlanFromUrl, copyShareUrlToClipboard } from '@/lib/planShare';

/**
 * プラン詳細画面用のカスタムフック
 * ストアからプランデータを取得し、表示用に整形する
 * URLパラメータからの共有プラン読み込みにも対応
 */
export const usePlanDetail = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const plan = useTripPlanStore(selectTripPlan);
  const status = useTripPlanStore(selectTripPlanStatus);
  const days = useTripPlanStore(selectPlanDays);
  const issues = useTripPlanStore(selectIssues);
  const alternatives = useTripPlanStore(selectAlternatives);
  const searchCondition = useSearchConditionStore(selectSearchCondition);
  const setPlan = useTripPlanStore((state) => state.setPlan);
  
  const [isShareCopied, setIsShareCopied] = useState(false);

  const dataParam = searchParams.get('data');

  // URLパラメータからデコードしたプランをメモ化
  const decodedPlan = useMemo(() => {
    if (dataParam) {
      return decodePlanFromUrl(dataParam);
    }
    return null;
  }, [dataParam]);

  // URLパラメータからプランデータを読み込む
  useEffect(() => {
    if (decodedPlan && !plan) {
      setPlan(decodedPlan);
    }
  }, [decodedPlan, plan, setPlan]);

  // プランがなく、かつidleまたはerror状態で、URLパラメータもない場合はトップページへリダイレクト
  const hasDataParam = dataParam !== null;
  const shouldRedirect = !plan && !decodedPlan && (status === 'idle' || status === 'error') && !hasDataParam;
  
  // ローディング中かどうか
  const isLoading = status === 'loading';

  // URLから読み込まれたかどうか
  const isLoadedFromUrl = hasDataParam && !!decodedPlan;

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

  // 共有リンクをコピー
  const handleSharePlan = useCallback(async (): Promise<boolean> => {
    if (!plan) return false;
    
    const success = await copyShareUrlToClipboard(plan);
    if (success) {
      setIsShareCopied(true);
      // 3秒後にコピー状態をリセット
      setTimeout(() => setIsShareCopied(false), 3000);
    }
    return success;
  }, [plan]);

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
    isShareCopied,
    isLoadedFromUrl,
    handleBackToCreate,
    handleCreateNew,
    handleSharePlan,
  };
};
