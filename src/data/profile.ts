import type { Profile } from "@/types/content";

export const profile: Profile = {
  name: "Sumaiya Zaman",
  initials: "SZ",
  role: "Computer Science & Engineering undergraduate",
  university: "CUET",
  location: "Chittagong, Bangladesh",
  tagline:
    "I'm a Computer Science and Engineering undergraduate at Chittagong University of Engineering and Technology, doing research in natural language processing and multimodal AI.",
  intro: [
    "I study Computer Science and Engineering at Chittagong University of Engineering and Technology (CUET). My research is in natural language processing, multimodal AI, computer vision and vision-language models, with papers published at ACL-affiliated workshops and international conferences.",
    "I also build web applications, and I'm interested in making AI-powered software that people can rely on.",
  ],
  focus: [
    "Natural language processing",
    "Multimodal AI",
    "Computer vision",
    "Vision-language models",
  ],
  // Add a photo at public/images/profile.jpg, then set this to "/images/profile.jpg".
  photo: null,
  email: "sumaiya.zaman2107@gmail.com",
  resumePdf: "/resume.pdf",
  social: [
    {
      platform: "github",
      label: "GitHub",
      href: "https://github.com/sumaiyaa110",
    },
    {
      platform: "linkedin",
      label: "LinkedIn",
      href: "https://www.linkedin.com/in/sumaiya-zaman-bb2a17353/",
    },
    {
      platform: "email",
      label: "Email",
      href: "mailto:sumaiya.zaman2107@gmail.com",
    },
  ],
  github: {
    username: "sumaiyaa110",
    featuredRepos: [
      "Hope-Speech-Detection",
      "CUET_Synthetica-CC-MMD-2026",
      "PCOS-Multiclass-Labeling",
      "MentorMatrix",
    ],
  },
  currently: [
    { label: "Studying", value: "Computer Science and Engineering at CUET" },
    { label: "Researching", value: "Multimodal and multilingual NLP" },
    { label: "Building", value: "LLM-powered web applications" },
  ],
  background: [
    "I'm a Computer Science and Engineering undergraduate at Chittagong University of Engineering and Technology (CUET), with research experience in natural language processing, multimodal AI, computer vision and vision-language models.",
    "My research has been published at ACL-affiliated workshops and international conferences. Along the way I've gained hands-on experience in deep learning, model fine-tuning, experimental analysis and AI system development.",
    "On the software side I work with Python, web technologies, databases and REST APIs, and I care about building AI-powered applications that are reliable.",
  ],
  interests: [
    "Computer vision and vision-language models",
    "Multimodal AI and multimodal NLP",
    "Multilingual NLP",
    "Trustworthy AI",
    "Misinformation and abusive-language detection",
    "Healthcare AI",
    "LLM-powered systems",
  ],
  goals: [
    "Contribute to impactful machine learning research.",
    "Build reliable AI-powered applications.",
  ],
};
