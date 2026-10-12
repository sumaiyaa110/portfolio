import Link from "next/link";

import { cn } from "@/lib/utils";

interface TagProps {
  children: React.ReactNode;
  /** When set, the tag is a link. */
  href?: string;
  className?: string;
}

/** Small monospace label for technologies, blog tags and similar metadata. */
export function Tag({ children, href, className }: TagProps) {
  const classes = cn(
    "inline-flex items-center rounded border bg-muted/60 px-1.5 py-0.5 font-mono text-xs text-muted-foreground",
    href && "transition-colors hover:border-primary/50 hover:text-primary",
    className,
  );

  return href ? (
    <Link href={href} className={classes}>
      {children}
    </Link>
  ) : (
    <span className={classes}>{children}</span>
  );
}

export function TagList({ tags }: { tags: string[] }) {
  return (
    <ul className="flex flex-wrap gap-1.5">
      {tags.map((tag) => (
        <li key={tag}>
          <Tag>{tag}</Tag>
        </li>
      ))}
    </ul>
  );
}
