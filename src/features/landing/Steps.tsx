import { STEPS } from "./constants";
import { ArrowRight, FileText, Wand2, Calendar } from "lucide-react";

const stepIcons = [
  <FileText key="1" className="size-6" />,
  <Wand2 key="2" className="size-6" />,
  <Calendar key="3" className="size-6" />,
];

export function Steps() {
  return (
    <section className="py-16 md:py-24 bg-gradient-to-b from-white/80 to-sky-50/50">
      <div className="mx-auto max-w-7xl px-4">
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-2xl sm:text-3xl font-bold text-sky-900 mb-3">
            たった3ステップで旅程が完成
          </h2>
          <p className="text-slate-600">
            難しい操作は一切なし。すぐに使い始められます
          </p>
        </div>
        
        <div className="relative">
          {/* 接続線（MD以上で表示） */}
          <div className="hidden md:block absolute top-16 left-[20%] right-[20%] h-0.5">
            <div className="w-full h-full bg-gradient-to-r from-sky-200 via-amber-200 to-sky-200 rounded-full" />
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 md:gap-12">
            {STEPS.map((step, index) => (
              <div key={step.number} className="relative">
                <div className="flex flex-col items-center text-center group">
                  {/* ステップカード */}
                  <div className="relative mb-6">
                    {/* 背景グロー */}
                    <div className="absolute inset-0 bg-gradient-to-br from-sky-400 to-cyan-400 rounded-2xl blur-xl opacity-20 group-hover:opacity-40 transition-opacity" />
                    
                    <div className="relative flex items-center justify-center size-20 bg-white rounded-2xl shadow-lg border border-sky-100 group-hover:shadow-xl group-hover:scale-105 transition-all duration-300">
                      <div className="text-sky-600">
                        {stepIcons[index]}
                      </div>
                      {/* 番号バッジ */}
                      <div className="absolute -top-2 -right-2 flex items-center justify-center size-7 bg-gradient-to-br from-sky-500 to-sky-600 text-white text-sm font-bold rounded-full shadow-md">
                        {step.number}
                      </div>
                    </div>
                  </div>
                  
                  <h3 className="font-bold text-lg text-slate-800 mb-2">{step.title}</h3>
                  <p className="text-sm text-slate-600 max-w-xs">{step.description}</p>
                </div>
                
                {/* 矢印（MD以上で表示、最後のアイテム以外） */}
                {index < STEPS.length - 1 && (
                  <div className="hidden md:flex absolute top-16 -right-6 transform translate-x-1/2">
                    <div className="flex items-center justify-center size-10 bg-white rounded-full shadow-md border border-sky-100">
                      <ArrowRight className="size-5 text-sky-500" />
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
