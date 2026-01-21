import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles, CheckCircle } from "lucide-react";
import { CTA_CONTENT } from "./constants";

export function CTASection() {
  return (
    <section className="py-16 md:py-24">
      <div className="mx-auto max-w-5xl px-4">
        <div className="relative overflow-hidden rounded-3xl">
          {/* 背景グラデーション */}
          <div className="absolute inset-0 bg-gradient-to-br from-sky-500 via-sky-600 to-cyan-600" />
          
          {/* 装飾パターン */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 left-0 w-40 h-40 bg-white rounded-full blur-3xl" />
            <div className="absolute bottom-0 right-0 w-60 h-60 bg-amber-300 rounded-full blur-3xl" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-white rounded-full blur-3xl opacity-20" />
          </div>
          
          {/* コンテンツ */}
          <div className="relative px-6 py-12 md:px-12 md:py-16 text-center">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/20 text-white text-sm font-medium mb-6 backdrop-blur-sm">
              <Sparkles className="size-4" />
              <span>完全無料・登録不要</span>
            </div>
            
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-4">
              {CTA_CONTENT.title}
            </h2>
            <p className="text-sky-100 mb-8 max-w-xl mx-auto">
              {CTA_CONTENT.subText}
            </p>
            
            {/* 特徴リスト */}
            <div className="flex flex-wrap justify-center gap-4 mb-8">
              {["30秒で旅程完成", "会員登録不要", "何度でも再生成OK"].map((item, index) => (
                <div key={index} className="flex items-center gap-2 text-sm text-white/90">
                  <CheckCircle className="size-4 text-amber-300" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
            
            <Button 
              asChild 
              size="lg" 
              className="text-base h-14 px-10 bg-white text-sky-600 hover:bg-sky-50 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105"
            >
              <Link href="/create">
                今すぐ無料で始める
                <ArrowRight className="size-5" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
