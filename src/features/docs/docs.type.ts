/**
 * Markdown記事のfrontmatter型定義
 */
export interface DocFrontmatter {
  title?: string;
  description?: string;
  createdAt?: string;
  updatedAt?: string;
}

/**
 * 目次アイテムの型定義
 */
export interface TocItem {
  id: string;
  text: string;
  level: number;
}

/**
 * 記事メタデータ型定義
 */
export interface DocMeta {
  slug: string;
  title: string;
  description: string;
  createdAt?: string;
  updatedAt?: string;
}

/**
 * 記事データ型定義（本文HTML含む）
 */
export interface DocData extends DocMeta {
  contentHtml: string;
  toc: TocItem[];
}
