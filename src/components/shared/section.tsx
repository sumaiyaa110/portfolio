import { cn } from "@/lib/utils";

interface SectionProps {
  title: string;
  /** Optional link or note shown on the right of the heading. */
  action?: React.ReactNode;
  id?: string;
  className?: string;
  children: React.ReactNode;
}

/** A titled block with a dashed rule, like a ruled notebook heading. */
export function Section({ title, action, id, className, children }: SectionProps) {
  return (
    <section id={id} className={cn("scroll-mt-20 py-10", className)}>
      <div className="mb-6 flex items-baseline justify-between gap-4 border-b border-dashed border-rule pb-3">
        <h2 className="text-2xl font-medium">{title}</h2>
        {action && <div className="shrink-0 text-sm">{action}</div>}
      </div>
      {children}
    </section>
  );
}
