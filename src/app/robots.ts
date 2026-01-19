import type { MetadataRoute } from 'next';

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || 'https://tabikumi.com';

/**
 * robots.txt を動的に生成
 * クローラーへの指示とサイトマップの場所を定義
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: [
          '/api/',      // APIエンドポイントを除外
          '/_next/',    // Next.js内部ファイルを除外
        ],
      },
    ],
    sitemap: `${BASE_URL}/sitemap.xml`,
  };
}
