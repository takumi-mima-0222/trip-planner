import { notFound } from 'next/navigation';
import Link from 'next/link';
import { getDocBySlug, getAllDocSlugs } from '@/features/docs/lib/docs';
import { TableOfContents, ArticleDate } from '@/features/docs/components';
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
    <main className="min-h-screen bg-gradient-to-b from-sky-50 to-amber-50/30">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <nav className="mb-6">
          <Link
            href="/tips"
            className="text-sky-600 hover:underline text-sm"
          >
            ← 旅行ノウハウ一覧に戻る
          </Link>
        </nav>

        <article className="bg-white rounded-xl shadow-lg p-6 md:p-8">
          {/* タイトル */}
          <h1 className="text-2xl md:text-3xl font-bold text-sky-900 mb-4">
            {doc.title}
          </h1>

          {/* 登録日・更新日 */}
          <ArticleDate createdAt={doc.createdAt} updatedAt={doc.updatedAt} />

          {/* 目次（開閉可能） */}
          <TableOfContents items={doc.toc} />

          {/* 本文 */}
          <div
            className="prose prose-sm prose-slate max-w-none prose-headings:text-sky-900 prose-headings:scroll-mt-4 prose-p:text-slate-700 prose-p:my-3 prose-p:leading-relaxed prose-a:text-sky-600 prose-strong:text-slate-800 prose-code:text-slate-800 prose-pre:bg-slate-100 prose-pre:text-slate-800 prose-li:text-slate-700 prose-li:my-1 prose-ul:my-2 prose-ol:my-2 prose-h2:mt-8 prose-h2:mb-4 prose-h3:mt-6 prose-h3:mb-3 prose-hr:my-6 prose-img:rounded-lg prose-img:my-4"
            dangerouslySetInnerHTML={{ __html: doc.contentHtml }}
          />
        </article>
      </div>
    </main>
  );
}
