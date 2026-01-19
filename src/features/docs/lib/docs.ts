import fs from 'node:fs/promises';
import path from 'node:path';
import matter from 'gray-matter';
import { Marked, type Token, type Tokens } from 'marked';
import type { DocFrontmatter, DocMeta, DocData, TocItem } from '../docs.type';

// カテゴリ別のディレクトリパス
const CONTENT_DIRECTORY = path.join(process.cwd(), 'src/content');

export type DocCategory = 'guide' | 'tips';

/**
 * 日本語テキストからスラッグを生成
 */
function generateSlug(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\p{L}\p{N}\s-]/gu, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim();
}

/**
 * 目次を生成しつつ見出しにIDを付与するmarked拡張
 */
function createHeadingRenderer(toc: TocItem[]) {
  return {
    renderer: {
      heading({ tokens, depth }: Tokens.Heading): string {
        const text = tokens.map((t: Token) => ('text' in t ? t.text : '')).join('');
        const id = generateSlug(text);
        
        // h2, h3を目次に追加
        if (depth === 2 || depth === 3) {
          toc.push({ id, text, level: depth });
        }
        
        return `<h${depth} id="${id}">${text}</h${depth}>`;
      },
    },
  };
}

/**
 * 画像にサイズを指定できるカスタムレンダラー
 * ![alt|width=400](src) または ![alt|width=400,height=300](src) 形式をサポート
 */
function createImageRenderer() {
  return {
    renderer: {
      image({ href, title, text }: Tokens.Image): string {
        // text(alt)からサイズ情報を抽出
        const sizeMatch = text.match(/^(.+?)\|(?:width=(\d+))?(?:,?height=(\d+))?$/);
        
        let alt = text;
        let widthAttr = '';
        let heightAttr = '';
        
        if (sizeMatch) {
          alt = sizeMatch[1].trim();
          if (sizeMatch[2]) {
            widthAttr = ` width="${sizeMatch[2]}"`;
          }
          if (sizeMatch[3]) {
            heightAttr = ` height="${sizeMatch[3]}"`;
          }
        }
        
        const titleAttr = title ? ` title="${title}"` : '';
        return `<img src="${href}" alt="${alt}"${widthAttr}${heightAttr}${titleAttr} />`;
      },
    },
  };
}

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
      createdAt: frontmatter.createdAt,
      updatedAt: frontmatter.updatedAt,
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

    // 目次用配列
    const toc: TocItem[] = [];
    
    // markedのインスタンスを作成してカスタムレンダラーを設定
    const markedInstance = new Marked();
    markedInstance.use(createHeadingRenderer(toc));
    markedInstance.use(createImageRenderer());

    // Markdown→HTML変換
    const contentHtml = await markedInstance.parse(content);

    return {
      slug,
      title: frontmatter.title || slug,
      description: frontmatter.description || '',
      createdAt: frontmatter.createdAt,
      updatedAt: frontmatter.updatedAt,
      contentHtml,
      toc,
    };
  } catch {
    return null;
  }
}
