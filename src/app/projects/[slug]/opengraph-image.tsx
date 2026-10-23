import { getProject, projects } from "@/data/projects";
import { profile } from "@/data/profile";
import { ogImageSize, socialImage } from "@/lib/og-image";

// A preview image per project, so shared project links show the project.
export const alt = "Project preview";
export const size = ogImageSize;
export const contentType = "image/png";

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export default async function ProjectImage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = getProject(slug);

  return socialImage({
    eyebrow: `Project · ${profile.name}`,
    title: project?.title ?? profile.name,
    description: project?.description ?? profile.tagline,
  });
}
