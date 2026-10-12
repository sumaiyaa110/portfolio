import type { SkillCategory } from "@/types/content";

// Optional: add a `note` to any skill to say how well you know it,
// e.g. { name: "Jenkins", note: "used in one project" }.
export const skillCategories: SkillCategory[] = [
  {
    title: "Programming languages",
    skills: [
      { name: "Python" },
      { name: "C" },
      { name: "C++" },
      { name: "JavaScript" },
    ],
  },
  {
    title: "Machine learning / AI",
    skills: [
      { name: "PyTorch" },
      { name: "Hugging Face Transformers" },
      { name: "Scikit-learn" },
      { name: "XGBoost" },
      { name: "LightGBM" },
      { name: "SHAP" },
      { name: "Prompt engineering" },
    ],
  },
  {
    title: "NLP / Multimodal AI",
    skills: [
      { name: "Transformer fine-tuning" },
      { name: "Vision-language models" },
      { name: "CLIP" },
      { name: "Multimodal classification" },
      { name: "OCR text fusion" },
      { name: "LLM APIs", note: "Gemini, Groq, OpenRouter" },
    ],
  },
  {
    title: "Web development",
    skills: [
      { name: "Next.js" },
      { name: "React.js" },
      { name: "Node.js" },
      { name: "Express.js" },
    ],
  },
  {
    title: "Databases",
    skills: [{ name: "PostgreSQL" }, { name: "MySQL" }],
  },
  {
    title: "APIs & testing",
    skills: [
      { name: "REST APIs" },
      { name: "Swagger (OpenAPI)" },
      { name: "Postman" },
    ],
  },
  {
    title: "Developer tools",
    skills: [
      { name: "Git & GitHub" },
      { name: "Jenkins" },
      { name: "Linux CLI" },
      { name: "VS Code" },
    ],
  },
];
