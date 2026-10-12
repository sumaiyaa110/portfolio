import type { SkillCategory } from "@/types/content";

// PLACEHOLDER CONTENT: list what you can actually use, and use `note`
// to say how well ("coursework", "used in 3 projects", "learning").
export const skillCategories: SkillCategory[] = [
  {
    title: "Programming languages",
    skills: [
      { name: "Python", note: "most comfortable" },
      { name: "TypeScript", note: "web projects" },
      { name: "C++", note: "coursework, problem solving" },
      { name: "Java", note: "coursework" },
    ],
  },
  {
    title: "Web technologies",
    skills: [
      { name: "React" },
      { name: "Next.js" },
      { name: "Tailwind CSS" },
      { name: "Node.js" },
      { name: "REST APIs" },
    ],
  },
  {
    title: "AI / ML tools",
    skills: [
      { name: "PyTorch", note: "learning" },
      { name: "scikit-learn" },
      { name: "NumPy" },
      { name: "pandas" },
      { name: "Jupyter" },
    ],
  },
  {
    title: "Databases",
    skills: [
      { name: "PostgreSQL" },
      { name: "MySQL", note: "coursework" },
      { name: "MongoDB" },
    ],
  },
  {
    title: "Developer tools",
    skills: [
      { name: "Git & GitHub" },
      { name: "VS Code" },
      { name: "Linux" },
      { name: "Docker", note: "basics" },
      { name: "Figma" },
    ],
  },
];
