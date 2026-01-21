import Link from 'next/link';
import { getAllDocsMeta } from '@/features/docs/lib/docs';
import { LightbulbIcon, ArrowRightIcon, CalendarIcon } from 'lucide-react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '旅行ノウハウ | たびくみ',
  description: '旅行計画に役立つノウハウやコツをご紹介します。',
};

/**
 * 日付をフォーマット（YYYY-MM-DD → YYYY.MM.DD）
 */
function formatDate(dateString?: string): string {
  if (!dateString) return '';
  const date = new Date(dateString);
  return `${date.getFullYear()}.${String(date.getMonth() + 1).padStart(2, '0')}.${String(date.getDate()).padStart(2, '0')}`;
}

export default async function TipsListPage() {
  const docs = await getAllDocsMeta('tips');

  return (
    <main className="min-h-screen bg-gradient-to-b from-sky-50 via-white to-amber-50/30 relative overflow-hidden">
      {/* 背景のぼかしグロー */}
      <div className="absolute top-20 left-1/4 w-96 h-96 bg-sky-200/40 rounded-full blur-3xl" />
      <div className="absolute bottom-40 right-1/4 w-80 h-80 bg-amber-200/30 rounded-full blur-3xl" />

      <div className="container mx-auto px-4 py-12 md:py-16 max-w-4xl relative z-10">
        {/* ヘッダーセクション */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-sky-100 text-sky-700 rounded-full text-sm font-medium mb-4">
            <LightbulbIcon className="w-4 h-4" />
            旅行計画のヒント
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-sky-900 mb-4">
            旅行ノウハウ
          </h1>
          <p className="text-slate-600 max-w-xl mx-auto">
            旅行計画に役立つノウハウやコツをご紹介します。<br className="hidden sm:block" />
            失敗しない旅行のために、ぜひ参考にしてください。
          </p>
        </div>

        {/* 記事一覧 */}
        {docs.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-slate-500">記事がまだありません。</p>
          </div>
        ) : (
          <div className="grid gap-6">
            {docs.map((doc, index) => (
              <Link key={doc.slug} href={`/tips/${doc.slug}`} className="group block">
                <article className="relative bg-white/80 backdrop-blur-sm rounded-2xl border border-sky-100 p-6 shadow-sm hover:shadow-lg hover:border-sky-200 transition-all duration-300">
                  {/* 記事番号バッジ */}
                  <div className="absolute -top-3 -left-2 w-10 h-10 bg-gradient-to-br from-sky-400 to-sky-600 rounded-xl flex items-center justify-center text-white font-bold text-sm shadow-md">
                    {String(index + 1).padStart(2, '0')}
                  </div>

                  <div className="pl-6">
                    {/* 日付 */}
                    {doc.createdAt && (
                      <div className="flex items-center gap-1.5 text-xs text-slate-400 mb-2">
                        <CalendarIcon className="w-3.5 h-3.5" />
                        <time>{formatDate(doc.createdAt)}</time>
                      </div>
                    )}

                    {/* タイトル */}
                    <h2 className="text-lg md:text-xl font-bold text-sky-900 group-hover:text-sky-600 transition-colors mb-2">
                      {doc.title}
                    </h2>

                    {/* 説明 */}
                    {doc.description && (
                      <p className="text-sm text-slate-600 line-clamp-2 mb-4">
                        {doc.description}
                      </p>
                    )}

                    {/* 続きを読むリンク */}
                    <div className="flex items-center gap-1.5 text-sm font-medium text-sky-600 group-hover:text-sky-500 transition-colors">
                      <span>続きを読む</span>
                      <ArrowRightIcon className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </article>
              </Link>
            ))}
          </div>
        )}

        {/* CTAセクション */}
        <div className="mt-16 text-center">
          <div className="bg-gradient-to-r from-sky-50 to-amber-50 rounded-2xl p-8 border border-sky-100">
            <h2 className="text-xl font-bold text-sky-900 mb-2">
              旅行プランを作ってみませんか？
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
