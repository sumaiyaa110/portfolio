/**
 * Site-wide settings that are not personal content.
 * Personal details live in `src/data/profile.ts`.
 */
export const siteConfig = {
  /**
   * Public URL of the site. On Vercel this is detected automatically; set
   * NEXT_PUBLIC_SITE_URL only to override it (e.g. for a custom domain).
   */
  url: (
    process.env.NEXT_PUBLIC_SITE_URL ??
    (process.env.VERCEL_PROJECT_PRODUCTION_URL
      ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
      : "http://localhost:3000")
  ).replace(/\/$/, ""),
  nav: [
    { label: "About", href: "/about" },
    { label: "Projects", href: "/projects" },
    { label: "Skills", href: "/skills" },
    { label: "Experience", href: "/experience" },
    { label: "Resume", href: "/resume" },
    { label: "Contact", href: "/contact" },
  ],
} as const;

export type NavItem = (typeof siteConfig.nav)[number];
