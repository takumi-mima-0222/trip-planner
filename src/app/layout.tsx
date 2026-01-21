import type { Metadata } from 'next'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'
import SiteHeader from '@/components/site-header'

export const metadata: Metadata = {
  title: 'たびくみ - 旅行プランをAIが自動作成',
  description: '行きたい場所を入れるだけで、AIが効率の良い順番とスケジュールを提案します。',
  generator: 'v0.app',
  icons: {
    icon: [
      {
        url: '/icon.svg',
        type: 'image/svg+xml',
      },
    ],
    apple: '/apple-icon.svg',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="ja">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1" />
      </head>
      <body className={`font-sans antialiased`}>
        <SiteHeader />
        {children}
        <Analytics />
      </body>
    </html>
  )
}
