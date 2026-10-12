import { ArrowUpRightIcon } from "lucide-react";

import { GitHubIcon } from "@/components/shared/icons";
import type { Project } from "@/types/content";

const linkClass =
  "inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-primary";

/** GitHub and live demo links; each is shown only if the project has it. */
export function ProjectLinks({ project }: { project: Project }) {
  if (!project.github && !project.demo) return null;

  return (
    <div className="flex flex-wrap items-center gap-5">
      {project.github && (
        <a
          href={project.github}
          target="_blank"
          rel="noopener noreferrer"
          className={linkClass}
        >
          <GitHubIcon className="size-4" />
          Source
        </a>
      )}
      {project.demo && (
        <a
          href={project.demo}
          target="_blank"
          rel="noopener noreferrer"
          className={linkClass}
        >
          <ArrowUpRightIcon className="size-4" />
          Live demo
        </a>
      )}
    </div>
  );
}
