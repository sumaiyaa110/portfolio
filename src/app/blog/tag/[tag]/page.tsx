import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { PostList } from "@/components/blog/post-list";
import { PageHeader } from "@/components/shared/page-header";
import { getAllTags, getPostsByTag } from "@/lib/blog";
import { createMetadata } from "@/lib/seo";

interface TagPageProps {
  params: Promise<{ tag: string }>;
}

export const dynamicParams = false;

export function generateStaticParams() {
  return getAllTags().map((tag) => ({ tag: tag.slug }));
}

export async function generateMetadata({
  params,
}: TagPageProps): Promise<Metadata> {
  const { tag: slug } = await params;
  const tag = getAllTags().find((item) => item.slug === slug);
  if (!tag) return {};

  return createMetadata({
    title: `Posts tagged #${tag.name}`,
    description: `Blog posts tagged ${tag.name}.`,
    path: `/blog/tag/${slug}`,
  });
}

export default async function TagPage({ params }: TagPageProps) {
  const { tag: slug } = await params;
  const tag = getAllTags().find((item) => item.slug === slug);
  if (!tag) notFound();

  return (
    <>
      <PageHeader
        eyebrow="Blog · Tag"
        title={`#${tag.name}`}
        description={`${tag.count} ${tag.count === 1 ? "post" : "posts"} with this tag.`}
      />
      <p className="mb-10 text-sm">
        <Link href="/blog" className="link">
          View all posts
        </Link>
      </p>
      <PostList posts={getPostsByTag(slug)} />
    </>
  );
}
