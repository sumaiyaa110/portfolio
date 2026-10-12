import Image from "next/image";

import { cn } from "@/lib/utils";

interface ProjectScreenshotProps {
  /** Path under /public. When missing, a ruled placeholder is shown. */
  src?: string;
  title: string;
  className?: string;
  priority?: boolean;
}

export function ProjectScreenshot({
  src,
  title,
  className,
  priority,
}: ProjectScreenshotProps) {
  return (
    <div
      className={cn(
        "relative aspect-[16/10] overflow-hidden rounded-md border bg-muted",
        className,
      )}
    >
      {src ? (
        <Image
          src={src}
          alt={`Screenshot of ${title}`}
          fill
          priority={priority}
          sizes="(min-width: 1024px) 480px, 100vw"
          className="object-cover object-top"
        />
      ) : (
        <div
          aria-hidden="true"
          className="flex size-full items-center justify-center bg-[repeating-linear-gradient(to_bottom,transparent_0,transparent_23px,var(--border)_23px,var(--border)_24px)]"
        >
          <span className="rounded bg-muted px-2 py-1 font-mono text-xs text-muted-foreground">
            screenshot
          </span>
        </div>
      )}
    </div>
  );
}
