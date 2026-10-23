import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeftIcon, ArrowRightIcon } from "lucide-react";

import { ProjectLinks } from "@/components/projects/project-links";
import { ProjectScreenshot } from "@/components/projects/project-screenshot";
import { JsonLd } from "@/components/shared/json-ld";
import { PageHeader } from "@/components/shared/page-header";
import { Section } from "@/components/shared/section";
import { TagList } from "@/components/shared/tag";
import { getAdjacentProjects, getProject, projects } from "@/data/projects";
import { createMetadata, projectJsonLd } from "@/lib/seo";

interface ProjectPageProps {
  params: Promise<{ slug: string }>;
}

export const dynamicParams = false;

function BulletList({ items }: { items: string[] }) {
  return (
    <ul className="list-disc space-y-3 pl-5 text-[1.0625rem] leading-8 text-foreground/90 marker:text-muted-foreground">
      {items.map((item) => (
        <li key={item}>{item}</li>
      ))}
    </ul>
  );
}

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({
  params,
}: ProjectPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return {};

  return createMetadata({
    title: project.title,
    description: project.description,
    path: `/projects/${project.slug}`,
    tags: project.technologies,
  });
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  // Always render at least one frame so the placeholder shows until
  // screenshots are added.
  const screenshots: (string | undefined)[] =
    project.screenshots.length > 0 ? project.screenshots : [undefined];
  const { previous, next } = getAdjacentProjects(project.slug);

  return (
    <article>
      <JsonLd data={projectJsonLd(project)} />

      <Link
        href="/projects"
        className="mt-10 inline-flex items-center gap-1.5 font-mono text-xs text-muted-foreground transition-colors hover:text-primary"
      >
        <ArrowLeftIcon className="size-3.5" />
        All projects
      </Link>

      <PageHeader
        eyebrow={project.year ? `Project · ${project.year}` : "Project"}
        title={project.title}
        description={project.description}
        className="pt-6 pb-8 sm:pt-8"
      />

      <ProjectLinks project={project} />

      <div className="mt-8 grid gap-4 sm:grid-cols-2">
        {screenshots.map((src, index) => (
          <ProjectScreenshot
            key={src ?? "placeholder"}
            src={src}
            title={project.title}
            alt={
              screenshots.length > 1
                ? `Screenshot ${index + 1} of ${screenshots.length} of ${project.title}`
                : undefined
            }
            priority={index === 0}
            className={screenshots.length === 1 ? "sm:col-span-2" : undefined}
          />
        ))}
      </div>

      <div className="max-w-2xl">
        {project.problem && (
          <Section title="The problem">
            <p className="text-[1.0625rem] leading-8 text-foreground/90">
              {project.problem}
            </p>
          </Section>
        )}

        {project.highlights.length > 0 && (
          <Section title="What I built">
            <BulletList items={project.highlights} />
          </Section>
        )}

        <Section title="Built with">
          <TagList tags={project.technologies} />
        </Section>

        {project.lessons.length > 0 && (
          <Section title="What I learned">
            <BulletList items={project.lessons} />
          </Section>
        )}
      </div>

      {(previous || next) && (
        <nav
          aria-label="More projects"
          className="mt-16 grid gap-3 border-t pt-8 sm:grid-cols-2"
        >
          {previous && (
            <Link
              href={`/projects/${previous.slug}`}
              className="surface surface-hover group flex flex-col gap-1 p-4"
            >
              <span className="inline-flex items-center gap-1.5 font-mono text-xs text-muted-foreground">
                <ArrowLeftIcon className="size-3.5" />
                Previous project
              </span>
              <span className="font-heading font-semibold group-hover:text-primary">
                {previous.title}
              </span>
            </Link>
          )}
          {next && (
            <Link
              href={`/projects/${next.slug}`}
              className="surface surface-hover group flex flex-col items-end gap-1 p-4 text-right sm:col-start-2"
            >
              <span className="inline-flex items-center gap-1.5 font-mono text-xs text-muted-foreground">
                Next project
                <ArrowRightIcon className="size-3.5" />
              </span>
              <span className="font-heading font-semibold group-hover:text-primary">
                {next.title}
              </span>
            </Link>
          )}
        </nav>
      )}
    </article>
  );
}
