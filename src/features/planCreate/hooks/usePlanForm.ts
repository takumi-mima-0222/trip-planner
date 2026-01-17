import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { planCreateSchema, PlanCreateInput } from '../planCreate.type';
import { getTodayString } from '@/lib/utils';

export const usePlanFrom = () => {
    const today = getTodayString();
    
    const {
        register,
        handleSubmit,
        control,
        formState: { errors },
    } = useForm<PlanCreateInput>({
        resolver: zodResolver(planCreateSchema),
        mode: 'onChange',
        shouldFocusError: true,
        defaultValues: {
            startDate: today,
            endDate: today,
            departure: '',
            departureTime: '09:00',
            baseStay: '',
            spots: [{ value: '' }],
        },
    });

    return {
        register,
        handleSubmit,
        control,
        errors,
    };
};
