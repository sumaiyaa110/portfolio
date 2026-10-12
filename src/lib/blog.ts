import fs from "node:fs";
import path from "node:path";

import matter from "gray-matter";
import { z } from "zod";

/**
 * Blog posts are .mdx files in /content/blog. The file name is the URL slug.
 * Everything here runs at build time on the server.
 */
const BLOG_DIR = path.join(process.cwd(), "content", "blog");
const WORDS_PER_MINUTE = 220;

const frontmatterSchema = z.object({
  title: z.string(),
  description: z.string(),
  date: z.coerce.date(),
  category: z.string(),
  tags: z.array(z.string()).default([]),
  /** Drafts are visible in development and hidden in production. */
  draft: z.boolean().default(false),
});

export interface PostMeta {
  slug: string;
  title: string;
  description: string;
  /** ISO date string. */
  date: string;
  category: string;
  tags: string[];
  /** Estimated minutes to read. */
  readingTime: number;
}

export interface Post extends PostMeta {
  /** Raw MDX body, without frontmatter. */
  content: string;
}

/** Turns "Machine Learning" into "machine-learning" for use in URLs. */
export function slugify(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

function readingTime(text: string) {
  const words = text.trim().split(/\s+/).length;
  return Math.max(1, Math.round(words / WORDS_PER_MINUTE));
}

function readPost(fileName: string): Post & { draft: boolean } {
  const slug = fileName.replace(/\.mdx?$/, "");
  const raw = fs.readFileSync(path.join(BLOG_DIR, fileName), "utf8");
  const { data, content } = matter(raw);

  const parsed = frontmatterSchema.safeParse(data);
  if (!parsed.success) {
    throw new Error(
      `Invalid frontmatter in content/blog/${fileName}:\n${z.prettifyError(parsed.error)}`,
    );
  }

  const { date, ...frontmatter } = parsed.data;
  return {
    slug,
    ...frontmatter,
    date: date.toISOString(),
    readingTime: readingTime(content),
    content,
  };
}

/** All published posts, newest first. */
export function getAllPosts(): Post[] {
  if (!fs.existsSync(BLOG_DIR)) return [];

  return fs
    .readdirSync(BLOG_DIR)
    .filter((fileName) => /\.mdx?$/.test(fileName))
    .map(readPost)
    .filter((post) => process.env.NODE_ENV !== "production" || !post.draft)
    .sort((a, b) => b.date.localeCompare(a.date));
}

export function getPost(slug: string) {
  return getAllPosts().find((post) => post.slug === slug);
}

export interface Term {
  name: string;
  slug: string;
  count: number;
}

function countTerms(values: string[]): Term[] {
  const terms = new Map<string, Term>();
  for (const name of values) {
    const slug = slugify(name);
    const existing = terms.get(slug);
    if (existing) existing.count += 1;
    else terms.set(slug, { name, slug, count: 1 });
  }
  return [...terms.values()].sort((a, b) => a.name.localeCompare(b.name));
}

export function getAllCategories(): Term[] {
  return countTerms(getAllPosts().map((post) => post.category));
}

export function getAllTags(): Term[] {
  return countTerms(getAllPosts().flatMap((post) => post.tags));
}

export function getPostsByCategory(categorySlug: string) {
  return getAllPosts().filter((post) => slugify(post.category) === categorySlug);
}

export function getPostsByTag(tagSlug: string) {
  return getAllPosts().filter((post) =>
    post.tags.some((tag) => slugify(tag) === tagSlug),
  );
}
