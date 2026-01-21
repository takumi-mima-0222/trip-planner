"use client"

import React from 'react'
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { X, Plus, MapPin, Clock, Calendar, Home, Loader2, Car, Train, Footprints, Settings2, Sparkles, ArrowRight, CheckCircle } from 'lucide-react'
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
  { value: 'car', label: '車', icon: <Car className="size-4" /> },
  { value: 'transit', label: '公共交通', icon: <Train className="size-4" /> },
  { value: 'walk', label: '徒歩', icon: <Footprints className="size-4" /> },
];

// ペースのラベルと説明
const paceOptions: { value: Pace; label: string; description: string }[] = [
  { value: 'relaxed', label: 'ゆったり', description: '余裕を持った旅程' },
  { value: 'normal', label: 'ふつう', description: 'バランス重視' },
  { value: 'packed', label: 'ぎゅっと', description: '効率重視' },
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
        <div className="relative mx-4 w-full max-w-md">
          {/* 背景グロー */}
          <div className="absolute -inset-4 bg-gradient-to-r from-sky-200/50 to-cyan-200/50 rounded-3xl blur-2xl" />
          
          <Card className="relative bg-white/90 backdrop-blur-sm p-8 text-center shadow-xl rounded-2xl border-sky-100/50">
            {/* アニメーションリング */}
            <div className="relative mx-auto mb-6 size-20">
              <div className="absolute inset-0 rounded-full border-4 border-sky-100" />
              <div className="absolute inset-0 rounded-full border-4 border-sky-500 border-t-transparent animate-spin" />
              <div className="absolute inset-2 rounded-full bg-gradient-to-br from-sky-50 to-white flex items-center justify-center">
                <Sparkles className="size-8 text-sky-500" />
              </div>
            </div>
            
            <h2 className="mb-2 text-xl font-bold text-sky-900">プランを作成中...</h2>
            <p className="text-sm text-slate-600 mb-6">
              AIが最適な旅行プランを考えています。
            </p>
            
            {/* プログレスステップ */}
            <div className="space-y-2 text-left bg-slate-50 rounded-xl p-4">
              <div className="flex items-center gap-2 text-sm text-sky-600">
                <Loader2 className="size-4 animate-spin" />
                <span>移動時間を計算中...</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-slate-400">
                <div className="size-4" />
                <span>最適な順番を検討中...</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-slate-400">
                <div className="size-4" />
                <span>スケジュールを調整中...</span>
              </div>
            </div>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-sky-50 to-amber-50/30 relative overflow-hidden">
      {/* 背景装飾 */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-sky-200/20 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-amber-200/20 rounded-full blur-3xl" />
      
      {/* Main Content */}
      <main className="relative mx-auto max-w-2xl px-4 py-8 md:py-12">
        {/* Hero Section */}
        <section className="mb-8 text-center md:mb-12">
          {/* <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-sky-100 text-sky-700 text-sm font-medium mb-4">
            <Sparkles className="size-4" />
            <span>AI旅行プランナー</span>
          </div> */}
          <h2 className="mb-3 text-2xl font-bold text-balance text-sky-900 sm:text-3xl md:mb-4">
            行きたい場所を入れるだけで、
            <br className="hidden sm:block" />
            <span className="bg-gradient-to-r from-sky-600 to-cyan-500 bg-clip-text text-transparent">
              無理のない旅行プラン
            </span>
            を自動作成
          </h2>
          <p className="text-slate-600 max-w-lg mx-auto">
            AIが移動時間を考慮し、現実的な順番とスケジュールを提案します。
          </p>
          
          {/* 特徴バッジ */}
          <div className="flex flex-wrap justify-center gap-3 mt-6">
            {['登録不要', '完全無料', '30秒で完成'].map((item, index) => (
              <div key={index} className="flex items-center gap-1.5 text-sm text-slate-600">
                <CheckCircle className="size-4 text-sky-500" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </section>

        {/* API Error */}
        {apiError && (
          <Card className="mb-4 border-red-200 bg-red-50 p-4 rounded-xl">
            <p className="text-sm text-red-600">{apiError}</p>
          </Card>
        )}

        {/* Form Card */}
        <div className="relative">
          {/* 背景グロー */}
          <div className="absolute -inset-2 bg-gradient-to-r from-sky-100/50 to-amber-100/50 rounded-3xl blur-xl" />
          
          <Card className="relative mb-8 bg-white/90 backdrop-blur-sm p-5 shadow-xl sm:p-8 md:mb-12 rounded-2xl border-sky-100/50">
            <form className="space-y-6 sm:space-y-8" onSubmit={onSubmit}>
              
              {/* Section: 基本情報 */}
              <div className="space-y-5">
                <div className="flex items-center gap-2 mb-4">
                  <div className="flex items-center justify-center size-8 rounded-lg bg-gradient-to-br from-sky-500 to-cyan-500 text-white">
                    <Calendar className="size-4" />
                  </div>
                  <h3 className="font-semibold text-slate-800">基本情報</h3>
                </div>
                
                {/* Travel Dates - 2 columns */}
                <div className="grid grid-cols-2 gap-3 sm:gap-4">
                  <div className="space-y-2 min-w-0">
                    <label htmlFor="startDate" className="flex items-center gap-1.5 text-sm font-medium text-slate-700">
                      開始日
                    </label>
                    <Input
                      id="startDate"
                      type="date"
                      className="h-11 w-full min-w-0 text-base rounded-xl border-slate-200 focus:border-sky-500 focus:ring-sky-500/20"
                      aria-invalid={!!errors.startDate}
                      {...register('startDate')}
                    />
                    {errors.startDate && <p className="text-xs text-red-600">{errors.startDate.message}</p>}
                  </div>
                  <div className="space-y-2 min-w-0">
                    <label htmlFor="endDate" className="flex items-center gap-1.5 text-sm font-medium text-slate-700">
                      終了日
                    </label>
                    <Input
                      id="endDate"
                      type="date"
                      className="h-11 w-full min-w-0 text-base rounded-xl border-slate-200 focus:border-sky-500 focus:ring-sky-500/20"
                      aria-invalid={!!errors.endDate}
                      {...register('endDate')}
                    />
                    {errors.endDate && <p className="text-xs text-red-600">{errors.endDate.message}</p>}
                  </div>
                </div>

                {/* Departure Point & Time - 2 columns */}
                <div className="grid grid-cols-[1fr_auto] gap-3 sm:gap-4">
                  <div className="space-y-2">
                    <label htmlFor="departure" className="flex items-center gap-1.5 text-sm font-medium text-slate-700">
                      <MapPin className="size-4 text-sky-600" />
                      出発地点
                    </label>
                    <Input
                      id="departure"
                      type="text"
                      placeholder="例）那覇空港"
                      className="h-11 text-base rounded-xl border-slate-200 focus:border-sky-500 focus:ring-sky-500/20"
                      aria-invalid={!!errors.departure}
                      {...register('departure')}
                    />
                    {errors.departure && <p className="text-xs text-red-600">{errors.departure.message}</p>}
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="departureTime" className="flex items-center gap-1.5 text-sm font-medium text-slate-700">
                      <Clock className="size-4 text-sky-600" />
                      出発時刻
                    </label>
                    <Input
                      id="departureTime"
                      type="time"
                      defaultValue="09:00"
                      className="h-11 w-28 text-base sm:w-32 rounded-xl border-slate-200 focus:border-sky-500 focus:ring-sky-500/20"
                      aria-invalid={!!errors.departureTime}
                      {...register('departureTime')}
                    />
                    {errors.departureTime && <p className="text-xs text-red-600">{errors.departureTime.message}</p>}
                  </div>
                </div>

                {/* Base Stay - Full width */}
                <div className="space-y-2">
                  <label htmlFor="baseStay" className="flex items-center gap-1.5 text-sm font-medium text-slate-700">
                    <Home className="size-4 text-sky-600" />
                    宿泊拠点
                  </label>
                  <Input
                    id="baseStay"
                    type="text"
                    placeholder="例）那覇市内ホテル"
                    className="h-11 text-base rounded-xl border-slate-200 focus:border-sky-500 focus:ring-sky-500/20"
                    aria-invalid={!!errors.baseStay}
                    {...register('baseStay')}
                  />
                  {errors.baseStay && <p className="text-xs text-red-600">{errors.baseStay.message}</p>}
                </div>
              </div>

              {/* Divider */}
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-slate-200" />
                </div>
              </div>

              {/* Section: 行きたいスポット */}
              <div className="space-y-4">
                <div className="flex items-center gap-2 mb-4">
                  <div className="flex items-center justify-center size-8 rounded-lg bg-gradient-to-br from-amber-500 to-orange-500 text-white">
                    <MapPin className="size-4" />
                  </div>
                  <h3 className="font-semibold text-slate-800">行きたいスポット</h3>
                  <span className="text-sm text-slate-400">（1件以上）</span>
                </div>

                <div className="space-y-2">
                  {fields.map((field, index) => (
                    <div key={field.id} className="group flex items-center gap-2">
                      <span className="flex size-7 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-sky-500 to-cyan-500 text-xs font-bold text-white shadow-sm">
                        {index + 1}
                      </span>
                      <Input
                        type="text"
                        placeholder="スポット名を入力"
                        className="h-11 flex-1 text-base rounded-xl border-slate-200 focus:border-sky-500 focus:ring-sky-500/20 transition-shadow group-hover:shadow-sm"
                        aria-invalid={!!(Array.isArray(errors.spots) && errors.spots[index]?.value)}
                        {...register(`spots.${index}.value`)}
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        className="size-9 shrink-0 text-slate-400 hover:text-red-500 hover:bg-red-50 disabled:opacity-30 rounded-lg transition-colors"
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
                  variant="outline"
                  className="h-11 w-full text-sm text-sky-600 border-sky-200 hover:bg-sky-50 hover:text-sky-700 hover:border-sky-300 rounded-xl transition-all"
                  onClick={addSpot}
                >
                  <Plus className="mr-1.5 size-4" />
                  スポットを追加
                </Button>
              </div>

              {/* Divider */}
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-slate-200" />
                </div>
              </div>

              {/* Section: 移動手段とペース */}
              <div className="space-y-5">
                <div className="flex items-center gap-2 mb-4">
                  <div className="flex items-center justify-center size-8 rounded-lg bg-gradient-to-br from-purple-500 to-pink-500 text-white">
                    <Car className="size-4" />
                  </div>
                  <h3 className="font-semibold text-slate-800">移動手段とペース</h3>
                </div>
                
                <div className="flex flex-col gap-5 sm:flex-row sm:gap-6">
                  {/* Transport Mode */}
                  <div className="flex-1 space-y-2">
                    <label className="text-sm font-medium text-slate-700">
                      移動手段
                    </label>
                    <div className="flex gap-2">
                      {transportModeOptions.map((option) => (
                        <label
                          key={option.value}
                          className="group flex flex-1 cursor-pointer items-center justify-center gap-1.5 rounded-xl border-2 border-slate-200 px-3 py-3 text-sm transition-all has-[:checked]:border-sky-500 has-[:checked]:bg-sky-50 has-[:checked]:text-sky-700 has-[:checked]:shadow-sm hover:border-slate-300 hover:bg-slate-50"
                        >
                          <input
                            type="radio"
                            value={option.value}
                            className="sr-only"
                            {...register('transportMode')}
                          />
                          {option.icon}
                          <span className="font-medium">{option.label}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* Pace */}
                  <div className="space-y-2 sm:w-40">
                    <label htmlFor="pace" className="text-sm font-medium text-slate-700">
                      旅のペース
                    </label>
                    <select
                      id="pace"
                      className="h-11 w-full rounded-xl border-2 border-slate-200 bg-white px-3 text-sm font-medium transition-all focus:border-sky-500 focus:outline-none focus:ring-2 focus:ring-sky-500/20"
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
              </div>

              {/* Optional Settings - Accordion */}
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="advanced" className="border-2 rounded-xl border-slate-200 px-4 data-[state=open]:bg-slate-50/50 data-[state=open]:border-slate-300">
                  <AccordionTrigger className="py-4 text-sm font-medium text-slate-600 hover:no-underline [&[data-state=open]]:text-slate-900">
                    <span className="flex items-center gap-2">
                      <Settings2 className="size-4" />
                      終了条件を設定（任意）
                    </span>
                  </AccordionTrigger>
                  <AccordionContent className="pb-5 pt-1">
                    <div className="grid grid-cols-2 gap-3 sm:gap-4">
                      <div className="space-y-2">
                        <label htmlFor="endLocation" className="text-sm text-slate-600">
                          最終到着地点
                        </label>
                        <Input
                          id="endLocation"
                          type="text"
                          placeholder="例）那覇空港"
                          className="h-11 text-base rounded-xl border-slate-200 focus:border-sky-500 focus:ring-sky-500/20"
                          {...register('endLocation')}
                        />
                      </div>
                      <div className="space-y-2">
                        <label htmlFor="endTime" className="text-sm text-slate-600">
                          到着希望時刻
                        </label>
                        <Input
                          id="endTime"
                          type="time"
                          className="h-11 w-full text-base rounded-xl border-slate-200 focus:border-sky-500 focus:ring-sky-500/20"
                          {...register('endTime')}
                        />
                      </div>
                    </div>
                    <p className="mt-3 text-xs text-slate-500 bg-slate-100 rounded-lg p-2">
                      💡 未入力の場合、最終日は出発地点に戻る旅程になります
                    </p>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>

              {/* Submit Button */}
              <Button
                type="submit"
                className="group h-14 w-full bg-gradient-to-r from-sky-500 to-cyan-500 text-base font-bold hover:from-sky-600 hover:to-cyan-600 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <span className="flex items-center gap-2">
                  <Sparkles className="size-5" />
                  プランを作成する
                  <ArrowRight className="size-5 transition-transform group-hover:translate-x-1" />
                </span>
              </Button>
            </form>
          </Card>
        </div>
        
        {/* Footer hint */}
        <p className="text-center text-xs text-slate-400">
          ※ 生成されたプランは何度でも変更・再生成できます
        </p>
      </main>
    </div>
  )
}

export default PlanCreatePresentation
