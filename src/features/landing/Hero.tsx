"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Check, MapPin, Utensils, Car, Building, ArrowRight, Play, ChevronLeft, ChevronRight, Sparkles, Route, Clock, Plane, Heart } from "lucide-react";
import { HERO_CONTENT, SAMPLE_PLAN_DAYS, SAMPLE_PLAN_SUMMARY } from "./constants";

// ターゲットユーザーデータ（アイコン付き）
const TARGET_AUDIENCE_WITH_ICONS = [
  { text: "行きたい場所はあるが、順番が決められない", icon: Route },
  { text: "2泊3日〜で時間配分が不安", icon: Clock },
  { text: "最終日に空港や駅へ間に合うか気になる", icon: Plane },
  { text: "詰め込みすぎず、でも満足したい", icon: Heart },
];
import { DemoDialog } from "./components/DemoDialog";

// タイムラインアイテムのアイコンを取得
const getTypeIcon = (type: "travel" | "spot" | "meal" | "hotel") => {
  switch (type) {
    case "travel":
      return <Car className="size-3.5" />;
    case "spot":
      return <MapPin className="size-3.5" />;
    case "meal":
      return <Utensils className="size-3.5" />;
    case "hotel":
      return <Building className="size-3.5" />;
  }
};

// タイムラインアイテムの色を取得
const getTypeColor = (type: "travel" | "spot" | "meal" | "hotel") => {
  switch (type) {
    case "travel":
      return "bg-slate-400";
    case "spot":
      return "bg-sky-500";
    case "meal":
      return "bg-amber-500";
    case "hotel":
      return "bg-purple-500";
  }
};

export function Hero() {
  const [isDemoOpen, setIsDemoOpen] = useState(false);
  const [activeDay, setActiveDay] = useState(0);
  const sampleDay = SAMPLE_PLAN_DAYS[activeDay];

  return (
    <section className="min-h-[calc(100vh-64px)] flex items-center py-8 md:py-12">
      <div className="mx-auto max-w-7xl px-4 w-full">
        <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
          {/* Left: キャッチコピー + 対象者 + CTA */}
          <div className="order-1 md:order-1">
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold leading-tight mb-4">
              {HERO_CONTENT.headline.split('。').filter(Boolean).map((sentence, index, arr) => (
                <span key={index} className="block">
                  <span className="bg-gradient-to-r from-sky-600 via-sky-500 to-amber-500 bg-clip-text text-transparent">
                    {sentence}{index < arr.length - 1 ? '。' : ''}
                  </span>
                </span>
              ))}
            </h1>
            <p className="text-slate-600 text-sm sm:text-base mb-6">
              {HERO_CONTENT.subText.split('。').filter(Boolean).map((sentence, index, arr) => (
                <span key={index} className="block">
                  {sentence}{index < arr.length - 1 ? '。' : ''}
                </span>
              ))}
            </p>

            {/* こんな人向けチェックリスト */}
            <div className="mb-8 rounded-2xl border border-sky-100/80 bg-gradient-to-br from-white/80 to-sky-50/50 p-5 shadow-sm backdrop-blur-sm">
              <div className="inline-flex items-center gap-2 mb-4">
                <div className="flex size-6 items-center justify-center rounded-full bg-gradient-to-br from-sky-500 to-cyan-500 shadow-sm shadow-sky-500/30">
                  <Check className="size-3.5 text-white" />
                </div>
                <span className="text-sm font-semibold text-slate-800">こんな人におすすめ</span>
              </div>
              <ul className="space-y-3">
                {TARGET_AUDIENCE_WITH_ICONS.map((item, index) => (
                  <li 
                    key={index} 
                    className="group flex items-center gap-3 text-sm text-slate-700"
                  >
                    <div className="flex size-7 shrink-0 items-center justify-center rounded-lg bg-sky-100/80 text-sky-500 group-hover:bg-sky-500 group-hover:text-white transition-all duration-200">
                      <item.icon className="size-4" />
                    </div>
                    <span className="group-hover:text-slate-900 transition-colors">
                      {item.text}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            {/* CTA */}
            <div className="flex flex-col sm:flex-row gap-3">
              <Button asChild size="lg" className="text-base h-12 px-8 bg-sky-600 hover:bg-sky-700">
                <Link href="/create">
                  無料で始める
                  <ArrowRight className="size-4" />
                </Link>
              </Button>
              <Button 
                variant="outline" 
                size="lg" 
                className="text-base h-12 px-6 border-sky-200 hover:bg-sky-50"
                onClick={() => setIsDemoOpen(true)}
              >
                デモを見る
                <Play className="size-4" />
              </Button>
            </div>

            {/* Demo Dialog */}
            <DemoDialog open={isDemoOpen} onOpenChange={setIsDemoOpen} />
          </div>

          {/* Right: 生成物サンプル */}
          <div className="order-2 md:order-2">
            <div className="relative">
              {/* 背景のグロー効果 */}
              <div className="absolute -inset-4 bg-gradient-to-r from-sky-200/30 via-amber-200/20 to-sky-200/30 rounded-3xl blur-2xl opacity-60" />
              
              <Card className="relative p-0 overflow-hidden shadow-xl border-sky-100/50 bg-white/80 backdrop-blur-sm rounded-2xl">
                {/* ヘッダー */}
                <div className="bg-gradient-to-r from-sky-600 to-sky-500 px-4 py-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Sparkles className="size-4 text-amber-300" />
                      <span className="text-white text-sm font-medium">あなたの旅がこうなります</span>
                    </div>
                    <span className="text-sky-100 text-xs">{SAMPLE_PLAN_SUMMARY.title}</span>
                  </div>
                </div>

                {/* Day切り替えタブ */}
                <div className="flex items-center justify-between px-4 py-2 bg-slate-50/80 border-b border-slate-100">
                  <div className="flex gap-1">
                    {SAMPLE_PLAN_DAYS.map((day, index) => (
                      <button
                        key={index}
                        onClick={() => setActiveDay(index)}
                        className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-300 ${
                          activeDay === index
                            ? "bg-sky-600 text-white shadow-md scale-105"
                            : "bg-white text-slate-600 hover:bg-sky-50 border border-slate-200"
                        }`}
                      >
                        Day {day.dayNumber}
                      </button>
                    ))}
                  </div>
                  <div className="flex gap-1">
                    <button
                      onClick={() => setActiveDay(prev => Math.max(0, prev - 1))}
                      disabled={activeDay === 0}
                      className="p-1 rounded-md hover:bg-slate-200 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                    >
                      <ChevronLeft className="size-4 text-slate-600" />
                    </button>
                    <button
                      onClick={() => setActiveDay(prev => Math.min(SAMPLE_PLAN_DAYS.length - 1, prev + 1))}
                      disabled={activeDay === SAMPLE_PLAN_DAYS.length - 1}
                      className="p-1 rounded-md hover:bg-slate-200 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                    >
                      <ChevronRight className="size-4 text-slate-600" />
                    </button>
                  </div>
                </div>
                
                {/* Day情報 */}
                <div className="px-4 pt-3 pb-2">
                  <div 
                    key={activeDay}
                    className="flex items-center gap-3 animate-in fade-in slide-in-from-right-4 duration-300"
                  >
                    <div className="flex size-10 items-center justify-center rounded-xl bg-gradient-to-br from-sky-500 to-sky-600 text-sm font-bold text-white shadow-md">
                      {sampleDay.dayNumber}
                    </div>
                    <div className="flex-1">
                      <span className="text-sm font-semibold text-slate-800">{sampleDay.date}</span>
                      <span className="block text-xs text-sky-600 font-medium">{sampleDay.theme}</span>
                    </div>
                  </div>
                </div>

                {/* タイムライン */}
                <div className="px-4 py-3 max-h-[280px] md:max-h-[320px] overflow-y-auto">
                  <div 
                    key={`timeline-${activeDay}`}
                    className="space-y-2.5 animate-in fade-in slide-in-from-bottom-2 duration-500"
                  >
                    {sampleDay.items.map((item, index) => (
                      <div 
                        key={index} 
                        className="flex gap-2.5 group"
                        style={{ animationDelay: `${index * 50}ms` }}
                      >
                        {/* Time */}
                        <div className="w-12 shrink-0 pt-1 text-right">
                          <span className="text-xs font-bold text-sky-700 tabular-nums">{item.startTime}</span>
                        </div>

                        {/* Timeline Line */}
                        <div className="relative flex flex-col items-center">
                          <div className={`flex size-5 items-center justify-center rounded-full text-white shadow-sm transition-transform group-hover:scale-110 ${getTypeColor(item.type)}`}>
                            {getTypeIcon(item.type)}
                          </div>
                          {index !== sampleDay.items.length - 1 && (
                            <div className="w-0.5 flex-1 bg-gradient-to-b from-slate-200 to-slate-100" />
                          )}
                        </div>

                        {/* Content */}
                        <div className="min-w-0 flex-1 pb-2 pt-0.5">
                          <h5 className="text-sm font-medium text-slate-800 truncate group-hover:text-sky-700 transition-colors">
                            {item.name}
                          </h5>
                          {item.stayMinutes > 0 && (
                            <p className="text-xs text-slate-500">{item.stayMinutes}分</p>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* フッター */}
                <div className="px-4 py-2.5 bg-gradient-to-r from-amber-50 to-sky-50 border-t border-slate-100">
                  <p className="text-xs text-slate-600 text-center">
                    <span className="font-medium text-sky-700">30秒</span>で、あなただけの旅程が完成します
                  </p>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
