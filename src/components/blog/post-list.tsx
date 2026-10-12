import Link from "next/link";

import { FadeIn } from "@/components/motion/fade-in";
import { Tag } from "@/components/shared/tag";
import { slugify, type PostMeta } from "@/lib/blog";
import { formatDate } from "@/lib/format";

export function PostMetaLine({ post }: { post: PostMeta }) {
  return (
    <p className="font-mono text-xs text-muted-foreground">
      <time dateTime={post.date}>{formatDate(post.date)}</time>
      <span aria-hidden="true"> · </span>
      {post.readingTime} min read
      <span aria-hidden="true"> · </span>
      <Link
        href={`/blog/category/${slugify(post.category)}`}
        className="hover:text-primary"
      >
        {post.category}
      </Link>
    </p>
  );
}

export function PostList({ posts }: { posts: PostMeta[] }) {
  if (posts.length === 0) {
    return <p className="text-muted-foreground">No posts here yet.</p>;
  }

  return (
    <ul className="max-w-2xl divide-y divide-dashed divide-rule">
      {posts.map((post, index) => (
        <li key={post.slug} className="py-6 first:pt-0">
          <FadeIn delay={Math.min(index, 4) * 0.05}>
            <article className="space-y-2">
              <PostMetaLine post={post} />
              <h2 className="text-2xl font-medium">
                <Link
                  href={`/blog/${post.slug}`}
                  className="transition-colors hover:text-primary"
                >
                  {post.title}
                </Link>
              </h2>
              <p className="leading-7 text-muted-foreground">
                {post.description}
              </p>
              {post.tags.length > 0 && (
                <ul className="flex flex-wrap gap-1.5 pt-1">
                  {post.tags.map((tag) => (
                    <li key={tag}>
                      <Tag href={`/blog/tag/${slugify(tag)}`}>#{tag}</Tag>
                    </li>
                  ))}
                </ul>
              )}
            </article>
          </FadeIn>
        </li>
      ))}
    </ul>
  );
}
