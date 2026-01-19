import fs from 'node:fs/promises';
import path from 'node:path';
import matter from 'gray-matter';
import { marked } from 'marked';
import type { DocFrontmatter, DocMeta, DocData } from '../docs.type';

// カテゴリ別のディレクトリパス
const CONTENT_DIRECTORY = path.join(process.cwd(), 'src/content');

export type DocCategory = 'guide' | 'tips';

/**
 * カテゴリに対応するディレクトリパスを取得
 */
function getCategoryDirectory(category: DocCategory): string {
  return path.join(CONTENT_DIRECTORY, category);
}

/**
 * 指定カテゴリのすべての記事のslug一覧を取得
 */
export async function getAllDocSlugs(category: DocCategory): Promise<string[]> {
  try {
    const dir = getCategoryDirectory(category);
    const files = await fs.readdir(dir);
    return files
      .filter((file) => file.endsWith('.md'))
      .map((file) => file.replace(/\.md$/, ''));
  } catch {
    return [];
  }
}

/**
 * 指定カテゴリのすべての記事のメタデータ一覧を取得
 */
export async function getAllDocsMeta(category: DocCategory): Promise<DocMeta[]> {
  const slugs = await getAllDocSlugs(category);
  const docs = await Promise.all(
    slugs.map(async (slug) => {
      const meta = await getDocMeta(category, slug);
      return meta;
    })
  );
  return docs.filter((doc): doc is DocMeta => doc !== null);
}

/**
 * 指定カテゴリ・slugの記事メタデータを取得
 */
export async function getDocMeta(category: DocCategory, slug: string): Promise<DocMeta | null> {
  try {
    const dir = getCategoryDirectory(category);
    const filePath = path.join(dir, `${slug}.md`);
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
 * 指定カテゴリ・slugの記事データ（本文HTML含む）を取得
 */
export async function getDocBySlug(category: DocCategory, slug: string): Promise<DocData | null> {
  try {
    const dir = getCategoryDirectory(category);
    const filePath = path.join(dir, `${slug}.md`);
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
