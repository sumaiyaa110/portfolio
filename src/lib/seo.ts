import type { Metadata } from "next";

import { siteConfig } from "@/config/site";
import { profile } from "@/data/profile";

interface PageMetadataInput {
  title: string;
  description: string;
  /** Path of the page, e.g. "/about". */
  path: string;
  type?: "website" | "article";
  publishedTime?: string;
  tags?: string[];
}

/** Builds consistent title, description, canonical URL and social tags. */
export function createMetadata({
  title,
  description,
  path,
  type = "website",
  publishedTime,
  tags,
}: PageMetadataInput): Metadata {
  return {
    title,
    description,
    keywords: tags,
    alternates: { canonical: path },
    openGraph: {
      title: `${title} · ${profile.name}`,
      description,
      url: path,
      siteName: profile.name,
      type,
      ...(type === "article" && {
        publishedTime,
        authors: [profile.name],
        tags,
      }),
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} · ${profile.name}`,
      description,
    },
  };
}

/** schema.org Person data for the home page. */
export function personJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: profile.name,
    description: profile.tagline,
    url: siteConfig.url,
    email: profile.email,
    affiliation: { "@type": "CollegeOrUniversity", name: profile.university },
    sameAs: profile.social
      .filter((link) => link.href.startsWith("http"))
      .map((link) => link.href),
  };
}
