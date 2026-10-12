import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { PostList } from "@/components/blog/post-list";
import { CategoryNav } from "@/components/blog/term-nav";
import { PageHeader } from "@/components/shared/page-header";
import { getAllCategories, getPostsByCategory } from "@/lib/blog";
import { createMetadata } from "@/lib/seo";

interface CategoryPageProps {
  params: Promise<{ category: string }>;
}

export const dynamicParams = false;

export function generateStaticParams() {
  return getAllCategories().map((category) => ({ category: category.slug }));
}

export async function generateMetadata({
  params,
}: CategoryPageProps): Promise<Metadata> {
  const { category: slug } = await params;
  const category = getAllCategories().find((item) => item.slug === slug);
  if (!category) return {};

  return createMetadata({
    title: `${category.name} posts`,
    description: `Blog posts in the ${category.name} category.`,
    path: `/blog/category/${slug}`,
  });
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { category: slug } = await params;
  const category = getAllCategories().find((item) => item.slug === slug);
  if (!category) notFound();

  return (
    <>
      <PageHeader
        eyebrow="Blog · Category"
        title={category.name}
        description={`${category.count} ${category.count === 1 ? "post" : "posts"} in this category.`}
      />
      <CategoryNav activeSlug={slug} />
      <PostList posts={getPostsByCategory(slug)} />
    </>
  );
}
