import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import { getGitHubOverview } from "@/lib/github";

const user = {
  login: "sumaiyaa110",
  html_url: "https://github.com/sumaiyaa110",
  public_repos: 12,
  followers: 3,
};

const repo = (name: string, overrides: Record<string, unknown> = {}) => ({
  name,
  html_url: `https://github.com/sumaiyaa110/${name}`,
  description: null,
  language: "Python",
  stargazers_count: 0,
  forks_count: 0,
  fork: false,
  pushed_at: "2026-01-01T00:00:00Z",
  ...overrides,
});

function mockGitHub(routes: Record<string, unknown>) {
  const fetchMock = vi.fn(async (input: string | URL) => {
    const path = new URL(String(input)).pathname;
    const body = routes[path];
    return body === undefined
      ? new Response("Not found", { status: 404 })
      : Response.json(body);
  });
  vi.stubGlobal("fetch", fetchMock);
  return fetchMock;
}

describe("getGitHubOverview", () => {
  beforeEach(() => {
    vi.stubEnv("GITHUB_TOKEN", "");
  });

  afterEach(() => {
    vi.unstubAllGlobals();
    vi.unstubAllEnvs();
  });

  it("returns null when the user cannot be loaded", async () => {
    mockGitHub({});
    expect(await getGitHubOverview()).toBeNull();
  });

  it("returns null instead of throwing on a network error", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn(async () => {
        throw new Error("offline");
      }),
    );
    expect(await getGitHubOverview()).toBeNull();
  });

  it("keeps featured repositories in the configured order, ignoring case", async () => {
    mockGitHub({
      "/users/sumaiyaa110": user,
      "/users/sumaiyaa110/repos": [
        repo("MentorMatrix"),
        repo("pcos-multiclass-labeling"),
        repo("Hope-Speech-Detection", { stargazers_count: 5 }),
      ],
      "/users/sumaiyaa110/events/public": [],
    });

    const overview = await getGitHubOverview();
    expect(overview?.featuredRepos.map((r) => r.name)).toEqual([
      "Hope-Speech-Detection",
      "pcos-multiclass-labeling",
      "MentorMatrix",
    ]);
    expect(overview?.contributions).toBeNull();
  });

  it("describes recent events and skips uninteresting ones", async () => {
    mockGitHub({
      "/users/sumaiyaa110": user,
      "/users/sumaiyaa110/repos": [],
      "/users/sumaiyaa110/events/public": [
        {
          id: "1",
          type: "PushEvent",
          created_at: "2026-10-01T00:00:00Z",
          repo: { name: "sumaiyaa110/portfolio" },
          payload: { size: 1 },
        },
        {
          id: "2",
          type: "DeleteEvent",
          created_at: "2026-10-01T00:00:00Z",
          repo: { name: "sumaiyaa110/portfolio" },
          payload: {},
        },
        {
          id: "3",
          type: "PullRequestEvent",
          created_at: "2026-10-01T00:00:00Z",
          repo: { name: "sumaiyaa110/MentorMatrix" },
          payload: { action: "closed", pull_request: { merged: true } },
        },
        {
          id: "4",
          type: "PushEvent",
          created_at: "2026-10-01T00:00:00Z",
          repo: { name: "sumaiyaa110/portfolio" },
          payload: { size: 3 },
        },
      ],
    });

    const overview = await getGitHubOverview();
    expect(overview?.activity.map((item) => item.action)).toEqual([
      "Pushed 1 commit to",
      "Merged a pull request in",
      "Pushed 3 commits to",
    ]);
    expect(overview?.activity[0].repoUrl).toBe(
      "https://github.com/sumaiyaa110/portfolio",
    );
  });

  it("only asks for the contribution calendar when a token is set", async () => {
    const fetchMock = mockGitHub({
      "/users/sumaiyaa110": user,
      "/users/sumaiyaa110/repos": [],
      "/users/sumaiyaa110/events/public": [],
    });
    await getGitHubOverview();
    const paths = fetchMock.mock.calls.map(([url]) => new URL(String(url)).pathname);
    expect(paths).not.toContain("/graphql");
  });
});
