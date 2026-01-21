'use client'

import React, { useState, useCallback, useEffect, useRef } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Menu, X, Home, BookOpen, Lightbulb, HelpCircle, Shield, Mail, MoreHorizontal, ArrowRight, PlusCircle } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { TabikumiIcon } from "@/components/icons"

// メインナビ（PC表示で常に表示）
const mainNavItems = [
  { href: '/', label: 'ホーム', icon: Home },
  { href: '/guide', label: 'ガイド', icon: BookOpen },
  { href: '/tips', label: 'ノウハウ', icon: Lightbulb },
  { href: '/faq', label: 'FAQ', icon: HelpCircle },
]

// その他メニュー（PC表示でドロップダウン）
const moreNavItems = [
  { href: '/privacy-policy', label: 'プライバシーポリシー', icon: Shield },
  { href: 'https://docs.google.com/forms/d/e/1FAIpQLSfBa0yIsgUAhutsRyuKzVpH-ueacPJqbP9-1JrekJg5lcj3Ww/viewform?usp=publish-editor', label: 'お問い合わせ', icon: Mail, external: true },
]

// モバイル用（全て表示）
const navItems = [
  { href: '/', label: 'ホーム', icon: Home },
  { href: '/guide', label: '使い方ガイド', icon: BookOpen },
  { href: '/tips', label: '旅行ノウハウ', icon: Lightbulb },
  { href: '/faq', label: 'よくある質問', icon: HelpCircle },
  { href: '/privacy-policy', label: 'プライバシーポリシー', icon: Shield },
  { href: 'https://docs.google.com/forms/d/e/1FAIpQLSfBa0yIsgUAhutsRyuKzVpH-ueacPJqbP9-1JrekJg5lcj3Ww/viewform?usp=publish-editor', label: 'お問い合わせ', icon: Mail, external: true },
]

const SiteHeader = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isMoreOpen, setIsMoreOpen] = useState(false)
  const moreMenuRef = useRef<HTMLDivElement>(null)
  const pathname = usePathname()

  const toggleMenu = useCallback(() => {
    setIsMenuOpen((prev) => !prev)
  }, [])

  const closeMenu = useCallback(() => {
    setIsMenuOpen(false)
  }, [])

  const toggleMoreMenu = useCallback(() => {
    setIsMoreOpen((prev) => !prev)
  }, [])

  const closeMoreMenu = useCallback(() => {
    setIsMoreOpen(false)
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

  // 「その他」メニュー外クリックで閉じる
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (moreMenuRef.current && !moreMenuRef.current.contains(event.target as Node)) {
        setIsMoreOpen(false)
      }
    }
    if (isMoreOpen) {
      document.addEventListener('mousedown', handleClickOutside)
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isMoreOpen])

  return (
    <>
      <header className="sticky top-0 z-50 border-b border-sky-100/80 bg-white/80 backdrop-blur-md">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4">
          {/* ロゴ - ホームへのリンク */}
          <Link href="/" className="group flex items-center gap-2.5 transition-all hover:opacity-90">
            <div className="relative">
              <TabikumiIcon className="size-9 transition-transform group-hover:scale-105" />
              <div className="absolute -inset-1 -z-10 rounded-full bg-sky-400/20 opacity-0 blur-md transition-opacity group-hover:opacity-100" />
            </div>
            <div className="flex flex-col">
              <span className="bg-gradient-to-r from-sky-600 to-cyan-500 bg-clip-text text-lg font-bold tracking-tight text-transparent">
                たびくみ
              </span>
              <span className="hidden text-[10px] font-medium text-slate-400 sm:block">
                AI旅行プランナー
              </span>
            </div>
          </Link>

          {/* デスクトップナビゲーション */}
          <nav className="hidden md:flex items-center gap-1">
            {mainNavItems.map((item) => {
              const isActive = pathname === item.href || 
                (item.href !== '/' && pathname.startsWith(item.href))
              
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
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
            
            {/* その他メニュー（ドロップダウン） */}
            <div className="relative" ref={moreMenuRef}>
              <button
                onClick={toggleMoreMenu}
                className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                  isMoreOpen
                    ? 'bg-sky-100 text-sky-900'
                    : 'text-sky-700 hover:bg-sky-50 hover:text-sky-900'
                }`}
                aria-expanded={isMoreOpen}
                aria-haspopup="true"
              >
                <MoreHorizontal className="h-4 w-4" />
                その他
              </button>
              
              {isMoreOpen && (
                <div className="absolute right-0 top-full mt-1 w-56 bg-white rounded-lg shadow-lg border border-sky-100 py-1 z-50">
                  {moreNavItems.map((item) => {
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
                          className="flex items-center gap-3 px-4 py-2 text-sm font-medium transition-colors text-sky-700 hover:bg-sky-50 hover:text-sky-900"
                          onClick={closeMoreMenu}
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
                        className={`flex items-center gap-3 px-4 py-2 text-sm font-medium transition-colors ${
                          isActive
                            ? 'bg-sky-50 text-sky-900'
                            : 'text-sky-700 hover:bg-sky-50 hover:text-sky-900'
                        }`}
                        onClick={closeMoreMenu}
                      >
                        <item.icon className="h-4 w-4" />
                        {item.label}
                      </Link>
                    )
                  })}
                </div>
              )}
            </div>
            
            {/* 無料で始めるボタン（PC用） */}
            <Link
              href="/create"
              className="ml-2 inline-flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-medium bg-sky-600 text-white hover:bg-sky-700 transition-colors"
            >
              <PlusCircle className="h-4 w-4" />
              無料で始める
            </Link>
          </nav>

          {/* モバイル用ボタン群 */}
          <div className="flex items-center gap-2 md:hidden">
            {/* 無料で始めるボタン（モバイル用） */}
            <Link
              href="/create"
              className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-medium bg-sky-600 text-white hover:bg-sky-700 transition-colors"
            >
              <ArrowRight className="h-3.5 w-3.5" />
              始める
            </Link>
            
            {/* ハンバーガーメニューボタン */}
            <Button
              variant="ghost"
              size="icon"
              className="text-sky-700 hover:text-sky-900 hover:bg-sky-50"
              onClick={toggleMenu}
              aria-label={isMenuOpen ? 'メニューを閉じる' : 'メニューを開く'}
              aria-expanded={isMenuOpen}
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
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
