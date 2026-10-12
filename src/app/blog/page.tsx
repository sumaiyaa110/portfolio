import { PostList } from "@/components/blog/post-list";
import { CategoryNav } from "@/components/blog/term-nav";
import { PageHeader } from "@/components/shared/page-header";
import { getAllPosts } from "@/lib/blog";
import { createMetadata } from "@/lib/seo";

const description =
  "Notes on what I'm learning: course material, project write-ups and things that took me too long to figure out.";

export const metadata = createMetadata({
  title: "Blog",
  description,
  path: "/blog",
});

export default function BlogPage() {
  return (
    <>
      <PageHeader eyebrow="Blog" title="Notes" description={description} />
      <CategoryNav />
      <PostList posts={getAllPosts()} />
    </>
  );
}
