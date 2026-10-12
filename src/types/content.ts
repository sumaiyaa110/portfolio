/**
 * Shapes for everything in `src/data/`. Edit the data files, not these types,
 * unless you are adding a new field.
 */

export type SocialPlatform = "github" | "linkedin" | "x" | "email" | "website";

export interface SocialLink {
  platform: SocialPlatform;
  label: string;
  href: string;
}

export interface Profile {
  name: string;
  /** Shown in the photo placeholder and the social preview image. */
  initials: string;
  /** One line under your name, e.g. "Computer Science undergraduate". */
  role: string;
  university: string;
  location: string;
  /** One sentence used on the home page and as the default SEO description. */
  tagline: string;
  /** Short home page introduction, one string per paragraph. */
  intro: string[];
  /** Areas you are focusing on academically. */
  focus: string[];
  /** Path under /public (e.g. "/images/profile.jpg"), or null for initials. */
  photo: string | null;
  email: string;
  /** Path under /public. The download button appears once the file exists. */
  resumePdf: string;
  social: SocialLink[];
  github: {
    /** Leave empty to hide the GitHub section. */
    username: string;
    /** Repository names to feature. Empty = your most-starred repositories. */
    featuredRepos: string[];
  };
  /** The "Currently" block on the home page. */
  currently: { label: string; value: string }[];
  /** About page: background, one string per paragraph. */
  background: string[];
  interests: string[];
  goals: string[];
}

export interface Education {
  institution: string;
  degree: string;
  period: string;
  location?: string;
  /** e.g. "CGPA 3.80 / 4.00". */
  result?: string;
  highlights?: string[];
}

export interface JourneyEntry {
  /** e.g. "2023" or "Spring 2024". */
  period: string;
  title: string;
  description: string;
  /** Things you picked up during this stage. */
  learned?: string[];
}

export interface SkillCategory {
  title: string;
  description?: string;
  skills: { name: string; note?: string }[];
}

export interface Project {
  slug: string;
  title: string;
  /** One or two sentences for the card. */
  description: string;
  /** The problem this project solves. */
  problem: string;
  technologies: string[];
  /** Paths under /public, e.g. "/images/projects/my-app.png". */
  screenshots: string[];
  github?: string;
  demo?: string;
  lessons: string[];
  year: string;
  featured?: boolean;
}

export type ExperienceKind = "research" | "internship";

export interface Experience {
  kind: ExperienceKind;
  role: string;
  organization: string;
  period: string;
  location?: string;
  summary: string;
  highlights?: string[];
  link?: string;
}

export interface Course {
  title: string;
  provider: string;
  year: string;
  link?: string;
}

export interface Achievement {
  title: string;
  issuer?: string;
  year: string;
  description?: string;
}
