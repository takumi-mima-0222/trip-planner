import { Card } from "@/components/ui/card";
import { Route, Clock, Sliders, Sparkles } from "lucide-react";
import { FEATURES } from "./constants";

// アイコンの取得
const getIcon = (iconName: "Route" | "Clock" | "Sliders") => {
  switch (iconName) {
    case "Route":
      return <Route className="size-6" />;
    case "Clock":
      return <Clock className="size-6" />;
    case "Sliders":
      return <Sliders className="size-6" />;
  }
};

// カラーグラデーション
const getGradient = (index: number) => {
  const gradients = [
    "from-sky-500 to-cyan-500",
    "from-amber-500 to-orange-500",
    "from-purple-500 to-pink-500",
  ];
  return gradients[index % gradients.length];
};

export function Features() {
  return (
    <section className="py-16 md:py-24 relative overflow-hidden">
      {/* 背景装飾 */}
      <div className="absolute top-0 left-1/4 w-72 h-72 bg-sky-200/30 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-1/4 w-72 h-72 bg-amber-200/30 rounded-full blur-3xl" />
      
      <div className="mx-auto max-w-7xl px-4 relative">
        <div className="text-center mb-12 md:mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-sky-100 text-sky-700 text-sm font-medium mb-4">
            <Sparkles className="size-4" />
            <span>なぜ、たびくみ？</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-sky-900 mb-3">
            旅行計画の面倒を解決する3つの特徴
          </h2>
          <p className="text-slate-600 max-w-2xl mx-auto">
            移動時間の計算、スケジュール調整、帰りの時間...全部AIにおまかせ
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-6 md:gap-8">
          {FEATURES.map((feature, index) => (
            <Card 
              key={index} 
              className="group relative p-6 bg-white/80 backdrop-blur-sm border-sky-100/50 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 rounded-2xl overflow-hidden"
            >
              {/* 背景グラデーション */}
              <div className={`absolute inset-0 bg-gradient-to-br ${getGradient(index)} opacity-0 group-hover:opacity-5 transition-opacity duration-300`} />
              
              <div className="relative">
                <div className={`inline-flex p-3 rounded-xl bg-gradient-to-br ${getGradient(index)} text-white shadow-lg mb-4`}>
                  {getIcon(feature.iconName)}
                </div>
                <h3 className="font-bold text-lg text-slate-800 mb-2 group-hover:text-sky-700 transition-colors">
                  {feature.title}
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
