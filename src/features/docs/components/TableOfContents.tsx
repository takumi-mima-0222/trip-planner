'use client';

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { ListIcon } from 'lucide-react';
import type { TocItem } from '../docs.type';

interface TableOfContentsProps {
  items: TocItem[];
}

export function TableOfContents({ items }: TableOfContentsProps) {
  if (items.length === 0) {
    return null;
  }

  return (
    <Accordion type="single" collapsible defaultValue="toc" className="mb-8">
      <AccordionItem value="toc" className="border border-sky-200 rounded-xl bg-gradient-to-r from-sky-50/80 to-sky-50/50 backdrop-blur-sm overflow-hidden">
        <AccordionTrigger className="px-5 py-4 text-sky-900 font-semibold hover:no-underline hover:bg-sky-50/50 transition-colors">
          <div className="flex items-center gap-2">
            <ListIcon className="w-4 h-4 text-sky-500" />
            <span>目次</span>
            <span className="text-xs text-sky-500 font-normal ml-1">({items.length}件)</span>
          </div>
        </AccordionTrigger>
        <AccordionContent className="px-5 pb-5 pt-1">
          <nav aria-label="目次">
            <ul className="space-y-1">
              {(() => {
                let h2Index = 0;
                return items.map((item) => {
                  if (item.level === 2) h2Index++;
                  return (
                    <li
                      key={item.id}
                      className={item.level === 3 ? 'ml-5' : ''}
                    >
                      <a
                        href={`#${item.id}`}
                        className="group flex items-center gap-2 text-sm text-slate-600 hover:text-sky-600 transition-colors py-1.5 px-2 -mx-2 rounded-lg hover:bg-sky-50/50"
                      >
                        {item.level === 2 && (
                          <span className="w-5 h-5 rounded-md bg-sky-100 text-sky-600 text-xs font-medium flex items-center justify-center shrink-0 group-hover:bg-sky-200 transition-colors">
                            {h2Index}
                          </span>
                        )}
                        {item.level === 3 && (
                          <span className="w-1.5 h-1.5 rounded-full bg-sky-300 shrink-0" />
                        )}
                        <span className={item.level === 3 ? 'text-slate-500' : ''}>{item.text}</span>
                      </a>
                    </li>
                  );
                });
              })()}
            </ul>
          </nav>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}
