"use client"

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { MapPin, Clock, Calendar, Home, AlertTriangle, Lightbulb, CheckCircle, XCircle, ArrowLeft, Plus, Utensils, Car, Building, Share2, Check, Train, Footprints, Flag, Gauge, ChevronLeft, ChevronRight, Sparkles } from 'lucide-react'
import { PlanSummaryProps, TripPlanDay, TripPlanItem, TripPlanIssue, TripPlanAlternative, TransportMode, Pace } from './planDetail.type'

export interface PlanDetailPresentationProps {
  summary: PlanSummaryProps | null;
  days: TripPlanDay[];
  issues: TripPlanIssue[];
  alternatives: TripPlanAlternative[];
  onBackToCreate: () => void;
  onCreateNew: () => void;
  onSharePlan: () => Promise<boolean>;
  isShareCopied: boolean;
}

// 交通手段の表示ラベル
const transportModeLabels: Record<TransportMode, { label: string; icon: React.ReactNode }> = {
  car: { label: '車', icon: <Car className="size-3.5" /> },
  transit: { label: '公共交通', icon: <Train className="size-3.5" /> },
  walk: { label: '徒歩', icon: <Footprints className="size-3.5" /> },
};

// ペースの表示ラベル
const paceLabels: Record<Pace, string> = {
  relaxed: 'ゆったり',
  normal: 'ふつう',
  packed: 'ぎゅっと',
};

const PlanDetailPresentation = ({
  summary,
  days,
  issues,
  alternatives,
  onBackToCreate,
  onCreateNew,
  onSharePlan,
  isShareCopied,
}: PlanDetailPresentationProps) => {
  const [activeDay, setActiveDay] = useState(0);

  if (!summary) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-sky-50 to-amber-50/30">
        <main className="mx-auto max-w-3xl px-4 py-8 md:py-12">
          <Card className="relative overflow-hidden border-0 bg-white/80 p-8 text-center shadow-xl backdrop-blur-sm">
            <div className="absolute -right-8 -top-8 size-32 rounded-full bg-gradient-to-br from-sky-100 to-cyan-100 opacity-50 blur-2xl" />
            <div className="relative">
              <div className="mx-auto mb-4 flex size-16 items-center justify-center rounded-full bg-slate-100">
                <MapPin className="size-8 text-slate-400" />
              </div>
              <p className="mb-6 text-slate-600">プランが見つかりません</p>
              <Button onClick={onBackToCreate} className="bg-gradient-to-r from-sky-500 to-cyan-500 shadow-lg shadow-sky-500/25 transition-all hover:shadow-xl hover:shadow-sky-500/30">
                <ArrowLeft className="mr-2 size-4" />
                プラン作成へ戻る
              </Button>
            </div>
          </Card>
        </main>
      </div>
    );
  }

  const currentDay = days[activeDay];
  const hasMultipleDays = days.length > 1;

  return (
    <div className="min-h-screen bg-gradient-to-b from-sky-50 via-white to-amber-50/30">
      {/* Background decorations */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute -right-40 top-20 size-80 rounded-full bg-gradient-to-br from-sky-200/30 to-cyan-200/30 blur-3xl" />
        <div className="absolute -left-40 top-1/3 size-80 rounded-full bg-gradient-to-br from-amber-200/20 to-orange-200/20 blur-3xl" />
      </div>

      <main className="relative mx-auto max-w-3xl px-4 py-8 md:py-12">
        <section className="space-y-6">
          {/* Back Button */}
          <Button 
            variant="ghost" 
            onClick={onBackToCreate} 
            className="group text-sky-700 transition-all hover:bg-sky-50 hover:text-sky-900"
          >
            <ArrowLeft className="mr-2 size-4 transition-transform group-hover:-translate-x-1" />
            戻る
          </Button>

          {/* Summary Card */}
          <Card className={`relative overflow-hidden border-0 p-4 text-white shadow-2xl sm:p-6 ${summary.isFeasible ? 'bg-gradient-to-br from-sky-500 via-sky-500 to-cyan-500' : 'bg-gradient-to-br from-amber-500 via-amber-500 to-orange-500'}`}>
            {/* Decorative elements */}
            <div className="absolute -right-10 -top-10 size-40 rounded-full bg-white/10 blur-2xl" />
            <div className="absolute -bottom-10 -left-10 size-40 rounded-full bg-white/10 blur-2xl" />
            
            <div className="relative">
              <div className="mb-3 flex items-start gap-2 sm:mb-4 sm:gap-3">
                <div className={`flex size-10 items-center justify-center rounded-xl ${summary.isFeasible ? 'bg-white/20' : 'bg-white/20'}`}>
                  {summary.isFeasible ? (
                    <CheckCircle className="size-5 sm:size-6" />
                  ) : (
                    <AlertTriangle className="size-5 sm:size-6" />
                  )}
                </div>
                <div>
                  <h4 className="text-lg font-bold sm:text-xl">{summary.title}</h4>
                  <div className="mt-1 flex items-center gap-1.5">
                    <Sparkles className="size-3" />
                    <span className="text-xs text-white/80">AIが生成したプラン</span>
                  </div>
                </div>
              </div>
              
              {/* Feasibility Summary */}
              <p className="mb-4 rounded-xl bg-white/15 p-3 text-xs leading-relaxed backdrop-blur-sm sm:p-4 sm:text-sm">
                {summary.feasibilitySummary}
              </p>

              <div className="grid gap-2 text-xs sm:grid-cols-2 sm:gap-3 sm:text-sm">
                <div className="flex items-center gap-2 rounded-lg bg-white/10 p-2">
                  <Calendar className="size-4 shrink-0" />
                  <span className="truncate">{summary.startDate} 〜 {summary.endDate}（{summary.totalDays}日間）</span>
                </div>
                <div className="flex items-center gap-2 rounded-lg bg-white/10 p-2">
                  <MapPin className="size-4 shrink-0" />
                  <span className="truncate">出発：{summary.startTime} / {summary.startLocation}</span>
                </div>
                <div className="flex items-center gap-2 rounded-lg bg-white/10 p-2">
                  <Home className="size-4 shrink-0" />
                  <span className="truncate">宿泊：{summary.baseStay}</span>
                </div>
                <div className="flex items-center gap-2 rounded-lg bg-white/10 p-2">
                  <Clock className="size-4 shrink-0" />
                  <span>スポット数：{summary.spotCount}箇所</span>
                </div>
                {(summary.endLocation || summary.endTime) && (
                  <div className="flex items-center gap-2 rounded-lg bg-white/10 p-2">
                    <Flag className="size-4 shrink-0" />
                    <span className="truncate">
                      到着：{summary.endTime || '19:00'} / {summary.endLocation || summary.startLocation}
                    </span>
                  </div>
                )}
                <div className="flex items-center gap-2 rounded-lg bg-white/10 p-2">
                  {transportModeLabels[summary.transportMode].icon}
                  <span>{transportModeLabels[summary.transportMode].label}</span>
                  <span className="text-white/50">・</span>
                  <Gauge className="size-3.5" />
                  <span>{paceLabels[summary.pace]}</span>
                </div>
              </div>
            </div>
          </Card>

          {/* Issues & Alternatives (Collapsible) */}
          {(issues.length > 0 || alternatives.length > 0) && (
            <Accordion type="single" collapsible className="space-y-3">
              {issues.length > 0 && (
                <AccordionItem value="issues" className="overflow-hidden rounded-2xl border-0 bg-gradient-to-br from-amber-50 to-orange-50 shadow-lg">
                  <AccordionTrigger className="px-4 py-4 hover:no-underline sm:px-6">
                    <div className="flex items-center gap-3">
                      <div className="flex size-10 items-center justify-center rounded-xl bg-gradient-to-br from-amber-400 to-orange-400 text-white shadow-lg shadow-amber-400/30">
                        <AlertTriangle className="size-5" />
                      </div>
                      <div className="text-left">
                        <h3 className="font-bold text-amber-800">注意点・問題点</h3>
                        <p className="text-xs text-amber-600">{issues.length}件の注意事項があります</p>
                      </div>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="px-4 pb-4 sm:px-6 sm:pb-6">
                    <div className="space-y-3">
                      {issues.map((issue, index) => (
                        <IssueCard key={index} issue={issue} />
                      ))}
                    </div>
                  </AccordionContent>
                </AccordionItem>
              )}

              {alternatives.length > 0 && (
                <AccordionItem value="alternatives" className="overflow-hidden rounded-2xl border-0 bg-gradient-to-br from-sky-50 to-cyan-50 shadow-lg">
                  <AccordionTrigger className="px-4 py-4 hover:no-underline sm:px-6">
                    <div className="flex items-center gap-3">
                      <div className="flex size-10 items-center justify-center rounded-xl bg-gradient-to-br from-sky-400 to-cyan-400 text-white shadow-lg shadow-sky-400/30">
                        <Lightbulb className="size-5" />
                      </div>
                      <div className="text-left">
                        <h3 className="font-bold text-sky-800">代替案・提案</h3>
                        <p className="text-xs text-sky-600">{alternatives.length}件の提案があります</p>
                      </div>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="px-4 pb-4 sm:px-6 sm:pb-6">
                    <div className="space-y-3">
                      {alternatives.map((alt) => (
                        <AlternativeCard key={alt.id} alternative={alt} />
                      ))}
                    </div>
                  </AccordionContent>
                </AccordionItem>
              )}
            </Accordion>
          )}

          {/* Day Tabs (for multiple days) */}
          {hasMultipleDays && (
            <div className="flex items-center justify-between gap-2 rounded-2xl bg-white/80 p-2 shadow-lg backdrop-blur-sm">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setActiveDay(prev => Math.max(0, prev - 1))}
                disabled={activeDay === 0}
                className="shrink-0 disabled:opacity-30"
              >
                <ChevronLeft className="size-5" />
              </Button>
              
              <div className="flex flex-1 justify-center gap-1 overflow-x-auto sm:gap-2">
                {days.map((day, index) => (
                  <button
                    key={day.dayNumber}
                    onClick={() => setActiveDay(index)}
                    className={`flex min-w-[60px] flex-col items-center rounded-xl px-3 py-2 text-xs transition-all sm:min-w-[80px] sm:px-4 sm:text-sm ${
                      activeDay === index 
                        ? 'bg-gradient-to-br from-sky-500 to-cyan-500 text-white shadow-lg shadow-sky-500/30' 
                        : 'bg-slate-50 text-slate-600 hover:bg-slate-100'
                    }`}
                  >
                    <span className="font-bold">Day {day.dayNumber}</span>
                    <span className={`mt-0.5 text-[10px] ${activeDay === index ? 'text-white/80' : 'text-slate-400'}`}>
                      {day.date.split('/').slice(1).join('/')}
                    </span>
                  </button>
                ))}
              </div>
              
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setActiveDay(prev => Math.min(days.length - 1, prev + 1))}
                disabled={activeDay === days.length - 1}
                className="shrink-0 disabled:opacity-30"
              >
                <ChevronRight className="size-5" />
              </Button>
            </div>
          )}

          {/* Day Plan (Single Day View with Tabs) */}
          {currentDay && (
            <DayPlan 
              key={currentDay.dayNumber} 
              day={currentDay} 
              isLastDay={activeDay === days.length - 1}
              showHeader={!hasMultipleDays}
            />
          )}

          {/* Day Navigation Hint (for mobile) */}
          {hasMultipleDays && (
            <p className="text-center text-xs text-slate-400 sm:hidden">
              ← 左右にスワイプして日程を切り替え →
            </p>
          )}

          {/* Actions */}
          <Card className="overflow-hidden border-0 bg-white/80 p-4 shadow-xl backdrop-blur-sm sm:p-6">
            <div className="flex flex-col gap-3 sm:flex-row sm:justify-center sm:gap-4">
              <Button 
                variant="outline" 
                onClick={onBackToCreate} 
                className="group w-full border-slate-200 hover:border-sky-300 hover:bg-sky-50 sm:w-auto"
              >
                <ArrowLeft className="mr-2 size-4 transition-transform group-hover:-translate-x-1" />
                条件を変更
              </Button>
              <Button 
                variant="outline" 
                onClick={onSharePlan} 
                className={`w-full transition-all sm:w-auto ${
                  isShareCopied 
                    ? 'border-emerald-400 bg-emerald-50 text-emerald-600' 
                    : 'border-slate-200 hover:border-sky-300 hover:bg-sky-50'
                }`}
              >
                {isShareCopied ? (
                  <>
                    <Check className="mr-2 size-4" />
                    コピーしました！
                  </>
                ) : (
                  <>
                    <Share2 className="mr-2 size-4" />
                    共有リンクをコピー
                  </>
                )}
              </Button>
              <Button 
                onClick={onCreateNew} 
                className="w-full bg-gradient-to-r from-sky-500 to-cyan-500 shadow-lg shadow-sky-500/25 transition-all hover:shadow-xl hover:shadow-sky-500/30 sm:w-auto"
              >
                <Plus className="mr-2 size-4" />
                新しいプランを作成
              </Button>
            </div>
          </Card>
        </section>
      </main>
    </div>
  )
}

// Day Plan Component
function DayPlan({ day, showHeader = true }: { day: TripPlanDay; isLastDay: boolean; showHeader?: boolean }) {
  return (
    <Card className="overflow-hidden border-0 bg-white/80 shadow-xl backdrop-blur-sm">
      {/* Day Header */}
      {showHeader && (
        <div className="border-b border-slate-100 bg-gradient-to-r from-sky-50 to-cyan-50 p-4 sm:p-6">
          <div className="flex items-center gap-3">
            <div className="flex size-12 items-center justify-center rounded-2xl bg-gradient-to-br from-sky-500 to-cyan-500 text-sm font-bold text-white shadow-lg shadow-sky-500/30 sm:size-14 sm:text-base">
              Day {day.dayNumber}
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900 sm:text-lg">{day.date}</h3>
              <p className="flex items-center gap-1.5 text-xs text-sky-600 sm:text-sm">
                <Sparkles className="size-3" />
                {day.theme}
              </p>
            </div>
          </div>
        </div>
      )}
      
      {/* Day Content (for tabbed view without header) */}
      {!showHeader && (
        <div className="border-b border-slate-100 bg-gradient-to-r from-sky-50 to-cyan-50 p-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-bold text-slate-900">{day.date}</h3>
              <p className="flex items-center gap-1.5 text-xs text-sky-600">
                <Sparkles className="size-3" />
                {day.theme}
              </p>
            </div>
            <div className="rounded-full bg-sky-100 px-3 py-1 text-xs font-medium text-sky-700">
              {day.items.length}スポット
            </div>
          </div>
        </div>
      )}

      {/* Timeline */}
      <div className="p-4 sm:p-6 md:p-8">
        <div className="space-y-0">
          {day.items.map((item, index) => (
            <TimelineItem 
              key={`${day.dayNumber}-${index}`} 
              item={item} 
              isLast={index === day.items.length - 1} 
            />
          ))}
        </div>
      </div>
    </Card>
  )
}

// Timeline Item Component
function TimelineItem({ item, isLast }: { item: TripPlanItem; isLast: boolean }) {
  const getTypeIcon = (type: TripPlanItem['type']) => {
    switch (type) {
      case 'spot':
        return <MapPin className="size-4" />;
      case 'meal':
        return <Utensils className="size-4" />;
      case 'hotel':
        return <Building className="size-4" />;
      case 'travel':
        return <Car className="size-4" />;
      default:
        return <MapPin className="size-4" />;
    }
  };

  const getTypeStyle = (type: TripPlanItem['type']) => {
    switch (type) {
      case 'spot':
        return {
          bg: 'bg-gradient-to-br from-sky-400 to-sky-500',
          ring: 'ring-sky-100',
          shadow: 'shadow-sky-400/30',
          badge: 'bg-sky-100 text-sky-700'
        };
      case 'meal':
        return {
          bg: 'bg-gradient-to-br from-amber-400 to-orange-400',
          ring: 'ring-amber-100',
          shadow: 'shadow-amber-400/30',
          badge: 'bg-amber-100 text-amber-700'
        };
      case 'hotel':
        return {
          bg: 'bg-gradient-to-br from-purple-400 to-purple-500',
          ring: 'ring-purple-100',
          shadow: 'shadow-purple-400/30',
          badge: 'bg-purple-100 text-purple-700'
        };
      case 'travel':
        return {
          bg: 'bg-gradient-to-br from-slate-400 to-slate-500',
          ring: 'ring-slate-100',
          shadow: 'shadow-slate-400/30',
          badge: 'bg-slate-100 text-slate-600'
        };
      default:
        return {
          bg: 'bg-gradient-to-br from-sky-400 to-sky-500',
          ring: 'ring-sky-100',
          shadow: 'shadow-sky-400/30',
          badge: 'bg-sky-100 text-sky-700'
        };
    }
  };

  const getTypeLabel = (type: TripPlanItem['type']) => {
    switch (type) {
      case 'spot':
        return '観光';
      case 'meal':
        return '食事';
      case 'hotel':
        return '宿泊';
      case 'travel':
        return '移動';
      default:
        return '';
    }
  };

  const style = getTypeStyle(item.type);

  return (
    <div className="group flex gap-3 sm:gap-4 md:gap-6">
      {/* Time */}
      <div className="w-14 shrink-0 pt-1 text-right sm:w-20">
        <span className="text-xs font-bold text-sky-700 sm:text-sm">{item.startTime}</span>
        <span className="block text-[10px] text-slate-400 sm:text-xs">〜 {item.endTime}</span>
      </div>

      {/* Timeline Line */}
      <div className="relative flex flex-col items-center">
        <div className={`flex size-7 items-center justify-center rounded-full text-white ring-4 shadow-lg transition-transform group-hover:scale-110 sm:size-8 ${style.bg} ${style.ring} ${style.shadow}`}>
          <span className="scale-75 sm:scale-90">{getTypeIcon(item.type)}</span>
        </div>
        {!isLast && (
          <div className="relative w-0.5 flex-1 bg-gradient-to-b from-slate-200 to-slate-100">
            <div className="absolute inset-0 bg-gradient-to-b from-sky-200/50 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
          </div>
        )}
      </div>

      {/* Content */}
      <div className={`min-w-0 flex-1 ${!isLast ? 'pb-6 sm:pb-8' : 'pb-2'}`}>
        <div className="rounded-xl bg-slate-50/80 p-3 transition-all group-hover:bg-slate-50 group-hover:shadow-md sm:p-4">
          <div className="mb-2 flex flex-wrap items-center gap-2">
            <h5 className="text-sm font-bold text-slate-900 sm:text-base">{item.name}</h5>
            <span className={`rounded-full px-2 py-0.5 text-[10px] font-medium sm:text-xs ${style.badge}`}>
              {getTypeLabel(item.type)}
            </span>
          </div>
          {item.stayMinutes > 0 && (
            <p className="mb-1.5 flex items-center gap-1 text-xs font-medium text-slate-500 sm:text-sm">
              <Clock className="size-3" />
              {item.stayMinutes}分
            </p>
          )}
          {item.detail && (
            <p className="text-xs leading-relaxed text-slate-600 sm:text-sm">{item.detail}</p>
          )}
        </div>
      </div>
    </div>
  )
}

// Issue Card Component
function IssueCard({ issue }: { issue: TripPlanIssue }) {
  const getSeverityStyle = (severity: TripPlanIssue['severity']) => {
    switch (severity) {
      case 'critical':
        return {
          border: 'border-red-200',
          bg: 'bg-gradient-to-br from-red-50 to-rose-50',
          icon: 'bg-gradient-to-br from-red-400 to-rose-400 shadow-red-400/30'
        };
      case 'warning':
        return {
          border: 'border-amber-200',
          bg: 'bg-gradient-to-br from-amber-50 to-orange-50',
          icon: 'bg-gradient-to-br from-amber-400 to-orange-400 shadow-amber-400/30'
        };
      case 'info':
        return {
          border: 'border-blue-200',
          bg: 'bg-gradient-to-br from-blue-50 to-sky-50',
          icon: 'bg-gradient-to-br from-blue-400 to-sky-400 shadow-blue-400/30'
        };
      default:
        return {
          border: 'border-slate-200',
          bg: 'bg-slate-50',
          icon: 'bg-slate-400 shadow-slate-400/30'
        };
    }
  };

  const getSeverityIcon = (severity: TripPlanIssue['severity']) => {
    switch (severity) {
      case 'critical':
        return <XCircle className="size-4 text-white" />;
      case 'warning':
        return <AlertTriangle className="size-4 text-white" />;
      case 'info':
        return <Lightbulb className="size-4 text-white" />;
      default:
        return null;
    }
  };

  const getTypeLabel = (type: TripPlanIssue['type']) => {
    switch (type) {
      case 'time':
        return '時間';
      case 'distance':
        return '距離';
      case 'constraint':
        return '制約';
      case 'capacity':
        return '容量';
      default:
        return type;
    }
  };

  const style = getSeverityStyle(issue.severity);

  return (
    <div className={`rounded-xl border p-4 ${style.border} ${style.bg}`}>
      <div className="mb-2 flex items-center gap-3">
        <div className={`flex size-8 items-center justify-center rounded-lg shadow-lg ${style.icon}`}>
          {getSeverityIcon(issue.severity)}
        </div>
        <span className="rounded-full bg-white/60 px-2 py-0.5 text-xs font-medium text-slate-600">
          {getTypeLabel(issue.type)}
        </span>
      </div>
      <p className="text-sm leading-relaxed text-slate-700">{issue.description}</p>
      {issue.affectedSpots.length > 0 && (
        <div className="mt-3 flex flex-wrap gap-1.5">
          {issue.affectedSpots.map((spot, index) => (
            <span key={index} className="rounded-full bg-white/80 px-2.5 py-1 text-xs font-medium text-slate-600 shadow-sm">
              {spot}
            </span>
          ))}
        </div>
      )}
    </div>
  )
}

// Alternative Card Component
function AlternativeCard({ alternative }: { alternative: TripPlanAlternative }) {
  return (
    <div className="overflow-hidden rounded-xl border border-sky-200 bg-white shadow-sm transition-all hover:shadow-md">
      <div className="border-b border-sky-100 bg-gradient-to-r from-sky-50 to-cyan-50 p-3">
        <h4 className="flex items-center gap-2 font-bold text-sky-800">
          <Sparkles className="size-4" />
          {alternative.title}
        </h4>
      </div>
      <div className="p-4">
        <p className="mb-3 text-sm leading-relaxed text-slate-600">{alternative.description}</p>
        {alternative.changes.length > 0 && (
          <ul className="space-y-2">
            {alternative.changes.map((change, index) => (
              <li key={index} className="flex items-start gap-2 text-sm text-slate-600">
                <CheckCircle className="mt-0.5 size-4 shrink-0 text-emerald-500" />
                <span>{change}</span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  )
}

export default PlanDetailPresentation