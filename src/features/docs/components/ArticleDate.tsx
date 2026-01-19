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
    <div className="flex flex-wrap gap-4 text-sm text-slate-500 mb-6">
      {createdAt && (
        <div className="flex items-center gap-1.5">
          <CalendarIcon className="w-4 h-4" />
          <span>登録日: {formatDate(createdAt)}</span>
        </div>
      )}
      {updatedAt && (
        <div className="flex items-center gap-1.5">
          <RefreshCwIcon className="w-4 h-4" />
          <span>更新日: {formatDate(updatedAt)}</span>
        </div>
      )}
    </div>
  );
}
