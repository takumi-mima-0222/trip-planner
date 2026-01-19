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
  title: '使い方ガイド | たびくみ',
  description: 'たびくみの使い方ガイド一覧ページです。',
};

export default async function GuideListPage() {
  const docs = await getAllDocsMeta('guide');

  return (
    <main className="min-h-screen bg-gradient-to-b from-sky-50 to-amber-50/30">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-sky-900">使い方ガイド</h1>
          <p className="mt-2 text-slate-600">
            たびくみの使い方や機能について解説します。
          </p>
        </div>
      
        {docs.length === 0 ? (
          <p className="text-slate-600">記事がありません。</p>
        ) : (
          <div className="grid gap-4">
            {docs.map((doc) => (
              <Link key={doc.slug} href={`/guide/${doc.slug}`} className="block">
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
