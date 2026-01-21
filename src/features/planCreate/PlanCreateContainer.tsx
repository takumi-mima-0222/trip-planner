"use client";

import { usePlanFrom } from './hooks/usePlanForm'
import { usePlanCreate } from './hooks/usePlanCreate'
import { usePlanSpots } from './hooks/usePlanSpots'
import PlanCreatePresentation from './PlanCreatePresentation';

export const PlanCreateContainer = () => {
  const { register, errors, handleSubmit, control, watch } = usePlanFrom();
  const { onSubmit, loading, error } = usePlanCreate();
  const { fields, addSpot, removeSpot, updatePriority, canRemove } = usePlanSpots(control);

  return (
    <PlanCreatePresentation 
        register={register} 
        onSubmit={handleSubmit(onSubmit)}
        errors={errors}
        fields={fields}
        addSpot={addSpot}
        removeSpot={removeSpot}
        updatePriority={updatePriority}
        canRemove={canRemove}
        loading={loading}
        apiError={error}
        watch={watch}
    />
  )
}
