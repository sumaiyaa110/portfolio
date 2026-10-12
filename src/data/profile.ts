import type { Profile } from "@/types/content";

// PLACEHOLDER CONTENT: replace everything in this file with your own details.
export const profile: Profile = {
  name: "Sumaiya Zaman",
  initials: "SZ",
  role: "Computer Science undergraduate",
  university: "Your University",
  location: "City, Country",
  tagline:
    "I'm an undergraduate student learning to build useful software and exploring machine learning research.",
  intro: [
    "I'm in my third year of a Computer Science degree. Most of my time goes into coursework, side projects, and reading papers I only half understand the first time through.",
    "This site is my notebook: what I've built, what I'm studying, and what I learned along the way.",
  ],
  focus: ["Machine learning", "Web development", "Data structures & algorithms"],
  photo: null,
  email: "you@example.com",
  resumePdf: "/resume.pdf",
  social: [
    { platform: "github", label: "GitHub", href: "https://github.com/sumaiyaa110" },
    { platform: "linkedin", label: "LinkedIn", href: "https://www.linkedin.com/in/sumaiya-zaman-bb2a17353/" },
    { platform: "email", label: "Email", href: "mailto:you@example.com" },
  ],
  github: {
    username: "sumaiyaa110",
    featuredRepos: [],
  },
  currently: [
    { label: "Learning", value: "Deep learning fundamentals" },
    { label: "Building", value: "This portfolio, in Next.js" },
    { label: "Reading", value: "Designing Data-Intensive Applications" },
  ],
  background: [
    "I started programming in secondary school by writing small games, and chose Computer Science because I wanted to understand how the things I used every day actually worked.",
    "At university I've been drawn to the places where theory meets practice: algorithms that make real systems faster, and models that learn from messy data.",
  ],
  interests: [
    "Machine learning and its applications",
    "Building accessible web interfaces",
    "Open-source software",
    "Teaching and writing about what I learn",
  ],
  goals: [
    "Contribute to a research project and co-author a paper before graduating.",
    "Complete an industry internship to see how software is built at scale.",
    "Pursue graduate study in machine learning.",
  ],
};
