import type { MetadataRoute } from 'next';
import { getAllDocsMeta, type DocCategory } from '@/features/docs/lib/docs';

// サイトのベースURL（本番環境に合わせて変更してください）
const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || 'https://tabikumi.com';

/**
 * 静的ページの定義
 * 新しい静的ページを追加する場合はここに追加
 */
const staticPages: Array<{
  path: string;
  changeFrequency: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never';
  priority: number;
}> = [
  { path: '', changeFrequency: 'daily', priority: 1.0 },
  { path: '/plan', changeFrequency: 'daily', priority: 0.9 },
  { path: '/guide', changeFrequency: 'weekly', priority: 0.8 },
  { path: '/tips', changeFrequency: 'weekly', priority: 0.8 },
  { path: '/faq', changeFrequency: 'monthly', priority: 0.7 },
  { path: '/privacy-policy', changeFrequency: 'yearly', priority: 0.3 },
];

/**
 * ドキュメントカテゴリの設定
 * 新しいカテゴリを追加する場合はここに追加
 */
const docCategories: Array<{
  category: DocCategory;
  basePath: string;
  changeFrequency: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never';
  priority: number;
}> = [
  { category: 'guide', basePath: '/guide', changeFrequency: 'monthly', priority: 0.7 },
  { category: 'tips', basePath: '/tips', changeFrequency: 'weekly', priority: 0.6 },
];

/**
 * 動的にサイトマップを生成
 * Next.js の規約に従い、/sitemap.xml として自動的に提供される
 */
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const currentDate = new Date();

  // 静的ページのサイトマップエントリ
  const staticEntries: MetadataRoute.Sitemap = staticPages.map((page) => ({
    url: `${BASE_URL}${page.path}`,
    lastModified: currentDate,
    changeFrequency: page.changeFrequency,
    priority: page.priority,
  }));

  // 動的ページ（ドキュメント記事）のサイトマップエントリ
  const docEntriesPromises = docCategories.map(async ({ category, basePath, changeFrequency, priority }) => {
    const docs = await getAllDocsMeta(category);
    
    return docs.map((doc): MetadataRoute.Sitemap[number] => ({
      url: `${BASE_URL}${basePath}/${doc.slug}`,
      lastModified: doc.updatedAt ? new Date(doc.updatedAt) : currentDate,
      changeFrequency,
      priority,
    }));
  });

  const docEntriesArrays = await Promise.all(docEntriesPromises);
  const docEntries = docEntriesArrays.flat();

  return [...staticEntries, ...docEntries];
}
