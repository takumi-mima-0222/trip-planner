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
        <section className="mb-12 text-center">
          <h2 className="mb-4 text-3xl font-bold text-balance text-sky-900 md:text-4xl">
            行きたい場所を入れるだけで、旅行プランを自動作成
          </h2>
          <p className="text-pretty text-slate-600 md:text-lg">
            出発地点と行きたいスポットを入力すると、AIが効率の良い順番とスケジュールを提案します。
          </p>
        </section>

        {/* API Error */}
        {apiError && (
          <Card className="mb-6 border-red-200 bg-red-50 p-4">
            <p className="text-sm text-red-600">{apiError}</p>
          </Card>
        )}

        {/* Form Card */}
        <Card className="mb-16 bg-white p-6 shadow-lg md:p-8">
          <form className="space-y-6" onSubmit={onSubmit}>
            {/* Travel Dates */}
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <label htmlFor="startDate" className="flex items-center gap-2 text-sm font-semibold text-slate-700">
                  <Calendar className="size-4 text-sky-600" />
                  旅行開始日
                </label>
                <Input
                  id="startDate"
                  type="date"
                  className="h-11"
                  aria-invalid={!!errors.startDate}
                  {...register('startDate')}
                />
                {errors.startDate && <p className="text-sm text-red-600">{errors.startDate.message}</p>}
              </div>
              <div className="space-y-2">
                <label htmlFor="endDate" className="flex items-center gap-2 text-sm font-semibold text-slate-700">
                  <Calendar className="size-4 text-sky-600" />
                  旅行終了日
                </label>
                <Input
                  id="endDate"
                  type="date"
                  className="h-11"
                  aria-invalid={!!errors.endDate}
                  {...register('endDate')}
                />
                {errors.endDate && <p className="text-sm text-red-600">{errors.endDate.message}</p>}
              </div>
            </div>

            {/* Departure Point */}
            <div className="space-y-2">
              <label htmlFor="departure" className="flex items-center gap-2 text-sm font-semibold text-slate-700">
                <MapPin className="size-4 text-sky-600" />
                出発地点
              </label>
              <Input
                id="departure"
                type="text"
                placeholder="例）那覇空港, 東京駅 など"
                className="h-11"
                aria-invalid={!!errors.departure}
                {...register('departure')}
              />
              {errors.departure && <p className="text-sm text-red-600">{errors.departure.message}</p>}
            </div>

            {/* Departure Time */}
            <div className="space-y-2">
              <label htmlFor="departureTime" className="flex items-center gap-2 text-sm font-semibold text-slate-700">
                <Clock className="size-4 text-sky-600" />
                出発時刻
              </label>
              <Input
                id="departureTime"
                type="time"
                defaultValue="09:00"
                className="h-11"
                aria-invalid={!!errors.departureTime}
                {...register('departureTime')}
              />
              {errors.departureTime && (
                <p className="text-sm text-red-600">{errors.departureTime.message}</p>
              )}
            </div>

            {/* Base Stay */}
            <div className="space-y-2">
              <label htmlFor="baseStay" className="flex items-center gap-2 text-sm font-semibold text-slate-700">
                <Home className="size-4 text-sky-600" />
                宿泊拠点
              </label>
              <Input
                id="baseStay"
                type="text"
                placeholder="例）那覇市内ホテル, 恩納村リゾート など"
                className="h-11"
                aria-invalid={!!errors.baseStay}
                {...register('baseStay')}
              />
              <p className="text-xs text-slate-500">宿泊する場所を1箇所指定してください</p>
              {errors.baseStay && <p className="text-sm text-red-600">{errors.baseStay.message}</p>}
            </div>

            {/* Spots to Visit */}
            <div className="space-y-3">
              <div>
                <label className="flex items-center gap-2 text-sm font-semibold text-slate-700">
                  <MapPin className="size-4 text-sky-600" />
                  行きたいスポット
                </label>
                <p className="mt-1 text-xs text-slate-500">
                  ※行きたい場所を1件以上入力してください
                </p>
              </div>

              {/* Spot Input Rows */}
              <div className="space-y-3">
                {fields.map((field, index) => (
                  <div key={field.id} className="flex items-center gap-2">
                    <div className="flex size-8 shrink-0 items-center justify-center rounded-full bg-sky-100 text-sm font-medium text-sky-700">
                      {index + 1}
                    </div>
                    <Input
                      type="text"
                      placeholder="スポット名（例：首里城, 国際通り など）"
                      className="h-11 flex-1"
                      aria-invalid={!!(Array.isArray(errors.spots) && errors.spots[index]?.value)}
                      {...register(`spots.${index}.value`)}
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      className="size-11 shrink-0 text-slate-400 hover:text-slate-600 disabled:opacity-30"
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
                className="w-full text-sky-600 hover:text-sky-700"
                onClick={addSpot}
              >
                <Plus className="mr-2 size-4" />
                スポットを追加
              </Button>
            </div>

            {/* Submit Button */}
            <div className="space-y-2 pt-2">
              <Button
                type="submit"
                className="h-12 w-full bg-sky-600 text-base font-semibold hover:bg-sky-700"
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
