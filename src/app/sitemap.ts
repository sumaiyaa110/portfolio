import type { MetadataRoute } from "next";

import { siteConfig } from "@/config/site";
import { projects } from "@/data/projects";

export default function sitemap(): MetadataRoute.Sitemap {
  const url = (path: string) => `${siteConfig.url}${path}`;

  return [
    { url: url("/") },
    ...siteConfig.nav.map((item) => ({ url: url(item.href) })),
    ...projects.map((project) => ({ url: url(`/projects/${project.slug}`) })),
  ];
}
