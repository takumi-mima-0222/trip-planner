import Link from "next/link";
import { FOOTER_LINKS } from "./constants";
import { MapPin, Heart } from "lucide-react";

export function Footer() {
  return (
    <footer className="relative overflow-hidden">
      {/* 背景装飾 */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-sky-50/50 to-sky-100/30" />
      
      <div className="relative border-t border-sky-100">
        <div className="mx-auto max-w-7xl px-4 py-12">
          <div className="grid md:grid-cols-3 gap-8 items-center">
            {/* ロゴ＆説明 */}
            <div className="text-center md:text-left">
              <Link href="/" className="inline-flex items-center gap-2 text-xl font-bold text-sky-900 hover:opacity-80 transition-opacity">
                <div className="flex items-center justify-center size-8 bg-gradient-to-br from-sky-500 to-cyan-500 rounded-lg text-white">
                  <MapPin className="size-5" />
                </div>
                たびくみ
              </Link>
              <p className="mt-2 text-sm text-slate-500">
                AIで旅行計画をもっと簡単に
              </p>
            </div>
            
            {/* リンク */}
            <nav className="flex flex-wrap justify-center gap-x-6 gap-y-2">
              {FOOTER_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-sm text-slate-600 hover:text-sky-700 transition-colors relative group"
                >
                  {link.label}
                  <span className="absolute -bottom-0.5 left-0 w-0 h-0.5 bg-sky-500 group-hover:w-full transition-all duration-300" />
                </Link>
              ))}
            </nav>
            
            {/* ソーシャル・その他 */}
            <div className="text-center md:text-right">
              <p className="text-sm text-slate-500 flex items-center justify-center md:justify-end gap-1">
                Made with <Heart className="size-4 text-rose-400 fill-rose-400" /> in Japan
              </p>
            </div>
          </div>
        </div>
        
        {/* コピーライト */}
        <div className="border-t border-sky-100/50 bg-white/50">
          <div className="mx-auto max-w-7xl px-4 py-4">
            <p className="text-center text-xs text-slate-400">
              © 2026 たびくみ. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
