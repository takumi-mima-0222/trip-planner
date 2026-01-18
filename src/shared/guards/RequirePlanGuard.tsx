'use client';

import { useEffect, ReactNode } from 'react';
import { useRouter } from 'next/navigation';
import { useTripPlanStore, selectTripPlan, selectTripPlanStatus } from '@/shared/store/useTripPlanStore';
import { Card } from '@/components/ui/card';
import { Loader2 } from 'lucide-react';

interface RequirePlanGuardProps {
  children: ReactNode;
  /** リダイレクト先（デフォルト: /） */
  redirectTo?: string;
}

/**
 * プランデータが存在することを要求するガードコンポーネント
 * プランがない場合は指定されたパスにリダイレクトする
 */
export const RequirePlanGuard = ({
  children,
  redirectTo = '/',
}: RequirePlanGuardProps) => {
  const router = useRouter();
  const plan = useTripPlanStore(selectTripPlan);
  const status = useTripPlanStore(selectTripPlanStatus);

  const isLoading = status === 'loading';
  const shouldRedirect = !plan && (status === 'idle' || status === 'error');

  useEffect(() => {
    if (shouldRedirect) {
      router.replace(redirectTo);
    }
  }, [shouldRedirect, redirectTo, router]);

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
