import type { MetadataRoute } from "next";

import { siteConfig } from "@/config/site";
import { projects } from "@/data/projects";
import { getAllCategories, getAllPosts, getAllTags } from "@/lib/blog";

export default function sitemap(): MetadataRoute.Sitemap {
  const url = (path: string) => `${siteConfig.url}${path}`;

  return [
    { url: url("/") },
    ...siteConfig.nav.map((item) => ({ url: url(item.href) })),
    ...projects.map((project) => ({ url: url(`/projects/${project.slug}`) })),
    ...getAllPosts().map((post) => ({
      url: url(`/blog/${post.slug}`),
      lastModified: post.date,
    })),
    ...getAllCategories().map((category) => ({
      url: url(`/blog/category/${category.slug}`),
    })),
    ...getAllTags().map((tag) => ({ url: url(`/blog/tag/${tag.slug}`) })),
  ];
}
