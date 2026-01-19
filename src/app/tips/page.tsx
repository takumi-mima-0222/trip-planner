import Link from 'next/link';
import { getAllDocsMeta } from '@/features/docs/lib/docs';
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from '@/components/ui/card';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '旅行ノウハウ | たびくみ',
  description: '旅行計画に役立つノウハウやコツをご紹介します。',
};

export default async function TipsListPage() {
  const docs = await getAllDocsMeta('tips');

  return (
    <main className="min-h-screen bg-gradient-to-b from-sky-50 to-amber-50/30">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-sky-900">旅行ノウハウ</h1>
          <p className="mt-2 text-slate-600">
            旅行計画に役立つノウハウやコツをご紹介します。
          </p>
        </div>
      
        {docs.length === 0 ? (
          <p className="text-slate-600">記事がありません。</p>
        ) : (
          <div className="grid gap-4">
            {docs.map((doc) => (
              <Link key={doc.slug} href={`/tips/${doc.slug}`} className="block">
                <Card className="bg-white hover:shadow-md transition-shadow cursor-pointer">
                  <CardHeader>
                    <CardTitle className="text-xl text-sky-900">{doc.title}</CardTitle>
                    {doc.description && (
                      <CardDescription>{doc.description}</CardDescription>
                    )}
                  </CardHeader>
                  <CardContent>
                    <span className="text-sm text-sky-600 hover:underline">
                      記事を読む →
                    </span>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
