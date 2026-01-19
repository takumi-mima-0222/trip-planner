'use client';

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import type { TocItem } from '../docs.type';

interface TableOfContentsProps {
  items: TocItem[];
}

export function TableOfContents({ items }: TableOfContentsProps) {
  if (items.length === 0) {
    return null;
  }

  return (
    <Accordion type="single" collapsible defaultValue="toc" className="mb-6">
      <AccordionItem value="toc" className="border border-sky-200 rounded-lg bg-sky-50/50">
        <AccordionTrigger className="px-4 py-3 text-sky-900 font-semibold hover:no-underline">
          目次
        </AccordionTrigger>
        <AccordionContent className="px-4 pb-4">
          <nav aria-label="目次">
            <ul className="space-y-1">
              {items.map((item) => (
                <li
                  key={item.id}
                  className={item.level === 3 ? 'ml-4' : ''}
                >
                  <a
                    href={`#${item.id}`}
                    className="text-sm text-slate-600 hover:text-sky-600 hover:underline transition-colors block py-1"
                  >
                    {item.level === 3 && '└ '}
                    {item.text}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}
