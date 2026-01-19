"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

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
        <p>現在、お問い合わせフォームは準備中です。</p>
        <p className="mt-2">
          不具合やご意見がある場合は、今後設置予定の窓口をご利用ください。
        </p>
      </>
    ),
  },
];

export const FaqPresentation = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-sky-50 to-amber-50/30">
      <div className="container mx-auto max-w-3xl px-4 py-12">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold tracking-tight text-sky-900">よくある質問</h1>
          <p className="mt-2 text-slate-600">
            たびくみに関してよくいただく質問と、その回答をまとめています。
          </p>
        </div>

      <Accordion type="single" collapsible className="w-full">
        {faqItems.map((item) => (
          <AccordionItem key={item.id} value={item.id}>
            <AccordionTrigger className="text-left font-medium">
              Q. {item.question}
            </AccordionTrigger>
            <AccordionContent className="text-slate-600">
              {item.answer}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
      </div>
    </div>
  );
};
