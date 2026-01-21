"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { CheckCircle } from "lucide-react";

interface DemoDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function DemoDialog({ open, onOpenChange }: DemoDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className="max-w-[95vw] md:max-w-3xl lg:max-w-4xl rounded-2xl border-sky-100 bg-white/95 backdrop-blur-sm shadow-lg p-4 sm:p-6"
        showCloseButton={true}
      >
        <DialogHeader className="text-left">
          <DialogTitle className="text-sky-900 text-lg sm:text-xl font-bold">
            たびくみのデモ
          </DialogTitle>
          <DialogDescription className="text-slate-600 text-sm">
            入力 → 生成 → 日別スケジュール表示までを30秒で確認できます
          </DialogDescription>
        </DialogHeader>

        {/* デモ動画エリア */}
        <div className="mt-2">
          <div className="relative aspect-video w-full overflow-hidden rounded-xl bg-slate-100 border border-sky-100">
            {/* 
              動画ファイルのパス: /demo/tabikumi-demo.mp4
              ポスター画像のパス: /demo/tabikumi-demo-poster.png
              実ファイルが用意できたら差し替えてください
            */}
            <video
              className="h-full w-full object-cover"
              controls
              playsInline
              preload="metadata"
              poster="/demo/tabikumi-demo-poster.png"
            >
              <source src="/demo/tabikumi-demo.mp4" type="video/mp4" />
              お使いのブラウザは動画再生に対応していません。
            </video>
            
            {/* 動画がない場合のプレースホルダー表示 */}
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-br from-sky-50 to-amber-50/30 pointer-events-none opacity-0 [video:not([src])~&]:opacity-100">
              <div className="text-center p-4">
                <div className="mb-3 flex size-16 mx-auto items-center justify-center rounded-full bg-sky-100">
                  <svg className="size-8 text-sky-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <p className="text-sm text-slate-600">デモ動画を準備中です</p>
                <p className="text-xs text-slate-500 mt-1">近日公開予定</p>
              </div>
            </div>
          </div>
        </div>

        {/* 安心テキスト */}
        <div className="mt-4 flex flex-col sm:flex-row gap-2 sm:gap-6 justify-center">
          <div className="flex items-center gap-2 text-sm text-slate-600">
            <CheckCircle className="size-4 text-sky-600 shrink-0" />
            <span>登録不要で試せます</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-slate-600">
            <CheckCircle className="size-4 text-sky-600 shrink-0" />
            <span>入力はあとから変更できます</span>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
