import type {
  Achievement,
  Course,
  Experience,
  Publication,
} from "@/types/content";

// Empty lists are fine: a section with no entries is hidden on the page.

export const publications: Publication[] = [
  {
    kind: "workshop",
    title:
      "CUET_SYNTHETICA@DravidianLangTech 2026: Multi Architecture Transformer Ensemble for Detecting Abusive Tamil Text Targeting Women",
    venue:
      "Proceedings of the Sixth Workshop on Speech, Vision, and Language Technologies for Dravidian Languages, ACL 2026",
    year: "2026",
  },
  {
    kind: "workshop",
    title:
      "CUET_SYNTHETICA@DravidianLangTech 2026: Multilingual Transformer Based Hope Speech Detection for Coarse and Fine-Grained Classification in Tulu",
    venue:
      "Proceedings of the Sixth Workshop on Speech, Vision, and Language Technologies for Dravidian Languages, ACL 2026",
    year: "2026",
  },
  {
    kind: "workshop",
    title:
      "CUET_SYNTHETICA@EEUCA 2026: Gated Cross-Modal Attention with Domain-Adapted Text Encoding for Vaccine-Critical Meme Detection",
    venue:
      "Proceedings of the 9th Workshop on Event Extraction and Understanding: Challenges and Applications (EEUCA), ACL 2026",
    year: "2026",
  },
  {
    kind: "conference",
    title:
      "A Multiclass Polycystic Ovary Syndrome Phenotype Prediction Scheme Using Clinical Data, SHAP, and LightGBM Technique",
    venue: "RAEEUCCI 2026",
    year: "2026",
    doi: "10.1109/RAEEUCCI67649.2026.11504587",
  },
  {
    kind: "conference",
    title:
      "Gambit: A Neurological and Neurodevelopmental Disorder Assistant Mobile Application with Symptom Detect and Neurologist Search Features",
    venue: "IITCEE 2026",
    year: "2026",
    doi: "10.1109/IITCEE67948.2026.11394534",
  },
  {
    kind: "conference",
    title:
      "A Deep Learning and XAI Based Alopecia Disorder Prediction Scheme Using Temperature Weighted Softmax Ensemble Architectures",
    venue: "Conference paper",
    year: "2026",
  },
  {
    kind: "conference",
    title:
      "An Explainable Machine Learning and Ensemble Stacking Approach Based Multiclass Intellectual Property (IP) Rights Violation Prediction Scheme",
    venue: "Conference paper",
    year: "2026",
  },
];

/** Research positions and internships. Add entries here when you have them. */
export const experience: Experience[] = [];

export const achievements: Achievement[] = [
  {
    title: "1st place, Hope Speech Detection in Code-Mixed Tulu (Task 1)",
    issuer: "DravidianLangTech@ACL 2026",
    year: "2026",
    description: "Coarse-grained hope tone classification.",
  },
  {
    title: "1st place, Hope Speech Detection in Code-Mixed Tulu (Task 2)",
    issuer: "DravidianLangTech@ACL 2026",
    year: "2026",
    description: "Fine-grained hope type classification.",
  },
  {
    title:
      "3rd place, Multimodal Identification of Vaccine Content Stance on Social Media",
    issuer: "EEUCA 2026",
    year: "2026",
    description: "Macro-F1: 0.8357.",
  },
  {
    title: "4th place, Abusive Tamil Text Targeting Women on Social Media",
    issuer: "DravidianLangTech@ACL 2026",
    year: "2026",
    description: "Macro-F1: 0.8086.",
  },
  {
    title: "5th place, Cross-Cultural Misogynistic Meme Detection (CC-MMD)",
    issuer: "ICMI 2026 Grand Challenge",
    year: "2026",
  },
  {
    title: "Top 20, Solvio AI Hackathon",
    issuer: "Sheba Platform",
    description:
      "Developed a credit-risk prediction prototype using XGBoost and ROC-AUC evaluation.",
  },
  {
    title: "Talentpool Grade, Board Scholarship",
    description: "Awarded in both the SSC and HSC examinations.",
  },
];

// Certificates, newest first.
export const courses: Course[] = [
  {
    title: "Supervised Machine Learning: Regression and Classification",
    provider: "DeepLearning.AI",
    year: "Jul 2026",
    link: "https://www.coursera.org/account/accomplishments/records/ZFMKYD8NNK9J",
  },
  {
    title: "Paper Presentation Certificate, RAEEUCCI-2026",
    provider: "SRM Institute of Science and Technology (SRMIST)",
    year: "Apr 2026",
    description:
      "Presented our polycystic ovary syndrome paper at RAEEUCCI-2026, held 22–24 April 2026.",
  },
  {
    title: "IEEE Computer Society Membership Certificate",
    provider: "IEEE",
    year: "Jan 2026",
  },
  {
    title: "IEEE Membership Certificate",
    provider: "IEEE",
    year: "Jan 2026",
  },
  {
    title: "Sheba Solvio AI Hackathon",
    provider: "Sheba Platform Ltd.",
    year: "Dec 2025",
    description: "Certificate for reaching the Top 20 and advancing to the finals.",
  },
  {
    title: "Datathon Participant, CUET CSE Fest 2025",
    provider: "Delineate",
    year: "Dec 2025",
  },
  {
    title: "Intro to Python",
    provider: "DataCamp",
    year: "Oct 2025",
  },
  {
    title: "Understanding Prompt Engineering",
    provider: "DataCamp",
    year: "Oct 2025",
  },
  {
    title: "Intro to Machine Learning",
    provider: "Kaggle",
    year: "Apr 2025",
    link: "https://www.kaggle.com/learn/certification/sumaiyazaman110/intro-to-machine-learning",
  },
  {
    title: "Python",
    provider: "Kaggle",
    year: "Apr 2025",
    link: "https://www.kaggle.com/learn/certification/sumaiyazaman110/python",
  },
  { title: "Master Git and GitHub", provider: "Udemy" },
];

export const activities: string[] = [
  "Participant, CUET CSE Fest 2025 Datathon",
  "Participant, IEEE CUET CS Chapter Hackathon",
  "Member, CUET Computer Club",
  "Member, IEEE CUET Student Branch",
  "Member, IEEE CUET CS Chapter",
  "Member, Sylhet Student Forum",
];
