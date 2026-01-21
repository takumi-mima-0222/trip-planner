import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { planCreateSchema, PlanCreateInput } from '../planCreate.type';
import { getTodayString } from '@/lib/utils';
import { useSearchConditionStore, selectSearchCondition } from '@/shared/store/useSearchConditionStore';

export const usePlanFrom = () => {
    const today = getTodayString();
    const savedCondition = useSearchConditionStore(selectSearchCondition);
    
    const {
        register,
        handleSubmit,
        control,
        watch,
        formState: { errors },
    } = useForm<PlanCreateInput>({
        resolver: zodResolver(planCreateSchema),
        mode: 'onChange',
        shouldFocusError: true,
        defaultValues: {
            startDate: savedCondition?.startDate || today,
            endDate: savedCondition?.endDate || today,
            departure: savedCondition?.departure || '',
            departureTime: savedCondition?.departureTime || '09:00',
            baseStay: savedCondition?.baseStay || '',
            // v3: priority付きスポット配列
            spots: savedCondition?.spots?.length 
                ? savedCondition.spots.map((s) => ({ value: s.name, priority: s.priority }))
                : [{ value: '', priority: 'nice' as const }],
            // 終了条件（任意）
            endLocation: savedCondition?.endLocation || '',
            endTime: savedCondition?.endTime || '19:00',
            // 交通手段・ペース
            transportMode: savedCondition?.transportMode || 'car',
            pace: savedCondition?.pace || 'normal',
        },
    });

    return {
        register,
        handleSubmit,
        control,
        watch,
        errors,
    };
};
