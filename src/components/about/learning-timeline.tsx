import { FadeIn } from "@/components/motion/fade-in";
import { TagList } from "@/components/shared/tag";
import type { JourneyEntry } from "@/types/content";

/** A vertical timeline of how you got here, oldest entry first. */
export function LearningTimeline({ entries }: { entries: JourneyEntry[] }) {
  return (
    <ol className="relative ml-1.5 max-w-2xl border-l border-dashed border-rule">
      {entries.map((entry, index) => (
        <li key={entry.title} className="relative pb-10 pl-7 last:pb-0">
          <span
            aria-hidden="true"
            className="absolute top-1.5 -left-[5px] size-[9px] rounded-full border-2 border-primary bg-background"
          />
          <FadeIn delay={Math.min(index, 4) * 0.05} className="space-y-2">
            <p className="font-mono text-xs text-primary">{entry.period}</p>
            <h3 className="text-xl font-medium">{entry.title}</h3>
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
