import type { JourneyEntry } from "@/types/content";

// PLACEHOLDER CONTENT: your learning journey, oldest first.
// Be honest about what was hard; that is what makes this section worth reading.
export const journey: JourneyEntry[] = [
  {
    period: "2021",
    title: "First lines of code",
    description:
      "Started with Python tutorials and built a text-based adventure game. Most of it was copied and broken, but it ran.",
    learned: ["Python basics", "Reading error messages"],
  },
  {
    period: "2023",
    title: "Starting university",
    description:
      "Moved from following tutorials to solving problems on my own. Data structures changed how I think about writing programs.",
    learned: ["C and C++", "Data structures", "Git"],
  },
  {
    period: "2024",
    title: "Building for the web",
    description:
      "Built my first full-stack project for a course and learned how many small decisions sit between an idea and a working app.",
    learned: ["JavaScript and TypeScript", "React", "SQL", "REST APIs"],
  },
  {
    period: "2025",
    title: "Finding a research interest",
    description:
      "Took my first machine learning course and started reading papers. I'm still slow at it, but I've learned to reproduce small results before trusting my understanding.",
    learned: ["PyTorch", "Linear algebra in practice", "Reading papers"],
  },
  {
    period: "Now",
    title: "Going deeper",
    description:
      "Focusing on fewer things and finishing them: one research direction, one substantial project, and writing about both.",
  },
];
