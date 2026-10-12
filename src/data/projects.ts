import type { Project } from "@/types/content";

// PLACEHOLDER CONTENT: replace with your own projects.
// Add screenshots to /public/images/projects and list their paths in
// `screenshots`; until then a placeholder panel is shown.
export const projects: Project[] = [
  {
    slug: "study-planner",
    title: "Study Planner",
    description:
      "A web app that turns a course syllabus into a week-by-week study schedule with reminders.",
    problem:
      "I kept losing track of deadlines across five courses, each with its own portal and format. I wanted a single view of what was due and how much time each task needed.",
    technologies: ["Next.js", "TypeScript", "PostgreSQL", "Tailwind CSS"],
    screenshots: [],
    github: "https://github.com/",
    demo: "https://example.com",
    lessons: [
      "Modelling recurring events is harder than it looks; I rewrote the schema twice.",
      "Shipping a small version early and using it myself found more bugs than any testing I planned.",
    ],
    year: "2025",
    featured: true,
  },
  {
    slug: "handwritten-digit-classifier",
    title: "Handwritten Digit Classifier",
    description:
      "A convolutional network trained on MNIST, with a browser canvas for drawing digits and seeing live predictions.",
    problem:
      "I wanted to understand what a neural network does beyond calling a library, so I implemented training from scratch before moving to PyTorch.",
    technologies: ["Python", "PyTorch", "NumPy", "FastAPI"],
    screenshots: [],
    github: "https://github.com/",
    lessons: [
      "Writing backpropagation by hand made the framework version finally make sense.",
      "The model was accurate on test data and poor on my own handwriting, which taught me about distribution shift.",
    ],
    year: "2025",
    featured: true,
  },
  {
    slug: "campus-lost-and-found",
    title: "Campus Lost & Found",
    description:
      "A course group project: a searchable board where students post lost and found items.",
    problem:
      "Lost items on campus were reported in scattered social media groups and rarely found their owners.",
    technologies: ["React", "Node.js", "MongoDB"],
    screenshots: [],
    github: "https://github.com/",
    lessons: [
      "Working in a team of four meant agreeing on branch and review rules before writing any code.",
      "Image uploads needed size limits and moderation that we had not planned for.",
    ],
    year: "2024",
  },
];

export const featuredProjects = projects.filter((project) => project.featured);

export function getProject(slug: string) {
  return projects.find((project) => project.slug === slug);
}
