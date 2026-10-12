import { cn } from "@/lib/utils";

interface PageHeaderProps {
  /** Small monospace label above the title, e.g. "Projects". */
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
    <header className={cn("max-w-2xl pt-14 pb-10 sm:pt-20", className)}>
      <p className="font-mono text-xs uppercase tracking-widest text-primary">
        {eyebrow}
      </p>
      <h1 className="mt-3 text-4xl font-medium text-balance sm:text-5xl">
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
