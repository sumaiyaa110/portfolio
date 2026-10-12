import type { Project } from "@/types/content";

// To complete a project, add:
//   github / demo  links to the repository and a live version
//   screenshots    image paths under /public/images/projects
//   problem        why you built it
//   lessons        what you learned
// Sections with nothing in them are hidden on the site.
export const projects: Project[] = [
  {
    slug: "virtual-thrift-store",
    title: "Virtual Thrift Store",
    description:
      "A thrift marketplace with product browsing, backend workflows and LLM-based product recommendations.",
    highlights: [
      "Developed a thrift marketplace with product browsing, backend workflows and buyer-facing features.",
      "Designed and documented 39 REST API routes using Swagger.",
      "Integrated Gemini, Groq and OpenRouter APIs for LLM-based product recommendations.",
    ],
    technologies: ["Next.js", "Node.js", "PostgreSQL", "Swagger", "Jenkins"],
    screenshots: [],
    github: "https://github.com/sumaiyaa110/Fresh-Finds-University",
    lessons: [],
    featured: true,
  },
  {
    slug: "codeshare-hub",
    title: "CodeShare Hub",
    description:
      "A platform for publishing, retrieving and managing code snippets, with LLM-powered code explanation.",
    highlights: [
      "Built a platform for publishing, retrieving and managing code snippets.",
      "Added LLM-powered code explanation and main-function extraction.",
    ],
    technologies: ["Next.js", "Node.js", "PostgreSQL", "Swagger"],
    screenshots: [],
    lessons: [],
    featured: true,
  },
  {
    slug: "mentor-mentee-scheduling-system",
    title: "Mentor–Mentee Scheduling System",
    description:
      "A web app where mentors run sessions and mentees book appointments, with feedback and conflict handling.",
    highlights: [
      "Implemented authentication, scheduling, appointment booking, feedback and conflict-handling workflows.",
      "Tested REST endpoints and booking-conflict cases using Postman.",
    ],
    technologies: ["React", "Node.js", "PostgreSQL", "Postman"],
    screenshots: [],
    github: "https://github.com/sumaiyaa110/MentorMatrix",
    lessons: [],
    featured: true,
  },
  {
    slug: "printing-management-system",
    title: "Printing Management System",
    description: "A printing management tool written as shell scripts for the Linux command line.",
    highlights: [],
    technologies: ["Shell scripting", "Linux CLI"],
    screenshots: [],
    github: "https://github.com/sumaiyaa110/Printing-Management-System",
    lessons: [],
  },
  {
    slug: "online-cafe-management-system",
    title: "Online Cafe Management System",
    description: "A web application for managing an online cafe.",
    highlights: [],
    technologies: ["Web application"],
    screenshots: [],
    github: "https://github.com/sumaiyaa110/cuet-virtual-cafe",
    lessons: [],
  },
];

export const featuredProjects = projects.filter((project) => project.featured);

export function getProject(slug: string) {
  return projects.find((project) => project.slug === slug);
}
