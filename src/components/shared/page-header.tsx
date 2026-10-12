import { cn } from "@/lib/utils";

interface PageHeaderProps {
  /** Small label above the title, e.g. "Projects". */
  eyebrow: string;
  title: string;
  description?: string;
  className?: string;
}

/** The heading block at the top of every inner page. */
export function PageHeader({
  eyebrow,
  title,
  description,
  className,
}: PageHeaderProps) {
  return (
    <header className={cn("max-w-3xl pt-14 pb-10 sm:pt-20", className)}>
      <p className="inline-flex rounded-full border border-primary/25 bg-primary/10 px-3 py-1 font-mono text-xs font-medium text-primary">
        {eyebrow}
      </p>
      <h1 className="mt-4 text-4xl font-bold text-balance sm:text-5xl">
        {title}
      </h1>
      {description && (
        <p className="mt-4 text-lg leading-8 text-muted-foreground text-pretty">
          {description}
        </p>
      )}
    </header>
  );
}
