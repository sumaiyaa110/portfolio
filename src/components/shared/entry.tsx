interface EntryProps {
  /** Shown beside the title, e.g. "2023 – Present". */
  period?: string;
  title: string;
  /** Organization, institution or provider. */
  subtitle?: string;
  /** Extra detail after the subtitle, e.g. a location or grade. */
  meta?: string;
  children?: React.ReactNode;
}

/**
 * One dated card. Used for education, publications, experience, courses and
 * achievements.
 */
export function Entry({ period, title, subtitle, meta, children }: EntryProps) {
  return (
    <div className="surface p-5 transition-colors hover:border-primary/30">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between sm:gap-6">
        <div>
          <h3 className="text-base font-semibold leading-snug sm:text-lg">
            {title}
          </h3>
          {(subtitle || meta) && (
            <p className="mt-1 text-sm text-muted-foreground">
              {[subtitle, meta].filter(Boolean).join(" · ")}
            </p>
          )}
        </div>
        {period && (
          <p className="order-first shrink-0 font-mono text-xs text-primary sm:order-none sm:pt-1">
            {period}
          </p>
        )}
      </div>
      {children && (
        <div className="mt-3 space-y-3 leading-7 text-foreground/90">
          {children}
        </div>
      )}
    </div>
  );
}

export function EntryList({ children }: { children: React.ReactNode }) {
  return <div className="grid gap-3">{children}</div>;
}

/** Bulleted details inside an entry. */
export function Highlights({ items }: { items?: string[] }) {
  if (!items?.length) return null;
  return (
    <ul className="list-disc space-y-1.5 pl-5 text-[0.9375rem] marker:text-primary">
      {items.map((item) => (
        <li key={item}>{item}</li>
      ))}
    </ul>
  );
}
