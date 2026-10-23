import { FadeIn } from "@/components/motion/fade-in";
import { TagList } from "@/components/shared/tag";
import type { JourneyEntry } from "@/types/content";

/** A vertical timeline of how you got here, oldest entry first. */
export function LearningTimeline({ entries }: { entries: JourneyEntry[] }) {
  return (
    <ol className="relative ml-1.5 max-w-3xl border-l-2 border-border">
      {entries.map((entry) => (
        <li key={entry.title} className="relative pb-10 pl-7 last:pb-0">
          <span
            aria-hidden="true"
            className="absolute top-1.5 -left-[7px] size-3 rounded-full bg-primary ring-4 ring-background"
          />
          <FadeIn className="space-y-2">
            <p className="font-mono text-xs text-primary">{entry.period}</p>
            <h3 className="text-xl font-semibold">{entry.title}</h3>
            <p className="leading-7 text-foreground/90">{entry.description}</p>
            {entry.learned && entry.learned.length > 0 && (
              <div className="pt-1">
                <TagList tags={entry.learned} />
              </div>
            )}
          </FadeIn>
        </li>
      ))}
    </ol>
  );
}
