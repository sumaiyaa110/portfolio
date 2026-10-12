import type { Achievement, Course, Experience } from "@/types/content";

// PLACEHOLDER CONTENT: replace with your own experience, newest first.
// Empty lists are fine: a section with no entries is hidden on the page.
export const experience: Experience[] = [
  {
    kind: "research",
    role: "Undergraduate Research Assistant",
    organization: "Your Lab, Your University",
    period: "Jan 2025 – Present",
    summary:
      "Assisting a faculty-led project on low-resource text classification.",
    highlights: [
      "Collected and cleaned a dataset of 12,000 labelled examples",
      "Reproduced two baseline models from recent papers",
    ],
  },
  {
    kind: "internship",
    role: "Software Engineering Intern",
    organization: "Company Name",
    period: "Jun 2025 – Aug 2025",
    location: "City, Country",
    summary:
      "Worked with the web team on an internal dashboard used by the support staff.",
    highlights: [
      "Built three dashboard views in React and TypeScript",
      "Wrote unit tests that caught a date-handling bug before release",
    ],
  },
];

export const courses: Course[] = [
  {
    title: "Machine Learning Specialization",
    provider: "Coursera",
    year: "2025",
  },
  {
    title: "CS50: Introduction to Computer Science",
    provider: "Harvard / edX",
    year: "2024",
  },
  {
    title: "The Odin Project: Full Stack JavaScript",
    provider: "The Odin Project",
    year: "2024",
  },
];

export const achievements: Achievement[] = [
  {
    title: "Dean's List",
    issuer: "Your University",
    year: "2024",
    description: "Awarded for academic results in two consecutive semesters.",
  },
  {
    title: "Finalist, Inter-University Programming Contest",
    issuer: "Contest Organizer",
    year: "2024",
    description: "Team of three; placed in the top 20 of 150 teams.",
  },
];
