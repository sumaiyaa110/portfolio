import Link from "next/link";

import { getAllCategories } from "@/lib/blog";
import { cn } from "@/lib/utils";

/** Category filter shown above every blog listing. */
export function CategoryNav({ activeSlug }: { activeSlug?: string }) {
  const categories = getAllCategories();
  if (categories.length === 0) return null;

  const items = [
    { name: "All", href: "/blog", active: activeSlug === undefined },
    ...categories.map((category) => ({
      name: `${category.name} (${category.count})`,
      href: `/blog/category/${category.slug}`,
      active: category.slug === activeSlug,
    })),
  ];

  return (
    <nav aria-label="Blog categories" className="mb-10 flex flex-wrap gap-2">
      {items.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          aria-current={item.active ? "page" : undefined}
          className={cn(
            "rounded-full border px-3 py-1 font-mono text-xs transition-colors",
            item.active
              ? "border-primary bg-primary text-primary-foreground"
              : "text-muted-foreground hover:border-primary/50 hover:text-primary",
          )}
        >
          {item.name}
        </Link>
      ))}
    </nav>
  );
}
