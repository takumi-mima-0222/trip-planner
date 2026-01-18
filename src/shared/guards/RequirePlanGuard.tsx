'use client';

import { useEffect, ReactNode, useMemo } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useTripPlanStore, selectTripPlan, selectTripPlanStatus } from '@/shared/store/useTripPlanStore';
import { Card } from '@/components/ui/card';
import { Loader2 } from 'lucide-react';
import { decodePlanFromUrl } from '@/lib/planShare';

interface RequirePlanGuardProps {
  children: ReactNode;
  /** リダイレクト先（デフォルト: /） */
  redirectTo?: string;
}

/**
 * プランデータが存在することを要求するガードコンポーネント
 * プランがない場合は指定されたパスにリダイレクトする
 * URLパラメータからの共有プラン読み込みにも対応
 */
export const RequirePlanGuard = ({
  children,
  redirectTo = '/',
}: RequirePlanGuardProps) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const plan = useTripPlanStore(selectTripPlan);
  const status = useTripPlanStore(selectTripPlanStatus);
  const setPlan = useTripPlanStore((state) => state.setPlan);

  const dataParam = searchParams.get('data');
  
  // URLパラメータからデコードしたプランをメモ化
  const decodedPlan = useMemo(() => {
    if (dataParam) {
      return decodePlanFromUrl(dataParam);
    }
    return null;
  }, [dataParam]);

  // URLパラメータからプランを読み込む（decodedPlanが存在し、ストアにプランがない場合）
  useEffect(() => {
    if (decodedPlan && !plan) {
      setPlan(decodedPlan);
    }
  }, [decodedPlan, plan, setPlan]);

  const isLoading = status === 'loading';
  const hasDataParam = dataParam !== null;
  
  // プランがなく、URLからのデコードも失敗した場合にリダイレクト
  const shouldRedirect = !plan && !decodedPlan && (status === 'idle' || status === 'error');

  useEffect(() => {
    if (shouldRedirect && !hasDataParam) {
      router.replace(redirectTo);
    }
  }, [shouldRedirect, hasDataParam, redirectTo, router]);

  // URLパラメータがあり、まだプランがセットされていない場合（読み込み中）
  if (hasDataParam && !plan && decodedPlan) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gradient-to-b from-sky-50 to-amber-50/30">
        <Card className="mx-4 w-full max-w-md bg-white p-8 text-center shadow-lg">
          <Loader2 className="mx-auto mb-4 size-12 animate-spin text-sky-600" />
          <h2 className="mb-2 text-xl font-bold text-sky-900">共有プランを読み込み中...</h2>
          <p className="text-sm text-slate-600">
            しばらくお待ちください。
          </p>
        </Card>
      </div>
    );
  }

  // ローディング中
  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gradient-to-b from-sky-50 to-amber-50/30">
        <Card className="mx-4 w-full max-w-md bg-white p-8 text-center shadow-lg">
          <Loader2 className="mx-auto mb-4 size-12 animate-spin text-sky-600" />
          <h2 className="mb-2 text-xl font-bold text-sky-900">プランを作成中...</h2>
          <p className="text-sm text-slate-600">
            AIが最適な旅行プランを考えています。<br />
            しばらくお待ちください。
          </p>
        </Card>
      </div>
    );
  }

  // リダイレクト中は何も表示しない
  if (shouldRedirect) {
    return null;
  }

  // プランが存在する場合は子コンポーネントを表示
  return <>{children}</>;
};
