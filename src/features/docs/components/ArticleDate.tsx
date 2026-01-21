import { CalendarIcon, RefreshCwIcon } from 'lucide-react';

interface ArticleDateProps {
  createdAt?: string;
  updatedAt?: string;
}

/**
 * 日付をフォーマット（YYYY-MM-DD → YYYY年M月D日）
 */
function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString('ja-JP', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

export function ArticleDate({ createdAt, updatedAt }: ArticleDateProps) {
  if (!createdAt && !updatedAt) {
    return null;
  }

  return (
    <div className="flex flex-wrap gap-3 text-sm mb-6">
      {createdAt && (
        <div className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-sky-50 text-sky-700 rounded-full">
          <CalendarIcon className="w-3.5 h-3.5" />
          <span className="font-medium">{formatDate(createdAt)}</span>
        </div>
      )}
      {updatedAt && updatedAt !== createdAt && (
        <div className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-amber-50 text-amber-700 rounded-full">
          <RefreshCwIcon className="w-3.5 h-3.5" />
          <span className="text-xs">更新</span>
          <span className="font-medium">{formatDate(updatedAt)}</span>
        </div>
      )}
    </div>
  );
}
