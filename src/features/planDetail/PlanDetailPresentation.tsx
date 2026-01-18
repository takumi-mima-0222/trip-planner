"use client"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { MapPin, Clock, Calendar, Home, AlertTriangle, Lightbulb, CheckCircle, XCircle, ArrowLeft, Plus, Utensils, Car, Building } from 'lucide-react'
import { PlanSummaryProps, TripPlanDay, TripPlanItem, TripPlanIssue, TripPlanAlternative } from './planDetail.type'

export interface PlanDetailPresentationProps {
  summary: PlanSummaryProps | null;
  days: TripPlanDay[];
  issues: TripPlanIssue[];
  alternatives: TripPlanAlternative[];
  onBackToCreate: () => void;
  onCreateNew: () => void;
}

const PlanDetailPresentation = ({
  summary,
  days,
  issues,
  alternatives,
  onBackToCreate,
  onCreateNew,
}: PlanDetailPresentationProps) => {
  if (!summary) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-sky-50 to-amber-50/30">
        <main className="mx-auto max-w-3xl px-4 py-8 md:py-12">
          <Card className="bg-white p-8 text-center shadow-lg">
            <p className="mb-4 text-slate-600">プランが見つかりません</p>
            <Button onClick={onBackToCreate} className="bg-sky-600 hover:bg-sky-700">
              <ArrowLeft className="mr-2 size-4" />
              プラン作成へ戻る
            </Button>
          </Card>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-sky-50 to-amber-50/30">
      <main className="mx-auto max-w-3xl px-4 py-8 md:py-12">
        <section className="space-y-6">
          {/* Back Button */}
          <Button variant="ghost" onClick={onBackToCreate} className="text-sky-700 hover:text-sky-900">
            <ArrowLeft className="mr-2 size-4" />
            戻る
          </Button>

          {/* Summary Card */}
          <Card className={`p-4 text-white shadow-xl sm:p-6 ${summary.isFeasible ? 'bg-gradient-to-br from-sky-500 to-cyan-500' : 'bg-gradient-to-br from-amber-500 to-orange-500'}`}>
            <div className="mb-3 flex items-start gap-2 sm:mb-4 sm:gap-3">
              {summary.isFeasible ? (
                <CheckCircle className="size-5 shrink-0 sm:size-6" />
              ) : (
                <AlertTriangle className="size-5 shrink-0 sm:size-6" />
              )}
              <h4 className="text-lg font-bold sm:text-xl">{summary.title}</h4>
            </div>
            
            {/* Feasibility Summary */}
            <p className="mb-3 rounded-lg bg-white/20 p-2.5 text-xs sm:mb-4 sm:p-3 sm:text-sm">
              {summary.feasibilitySummary}
            </p>

            <div className="space-y-1.5 text-xs sm:grid sm:grid-cols-2 sm:gap-2 sm:space-y-0 sm:text-sm">
              <div className="flex items-center gap-2">
                <Calendar className="size-3.5 shrink-0 sm:size-4" />
                <span className="truncate">{summary.startDate} 〜 {summary.endDate}（{summary.totalDays}日間）</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="size-3.5 shrink-0 sm:size-4" />
                <span className="truncate">出発：{summary.startTime} / {summary.startLocation}</span>
              </div>
              <div className="flex items-center gap-2">
                <Home className="size-3.5 shrink-0 sm:size-4" />
                <span className="truncate">宿泊：{summary.baseStay}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="size-3.5 shrink-0 sm:size-4" />
                <span>スポット数：{summary.spotCount}</span>
              </div>
            </div>
          </Card>

          {/* Issues Section */}
          {issues.length > 0 && (
            <Card className="border-amber-200 bg-amber-50 p-6 shadow-lg">
              <h3 className="mb-4 flex items-center gap-2 text-lg font-bold text-amber-800">
                <AlertTriangle className="size-5" />
                注意点・問題点
              </h3>
              <div className="space-y-3">
                {issues.map((issue, index) => (
                  <IssueCard key={index} issue={issue} />
                ))}
              </div>
            </Card>
          )}

          {/* Alternatives Section */}
          {alternatives.length > 0 && (
            <Card className="border-sky-200 bg-sky-50 p-6 shadow-lg">
              <h3 className="mb-4 flex items-center gap-2 text-lg font-bold text-sky-800">
                <Lightbulb className="size-5" />
                代替案・提案
              </h3>
              <div className="space-y-3">
                {alternatives.map((alt) => (
                  <AlternativeCard key={alt.id} alternative={alt} />
                ))}
              </div>
            </Card>
          )}

          {/* Day Plans */}
          {days.map((day, index) => (
            <DayPlan key={day.dayNumber} day={day} isLastDay={index === days.length - 1} />
          ))}

          {/* Actions */}
          <div className="flex flex-col gap-3 pt-4 sm:flex-row sm:justify-center sm:gap-4">
            <Button variant="outline" onClick={onBackToCreate} className="w-full sm:w-auto">
              <ArrowLeft className="mr-2 size-4" />
              条件を変更
            </Button>
            <Button onClick={onCreateNew} className="w-full bg-sky-600 hover:bg-sky-700 sm:w-auto">
              <Plus className="mr-2 size-4" />
              新しいプランを作成
            </Button>
          </div>
        </section>
      </main>
    </div>
  )
}

// Day Plan Component
function DayPlan({ day }: { day: TripPlanDay; isLastDay: boolean }) {
  return (
    <Card className="bg-white p-4 shadow-lg sm:p-6 md:p-8">
      <div className="mb-4 border-b border-slate-200 pb-3 sm:mb-6 sm:pb-4">
        <div className="flex items-center gap-2 sm:gap-3">
          <div className="flex size-8 items-center justify-center rounded-full bg-sky-100 text-xs font-bold text-sky-700 sm:size-10 sm:text-sm">
            {day.dayNumber}
          </div>
          <div>
            <h3 className="text-base font-bold text-slate-900 sm:text-lg">{day.date}</h3>
            <p className="text-xs text-sky-600 sm:text-sm">{day.theme}</p>
          </div>
        </div>
      </div>
      <div className="space-y-4 sm:space-y-6">
        {day.items.map((item, index) => (
          <TimelineItem 
            key={`${day.dayNumber}-${index}`} 
            item={item} 
            isLast={index === day.items.length - 1} 
          />
        ))}
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

  const getTypeColor = (type: TripPlanItem['type']) => {
    switch (type) {
      case 'spot':
        return 'bg-sky-500 ring-sky-100';
      case 'meal':
        return 'bg-amber-500 ring-amber-100';
      case 'hotel':
        return 'bg-purple-500 ring-purple-100';
      case 'travel':
        return 'bg-slate-400 ring-slate-100';
      default:
        return 'bg-sky-500 ring-sky-100';
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

  return (
    <div className="flex gap-2 sm:gap-4 md:gap-6">
      {/* Time */}
      <div className="w-14 shrink-0 pt-1 text-right sm:w-20">
        <span className="text-xs font-bold text-sky-700 sm:text-sm">{item.startTime}</span>
        <span className="block text-[10px] text-slate-400 sm:text-xs">〜 {item.endTime}</span>
      </div>

      {/* Timeline Line */}
      <div className="relative flex flex-col items-center">
        <div className={`flex size-5 items-center justify-center rounded-full text-white ring-2 sm:size-6 sm:ring-4 ${getTypeColor(item.type)}`}>
          <span className="scale-75 sm:scale-100">{getTypeIcon(item.type)}</span>
        </div>
        {!isLast && <div className="w-0.5 flex-1 bg-slate-200" />}
      </div>

      {/* Content */}
      <div className="min-w-0 flex-1 pb-4">
        <div className="mb-1 flex flex-wrap items-center gap-1.5 sm:gap-2">
          <h5 className="text-sm font-bold text-slate-900 sm:text-base">{item.name}</h5>
          <span className={`rounded-full px-1.5 py-0.5 text-[10px] font-medium sm:px-2 sm:text-xs ${
            item.type === 'spot' ? 'bg-sky-100 text-sky-700' :
            item.type === 'meal' ? 'bg-amber-100 text-amber-700' :
            item.type === 'hotel' ? 'bg-purple-100 text-purple-700' :
            'bg-slate-100 text-slate-600'
          }`}>
            {getTypeLabel(item.type)}
          </span>
        </div>
        {item.stayMinutes > 0 && (
          <p className="mb-1 text-xs font-medium text-slate-500 sm:text-sm">
            {item.stayMinutes}分
          </p>
        )}
        {item.detail && (
          <p className="text-xs leading-relaxed text-slate-600 sm:text-sm">{item.detail}</p>
        )}
      </div>
    </div>
  )
}

// Issue Card Component
function IssueCard({ issue }: { issue: TripPlanIssue }) {
  const getSeverityStyle = (severity: TripPlanIssue['severity']) => {
    switch (severity) {
      case 'critical':
        return 'border-red-300 bg-red-50';
      case 'warning':
        return 'border-amber-300 bg-amber-50';
      case 'info':
        return 'border-blue-300 bg-blue-50';
      default:
        return 'border-slate-300 bg-slate-50';
    }
  };

  const getSeverityIcon = (severity: TripPlanIssue['severity']) => {
    switch (severity) {
      case 'critical':
        return <XCircle className="size-5 text-red-600" />;
      case 'warning':
        return <AlertTriangle className="size-5 text-amber-600" />;
      case 'info':
        return <Lightbulb className="size-5 text-blue-600" />;
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

  return (
    <div className={`rounded-lg border p-4 ${getSeverityStyle(issue.severity)}`}>
      <div className="mb-2 flex items-center gap-2">
        {getSeverityIcon(issue.severity)}
        <span className="text-xs font-medium text-slate-500">{getTypeLabel(issue.type)}</span>
      </div>
      <p className="text-sm text-slate-700">{issue.description}</p>
      {issue.affectedSpots.length > 0 && (
        <div className="mt-2 flex flex-wrap gap-1">
          {issue.affectedSpots.map((spot, index) => (
            <span key={index} className="rounded bg-white/50 px-2 py-0.5 text-xs text-slate-600">
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
    <div className="rounded-lg border border-sky-200 bg-white p-4">
      <h4 className="mb-2 font-bold text-sky-800">{alternative.title}</h4>
      <p className="mb-3 text-sm text-slate-600">{alternative.description}</p>
      {alternative.changes.length > 0 && (
        <ul className="space-y-1">
          {alternative.changes.map((change, index) => (
            <li key={index} className="flex items-start gap-2 text-sm text-slate-600">
              <CheckCircle className="mt-0.5 size-4 shrink-0 text-sky-500" />
              {change}
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default PlanDetailPresentation