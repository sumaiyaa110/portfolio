import { cn } from "@/lib/utils";

interface SectionProps {
  title: string;
  /** Optional link or note shown on the right of the heading. */
  action?: React.ReactNode;
  id?: string;
  className?: string;
  children: React.ReactNode;
}

/** A titled block of a page, with an accent bar beside the heading. */
export function Section({ title, action, id, className, children }: SectionProps) {
  return (
    <section id={id} className={cn("scroll-mt-20 py-12", className)}>
      <div className="mb-7 flex items-center justify-between gap-4">
        <h2 className="flex items-center gap-3 text-2xl font-bold sm:text-3xl">
          <span
            aria-hidden="true"
            className="h-6 w-1.5 rounded-full bg-linear-to-b from-primary to-(--primary-2)"
          />
          {title}
        </h2>
        {action && <div className="shrink-0 text-sm">{action}</div>}
      </div>
      {children}
    </section>
  );
}
