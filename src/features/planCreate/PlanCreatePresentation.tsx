"use client"

import React from 'react'
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { X, Plus, MapPin, Clock, Calendar, Home, Loader2 } from 'lucide-react'
import { FieldErrors, UseFormRegister, FieldArrayWithId } from 'react-hook-form';
import { PlanCreateInput } from './planCreate.type';

export interface PlanCreatePresentationProps {
  register: UseFormRegister<PlanCreateInput>;
  onSubmit: (e?: React.BaseSyntheticEvent) => void;
  errors: FieldErrors<PlanCreateInput>;
  fields: FieldArrayWithId<PlanCreateInput, 'spots', 'id'>[];
  addSpot: () => void;
  removeSpot: (index: number) => void;
  canRemove: boolean;
  loading: boolean;
  apiError: string | null;
}

const PlanCreatePresentation = ({
  register, 
  onSubmit, 
  errors, 
  fields, 
  addSpot, 
  removeSpot, 
  canRemove,
  loading,
  apiError,
}: PlanCreatePresentationProps) => {
  // ローディング画面
  if (loading) {
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

  return (
    <div className="min-h-screen bg-gradient-to-b from-sky-50 to-amber-50/30">
      {/* Main Content */}
      <main className="mx-auto max-w-3xl px-4 py-8 md:py-12">
        {/* Hero Section */}
        <section className="mb-8 text-center md:mb-12">
          <h2 className="mb-3 text-xl font-bold text-balance text-sky-900 sm:text-2xl md:mb-4 md:text-4xl">
            行きたい場所を入れるだけで、
            <br className="hidden sm:block" />
            無理のない旅行プランを自動作成。
          </h2>
          <p className="text-sm text-pretty text-slate-600 sm:text-base md:text-lg">
            出発地点・宿泊地・行きたいスポットを入力すると、
            <br className="hidden md:block" />
            AIが移動時間を考慮し、現実的に回れる順番とスケジュールを提案します。
          </p>
        </section>

        {/* API Error */}
        {apiError && (
          <Card className="mb-6 border-red-200 bg-red-50 p-4">
            <p className="text-sm text-red-600">{apiError}</p>
          </Card>
        )}

        {/* Form Card */}
        <Card className="mb-8 bg-white p-4 shadow-lg sm:p-6 md:mb-16 md:p-8">
          <form className="space-y-4 sm:space-y-5" onSubmit={onSubmit}>
            {/* Travel Dates & Time - 3 columns on mobile, flexible on larger */}
            <div className="grid grid-cols-3 gap-2 sm:gap-4">
              <div className="space-y-1.5">
                <label htmlFor="startDate" className="flex items-center gap-1 text-xs font-semibold text-slate-700 sm:gap-2 sm:text-sm">
                  <Calendar className="size-3.5 text-sky-600 sm:size-4" />
                  <span className="hidden sm:inline">旅行</span>開始日
                </label>
                <Input
                  id="startDate"
                  type="date"
                  className="h-9 px-2 text-sm sm:h-11 sm:px-3"
                  aria-invalid={!!errors.startDate}
                  {...register('startDate')}
                />
                {errors.startDate && <p className="text-xs text-red-600">{errors.startDate.message}</p>}
              </div>
              <div className="space-y-1.5">
                <label htmlFor="endDate" className="flex items-center gap-1 text-xs font-semibold text-slate-700 sm:gap-2 sm:text-sm">
                  <Calendar className="size-3.5 text-sky-600 sm:size-4" />
                  <span className="hidden sm:inline">旅行</span>終了日
                </label>
                <Input
                  id="endDate"
                  type="date"
                  className="h-9 px-2 text-sm sm:h-11 sm:px-3"
                  aria-invalid={!!errors.endDate}
                  {...register('endDate')}
                />
                {errors.endDate && <p className="text-xs text-red-600">{errors.endDate.message}</p>}
              </div>
              <div className="space-y-1.5">
                <label htmlFor="departureTime" className="flex items-center gap-1 text-xs font-semibold text-slate-700 sm:gap-2 sm:text-sm">
                  <Clock className="size-3.5 text-sky-600 sm:size-4" />
                  出発時刻
                </label>
                <Input
                  id="departureTime"
                  type="time"
                  defaultValue="09:00"
                  className="h-9 px-2 text-sm sm:h-11 sm:px-3"
                  aria-invalid={!!errors.departureTime}
                  {...register('departureTime')}
                />
                {errors.departureTime && <p className="text-xs text-red-600">{errors.departureTime.message}</p>}
              </div>
            </div>

            {/* Departure Point & Base Stay - 2 columns */}
            <div className="grid grid-cols-2 gap-2 sm:gap-4">
              <div className="space-y-1.5">
                <label htmlFor="departure" className="flex items-center gap-1 text-xs font-semibold text-slate-700 sm:gap-2 sm:text-sm">
                  <MapPin className="size-3.5 text-sky-600 sm:size-4" />
                  出発地点
                </label>
                <Input
                  id="departure"
                  type="text"
                  placeholder="例）那覇空港"
                  className="h-9 px-2 text-sm sm:h-11 sm:px-3"
                  aria-invalid={!!errors.departure}
                  {...register('departure')}
                />
                {errors.departure && <p className="text-xs text-red-600">{errors.departure.message}</p>}
              </div>
              <div className="space-y-1.5">
                <label htmlFor="baseStay" className="flex items-center gap-1 text-xs font-semibold text-slate-700 sm:gap-2 sm:text-sm">
                  <Home className="size-3.5 text-sky-600 sm:size-4" />
                  宿泊拠点
                </label>
                <Input
                  id="baseStay"
                  type="text"
                  placeholder="例）那覇市内ホテル"
                  className="h-9 px-2 text-sm sm:h-11 sm:px-3"
                  aria-invalid={!!errors.baseStay}
                  {...register('baseStay')}
                />
                {errors.baseStay && <p className="text-xs text-red-600">{errors.baseStay.message}</p>}
              </div>
            </div>

            {/* Spots to Visit */}
            <div className="space-y-2">
              <label className="flex items-center gap-1 text-xs font-semibold text-slate-700 sm:gap-2 sm:text-sm">
                <MapPin className="size-3.5 text-sky-600 sm:size-4" />
                行きたいスポット <span className="font-normal text-slate-500">（1件以上）</span>
              </label>

              {/* Spot Input Rows */}
              <div className="space-y-2">
                {fields.map((field, index) => (
                  <div key={field.id} className="flex items-center gap-1">
                    <div className="flex size-6 shrink-0 items-center justify-center rounded-full bg-sky-100 text-xs font-medium text-sky-700 sm:size-7">
                      {index + 1}
                    </div>
                    <Input
                      type="text"
                      placeholder="スポット名"
                      className="h-9 min-w-0 flex-1 px-2 text-sm sm:h-10 sm:px-3"
                      aria-invalid={!!(Array.isArray(errors.spots) && errors.spots[index]?.value)}
                      {...register(`spots.${index}.value`)}
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      className="size-8 shrink-0 text-slate-400 hover:text-slate-600 disabled:opacity-30 sm:size-9"
                      onClick={() => removeSpot(index)}
                      disabled={!canRemove}
                    >
                      <X className="size-4" />
                    </Button>
                  </div>
                ))}
                {errors.spots && Array.isArray(errors.spots) && (
                  <div className="space-y-1">
                    {errors.spots.map((err, idx) => (
                      err?.value?.message ? (
                        <p key={`err-${idx}`} className="text-sm text-red-600">{err.value.message}</p>
                      ) : null
                    ))}
                  </div>
                )}
              </div>

              {/* Add Spot Button */}
              <Button
                type="button"
                variant="ghost"
                className="h-8 w-full text-sm text-sky-600 hover:text-sky-700 sm:h-10"
                onClick={addSpot}
              >
                <Plus className="mr-1 size-3.5 sm:mr-2 sm:size-4" />
                スポットを追加
              </Button>
            </div>

            {/* Submit Button */}
            <div className="pt-1 sm:pt-2">
              <Button
                type="submit"
                className="h-10 w-full bg-sky-600 text-sm font-semibold hover:bg-sky-700 sm:h-12 sm:text-base"
              >
                プランを作成
              </Button>
            </div>
          </form>
        </Card>
      </main>
    </div>
  )
}

export default PlanCreatePresentation
