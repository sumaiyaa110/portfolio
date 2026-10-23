import { cn } from "@/lib/utils";

interface FadeInProps {
  children: React.ReactNode;
  /** Position in a list (0, 1, 2, ...), used to stagger neighbouring items. */
  stagger?: number;
  className?: string;
}

/**
 * Fades content in and lifts it slightly as it scrolls into view.
 *
 * Pure CSS (a scroll-driven animation, see `.fade-in` in globals.css), so the
 * content is always in the HTML and visible: browsers without support, visitors
 * who prefer reduced motion, and crawlers simply see it without the effect.
 */
export function FadeIn({ children, stagger = 0, className }: FadeInProps) {
  return (
    <div
      className={cn("fade-in", className)}
      style={
        stagger > 0
          ? ({ "--fade-stagger": Math.min(stagger, 5) } as React.CSSProperties)
          : undefined
      }
    >
      {children}
    </div>
  );
}
