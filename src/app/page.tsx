import Link from "next/link";

import { PostList } from "@/components/blog/post-list";
import { GitHubSection } from "@/components/github/github-section";
import { Intro } from "@/components/home/intro";
import { Stats } from "@/components/home/stats";
import { FadeIn } from "@/components/motion/fade-in";
import { ProjectGrid } from "@/components/projects/project-card";
import { Section } from "@/components/shared/section";
import { profile } from "@/data/profile";
import { featuredProjects } from "@/data/projects";
import { getAllPosts } from "@/lib/blog";
import { personJsonLd } from "@/lib/seo";

const RECENT_POST_COUNT = 2;

export default function HomePage() {
  const recentPosts = getAllPosts().slice(0, RECENT_POST_COUNT);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd()) }}
      />

      <Intro />
      <Stats />

      <Section title="Currently">
        <dl className="grid gap-3 sm:grid-cols-3">
          {profile.currently.map((item) => (
            <div key={item.label} className="surface p-5">
              <dt className="flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-primary">
                <span
                  aria-hidden="true"
                  className="size-1.5 rounded-full bg-primary"
                />
                {item.label}
              </dt>
              <dd className="mt-2 font-heading text-lg font-medium leading-snug">
                {item.value}
              </dd>
            </div>
          ))}
        </dl>
      </Section>

      <Section
        title="Featured projects"
        action={
          <Link href="/projects" className="link">
            All projects
          </Link>
        }
      >
        <FadeIn>
          <ProjectGrid projects={featuredProjects} />
        </FadeIn>
      </Section>

      <GitHubSection />

      {recentPosts.length > 0 && (
        <Section
          title="Recent notes"
          action={
            <Link href="/blog" className="link">
              All notes
            </Link>
          }
        >
          <PostList posts={recentPosts} />
        </Section>
      )}
    </>
  );
}
