interface EntryProps {
  /** Shown in the left margin, e.g. "2023 – Present". */
  period: string;
  title: string;
  /** Organization, institution or provider. */
  subtitle?: string;
  /** Extra detail after the subtitle, e.g. a location or grade. */
  meta?: string;
  children?: React.ReactNode;
}

/**
 * One dated row: the date sits in a left "margin" column and the detail on the
 * right. Used for education, experience, courses and achievements.
 */
export function Entry({ period, title, subtitle, meta, children }: EntryProps) {
  return (
    <div className="grid gap-1 sm:grid-cols-[9.5rem_1fr] sm:gap-6">
      <p className="font-mono text-xs text-muted-foreground sm:pt-1.5">
        {period}
      </p>
      <div>
        <h3 className="text-lg font-medium leading-snug">{title}</h3>
        {(subtitle || meta) && (
          <p className="mt-0.5 text-sm text-muted-foreground">
            {[subtitle, meta].filter(Boolean).join(" · ")}
          </p>
        )}
        {children && (
          <div className="mt-3 space-y-3 leading-7 text-foreground/90">
            {children}
          </div>
        )}
      </div>
    </div>
  );
}

export function EntryList({ children }: { children: React.ReactNode }) {
  return <div className="space-y-8">{children}</div>;
}

/** Bulleted details inside an entry. */
export function Highlights({ items }: { items?: string[] }) {
  if (!items?.length) return null;
  return (
    <ul className="list-disc space-y-1.5 pl-5 text-[0.9375rem] marker:text-muted-foreground">
      {items.map((item) => (
        <li key={item}>{item}</li>
      ))}
    </ul>
  );
}
