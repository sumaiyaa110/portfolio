import { education } from "./education";
import { achievements, experience, publications } from "./experience";
import { profile } from "./profile";
import { projects } from "./projects";
import { skillCategories } from "./skills";

/**
 * The resume is assembled from the other data files, so the Resume page can
 * never disagree with the rest of the site. Only the summary and the choice of
 * which projects to list are specific to the resume.
 */
export const resume = {
  summary:
    "Computer Science and Engineering undergraduate at Chittagong University of Engineering and Technology (CUET) with research experience in Natural Language Processing, Multimodal AI, Computer Vision, and Vision-Language Models. Published research in ACL-affiliated workshops and international conferences, with hands-on experience in deep learning, model fine-tuning, experimental analysis, and AI system development. Skilled in Python, web technologies, databases, REST APIs, and software development practices.",
  contact: {
    email: profile.email,
    location: profile.location,
    links: profile.social.filter((link) => link.platform !== "email"),
  },
  education,
  publications,
  experience,
  /** Slugs from `projects.ts` to list on the resume, in order. */
  projects: [
    "virtual-thrift-store",
    "codeshare-hub",
    "mentor-mentee-scheduling-system",
  ]
    .map((slug) => projects.find((project) => project.slug === slug))
    .filter((project) => project !== undefined),
  skills: skillCategories,
  achievements,
};
