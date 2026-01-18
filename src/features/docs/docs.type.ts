/**
 * Markdown記事のfrontmatter型定義
 */
export interface DocFrontmatter {
  title?: string;
  description?: string;
}

/**
 * 記事メタデータ型定義
 */
export interface DocMeta {
  slug: string;
  title: string;
  description: string;
}

/**
 * 記事データ型定義（本文HTML含む）
 */
export interface DocData extends DocMeta {
  contentHtml: string;
}
