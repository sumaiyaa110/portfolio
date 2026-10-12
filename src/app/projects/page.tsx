import { FadeIn } from "@/components/motion/fade-in";
import { ProjectGrid } from "@/components/projects/project-card";
import { PageHeader } from "@/components/shared/page-header";
import { projects } from "@/data/projects";
import { createMetadata } from "@/lib/seo";

const description =
  "Things I've built for courses, for research and for fun, with notes on the problem each one solves and what I learned.";

export const metadata = createMetadata({
  title: "Projects",
  description,
  path: "/projects",
});

export default function ProjectsPage() {
  return (
    <>
      <PageHeader eyebrow="Projects" title="Projects" description={description} />
      <FadeIn>
        <ProjectGrid projects={projects} />
      </FadeIn>
    </>
  );
}
