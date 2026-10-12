import { profile } from "@/data/profile";

/**
 * GitHub data for the "On GitHub" section.
 *
 * Works with no configuration beyond `profile.github.username`: profile,
 * repositories and recent activity come from the public REST API.
 * The contribution calendar needs the GraphQL API, which requires a token, so
 * it only appears when GITHUB_TOKEN is set (see .env.example).
 *
 * Responses are cached and refreshed at most once an hour. Any failure
 * (rate limit, network, unknown user) returns null and the section is hidden.
 */
const API_URL = "https://api.github.com";
const REVALIDATE_SECONDS = 60 * 60;
const FEATURED_REPO_COUNT = 4;
const ACTIVITY_COUNT = 5;
const CALENDAR_WEEKS = 26;

interface ApiUser {
  login: string;
  html_url: string;
  public_repos: number;
  followers: number;
}

interface ApiRepo {
  name: string;
  html_url: string;
  description: string | null;
  language: string | null;
  stargazers_count: number;
  forks_count: number;
  fork: boolean;
  pushed_at: string;
}

interface ApiEvent {
  id: string;
  type: string;
  created_at: string;
  repo: { name: string };
  payload: {
    action?: string;
    ref_type?: string;
    size?: number;
    commits?: unknown[];
    pull_request?: { merged?: boolean };
  };
}

export interface GitHubRepo {
  name: string;
  url: string;
  description: string | null;
  language: string | null;
  stars: number;
  forks: number;
}

export interface GitHubActivity {
  id: string;
  /** e.g. "Pushed 3 commits to". The repository name follows it. */
  action: string;
  repo: string;
  repoUrl: string;
  date: string;
}

export interface ContributionDay {
  date: string;
  count: number;
  /** 0 (none) to 4 (most), as bucketed by GitHub. */
  level: 0 | 1 | 2 | 3 | 4;
}

export interface GitHubContributions {
  /** Contributions in the last year. */
  total: number;
  /** Most recent weeks, oldest first. Each week is up to 7 days. */
  weeks: ContributionDay[][];
}

export interface GitHubOverview {
  username: string;
  profileUrl: string;
  publicRepos: number;
  followers: number;
  featuredRepos: GitHubRepo[];
  activity: GitHubActivity[];
  contributions: GitHubContributions | null;
}

function requestHeaders(): HeadersInit {
  const token = process.env.GITHUB_TOKEN;
  return {
    Accept: "application/vnd.github+json",
    "X-GitHub-Api-Version": "2022-11-28",
    ...(token && { Authorization: `Bearer ${token}` }),
  };
}

async function fetchJson<T>(path: string): Promise<T | null> {
  try {
    const response = await fetch(`${API_URL}${path}`, {
      headers: requestHeaders(),
      next: { revalidate: REVALIDATE_SECONDS },
    });
    return response.ok ? ((await response.json()) as T) : null;
  } catch {
    return null;
  }
}

function toRepo(repo: ApiRepo): GitHubRepo {
  return {
    name: repo.name,
    url: repo.html_url,
    description: repo.description,
    language: repo.language,
    stars: repo.stargazers_count,
    forks: repo.forks_count,
  };
}

function pickFeaturedRepos(repos: ApiRepo[]): GitHubRepo[] {
  const wanted = profile.github.featuredRepos;
  if (wanted.length > 0) {
    return wanted
      .map((name) =>
        repos.find((repo) => repo.name.toLowerCase() === name.toLowerCase()),
      )
      .filter((repo) => repo !== undefined)
      .map(toRepo);
  }

  return repos
    .filter((repo) => !repo.fork)
    .sort(
      (a, b) =>
        b.stargazers_count - a.stargazers_count ||
        b.pushed_at.localeCompare(a.pushed_at),
    )
    .slice(0, FEATURED_REPO_COUNT)
    .map(toRepo);
}

function describeEvent({ type, payload }: ApiEvent): string | null {
  switch (type) {
    case "PushEvent": {
      const count = payload.size ?? payload.commits?.length;
      if (!count) return "Pushed to";
      return `Pushed ${count} ${count === 1 ? "commit" : "commits"} to`;
    }
    case "PullRequestEvent":
      if (payload.action === "opened") return "Opened a pull request in";
      if (payload.action === "closed" && payload.pull_request?.merged)
        return "Merged a pull request in";
      return null;
    case "IssuesEvent":
      return payload.action === "opened" ? "Opened an issue in" : null;
    case "CreateEvent":
      if (payload.ref_type === "repository") return "Created";
      if (payload.ref_type === "branch") return "Created a branch in";
      return null;
    case "ReleaseEvent":
      return "Published a release of";
    case "WatchEvent":
      return "Starred";
    case "ForkEvent":
      return "Forked";
    default:
      return null;
  }
}

function toActivity(events: ApiEvent[]): GitHubActivity[] {
  const activity: GitHubActivity[] = [];
  for (const event of events) {
    const action = describeEvent(event);
    if (!action) continue;
    activity.push({
      id: event.id,
      action,
      repo: event.repo.name,
      repoUrl: `https://github.com/${event.repo.name}`,
      date: event.created_at,
    });
    if (activity.length === ACTIVITY_COUNT) break;
  }
  return activity;
}

const CONTRIBUTION_LEVELS = {
  NONE: 0,
  FIRST_QUARTILE: 1,
  SECOND_QUARTILE: 2,
  THIRD_QUARTILE: 3,
  FOURTH_QUARTILE: 4,
} as const;

const CONTRIBUTIONS_QUERY = `
  query ($login: String!) {
    user(login: $login) {
      contributionsCollection {
        contributionCalendar {
          totalContributions
          weeks {
            contributionDays {
              date
              contributionCount
              contributionLevel
            }
          }
        }
      }
    }
  }
`;

interface ContributionsResponse {
  data?: {
    user?: {
      contributionsCollection: {
        contributionCalendar: {
          totalContributions: number;
          weeks: {
            contributionDays: {
              date: string;
              contributionCount: number;
              contributionLevel: keyof typeof CONTRIBUTION_LEVELS;
            }[];
          }[];
        };
      };
    };
  };
}

async function fetchContributions(
  username: string,
): Promise<GitHubContributions | null> {
  if (!process.env.GITHUB_TOKEN) return null;

  try {
    const response = await fetch(`${API_URL}/graphql`, {
      method: "POST",
      headers: requestHeaders(),
      body: JSON.stringify({
        query: CONTRIBUTIONS_QUERY,
        variables: { login: username },
      }),
      next: { revalidate: REVALIDATE_SECONDS },
    });
    if (!response.ok) return null;

    const json = (await response.json()) as ContributionsResponse;
    const calendar =
      json.data?.user?.contributionsCollection.contributionCalendar;
    if (!calendar) return null;

    return {
      total: calendar.totalContributions,
      weeks: calendar.weeks.slice(-CALENDAR_WEEKS).map((week) =>
        week.contributionDays.map((day) => ({
          date: day.date,
          count: day.contributionCount,
          level: CONTRIBUTION_LEVELS[day.contributionLevel] ?? 0,
        })),
      ),
    };
  } catch {
    return null;
  }
}

export async function getGitHubOverview(): Promise<GitHubOverview | null> {
  const username = profile.github.username.trim();
  if (!username) return null;

  const user = encodeURIComponent(username);
  const [apiUser, repos, events, contributions] = await Promise.all([
    fetchJson<ApiUser>(`/users/${user}`),
    fetchJson<ApiRepo[]>(
      `/users/${user}/repos?type=owner&sort=pushed&per_page=100`,
    ),
    fetchJson<ApiEvent[]>(`/users/${user}/events/public?per_page=30`),
    fetchContributions(username),
  ]);

  if (!apiUser) return null;

  return {
    username: apiUser.login,
    profileUrl: apiUser.html_url,
    publicRepos: apiUser.public_repos,
    followers: apiUser.followers,
    featuredRepos: pickFeaturedRepos(repos ?? []),
    activity: toActivity(events ?? []),
    contributions,
  };
}
