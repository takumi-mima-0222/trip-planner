import React from 'react'
import { Button } from "@/components/ui/button"

const SiteHeader = () => {
  return (
    <header className="sticky top-0 z-50 border-b border-sky-100 bg-white/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4">
        <h1 className="text-xl font-bold text-sky-900">たびくみ</h1>
        {/* todo:ログイン実装予定 */}
        {/* <Button variant="ghost" className="text-sky-700 hover:text-sky-900">
          ログイン
        </Button> */}
      </div>
    </header>
  )
}

export default SiteHeader
