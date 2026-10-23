import Image from "next/image";

import { cn } from "@/lib/utils";

interface ProjectScreenshotProps {
  /** Path under /public. When missing, a gradient placeholder is shown. */
  src?: string;
  title: string;
  /** Alt text; defaults to "Screenshot of <title>". */
  alt?: string;
  className?: string;
  priority?: boolean;
}

export function ProjectScreenshot({
  src,
  title,
  alt = `Screenshot of ${title}`,
  className,
  priority,
}: ProjectScreenshotProps) {
  return (
    <div
      className={cn(
        "relative aspect-[16/10] overflow-hidden rounded-lg border bg-muted",
        className,
      )}
    >
      {src ? (
        <Image
          src={src}
          alt={alt}
          fill
          priority={priority}
          sizes="(min-width: 1024px) 480px, 100vw"
          className="object-cover object-top"
        />
      ) : (
        <div
          aria-hidden="true"
          className="flex size-full items-center justify-center bg-linear-to-br from-primary/20 via-accent to-(--primary-2)/20 p-4"
        >
          <span className="text-center font-heading text-lg font-bold text-accent-foreground/70 text-balance">
            {title}
          </span>
        </div>
      )}
    </div>
  );
}
