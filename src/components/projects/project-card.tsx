import Link from "next/link";

import { TagList } from "@/components/shared/tag";
import type { Project } from "@/types/content";

import { ProjectLinks } from "./project-links";
import { ProjectScreenshot } from "./project-screenshot";

export function ProjectCard({ project }: { project: Project }) {
  return (
    <article className="group flex h-full flex-col rounded-lg border bg-card p-3 transition duration-200 hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-sm motion-reduce:transform-none">
      <Link
        href={`/projects/${project.slug}`}
        tabIndex={-1}
        aria-hidden="true"
      >
        <ProjectScreenshot src={project.screenshots[0]} title={project.title} />
      </Link>
      <div className="flex flex-1 flex-col gap-3 p-2 pt-4">
        <p className="font-mono text-xs text-muted-foreground">
          {project.year}
        </p>
        <h3 className="text-xl font-medium">
          <Link
            href={`/projects/${project.slug}`}
            className="transition-colors group-hover:text-primary"
          >
            {project.title}
          </Link>
        </h3>
        <p className="flex-1 text-[0.9375rem] leading-7 text-muted-foreground">
          {project.description}
        </p>
        <TagList tags={project.technologies} />
        <div className="pt-1">
          <ProjectLinks project={project} />
        </div>
      </div>
    </article>
  );
}

export function ProjectGrid({ projects }: { projects: Project[] }) {
  return (
    <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {projects.map((project) => (
        <li key={project.slug}>
          <ProjectCard project={project} />
        </li>
      ))}
    </ul>
  );
}
