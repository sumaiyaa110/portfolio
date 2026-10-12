import type { JourneyEntry } from "@/types/content";

// Oldest first. These entries are drafted from the facts in your CV.
// Add your own story: what was hard, what changed your mind, what you'd do differently.
export const journey: JourneyEntry[] = [
  {
    period: "2017 – 2021",
    title: "School and college",
    description:
      "Completed SSC and HSC at Jalalabad Cantonment Public School and College with GPA 5.00 in both, and received the Talentpool Grade board scholarship in both examinations.",
  },
  {
    period: "Jan 2023",
    title: "Starting Computer Science and Engineering at CUET",
    description:
      "Began my BSc at Chittagong University of Engineering and Technology. I'm a member of the CUET Computer Club, the IEEE CUET Student Branch and its CS Chapter.",
    learned: ["C", "C++", "Python", "JavaScript"],
  },
  {
    period: "Along the way",
    title: "Building software",
    description:
      "Built full-stack web applications including a thrift marketplace, a code-snippet sharing platform and a mentor–mentee scheduling system, and took part in hackathons and datathons.",
    learned: ["Next.js", "Node.js", "PostgreSQL", "REST APIs", "Git"],
  },
  {
    period: "2026",
    title: "First publications",
    description:
      "Published three papers at ACL 2026 workshops with team CUET_SYNTHETICA, alongside conference papers on healthcare AI. Our hope speech detection system for code-mixed Tulu placed 1st in both tasks at DravidianLangTech.",
    learned: [
      "Transformer fine-tuning",
      "Vision-language models",
      "Explainable AI",
    ],
  },
];
