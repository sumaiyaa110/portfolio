import Link from "next/link";

import { profile } from "@/data/profile";

import { MainNav } from "./main-nav";
import { MobileNav } from "./mobile-nav";
import { ThemeToggle } from "./theme-toggle";

export function SiteHeader() {
  return (
    <header className="no-print sticky top-0 z-40 border-b bg-background/75 backdrop-blur-md">
      <div className="mx-auto flex h-14 max-w-6xl items-center justify-between gap-4 px-5">
        <Link
          href="/"
          className="flex items-center gap-2.5 font-heading text-base font-semibold tracking-tight"
        >
          <span
            aria-hidden="true"
            className="flex size-7 items-center justify-center rounded-lg bg-primary font-mono text-xs font-bold text-primary-foreground"
          >
            {profile.initials}
          </span>
          {profile.name}
        </Link>
        <div className="flex items-center gap-1">
          <MainNav />
          <ThemeToggle />
          <MobileNav />
        </div>
      </div>
    </header>
  );
}
