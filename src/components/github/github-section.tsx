import { ArrowUpRightIcon, GitForkIcon, StarIcon } from "lucide-react";

import { FadeIn } from "@/components/motion/fade-in";
import { Section } from "@/components/shared/section";
import { profile } from "@/data/profile";
import { formatDate } from "@/lib/format";
import {
  getGitHubOverview,
  type GitHubContributions,
  type GitHubRepo,
} from "@/lib/github";

function RepoCard({ repo }: { repo: GitHubRepo }) {
  return (
    <a
      href={repo.url}
      target="_blank"
      rel="noopener noreferrer"
      className="group flex h-full flex-col gap-2 rounded-lg border bg-card p-4 transition-colors hover:border-primary/50"
    >
      <span className="flex items-center justify-between gap-2 font-mono text-sm font-medium group-hover:text-primary">
        <span className="truncate">{repo.name}</span>
        <ArrowUpRightIcon className="size-4 shrink-0 text-muted-foreground group-hover:text-primary" />
      </span>
      <span className="line-clamp-2 flex-1 text-sm leading-6 text-muted-foreground">
        {repo.description ?? "No description yet."}
      </span>
      <span className="flex items-center gap-4 font-mono text-xs text-muted-foreground">
        {repo.language && <span>{repo.language}</span>}
        <span className="inline-flex items-center gap-1">
          <StarIcon className="size-3.5" />
          {repo.stars}
          <span className="sr-only">stars</span>
        </span>
        <span className="inline-flex items-center gap-1">
          <GitForkIcon className="size-3.5" />
          {repo.forks}
          <span className="sr-only">forks</span>
        </span>
      </span>
    </a>
  );
}

/** Opacity of the accent colour for contribution levels 1 to 4. */
const LEVEL_STRENGTH = [0, 30, 50, 75, 100];

function ContributionCalendar({
  contributions,
}: {
  contributions: GitHubContributions;
}) {
  return (
    <figure className="space-y-3">
      <div
        role="img"
        aria-label={`${contributions.total} contributions in the last year`}
        className="flex gap-[3px] overflow-x-auto pb-1"
      >
        {contributions.weeks.map((week) => (
          <div key={week[0]?.date} className="flex flex-col gap-[3px]">
            {week.map((day) => (
              <span
                key={day.date}
                title={`${day.count} on ${formatDate(day.date)}`}
                className="size-[11px] rounded-[2px] bg-muted"
                style={
                  day.level > 0
                    ? {
                        backgroundColor: `color-mix(in oklch, var(--primary) ${LEVEL_STRENGTH[day.level]}%, var(--muted))`,
                      }
                    : undefined
                }
              />
            ))}
          </div>
        ))}
      </div>
      <figcaption className="font-mono text-xs text-muted-foreground">
        {contributions.total.toLocaleString("en")} contributions in the last
        year · showing the most recent {contributions.weeks.length} weeks
      </figcaption>
    </figure>
  );
}

/**
 * Featured repositories, recent public activity and (with a token) the
 * contribution calendar. Renders nothing if GitHub cannot be reached.
 */
export async function GitHubSection() {
  if (!profile.github.username) {
    // A setup hint for you while developing; visitors never see it.
    if (process.env.NODE_ENV === "production") return null;
    return (
      <Section title="On GitHub">
        <p className="rounded-lg border border-dashed border-rule p-4 text-sm text-muted-foreground">
          Add your GitHub username to{" "}
          <code className="font-mono text-xs">src/data/profile.ts</code> to show
          your repositories and recent activity here.
        </p>
      </Section>
    );
  }

  const github = await getGitHubOverview();
  if (!github) return null;

  return (
    <Section
      title="On GitHub"
      action={
        <a
          href={github.profileUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="link font-mono"
        >
          @{github.username}
        </a>
      }
    >
      <FadeIn className="space-y-8">
        <p className="font-mono text-xs text-muted-foreground">
          {github.publicRepos} public repositories · {github.followers}{" "}
          followers
        </p>

        {github.contributions && (
          <ContributionCalendar contributions={github.contributions} />
        )}

        <div className="grid gap-8 lg:grid-cols-[1.4fr_1fr]">
          {github.featuredRepos.length > 0 && (
            <div>
              <h3 className="mb-3 font-mono text-xs font-normal uppercase tracking-widest text-muted-foreground">
                Repositories
              </h3>
              <ul className="grid gap-3 sm:grid-cols-2">
                {github.featuredRepos.map((repo) => (
                  <li key={repo.name}>
                    <RepoCard repo={repo} />
                  </li>
                ))}
              </ul>
            </div>
          )}

          {github.activity.length > 0 && (
            <div>
              <h3 className="mb-3 font-mono text-xs font-normal uppercase tracking-widest text-muted-foreground">
                Recent activity
              </h3>
              <ul className="divide-y divide-dashed divide-rule">
                {github.activity.map((item) => (
                  <li key={item.id} className="py-2.5 text-sm first:pt-0">
                    <span className="text-muted-foreground">{item.action} </span>
                    <a
                      href={item.repoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-mono text-[0.8125rem] hover:text-primary"
                    >
                      {item.repo}
                    </a>
                    <time
                      dateTime={item.date}
                      className="block font-mono text-xs text-muted-foreground"
                    >
                      {formatDate(item.date)}
                    </time>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </FadeIn>
    </Section>
  );
}
