"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { MenuIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";

import { isActivePath } from "./main-nav";

export function MobileNav() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger
        render={
          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden"
            aria-label="Open menu"
          />
        }
      >
        <MenuIcon />
      </SheetTrigger>
      <SheetContent side="right" className="w-72">
        <SheetHeader>
          <SheetTitle className="font-mono text-xs font-normal uppercase tracking-widest text-muted-foreground">
            Contents
          </SheetTitle>
        </SheetHeader>
        <nav aria-label="Mobile" className="flex flex-col px-4">
          {[{ label: "Home", href: "/" }, ...siteConfig.nav].map(
            (item, index) => {
              const active =
                item.href === "/"
                  ? pathname === "/"
                  : isActivePath(pathname, item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  aria-current={active ? "page" : undefined}
                  className={cn(
                    "flex items-baseline gap-4 border-b border-border py-3 font-heading text-lg font-medium",
                    active ? "text-primary" : "text-foreground",
                  )}
                >
                  <span className="font-mono text-xs text-muted-foreground">
                    {String(index).padStart(2, "0")}
                  </span>
                  {item.label}
                </Link>
              );
            },
          )}
        </nav>
      </SheetContent>
    </Sheet>
  );
}
