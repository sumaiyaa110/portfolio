import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeftIcon } from "lucide-react";

import { ProjectLinks } from "@/components/projects/project-links";
import { ProjectScreenshot } from "@/components/projects/project-screenshot";
import { PageHeader } from "@/components/shared/page-header";
import { Section } from "@/components/shared/section";
import { TagList } from "@/components/shared/tag";
import { getProject, projects } from "@/data/projects";
import { createMetadata } from "@/lib/seo";

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

  return (
    <article>
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
    </article>
  );
}
