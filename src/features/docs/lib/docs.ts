import fs from 'node:fs/promises';
import path from 'node:path';
import matter from 'gray-matter';
import { marked } from 'marked';
import type { DocFrontmatter, DocMeta, DocData } from '../docs.type';

// Markdown記事のディレクトリパス
const DOCS_DIRECTORY = path.join(process.cwd(), 'src/content/doc');

/**
 * すべての記事のslug一覧を取得
 */
export async function getAllDocSlugs(): Promise<string[]> {
  try {
    const files = await fs.readdir(DOCS_DIRECTORY);
    return files
      .filter((file) => file.endsWith('.md'))
      .map((file) => file.replace(/\.md$/, ''));
  } catch {
    return [];
  }
}

/**
 * すべての記事のメタデータ一覧を取得
 */
export async function getAllDocsMeta(): Promise<DocMeta[]> {
  const slugs = await getAllDocSlugs();
  const docs = await Promise.all(
    slugs.map(async (slug) => {
      const meta = await getDocMeta(slug);
      return meta;
    })
  );
  return docs.filter((doc): doc is DocMeta => doc !== null);
}

/**
 * 指定slugの記事メタデータを取得
 */
export async function getDocMeta(slug: string): Promise<DocMeta | null> {
  try {
    const filePath = path.join(DOCS_DIRECTORY, `${slug}.md`);
    const fileContent = await fs.readFile(filePath, 'utf-8');
    const { data } = matter(fileContent);
    const frontmatter = data as DocFrontmatter;

    return {
      slug,
      title: frontmatter.title || slug,
      description: frontmatter.description || '',
    };
  } catch {
    return null;
  }
}

/**
 * 指定slugの記事データ（本文HTML含む）を取得
 */
export async function getDocBySlug(slug: string): Promise<DocData | null> {
  try {
    const filePath = path.join(DOCS_DIRECTORY, `${slug}.md`);
    const fileContent = await fs.readFile(filePath, 'utf-8');
    const { data, content } = matter(fileContent);
    const frontmatter = data as DocFrontmatter;

    // Markdown→HTML変換
    const contentHtml = await marked(content);

    return {
      slug,
      title: frontmatter.title || slug,
      description: frontmatter.description || '',
      contentHtml,
    };
  } catch {
    return null;
  }
}
