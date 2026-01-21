"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { MapPin, Utensils, Car, Building, CheckCircle, Calendar, Home, Clock, Flag, Gauge, Train, Footprints, Eye, ChevronLeft, ChevronRight } from "lucide-react";
import { SAMPLE_PLAN_SUMMARY, SAMPLE_PLAN_DAYS } from "./constants";

// 交通手段の表示ラベル
const transportModeLabels = {
  car: { label: '車', icon: <Car className="size-3.5" /> },
  transit: { label: '公共交通', icon: <Train className="size-3.5" /> },
  walk: { label: '徒歩', icon: <Footprints className="size-3.5" /> },
};

// ペースの表示ラベル
const paceLabels = {
  relaxed: 'ゆったり',
  normal: 'ふつう',
  packed: 'ぎゅっと',
};

// タイムラインアイテムのアイコンを取得
const getTypeIcon = (type: "travel" | "spot" | "meal" | "hotel") => {
  switch (type) {
    case "travel":
      return <Car className="size-4" />;
    case "spot":
      return <MapPin className="size-4" />;
    case "meal":
      return <Utensils className="size-4" />;
    case "hotel":
      return <Building className="size-4" />;
  }
};

// タイムラインアイテムの色を取得
const getTypeColor = (type: "travel" | "spot" | "meal" | "hotel") => {
  switch (type) {
    case "travel":
      return "bg-slate-400 ring-slate-100";
    case "spot":
      return "bg-sky-500 ring-sky-100";
    case "meal":
      return "bg-amber-500 ring-amber-100";
    case "hotel":
      return "bg-purple-500 ring-purple-100";
  }
};

// タイムラインアイテムのラベルを取得
const getTypeLabel = (type: "travel" | "spot" | "meal" | "hotel") => {
  switch (type) {
    case "travel":
      return "移動";
    case "spot":
      return "観光";
    case "meal":
      return "食事";
    case "hotel":
      return "宿泊";
  }
};

// タイムラインアイテムのラベルスタイルを取得
const getTypeLabelStyle = (type: "travel" | "spot" | "meal" | "hotel") => {
  switch (type) {
    case "travel":
      return "bg-slate-100 text-slate-600";
    case "spot":
      return "bg-sky-100 text-sky-700";
    case "meal":
      return "bg-amber-100 text-amber-700";
    case "hotel":
      return "bg-purple-100 text-purple-700";
  }
};

export function SampleTabs() {
  const [activeDay, setActiveDay] = useState(0);
  const summary = SAMPLE_PLAN_SUMMARY;
  const days = SAMPLE_PLAN_DAYS;

  return (
    <section id="sample" className="py-16 md:py-24 scroll-mt-20 relative overflow-hidden">
      {/* 背景装飾 */}
      <div className="absolute inset-0 bg-gradient-to-b from-sky-50/50 to-amber-50/30" />
      <div className="absolute top-1/4 -left-20 w-80 h-80 bg-sky-200/20 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 -right-20 w-80 h-80 bg-amber-200/20 rounded-full blur-3xl" />
      
      <div className="mx-auto max-w-4xl px-4 relative">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-sky-100 text-sky-700 text-sm font-medium mb-4">
            <Eye className="size-4" />
            <span>出力サンプル</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-sky-900 mb-3">
            こんなプランが生成されます
          </h2>
          <p className="text-slate-600">
            実際に生成される旅行プランのイメージをご覧ください
          </p>
        </div>
        
        {/* Summary Card */}
        <div className="relative mb-8">
          <div className="absolute -inset-2 bg-gradient-to-r from-sky-400/20 to-cyan-400/20 rounded-3xl blur-xl" />
          <Card className="relative p-4 text-white shadow-xl sm:p-6 bg-gradient-to-br from-sky-500 to-cyan-500 rounded-2xl overflow-hidden">
            {/* 装飾パターン */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl" />
            
            <div className="relative">
              <div className="mb-3 flex items-start gap-2 sm:mb-4 sm:gap-3">
                <CheckCircle className="size-5 shrink-0 sm:size-6" />
                <h4 className="text-lg font-bold sm:text-xl">{summary.title}</h4>
              </div>
              
              <p className="mb-3 rounded-xl bg-white/20 backdrop-blur-sm p-2.5 text-xs sm:mb-4 sm:p-3 sm:text-sm">
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
                <div className="flex items-center gap-2">
                  <Flag className="size-3.5 shrink-0 sm:size-4" />
                  <span className="truncate">
                    到着：{summary.endTime} / {summary.endLocation}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  {transportModeLabels[summary.transportMode].icon}
                  <span>{transportModeLabels[summary.transportMode].label}</span>
                  <span className="text-white/60">・</span>
                  <Gauge className="size-3.5 shrink-0 sm:size-4" />
                  <span>{paceLabels[summary.pace]}</span>
                </div>
              </div>
            </div>
          </Card>
        </div>
        
        {/* Day タブ */}
        <div className="flex items-center justify-center gap-2 mb-6">
          <button
            onClick={() => setActiveDay(prev => Math.max(0, prev - 1))}
            disabled={activeDay === 0}
            className="p-2 rounded-lg hover:bg-slate-100 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
          >
            <ChevronLeft className="size-5 text-slate-600" />
          </button>
          
          <div className="flex gap-2">
            {days.map((day, index) => (
              <button
                key={index}
                onClick={() => setActiveDay(index)}
                className={`px-5 py-2.5 rounded-xl text-sm font-medium transition-all duration-300 ${
                  activeDay === index
                    ? "bg-sky-600 text-white shadow-lg scale-105"
                    : "bg-white text-slate-600 hover:bg-sky-50 border border-slate-200 hover:border-sky-200"
                }`}
              >
                Day {day.dayNumber}
              </button>
            ))}
          </div>
          
          <button
            onClick={() => setActiveDay(prev => Math.min(days.length - 1, prev + 1))}
            disabled={activeDay === days.length - 1}
            className="p-2 rounded-lg hover:bg-slate-100 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
          >
            <ChevronRight className="size-5 text-slate-600" />
          </button>
        </div>
        
        {/* Day Plan Card */}
        <Card className="bg-white/90 backdrop-blur-sm p-4 shadow-xl sm:p-6 md:p-8 rounded-2xl border-sky-100/50">
          {/* Day Header */}
          <div 
            key={activeDay}
            className="mb-4 border-b border-slate-200 pb-3 sm:mb-6 sm:pb-4 animate-in fade-in slide-in-from-right-4 duration-300"
          >
            <div className="flex items-center gap-2 sm:gap-3">
              <div className="flex size-10 items-center justify-center rounded-xl bg-gradient-to-br from-sky-500 to-sky-600 text-sm font-bold text-white shadow-md sm:size-12 sm:text-base">
                {days[activeDay].dayNumber}
              </div>
              <div>
                <h3 className="text-base font-bold text-slate-900 sm:text-lg">{days[activeDay].date}</h3>
                <p className="text-xs text-sky-600 font-medium sm:text-sm">{days[activeDay].theme}</p>
              </div>
            </div>
          </div>

          {/* Timeline */}
          <div 
            key={`timeline-${activeDay}`}
            className="space-y-4 sm:space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-500"
          >
            {days[activeDay].items.map((item, index) => (
              <div key={`${days[activeDay].dayNumber}-${index}`} className="flex gap-2 sm:gap-4 md:gap-6 group">
                {/* Time */}
                <div className="w-14 shrink-0 pt-1 text-right sm:w-20">
                  <span className="text-xs font-bold text-sky-700 sm:text-sm">{item.startTime}</span>
                  <span className="block text-[10px] text-slate-400 sm:text-xs">〜 {item.endTime}</span>
                </div>

                {/* Timeline Line */}
                <div className="relative flex flex-col items-center">
                  <div className={`flex size-5 items-center justify-center rounded-full text-white ring-2 sm:size-6 sm:ring-4 transition-transform group-hover:scale-110 ${getTypeColor(item.type)}`}>
                    <span className="scale-75 sm:scale-100">{getTypeIcon(item.type)}</span>
                  </div>
                  {index !== days[activeDay].items.length - 1 && (
                    <div className="w-0.5 flex-1 bg-gradient-to-b from-slate-200 to-slate-100" />
                  )}
                </div>

                {/* Content */}
                <div className="min-w-0 flex-1 pb-4">
                  <div className="mb-1 flex flex-wrap items-center gap-1.5 sm:gap-2">
                    <h5 className="text-sm font-bold text-slate-900 sm:text-base group-hover:text-sky-700 transition-colors">{item.name}</h5>
                    <span className={`rounded-full px-1.5 py-0.5 text-[10px] font-medium sm:px-2 sm:text-xs ${getTypeLabelStyle(item.type)}`}>
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
            ))}
          </div>
        </Card>
        
        {/* 凡例 */}
        <div className="flex flex-wrap justify-center gap-4 mt-6 text-xs text-slate-500">
          <div className="flex items-center gap-1.5">
            <div className="flex size-5 items-center justify-center rounded-full bg-sky-500 text-white shadow-sm">
              <MapPin className="size-3" />
            </div>
            <span>観光スポット</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="flex size-5 items-center justify-center rounded-full bg-amber-500 text-white shadow-sm">
              <Utensils className="size-3" />
            </div>
            <span>食事</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="flex size-5 items-center justify-center rounded-full bg-slate-400 text-white shadow-sm">
              <Car className="size-3" />
            </div>
            <span>移動</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="flex size-5 items-center justify-center rounded-full bg-purple-500 text-white shadow-sm">
              <Building className="size-3" />
            </div>
            <span>宿泊</span>
          </div>
        </div>
      </div>
    </section>
  );
}
