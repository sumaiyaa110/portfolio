/**
 * Site-wide settings that are not personal content.
 * Personal details live in `src/data/profile.ts`.
 */
export const siteConfig = {
  /** Public URL of the deployed site. Set NEXT_PUBLIC_SITE_URL in Vercel. */
  url: (process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000").replace(
    /\/$/,
    "",
  ),
  nav: [
    { label: "About", href: "/about" },
    { label: "Projects", href: "/projects" },
    { label: "Skills", href: "/skills" },
    { label: "Experience", href: "/experience" },
    { label: "Blog", href: "/blog" },
    { label: "Resume", href: "/resume" },
    { label: "Contact", href: "/contact" },
  ],
} as const;

export type NavItem = (typeof siteConfig.nav)[number];
