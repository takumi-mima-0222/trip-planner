'use client'

import React, { useState, useCallback, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Menu, X, Home, BookOpen, Lightbulb, HelpCircle, Shield, Mail } from 'lucide-react'
import { Button } from "@/components/ui/button"

const navItems = [
  { href: '/', label: 'ホーム', icon: Home },
  { href: '/guide', label: '使い方ガイド', icon: BookOpen },
  { href: '/tips', label: '旅行ノウハウ', icon: Lightbulb },
  { href: '/faq', label: 'よくある質問', icon: HelpCircle },
  { href: '/privacy-policy', label: 'プライバシーポリシー', icon: Shield },
  { href: 'https://docs.google.com/forms/d/e/xxxxx/viewform', label: 'お問い合わせ', icon: Mail, external: true },
]

const SiteHeader = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const pathname = usePathname()

  const toggleMenu = useCallback(() => {
    setIsMenuOpen((prev) => !prev)
  }, [])

  const closeMenu = useCallback(() => {
    setIsMenuOpen(false)
  }, [])

  // メニューが開いている時はスクロールを無効化
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [isMenuOpen])

  return (
    <>
      <header className="sticky top-0 z-50 border-b border-sky-100 bg-white/80 backdrop-blur-md">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4">
          {/* ロゴ - ホームへのリンク */}
          <Link href="/" className="flex items-center gap-2 transition-opacity hover:opacity-80">
            <h1 className="text-xl font-bold text-sky-900">たびくみ</h1>
          </Link>

          {/* デスクトップナビゲーション */}
          <nav className="hidden md:flex items-center gap-1">
            {navItems.map((item) => {
              const isExternal = 'external' in item && item.external
              const isActive = !isExternal && (pathname === item.href || 
                (item.href !== '/' && pathname.startsWith(item.href)))
              
              if (isExternal) {
                return (
                  <a
                    key={item.href}
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors text-sky-700 hover:bg-sky-50 hover:text-sky-900"
                  >
                    <item.icon className="h-4 w-4" />
                    {item.label}
                  </a>
                )
              }
              
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    isActive
                      ? 'bg-sky-100 text-sky-900'
                      : 'text-sky-700 hover:bg-sky-50 hover:text-sky-900'
                  }`}
                >
                  <item.icon className="h-4 w-4" />
                  {item.label}
                </Link>
              )
            })}
          </nav>

          {/* モバイル用ハンバーガーメニューボタン */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden text-sky-700 hover:text-sky-900 hover:bg-sky-50"
            onClick={toggleMenu}
            aria-label={isMenuOpen ? 'メニューを閉じる' : 'メニューを開く'}
            aria-expanded={isMenuOpen}
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </Button>
        </div>
      </header>

      {/* モバイルメニューオーバーレイ */}
      {isMenuOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/20 backdrop-blur-sm md:hidden"
          onClick={closeMenu}
          aria-hidden="true"
        />
      )}

      {/* モバイルメニュー */}
      <nav
        className={`fixed top-16 right-0 z-50 w-64 h-[calc(100vh-4rem)] bg-white shadow-xl transform transition-transform duration-300 ease-in-out md:hidden ${
          isMenuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex flex-col p-4 gap-2">
          {navItems.map((item) => {
            const isExternal = 'external' in item && item.external
            const isActive = !isExternal && (pathname === item.href || 
              (item.href !== '/' && pathname.startsWith(item.href)))
            
            if (isExternal) {
              return (
                <a
                  key={item.href}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 px-4 py-3 rounded-lg text-base font-medium transition-colors text-sky-700 hover:bg-sky-50 hover:text-sky-900"
                  onClick={closeMenu}
                >
                  <item.icon className="h-5 w-5" />
                  {item.label}
                </a>
              )
            }
            
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg text-base font-medium transition-colors ${
                  isActive
                    ? 'bg-sky-100 text-sky-900'
                    : 'text-sky-700 hover:bg-sky-50 hover:text-sky-900'
                }`}
                onClick={closeMenu}
              >
                <item.icon className="h-5 w-5" />
                {item.label}
              </Link>
            )
          })}
        </div>
      </nav>
    </>
  )
}

export default SiteHeader
