import fs from "node:fs";
import path from "node:path";

import { describe, expect, it } from "vitest";

import { siteConfig } from "@/config/site";
import { achievements, courses, publications } from "@/data/experience";
import { profile } from "@/data/profile";
import { getAdjacentProjects, projects } from "@/data/projects";
import { resume } from "@/data/resume";
import { getKnowledgeDocuments } from "@/lib/knowledge";

// Checks on the content files, so a typo is caught before it reaches the site.

const publicFile = (src: string) => path.join(process.cwd(), "public", src);

describe("projects", () => {
  it("have unique, URL-safe slugs", () => {
    const slugs = projects.map((project) => project.slug);
    expect(new Set(slugs).size).toBe(slugs.length);
    for (const slug of slugs) expect(slug).toMatch(/^[a-z0-9]+(-[a-z0-9]+)*$/);
  });

  it("only reference screenshots that exist in /public", () => {
    for (const project of projects) {
      for (const src of project.screenshots) {
        expect(src.startsWith("/"), src).toBe(true);
        expect(fs.existsSync(publicFile(src)), src).toBe(true);
      }
    }
  });

  it("use absolute https links", () => {
    for (const project of projects) {
      for (const link of [project.github, project.demo]) {
        if (link) expect(link).toMatch(/^https:\/\//);
      }
    }
  });

  it("link to their neighbours", () => {
    const first = getAdjacentProjects(projects[0].slug);
    expect(first.previous).toBeUndefined();
    expect(first.next?.slug).toBe(projects[1]?.slug);

    const last = getAdjacentProjects(projects.at(-1)!.slug);
    expect(last.next).toBeUndefined();

    expect(getAdjacentProjects("does-not-exist")).toEqual({
      previous: undefined,
      next: undefined,
    });
  });
});

describe("profile", () => {
  it("points at files that exist", () => {
    if (profile.photo) expect(fs.existsSync(publicFile(profile.photo))).toBe(true);
  });

  it("has valid social links", () => {
    for (const link of profile.social) {
      expect(link.href).toMatch(/^(https:\/\/|mailto:)/);
    }
  });
});

describe("experience", () => {
  it("has well-formed DOIs and links", () => {
    for (const publication of publications) {
      if (publication.doi) {
        expect(publication.doi).toMatch(/^10\.\d{4,}\/\S+$/);
      }
      if (publication.link) expect(publication.link).toMatch(/^https:\/\//);
    }
    for (const course of courses) {
      if (course.link) expect(course.link).toMatch(/^https:\/\//);
    }
  });

  it("has no duplicate titles (they are used as React keys)", () => {
    for (const list of [publications, achievements]) {
      const titles = list.map((item) => item.title);
      expect(new Set(titles).size).toBe(titles.length);
    }
  });
});

describe("resume", () => {
  it("lists every project it names", () => {
    expect(resume.projects.length).toBeGreaterThan(0);
  });
});

describe("site", () => {
  it("has navigation links to real pages", () => {
    for (const item of siteConfig.nav) {
      const page = path.join(process.cwd(), "src/app", item.href, "page.tsx");
      expect(fs.existsSync(page), item.href).toBe(true);
    }
  });

  it("exposes every project to the knowledge index", () => {
    const ids = getKnowledgeDocuments().map((doc) => doc.id);
    expect(new Set(ids).size).toBe(ids.length);
    for (const project of projects) expect(ids).toContain(`project-${project.slug}`);
  });
});
