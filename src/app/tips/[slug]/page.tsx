import { notFound } from 'next/navigation';
import Link from 'next/link';
import { getDocBySlug, getAllDocSlugs } from '@/features/docs/lib/docs';
import { TableOfContents, ArticleDate } from '@/features/docs/components';
import { ArrowLeftIcon, LightbulbIcon, ArrowRightIcon } from 'lucide-react';
import type { Metadata } from 'next';

type Props = {
  params: Promise<{ slug: string }>;
};

/**
 * 静的パラメータ生成（SSG用）
 */
export async function generateStaticParams() {
  const slugs = await getAllDocSlugs('tips');
  return slugs.map((slug) => ({ slug }));
}

/**
 * メタデータ生成（SEO用）
 */
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const doc = await getDocBySlug('tips', slug);

  if (!doc) {
    return {
      title: 'ページが見つかりません',
    };
  }

  return {
    title: `${doc.title} | たびくみ`,
    description: doc.description || `${doc.title}の詳細ページです。`,
  };
}

export default async function TipsDetailPage({ params }: Props) {
  const { slug } = await params;
  const doc = await getDocBySlug('tips', slug);

  if (!doc) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-sky-50 via-white to-amber-50/30 relative overflow-hidden">
      {/* 背景のぼかしグロー */}
      <div className="absolute top-20 left-1/4 w-96 h-96 bg-sky-200/30 rounded-full blur-3xl" />
      <div className="absolute bottom-40 right-1/4 w-80 h-80 bg-amber-200/20 rounded-full blur-3xl" />

      <div className="container mx-auto px-4 py-8 md:py-12 max-w-4xl relative z-10">
        {/* パンくずナビゲーション */}
        <nav className="mb-8">
          <Link
            href="/tips"
            className="inline-flex items-center gap-2 text-sky-600 hover:text-sky-700 text-sm font-medium transition-colors group"
          >
            <ArrowLeftIcon className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            旅行ノウハウ一覧に戻る
          </Link>
        </nav>

        {/* 記事カード */}
        <article className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-sky-100 overflow-hidden">
          {/* ヘッダー部分 */}
          <div className="bg-gradient-to-r from-sky-500 to-sky-600 px-6 md:px-8 py-6">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-white/20 text-white rounded-full text-xs font-medium mb-4">
              <LightbulbIcon className="w-3.5 h-3.5" />
              旅行ノウハウ
            </div>
            <h1 className="text-xl md:text-2xl lg:text-3xl font-bold text-white leading-tight">
              {doc.title}
            </h1>
          </div>

          {/* コンテンツ部分 */}
          <div className="p-6 md:p-8">
            {/* 登録日・更新日 */}
            <ArticleDate createdAt={doc.createdAt} updatedAt={doc.updatedAt} />

            {/* 目次（開閉可能） */}
            <TableOfContents items={doc.toc} />

            {/* 本文 */}
            <div
              className="
                prose prose-slate max-w-none
                prose-headings:text-sky-900 prose-headings:scroll-mt-20 prose-headings:font-bold
                prose-h2:text-xl prose-h2:md:text-2xl prose-h2:mt-10 prose-h2:mb-4 prose-h2:pb-2 prose-h2:border-b prose-h2:border-sky-100
                prose-h3:text-lg prose-h3:md:text-xl prose-h3:mt-8 prose-h3:mb-3
                prose-p:text-slate-700 prose-p:my-4 prose-p:leading-relaxed
                prose-a:text-sky-600 prose-a:font-medium prose-a:no-underline hover:prose-a:underline
                prose-strong:text-slate-800 prose-strong:font-semibold
                prose-code:text-sky-700 prose-code:bg-sky-50 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-code:text-sm prose-code:before:content-[''] prose-code:after:content-['']
                prose-pre:bg-slate-800 prose-pre:text-slate-100 prose-pre:rounded-xl prose-pre:shadow-md
                prose-li:text-slate-700 prose-li:my-1.5 prose-li:marker:text-sky-400
                prose-ul:my-4 prose-ol:my-4
                prose-hr:my-8 prose-hr:border-sky-100
                prose-img:rounded-xl prose-img:shadow-md prose-img:my-6
                prose-blockquote:border-l-4 prose-blockquote:border-sky-400 prose-blockquote:bg-sky-50/50 prose-blockquote:rounded-r-lg prose-blockquote:py-2 prose-blockquote:px-4 prose-blockquote:not-italic
              "
              dangerouslySetInnerHTML={{ __html: doc.contentHtml }}
            />
          </div>
        </article>

        {/* フッターCTA */}
        <div className="mt-12">
          <div className="bg-gradient-to-r from-sky-50 to-amber-50 rounded-2xl p-8 border border-sky-100 text-center">
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

        {/* 一覧へ戻るリンク */}
        <div className="mt-8 text-center">
          <Link
            href="/tips"
            className="inline-flex items-center gap-2 text-sky-600 hover:text-sky-700 font-medium transition-colors group"
          >
            <ArrowLeftIcon className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            他のノウハウ記事を見る
          </Link>
        </div>
      </div>
    </main>
  );
}
