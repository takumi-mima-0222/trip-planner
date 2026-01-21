import Link from 'next/link';
import { getAllDocsMeta } from '@/features/docs/lib/docs';
import { BookOpenIcon, ArrowRightIcon } from 'lucide-react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '使い方ガイド | たびくみ',
  description: 'たびくみの使い方ガイド一覧ページです。',
};

export default async function GuideListPage() {
  const docs = await getAllDocsMeta('guide');

  return (
    <main className="min-h-screen bg-gradient-to-b from-sky-50 via-white to-emerald-50/20 relative overflow-hidden">
      {/* 背景のぼかしグロー */}
      <div className="absolute top-20 left-1/4 w-96 h-96 bg-sky-200/40 rounded-full blur-3xl" />
      <div className="absolute bottom-40 right-1/4 w-80 h-80 bg-emerald-200/30 rounded-full blur-3xl" />

      <div className="container mx-auto px-4 py-12 md:py-16 max-w-4xl relative z-10">
        {/* ヘッダーセクション */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-100 text-emerald-700 rounded-full text-sm font-medium mb-4">
            <BookOpenIcon className="w-4 h-4" />
            操作マニュアル
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-sky-900 mb-4">
            使い方ガイド
          </h1>
          <p className="text-slate-600 max-w-xl mx-auto">
            たびくみの使い方や機能について解説します。<br className="hidden sm:block" />
            初めての方は、順番に読み進めてください。
          </p>
        </div>

        {/* ガイド一覧 */}
        {docs.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-slate-500">ガイドがまだありません。</p>
          </div>
        ) : (
          <div className="space-y-4">
            {docs.map((doc, index) => (
              <Link key={doc.slug} href={`/guide/${doc.slug}`} className="group block">
                <article className="relative bg-white/80 backdrop-blur-sm rounded-2xl border border-emerald-100 p-6 shadow-sm hover:shadow-lg hover:border-emerald-200 transition-all duration-300">
                  <div className="flex items-start gap-4">
                    {/* ステップ番号 */}
                    <div className="shrink-0 w-14 h-14 bg-gradient-to-br from-emerald-400 to-emerald-600 rounded-xl flex flex-col items-center justify-center text-white shadow-md">
                      <span className="text-[10px] font-medium leading-none">STEP</span>
                      <span className="text-xl font-bold leading-none mt-0.5">{index + 1}</span>
                    </div>

                    <div className="flex-1 min-w-0">
                      {/* タイトル */}
                      <h2 className="text-lg md:text-xl font-bold text-sky-900 group-hover:text-emerald-600 transition-colors mb-2">
                        {doc.title}
                      </h2>

                      {/* 説明 */}
                      {doc.description && (
                        <p className="text-sm text-slate-600 line-clamp-2 mb-3">
                          {doc.description}
                        </p>
                      )}

                      {/* 続きを読むリンク */}
                      <div className="flex items-center gap-1.5 text-sm font-medium text-emerald-600 group-hover:text-emerald-500 transition-colors">
                        <span>ガイドを読む</span>
                        <ArrowRightIcon className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </div>
                    </div>

                    {/* 完了マーク（将来的な拡張用にコメントアウト） */}
                    {/* <CheckCircleIcon className="w-6 h-6 text-emerald-400 shrink-0" /> */}
                  </div>
                </article>
              </Link>
            ))}
          </div>
        )}

        {/* CTAセクション */}
        <div className="mt-16 text-center">
          <div className="bg-gradient-to-r from-emerald-50 to-sky-50 rounded-2xl p-8 border border-emerald-100">
            <h2 className="text-xl font-bold text-sky-900 mb-2">
              準備ができたら、プランを作ってみましょう
            </h2>
            <p className="text-slate-600 text-sm mb-4">
              行きたい場所を入力するだけで、最適な旅程を自動で作成します
            </p>
            <Link
              href="/create"
              className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-sky-500 to-sky-600 text-white font-semibold rounded-full shadow-md hover:shadow-lg hover:from-sky-600 hover:to-sky-700 transition-all"
            >
              プランを作成する
              <ArrowRightIcon className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
