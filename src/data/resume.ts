import { education } from "./education";
import { achievements, experience } from "./experience";
import { profile } from "./profile";
import { projects } from "./projects";
import { skillCategories } from "./skills";

/**
 * The resume is assembled from the other data files, so the Resume page can
 * never disagree with the rest of the site. Only the summary and the choice of
 * which projects to list are specific to the resume.
 */
export const resume = {
  // PLACEHOLDER CONTENT: a two or three sentence summary for the top of your resume.
  summary:
    "Computer Science undergraduate with experience building full-stack web applications and a growing interest in machine learning research. Looking for internship and research opportunities.",
  contact: {
    email: profile.email,
    location: profile.location,
    links: profile.social.filter((link) => link.platform !== "email"),
  },
  education,
  experience,
  /** Slugs from `projects.ts` to list on the resume, in order. */
  projects: ["study-planner", "handwritten-digit-classifier"]
    .map((slug) => projects.find((project) => project.slug === slug))
    .filter((project) => project !== undefined),
  skills: skillCategories,
  achievements,
};
