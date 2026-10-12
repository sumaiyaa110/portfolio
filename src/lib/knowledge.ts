import { education } from "@/data/education";
import {
  achievements,
  activities,
  courses,
  experience,
  publications,
} from "@/data/experience";
import { journey } from "@/data/journey";
import { profile } from "@/data/profile";
import { projects } from "@/data/projects";
import { resume } from "@/data/resume";
import { skillCategories } from "@/data/skills";
import { getAllPosts } from "@/lib/blog";

/**
 * Every piece of site content as plain text, with the page it came from.
 *
 * Nothing uses this yet. It is the single entry point for a future
 * "Ask Me" assistant: a build script can split each document into chunks,
 * embed them, and answer questions with links back to `url`. Adding a new
 * content type to the site only requires adding it here.
 */
export interface KnowledgeDocument {
  id: string;
  title: string;
  /** Site path this content is shown on. */
  url: string;
  text: string;
}

const lines = (...parts: (string | undefined | false)[]) =>
  parts.filter(Boolean).join("\n");

export function getKnowledgeDocuments(): KnowledgeDocument[] {
  return [
    {
      id: "profile",
      title: `About ${profile.name}`,
      url: "/about",
      text: lines(
        `${profile.name} is a ${profile.role} at ${profile.university}, based in ${profile.location}.`,
        profile.tagline,
        ...profile.background,
        `Academic focus: ${profile.focus.join(", ")}.`,
        `Interests: ${profile.interests.join("; ")}.`,
        `Future goals: ${profile.goals.join(" ")}`,
      ),
    },
    {
      id: "education",
      title: "Education",
      url: "/about#education",
      text: education
        .map((item) =>
          lines(
            `${item.degree}, ${item.institution} (${item.period}).`,
            item.result,
            ...(item.highlights ?? []),
          ),
        )
        .join("\n\n"),
    },
    {
      id: "journey",
      title: "Learning journey",
      url: "/about#journey",
      text: journey
        .map((entry) =>
          lines(
            `${entry.period}: ${entry.title}. ${entry.description}`,
            entry.learned && `Learned: ${entry.learned.join(", ")}.`,
          ),
        )
        .join("\n\n"),
    },
    {
      id: "skills",
      title: "Skills",
      url: "/skills",
      text: skillCategories
        .map(
          (category) =>
            `${category.title}: ${category.skills
              .map((skill) =>
                skill.note ? `${skill.name} (${skill.note})` : skill.name,
              )
              .join(", ")}.`,
        )
        .join("\n"),
    },
    {
      id: "resume-summary",
      title: "Resume summary",
      url: "/resume",
      text: resume.summary,
    },
    {
      id: "publications",
      title: "Research publications",
      url: "/experience#publications",
      text: publications
        .map(
          (publication) =>
            `${publication.title}. ${publication.venue} (${publication.year}).`,
        )
        .join("\n"),
    },
    ...experience.map((item, index) => ({
      id: `experience-${index}`,
      title: `${item.role}, ${item.organization}`,
      url: "/experience",
      text: lines(
        `${item.role} at ${item.organization} (${item.period}).`,
        item.summary,
        ...(item.highlights ?? []),
      ),
    })),
    {
      id: "courses-and-achievements",
      title: "Courses and achievements",
      url: "/experience",
      text: lines(
        ...courses.map(
          (course) => `Certificate: ${course.title}, ${course.provider}.`,
        ),
        ...achievements.map((achievement) =>
          lines(
            `Achievement: ${[achievement.title, achievement.issuer, achievement.year].filter(Boolean).join(", ")}.`,
            achievement.description,
          ),
        ),
        ...activities.map((activity) => `Activity: ${activity}.`),
      ),
    },
    ...projects.map((project) => ({
      id: `project-${project.slug}`,
      title: project.title,
      url: `/projects/${project.slug}`,
      text: lines(
        `${project.title}. ${project.description}`,
        ...project.highlights,
        project.problem && `Problem: ${project.problem}`,
        `Technologies: ${project.technologies.join(", ")}.`,
        project.lessons.length > 0 &&
          `Lessons learned: ${project.lessons.join(" ")}`,
      ),
    })),
    ...getAllPosts().map((post) => ({
      id: `post-${post.slug}`,
      title: post.title,
      url: `/blog/${post.slug}`,
      text: lines(post.description, post.content),
    })),
  ];
}
