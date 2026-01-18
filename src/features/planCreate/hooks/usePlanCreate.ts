import { useRouter } from 'next/navigation';
import { PlanCreateInput } from '../planCreate.type';
import { createTripPlanAction } from '../ai/createTripPlanAction';
import { useTripPlanStore } from '@/shared/store/useTripPlanStore';
import { useSearchConditionStore } from '@/shared/store/useSearchConditionStore';

/**
 * フォーム送信＆AIルート計算用カスタムフック
 */
export const usePlanCreate = () => {
	const router = useRouter();
	const { setLoading, setPlan, setError, status } = useTripPlanStore();
	const { setCondition } = useSearchConditionStore();

	const onSubmit = async (data: PlanCreateInput) => {
		setLoading();
		
		// 検索条件をストアに保存
		setCondition({
			startDate: data.startDate,
			endDate: data.endDate,
			departure: data.departure,
			departureTime: data.departureTime,
			baseStay: data.baseStay,
			spots: data.spots.map((s) => s.value),
		});

		try {
			// OpenAIによるルート計算処理（Server Action経由）
			const result = await createTripPlanAction({
				startDate: data.startDate,
				endDate: data.endDate,
				startLocation: data.departure,
				startTime: data.departureTime,
				baseStay: data.baseStay,
				spots: data.spots.map((s) => s.value),
			});
			console.log('AIが作成した旅行プラン:', result);

			// 結果をストアに保存
			setPlan(result);

			// プラン詳細画面へ遷移
			router.push('/plan');
		} catch (e) {
			const message = e instanceof Error ? e.message : 'ルート計算中にエラーが発生しました';
			setError(message);
		}
	};

	return {
		onSubmit,
		loading: status === 'loading',
		error: useTripPlanStore.getState().error,
	};
};
