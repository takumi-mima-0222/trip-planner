import { useRouter } from 'next/navigation';
import { PlanCreateInput } from '../planCreate.type';
import { createTripPlanAction } from '../ai/createTripPlanAction';
import { useTripPlanStore } from '@/shared/store/useTripPlanStore';

/**
 * フォーム送信＆AIルート計算用カスタムフック
 */
export const usePlanCreate = () => {
	const router = useRouter();
	const { setLoading, setPlan, setError, status } = useTripPlanStore();

	const onSubmit = async (data: PlanCreateInput) => {
		setLoading();
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
