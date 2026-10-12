import Link from "next/link";

import { SocialLinks } from "@/components/shared/social-links";
import { siteConfig } from "@/config/site";
import { profile } from "@/data/profile";

export function SiteFooter() {
  return (
    <footer className="no-print mt-24 border-t">
      <div className="mx-auto flex max-w-5xl flex-col gap-6 px-5 py-10 sm:flex-row sm:items-start sm:justify-between">
        <div className="space-y-2">
          <p className="font-serif text-lg">{profile.name}</p>
          <p className="text-sm text-muted-foreground">
            {profile.role} · {profile.university}
          </p>
          <SocialLinks className="pt-2" />
        </div>
        <nav
          aria-label="Footer"
          className="grid grid-cols-2 gap-x-10 gap-y-2 text-sm sm:grid-cols-2"
        >
          {siteConfig.nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-muted-foreground transition-colors hover:text-foreground"
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
      <div className="mx-auto max-w-5xl px-5 pb-8">
        <p className="font-mono text-xs text-muted-foreground">
          © {new Date().getFullYear()} {profile.name}. Built with Next.js.
        </p>
      </div>
    </footer>
  );
}
