import type { Metadata } from "next";

import { siteConfig } from "@/config/site";
import { education } from "@/data/education";
import { profile } from "@/data/profile";
import type { Project, Publication } from "@/types/content";

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

const absoluteUrl = (path: string) => `${siteConfig.url}${path}`;

/** schema.org Person data for the home page. */
export function personJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": absoluteUrl("/#person"),
    name: profile.name,
    description: profile.tagline,
    jobTitle: profile.role,
    url: siteConfig.url,
    ...(profile.photo && { image: absoluteUrl(profile.photo) }),
    email: `mailto:${profile.email}`,
    address: { "@type": "PostalAddress", addressLocality: profile.location },
    affiliation: { "@type": "CollegeOrUniversity", name: profile.university },
    alumniOf: education.map((item) => ({
      "@type": "EducationalOrganization",
      name: item.institution,
    })),
    knowsAbout: [...profile.focus, ...profile.interests],
    sameAs: profile.social
      .filter((link) => link.href.startsWith("http"))
      .map((link) => link.href),
  };
}

/** schema.org data for a project page: the software and its breadcrumb trail. */
export function projectJsonLd(project: Project) {
  const url = absoluteUrl(`/projects/${project.slug}`);
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": project.github ? "SoftwareSourceCode" : "CreativeWork",
        name: project.title,
        description: project.description,
        url,
        author: { "@type": "Person", name: profile.name, url: siteConfig.url },
        keywords: project.technologies.join(", "),
        ...(project.github && { codeRepository: project.github }),
        ...(project.screenshots[0] && {
          image: absoluteUrl(project.screenshots[0]),
        }),
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { name: "Home", item: siteConfig.url },
          { name: "Projects", item: absoluteUrl("/projects") },
          { name: project.title, item: url },
        ].map((crumb, index) => ({
          "@type": "ListItem",
          position: index + 1,
          ...crumb,
        })),
      },
    ],
  };
}

/** schema.org ScholarlyArticle entries for the publications list. */
export function publicationsJsonLd(publications: Publication[]) {
  return {
    "@context": "https://schema.org",
    "@graph": publications.map((publication) => ({
      "@type": "ScholarlyArticle",
      headline: publication.title,
      datePublished: publication.year,
      author: { "@type": "Person", name: profile.name, url: siteConfig.url },
      isPartOf: { "@type": "CreativeWork", name: publication.venue },
      ...(publication.doi && {
        sameAs: `https://doi.org/${publication.doi}`,
        identifier: { "@type": "PropertyValue", propertyID: "DOI", value: publication.doi },
      }),
      ...(!publication.doi && publication.link && { url: publication.link }),
    })),
  };
}
