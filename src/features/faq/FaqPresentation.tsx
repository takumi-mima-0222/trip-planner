"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { HelpCircle, MessageCircle } from "lucide-react";

const faqItems = [
  {
    id: "item-1",
    question: "たびくみは無料で使えますか？",
    answer: (
      <>
        <p>はい、現在は無料でご利用いただけます。</p>
        <p className="mt-2">
          今後、一部の機能については有料化を検討する可能性がありますが、
          基本的なプラン作成機能は無料で提供する予定です。
        </p>
      </>
    ),
  },
  {
    id: "item-2",
    question: "どんな旅行に対応していますか？",
    answer: (
      <>
        <p>現在は、日帰り〜短期旅行（1日〜数日）のプラン作成に対応しています。</p>
        <p className="mt-2">
          今後、宿泊地を含めた複数日プランや、より詳細な条件指定にも対応予定です。
        </p>
      </>
    ),
  },
  {
    id: "item-3",
    question: "行きたい場所の順番は指定できますか？",
    answer: (
      <>
        <p>順番は指定する必要はありません。</p>
        <p className="mt-2">
          行きたい場所を入力するだけで、
          AIが移動時間を考慮して効率の良い順番を自動で提案します。
        </p>
      </>
    ),
  },
  {
    id: "item-4",
    question: "提案されたプランは変更できますか？",
    answer: (
      <>
        <p>はい、提案されたプランはあくまで参考案です。</p>
        <p className="mt-2">気になる点があれば、ご自身の判断で調整してください。</p>
      </>
    ),
  },
  {
    id: "item-5",
    question: "移動時間や営業時間は正確ですか？",
    answer: (
      <>
        <p>移動時間やスケジュールは一般的な情報をもとに算出しています。</p>
        <p className="mt-2">
          実際の交通状況や営業時間、定休日などは、
          必ず公式情報をご確認ください。
        </p>
      </>
    ),
  },
  {
    id: "item-6",
    question: "スマートフォンでも使えますか？",
    answer: (
      <p>はい、スマートフォン・タブレット・PCいずれでもご利用いただけます。</p>
    ),
  },
  {
    id: "item-7",
    question: "個人情報は入力する必要がありますか？",
    answer: (
      <>
        <p>アカウント登録や個人情報の入力は不要です。</p>
        <p className="mt-2">
          旅行プラン作成に必要な情報のみを入力してご利用いただけます。
        </p>
      </>
    ),
  },
  {
    id: "item-8",
    question: "問い合わせ先はありますか？",
    answer: (
      <>
          <p>お問い合わせフォームをご利用いただけます。</p>
          <p className="mt-2">
            不具合やご意見、ご要望などがある場合は、
            <a href="https://docs.google.com/forms/d/e/1FAIpQLSfBa0yIsgUAhutsRyuKzVpH-ueacPJqbP9-1JrekJg5lcj3Ww/viewform?usp=publish-editor" className="text-sky-600 hover:underline font-medium">
            お問い合わせフォーム
            </a>
            からご連絡ください。
          </p>
      </>
    ),
  },
];

export const FaqPresentation = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-sky-50 to-amber-50/30 relative overflow-hidden">
      {/* 背景装飾 */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-sky-200/20 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-amber-200/20 rounded-full blur-3xl" />
      
      <div className="container relative mx-auto max-w-3xl px-4 py-12 md:py-16">
        {/* ヘッダーセクション */}
        <div className="mb-10 text-center md:mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-sky-100 text-sky-700 text-sm font-medium mb-4">
            <HelpCircle className="size-4" />
            <span>FAQ</span>
          </div>
          <h1 className="text-3xl font-bold tracking-tight text-sky-900 sm:text-4xl mb-3">
            よくある質問
          </h1>
          <p className="text-slate-600 max-w-lg mx-auto">
            たびくみに関してよくいただく質問と、その回答をまとめています。
          </p>
        </div>

        {/* FAQアコーディオン */}
        <div className="relative">
          <div className="absolute -inset-2 bg-gradient-to-r from-sky-100/50 to-amber-100/50 rounded-3xl blur-xl" />
          
          <div className="relative bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl border border-sky-100/50 overflow-hidden">
            <Accordion type="single" collapsible className="w-full">
              {faqItems.map((item, index) => (
                <AccordionItem 
                  key={item.id} 
                  value={item.id}
                  className={`border-slate-100 ${index === 0 ? '' : 'border-t'}`}
                >
                  <AccordionTrigger className="text-left font-medium px-5 py-4 hover:bg-sky-50/50 transition-colors group sm:px-6">
                    <span className="flex items-start gap-3">
                      <span className="flex size-6 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-sky-500 to-cyan-500 text-white text-xs font-bold mt-0.5">
                        Q
                      </span>
                      <span className="text-slate-800 group-hover:text-sky-700 transition-colors pr-2">
                        {item.question}
                      </span>
                    </span>
                  </AccordionTrigger>
                  <AccordionContent className="px-5 pb-5 pt-0 sm:px-6">
                    <div className="pl-9 text-slate-600 leading-relaxed">
                      {item.answer}
                    </div>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
        
        {/* お問い合わせへの誘導 */}
        <div className="mt-10 text-center md:mt-12">
          <div className="inline-flex flex-col items-center gap-3 p-6 rounded-2xl bg-white/80 backdrop-blur-sm border border-sky-100/50 shadow-sm">
            <div className="flex size-12 items-center justify-center rounded-full bg-gradient-to-br from-sky-100 to-cyan-100">
              <MessageCircle className="size-6 text-sky-600" />
            </div>
            <p className="text-slate-700 font-medium">お探しの回答が見つかりませんか？</p>
            <a 
              href="https://docs.google.com/forms/d/e/1FAIpQLSfBa0yIsgUAhutsRyuKzVpH-ueacPJqbP9-1JrekJg5lcj3Ww/viewform?usp=publish-editor"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-sky-600 text-white text-sm font-medium hover:bg-sky-700 transition-colors"
            >
              <MessageCircle className="size-4" />
              お問い合わせはこちら
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
