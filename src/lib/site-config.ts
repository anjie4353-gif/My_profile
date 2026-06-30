export const SITE = {
  name: {
    line1: "ANJANEYULU",
    line2: "PALLEPAGU",
  },
  kicker: "SELECTED WORKS · 2026",
  role: "Data Engineer & AI Architect",
  heroDescriptor: [
    "Data Engineer & AI Architect",
    "Building Scalable Data Infrastructure & Agentic Workflows",
    "Databricks • Spark • Kafka • n8n • Python",
    "prompt engineering",
    "vibe coding",
    "web development with vibe coding",
  ] as const,
  email: "anjaneyulupallepagu@gmail.com",
  phone: {
    display: "+91 84639 87840",
    tel: "+918463987840",
    whatsapp: "https://wa.me/918463987840",
  },
  portraitAlt: "Anjaneyulu Pallepagu — Data Engineer & AI Architect",
  portraitSrc: "/images/portrait-cutout.png",
  resumePdf: "/resume/Anjaneyulupallepagu_Resume_2026.pdf",
  stats: {
    years: 4,
    projects: 12,
    clients: 8,
  },
  social: {
    linkedin: "https://www.linkedin.com/in/anjaneyulu-pallepagu-bb103534b",
    naukri: "https://www.naukri.com/mnjuser/profile",
    medium: "https://medium.com/@anjiepallepagu",
    github: "https://github.com/anjie4353-gif",
  },
  agent: {
    title: "AI Talent Assistant",
    greeting: "Recruiter evaluation support for Anjaneyulu Pallepagu",
    placeholder: "Ask a recruiter question about this candidate…",
    replies: [
      "I specialize in enterprise data platforms processing 10TB+ daily with 99.9% uptime.",
      "Led CDH-to-CDP migration of 200+ tables with zero downtime and $2M annual savings.",
      "Expertise spans Spark, Kafka, Azure Databricks, LLMs, and agentic automation.",
      "Happy to discuss data architecture, AI quality engines, or streaming at scale.",
    ],
  },
  nav: {
    brand: "PORTFOLIO",
    links: [
      { label: "WORK", href: "#work" },
      { label: "ABOUT", href: "#about" },
      { label: "RESUME", href: "/resume" },
      { label: "CONTACT", href: "#contact" },
    ],
  },
} as const;

declare global {
  interface Window {
    SITE?: typeof SITE;
  }
}