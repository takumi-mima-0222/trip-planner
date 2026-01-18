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
  title: 'ガイド一覧 | AI旅行プランナー',
  description: 'AI旅行プランナーの使い方ガイド一覧ページです。',
};

export default async function DocListPage() {
  const docs = await getAllDocsMeta();

  return (
    <main className="min-h-screen bg-gradient-to-b from-sky-50 to-amber-50/30">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <h1 className="text-3xl font-bold mb-8 text-sky-900">ガイド</h1>
      
        {docs.length === 0 ? (
          <p className="text-slate-600">記事がありません。</p>
        ) : (
          <div className="grid gap-4">
            {docs.map((doc) => (
              <Link key={doc.slug} href={`/doc/${doc.slug}`} className="block">
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
