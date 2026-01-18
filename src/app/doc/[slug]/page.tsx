import { notFound } from 'next/navigation';
import Link from 'next/link';
import { getDocBySlug, getAllDocSlugs } from '@/features/docs/lib/docs';
import type { Metadata } from 'next';

type Props = {
  params: Promise<{ slug: string }>;
};

/**
 * 静的パラメータ生成（SSG用）
 */
export async function generateStaticParams() {
  const slugs = await getAllDocSlugs();
  return slugs.map((slug) => ({ slug }));
}

/**
 * メタデータ生成（SEO用）
 */
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const doc = await getDocBySlug(slug);

  if (!doc) {
    return {
      title: 'ページが見つかりません',
    };
  }

  return {
    title: `${doc.title} | AI旅行プランナー`,
    description: doc.description || `${doc.title}の詳細ページです。`,
  };
}

export default async function DocDetailPage({ params }: Props) {
  const { slug } = await params;
  const doc = await getDocBySlug(slug);

  if (!doc) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-sky-50 to-amber-50/30">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <nav className="mb-6">
          <Link
            href="/doc"
            className="text-sky-600 hover:underline text-sm"
          >
            ← ガイド一覧に戻る
          </Link>
        </nav>

        <article className="bg-white rounded-xl shadow-lg p-6 md:p-8">
          <header className="mb-8">
            <h1 className="text-3xl font-bold text-sky-900 mb-2">
              {doc.title}
            </h1>
            {doc.description && (
              <p className="text-slate-600">{doc.description}</p>
            )}
          </header>

          <div
            className="prose prose-slate max-w-none prose-headings:text-sky-900 prose-p:text-slate-700 prose-a:text-sky-600 prose-strong:text-slate-800 prose-code:text-slate-800 prose-pre:bg-slate-100 prose-pre:text-slate-800 prose-li:text-slate-700"
            dangerouslySetInnerHTML={{ __html: doc.contentHtml }}
          />
        </article>
      </div>
    </main>
  );
}
