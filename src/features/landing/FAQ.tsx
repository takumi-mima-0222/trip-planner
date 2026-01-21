"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { FAQ_ITEMS } from "./constants";
import { HelpCircle, MessageCircleQuestion } from "lucide-react";
import Link from "next/link";

export function FAQ() {
  return (
    <section className="py-16 md:py-24">
      <div className="mx-auto max-w-3xl px-4">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-100 text-amber-700 text-sm font-medium mb-4">
            <HelpCircle className="size-4" />
            <span>FAQ</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-sky-900 mb-3">
            よくある質問
          </h2>
          <p className="text-slate-600">
            気になることがあればチェックしてみてください
          </p>
        </div>
        
        <div className="relative">
          {/* 背景装飾 */}
          <div className="absolute -inset-4 bg-gradient-to-br from-sky-100/50 to-amber-100/50 rounded-3xl blur-2xl opacity-60" />
          
          <div className="relative bg-white/90 backdrop-blur-sm rounded-2xl border border-sky-100/50 shadow-xl p-4 sm:p-6 md:p-8">
            <Accordion type="single" collapsible className="w-full">
              {FAQ_ITEMS.map((item, index) => (
                <AccordionItem 
                  key={index} 
                  value={`item-${index}`} 
                  className="border-b border-slate-100 last:border-b-0"
                >
                  <AccordionTrigger className="text-left text-slate-800 hover:no-underline hover:text-sky-700 py-4 gap-3 [&[data-state=open]>svg]:text-sky-600">
                    <span className="flex items-start gap-3">
                      <MessageCircleQuestion className="size-5 text-sky-500 shrink-0 mt-0.5" />
                      <span className="font-medium">{item.question}</span>
                    </span>
                  </AccordionTrigger>
                  <AccordionContent className="text-slate-600 pl-8 pb-4">
                    {item.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
        
        {/* 追加のヘルプリンク */}
        <div className="mt-8 text-center">
          <p className="text-sm text-slate-500">
            その他のご質問は{" "}
            <Link href="/faq" className="text-sky-600 hover:text-sky-700 font-medium underline underline-offset-2">
              FAQページ
            </Link>
            {" "}をご覧ください
          </p>
        </div>
      </div>
    </section>
  );
}
