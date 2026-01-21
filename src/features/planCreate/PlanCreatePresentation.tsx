"use client"

import React from 'react'
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { X, Plus, MapPin, Clock, Calendar, Home, Loader2, Car, Train, Footprints, Settings2 } from 'lucide-react'
import { FieldErrors, UseFormRegister, FieldArrayWithId } from 'react-hook-form';
import { PlanCreateInput, TransportMode, Pace } from './planCreate.type';

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

// 交通手段のラベルとアイコン
const transportModeOptions: { value: TransportMode; label: string; icon: React.ReactNode }[] = [
  { value: 'car', label: '車', icon: <Car className="size-3.5 sm:size-4" /> },
  { value: 'transit', label: '公共交通', icon: <Train className="size-3.5 sm:size-4" /> },
  { value: 'walk', label: '徒歩', icon: <Footprints className="size-3.5 sm:size-4" /> },
];

// ペースのラベル
const paceOptions: { value: Pace; label: string }[] = [
  { value: 'relaxed', label: 'ゆったり' },
  { value: 'normal', label: 'ふつう' },
  { value: 'packed', label: 'ぎゅっと' },
];

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
      <main className="mx-auto max-w-2xl px-4 py-8 md:py-12">
        {/* Hero Section */}
        <section className="mb-6 text-center md:mb-10">
          <h2 className="mb-2 text-xl font-bold text-balance text-sky-900 sm:text-2xl md:mb-3 md:text-3xl">
            行きたい場所を入れるだけで、
            <br className="hidden sm:block" />
            無理のない旅行プランを自動作成
          </h2>
          <p className="text-sm text-pretty text-slate-600 sm:text-base">
            AIが移動時間を考慮し、現実的に回れる順番とスケジュールを提案します。
          </p>
        </section>

        {/* API Error */}
        {apiError && (
          <Card className="mb-4 border-red-200 bg-red-50 p-3 sm:p-4">
            <p className="text-sm text-red-600">{apiError}</p>
          </Card>
        )}

        {/* Form Card */}
        <Card className="mb-8 bg-white p-4 shadow-lg sm:p-6 md:mb-12">
          <form className="space-y-5 sm:space-y-6" onSubmit={onSubmit}>
            
            {/* Section: 基本情報 */}
            <div className="space-y-4">
              {/* Travel Dates - 2 columns */}
              <div className="grid grid-cols-2 gap-2 sm:gap-4">
                <div className="space-y-1.5 min-w-0">
                  <label htmlFor="startDate" className="flex items-center gap-1.5 text-xs font-medium text-slate-700 sm:text-sm">
                    <Calendar className="size-3.5 text-sky-600 sm:size-4" />
                    開始日
                  </label>
                  <Input
                    id="startDate"
                    type="date"
                    className="h-10 w-full min-w-0 text-base sm:h-11"
                    aria-invalid={!!errors.startDate}
                    {...register('startDate')}
                  />
                  {errors.startDate && <p className="text-xs text-red-600">{errors.startDate.message}</p>}
                </div>
                <div className="space-y-1.5 min-w-0">
                  <label htmlFor="endDate" className="flex items-center gap-1.5 text-xs font-medium text-slate-700 sm:text-sm">
                    <Calendar className="size-3.5 text-sky-600 sm:size-4" />
                    終了日
                  </label>
                  <Input
                    id="endDate"
                    type="date"
                    className="h-10 w-full min-w-0 text-base sm:h-11"
                    aria-invalid={!!errors.endDate}
                    {...register('endDate')}
                  />
                  {errors.endDate && <p className="text-xs text-red-600">{errors.endDate.message}</p>}
                </div>
              </div>

              {/* Departure Point & Time - 2 columns */}
              <div className="grid grid-cols-[1fr_auto] gap-3 sm:gap-4">
                <div className="space-y-1.5">
                  <label htmlFor="departure" className="flex items-center gap-1.5 text-xs font-medium text-slate-700 sm:text-sm">
                    <MapPin className="size-3.5 text-sky-600 sm:size-4" />
                    出発地点
                  </label>
                  <Input
                    id="departure"
                    type="text"
                    placeholder="例）那覇空港"
                    className="h-10 text-base sm:h-11"
                    aria-invalid={!!errors.departure}
                    {...register('departure')}
                  />
                  {errors.departure && <p className="text-xs text-red-600">{errors.departure.message}</p>}
                </div>
                <div className="space-y-1.5">
                  <label htmlFor="departureTime" className="flex items-center gap-1.5 text-xs font-medium text-slate-700 sm:text-sm">
                    <Clock className="size-3.5 text-sky-600 sm:size-4" />
                    出発時刻
                  </label>
                  <Input
                    id="departureTime"
                    type="time"
                    defaultValue="09:00"
                    className="h-10 w-28 text-base sm:h-11 sm:w-32"
                    aria-invalid={!!errors.departureTime}
                    {...register('departureTime')}
                  />
                  {errors.departureTime && <p className="text-xs text-red-600">{errors.departureTime.message}</p>}
                </div>
              </div>

              {/* Base Stay - Full width */}
              <div className="space-y-1.5">
                <label htmlFor="baseStay" className="flex items-center gap-1.5 text-xs font-medium text-slate-700 sm:text-sm">
                  <Home className="size-3.5 text-sky-600 sm:size-4" />
                  宿泊拠点
                </label>
                <Input
                  id="baseStay"
                  type="text"
                  placeholder="例）那覇市内ホテル"
                  className="h-10 text-base sm:h-11"
                  aria-invalid={!!errors.baseStay}
                  {...register('baseStay')}
                />
                {errors.baseStay && <p className="text-xs text-red-600">{errors.baseStay.message}</p>}
              </div>
            </div>

            {/* Divider */}
            <div className="border-t border-slate-100" />

            {/* Section: 行きたいスポット */}
            <div className="space-y-3">
              <label className="flex items-center gap-1.5 text-xs font-medium text-slate-700 sm:text-sm">
                <MapPin className="size-3.5 text-sky-600 sm:size-4" />
                行きたいスポット
                <span className="font-normal text-slate-400">（1件以上）</span>
              </label>

              <div className="space-y-2">
                {fields.map((field, index) => (
                  <div key={field.id} className="flex items-center gap-2">
                    <span className="flex size-6 shrink-0 items-center justify-center rounded-full bg-sky-100 text-xs font-medium text-sky-700">
                      {index + 1}
                    </span>
                    <Input
                      type="text"
                      placeholder="スポット名を入力"
                      className="h-10 flex-1 text-base"
                      aria-invalid={!!(Array.isArray(errors.spots) && errors.spots[index]?.value)}
                      {...register(`spots.${index}.value`)}
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      className="size-8 shrink-0 text-slate-400 hover:text-slate-600 disabled:opacity-30"
                      onClick={() => removeSpot(index)}
                      disabled={!canRemove}
                    >
                      <X className="size-4" />
                    </Button>
                  </div>
                ))}
              </div>

              {errors.spots && Array.isArray(errors.spots) && (
                <div className="space-y-1">
                  {errors.spots.map((err, idx) => (
                    err?.value?.message ? (
                      <p key={`err-${idx}`} className="text-xs text-red-600">{err.value.message}</p>
                    ) : null
                  ))}
                </div>
              )}

              <Button
                type="button"
                variant="ghost"
                className="h-9 w-full text-sm text-sky-600 hover:bg-sky-50 hover:text-sky-700"
                onClick={addSpot}
              >
                <Plus className="mr-1.5 size-4" />
                スポットを追加
              </Button>
            </div>

            {/* Divider */}
            <div className="border-t border-slate-100" />

            {/* Section: 移動手段とペース（1行にまとめる） */}
            <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:gap-6">
              {/* Transport Mode */}
              <div className="flex-1 space-y-2">
                <label className="flex items-center gap-1.5 text-xs font-medium text-slate-700 sm:text-sm">
                  移動手段
                </label>
                <div className="flex gap-1.5 sm:gap-2">
                  {transportModeOptions.map((option) => (
                    <label
                      key={option.value}
                      className="flex flex-1 cursor-pointer items-center justify-center gap-1 rounded-lg border border-slate-200 px-2 py-2 text-xs transition-all has-[:checked]:border-sky-500 has-[:checked]:bg-sky-50 has-[:checked]:text-sky-700 hover:border-slate-300 sm:gap-1.5 sm:px-3 sm:py-2.5 sm:text-sm"
                    >
                      <input
                        type="radio"
                        value={option.value}
                        className="sr-only"
                        {...register('transportMode')}
                      />
                      {option.icon}
                      <span>{option.label}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Pace */}
              <div className="space-y-2 sm:w-36">
                <label htmlFor="pace" className="flex items-center gap-1.5 text-xs font-medium text-slate-700 sm:text-sm">
                  旅のペース
                </label>
                <select
                  id="pace"
                  className="h-10 w-full rounded-lg border border-slate-200 bg-white px-3 text-sm transition-colors focus:border-sky-500 focus:outline-none focus:ring-2 focus:ring-sky-500/20"
                  {...register('pace')}
                >
                  {paceOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Optional Settings - Accordion */}
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="advanced" className="border rounded-lg border-slate-200 px-3 data-[state=open]:bg-slate-50/50">
                <AccordionTrigger className="py-3 text-xs font-medium text-slate-600 hover:no-underline sm:text-sm [&[data-state=open]]:text-slate-900">
                  <span className="flex items-center gap-1.5">
                    <Settings2 className="size-3.5 sm:size-4" />
                    終了条件を設定（任意）
                  </span>
                </AccordionTrigger>
                <AccordionContent className="pb-4 pt-1">
                  <div className="grid grid-cols-2 gap-3 sm:gap-4">
                    <div className="space-y-1.5">
                      <label htmlFor="endLocation" className="text-xs text-slate-600">
                        最終到着地点
                      </label>
                      <Input
                        id="endLocation"
                        type="text"
                        placeholder="例）那覇空港"
                        className="h-10 text-base"
                        {...register('endLocation')}
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label htmlFor="endTime" className="text-xs text-slate-600">
                        到着希望時刻
                      </label>
                      <Input
                        id="endTime"
                        type="time"
                        className="h-10 w-full text-base"
                        {...register('endTime')}
                      />
                    </div>
                  </div>
                  <p className="mt-2 text-xs text-slate-500">
                    未入力の場合、最終日は出発地点に戻る旅程になります
                  </p>
                </AccordionContent>
              </AccordionItem>
            </Accordion>

            {/* Submit Button */}
            <Button
              type="submit"
              className="h-11 w-full bg-sky-600 text-base font-semibold hover:bg-sky-700 sm:h-12"
            >
              プランを作成
            </Button>
          </form>
        </Card>
      </main>
    </div>
  )
}

export default PlanCreatePresentation
