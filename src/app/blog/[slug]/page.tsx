import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeftIcon } from "lucide-react";

import { MdxContent } from "@/components/blog/mdx-content";
import { PostMetaLine } from "@/components/blog/post-list";
import { Tag } from "@/components/shared/tag";
import { siteConfig } from "@/config/site";
import { profile } from "@/data/profile";
import { getAllPosts, getPost, slugify } from "@/lib/blog";
import { createMetadata } from "@/lib/seo";

interface PostPageProps {
  params: Promise<{ slug: string }>;
}

export const dynamicParams = false;

export function generateStaticParams() {
  return getAllPosts().map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: PostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return {};

  return createMetadata({
    title: post.title,
    description: post.description,
    path: `/blog/${post.slug}`,
    type: "article",
    publishedTime: post.date,
    tags: post.tags,
  });
}

export default async function PostPage({ params }: PostPageProps) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.description,
    datePublished: post.date,
    author: { "@type": "Person", name: profile.name, url: siteConfig.url },
    keywords: post.tags.join(", "),
    url: `${siteConfig.url}/blog/${post.slug}`,
  };

  return (
    <article className="mx-auto max-w-2xl pt-10 sm:pt-16">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Link
        href="/blog"
        className="inline-flex items-center gap-1.5 font-mono text-xs text-muted-foreground transition-colors hover:text-primary"
      >
        <ArrowLeftIcon className="size-3.5" />
        All notes
      </Link>

      <header className="mt-8 mb-10 space-y-4 border-b border-dashed border-rule pb-8">
        <PostMetaLine post={post} />
        <h1 className="text-4xl font-medium text-balance sm:text-[2.75rem] sm:leading-[1.1]">
          {post.title}
        </h1>
        <p className="text-lg leading-8 text-muted-foreground text-pretty">
          {post.description}
        </p>
      </header>

      <MdxContent source={post.content} />

      {post.tags.length > 0 && (
        <footer className="mt-12 flex flex-wrap items-center gap-2 border-t border-dashed border-rule pt-6">
          <span className="font-mono text-xs text-muted-foreground">
            Filed under
          </span>
          {post.tags.map((tag) => (
            <Tag key={tag} href={`/blog/tag/${slugify(tag)}`}>
              #{tag}
            </Tag>
          ))}
        </footer>
      )}
    </article>
  );
}
