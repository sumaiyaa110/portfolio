import Link from "next/link";

import { profile } from "@/data/profile";

import { MainNav } from "./main-nav";
import { MobileNav } from "./mobile-nav";
import { ThemeToggle } from "./theme-toggle";

export function SiteHeader() {
  return (
    <header className="no-print sticky top-0 z-40 border-b bg-background/85 backdrop-blur">
      <div className="mx-auto flex h-14 max-w-5xl items-center justify-between gap-4 px-5">
        <Link
          href="/"
          className="font-serif text-lg font-medium tracking-tight"
        >
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
