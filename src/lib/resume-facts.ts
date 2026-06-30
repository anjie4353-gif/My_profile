/** Canonical resume facts — single source of truth. Agent answers are composed ONLY from these. */

export interface ProjectFact {
  name: string;
  period: string;
  techStack: string[];
  problem: string;
  responsibilities: string;
  outcome: string;
}

export interface ExperienceFact {
  company: string;
  role: string;
  period: string;
  client: string;
  highlights: string[];
}

export type FactSection =
  | "summary"
  | "skills"
  | "data_modeling"
  | "ai_knowledge"
  | "experience"
  | "projects"
  | "education"
  | "thought_leadership"
  | "contact";

export interface ResumeFact {
  id: string;
  section: FactSection;
  label: string;
  text: string;
  keywords: string[];
}

export const RESUME_PROJECTS: ProjectFact[] = [
  {
    name: "Enterprise Data Lake Modernization",
    period: "2023–2024",
    techStack: ["Azure Databricks", "Azure Data Factory", "Delta Lake", "Python", "SQL"],
    problem:
      "Legacy distributed infrastructure could not handle analytical performance scaling, leading to high operational costs and lack of transactional ACID compliance.",
    responsibilities:
      "Mapped a modern lakehouse topology with logical and physical data layers; configured Delta Lake for ACID integrity and historic time-travel analysis.",
    outcome:
      "Migrated over 100TB of historical data with zero systemic loss; reduced data compute platform overhead costs by 45% through automated multi-tier compression.",
  },
  {
    name: "Real-time Analytics Platform",
    period: "2022–2023",
    techStack: [
      "Apache Kafka",
      "Apache Spark Streaming",
      "Machine Learning Models",
      "PostgreSQL",
    ],
    problem:
      "Financial transactional verification workflows required sub-second fraud classification to shield downstream account balances from exposure.",
    responsibilities:
      "Mapped streaming JSON payloads to a unified relational model; integrated ML classification modules into the low-latency processing loop.",
    outcome:
      "Sub-100ms processing latency; 35% improvement in fraud identification accuracy; 99.99% infrastructure uptime.",
  },
  {
    name: "AI-Powered Data Quality Framework",
    period: "2024",
    techStack: ["Python", "NLP", "Machine Learning", "n8n", "Metadata Repository"],
    problem:
      "Manual validation of complex multi-source enterprise schemas introduced delayed delivery times and high data lineage failure rates.",
    responsibilities:
      "Built NLP-driven evaluation to read business definitions and automatically detect entity anomalies, structural shifts, and system dependencies.",
    outcome:
      "Eliminated 90% of manual compliance validation workloads via end-to-end automated anomaly alerting; reinforced production data lineage reliability.",
  },
];

export const RESUME_EXPERIENCE: ExperienceFact = {
  company: "Tata Consultancy Services (TCS)",
  role: "Senior Data Engineer",
  period: "May 2022 – Present",
  client: "Pittsburgh National Corporation (PNC)",
  highlights: [
    "Apache Spark pipelines processing 50TB+ daily with 99.9% uptime across 10,000+ downstream applications.",
    "Led CDH-to-CDP migration of 500+ mainframe-ingested tables with zero downtime and $2M annual infrastructure savings.",
    "Reduced query execution durations by 60% and improved storage efficiency by 40% via partitioning and bucketing.",
    "99.8% production data accuracy; 75% reduction in data defects via Python/SQL data quality frameworks.",
    "Kafka + Spark streaming: 1M+ events/sec with sub-second data availability.",
    "Automated 200+ daily batch processes with CA7 scheduling; 80% less manual intervention.",
    "3x faster processing across Hive, Impala, and Databricks.",
    "Mentored 5 junior engineers; 50% team productivity boost.",
  ],
};

export const RESUME_SUMMARY =
  "Senior Data & AI Engineer with 4+ years architecting enterprise data pipelines, data models, and AI integration workflows. Manages 50TB+ daily volume in Fortune 500 environments. Led zero-downtime CDH-to-CDP migration with $2M annual savings.";

export const SKILL_CATEGORIES = [
  "Data Modeling & Design: ERD, dimensional modeling, normalization, data lineage",
  "Big Data: Apache Hadoop, PySpark, Hive, Impala, Sqoop, YARN, MapReduce, Apache Kafka",
  "Cloud: Azure Databricks, Data Lakehouses, Data Warehouses",
  "Languages: Python, SQL",
  "Databases: PostgreSQL, Supabase, Teradata",
  "ETL: Informatica PowerCenter",
  "Formats: Parquet, Avro, ORC, JSON, CSV",
  "AI: LLMs, prompt engineering, fine-tuning, NLP, AI agents, n8n automation",
] as const;

export const DATA_MODELING_STRENGTHS = [
  "Requirements translation: identifies core entities, attributes, business keys, and constraints from vague briefs.",
  "Schema architecture: scalable relational models and star/snowflake multi-dimensional schemas.",
  "Data integrity: normalization, referential integrity, and technical lineage tracking.",
] as const;

export const AI_KNOWLEDGE = [
  "AI theory: supervised, unsupervised, and reinforcement learning; neural networks; loss optimization; evaluation metrics.",
  "Enterprise AI: generative models, vector embeddings, semantic search for automated analysis.",
  "Workflow automation: agentic workflows with n8n and prompt engineering for ETL metadata monitoring.",
] as const;

export const EDUCATION = {
  degree: "Bachelor of Science in Civil Engineering",
  school: "Annamacharya Institute of Technology and Sciences",
  location: "Rajampet, Andhra Pradesh, India",
  graduation: "2022",
  focus: [
    "Statistical Inference",
    "Systems Engineering",
    "Complex Data Analysis",
    "Lifecycle Project Management",
  ],
} as const;

export const THOUGHT_LEADERSHIP = [
  "Technical author on Medium — big data architecture, pipeline optimization, AI integration.",
  "Contributor to open-source distributed computing initiatives and data engineering forums.",
  "Speaker at internal enterprise tech talks on integrating AI/ML into distributed data pipelines.",
] as const;

export const CONTACT = {
  name: "Anjaneyulu Pallepagu",
  email: "anjaneyulupallepagu@gmail.com",
  phone: "+91-8463987840",
  location: "Bangalore, India",
  linkedin: "linkedin.com/in/anjaneyulu-pallepagu-bb103534b",
  medium: "medium.com/@anjiepallepagu",
} as const;

/** Facts that must NOT appear in project answers (experience-only) */
export const EXPERIENCE_ONLY_MARKERS = [
  "cdh-to-cdp",
  "500+ mainframe",
  "500 mainframe",
  "10,000+ downstream",
  "ca7 scheduling",
  "200+ daily processes",
  "pittsburgh national",
  "pnc project",
  "tcs",
] as const;

function kw(...terms: string[]): string[] {
  return terms.map((t) => t.toLowerCase());
}

/** Every agent answer is assembled from this registry — no generative invention possible */
export const RESUME_FACT_REGISTRY: ResumeFact[] = [
  {
    id: "summary-1",
    section: "summary",
    label: "Professional Summary",
    text: RESUME_SUMMARY,
    keywords: kw("summary", "overview", "candidate", "engineer", "data", "ai", "fortune", "migration"),
  },
  ...SKILL_CATEGORIES.map((s, i) => ({
    id: `skill-${i}`,
    section: "skills" as const,
    label: "Technical Skills",
    text: s,
    keywords: kw(...s.toLowerCase().split(/[,:]/).flatMap((p) => p.trim().split(/\s+/)).filter((w) => w.length > 3)),
  })),
  ...DATA_MODELING_STRENGTHS.map((s, i) => ({
    id: `modeling-${i}`,
    section: "data_modeling" as const,
    label: "Data Modeling Strengths",
    text: s,
    keywords: kw("modeling", "schema", "erd", "entity", "normalization", "lineage", "dimensional"),
  })),
  ...AI_KNOWLEDGE.map((s, i) => ({
    id: `ai-${i}`,
    section: "ai_knowledge" as const,
    label: "AI & Emerging Technology",
    text: s,
    keywords: kw("ai", "llm", "nlp", "machine learning", "agent", "automation", "embedding", "neural"),
  })),
  ...RESUME_EXPERIENCE.highlights.map((h, i) => ({
    id: `exp-${i}`,
    section: "experience" as const,
    label: "Professional Experience",
    text: h,
    keywords: kw(
      "experience", "tcs", "pnc", "spark", "kafka", "migration", "cdh", "cdp",
      "databricks", "hive", "mentor", "pipeline", "streaming", "quality"
    ),
  })),
  {
    id: "exp-role",
    section: "experience",
    label: "Professional Experience",
    text: `${RESUME_EXPERIENCE.role} at ${RESUME_EXPERIENCE.company} (${RESUME_EXPERIENCE.client}) — ${RESUME_EXPERIENCE.period}`,
    keywords: kw("role", "tcs", "pnc", "senior", "engineer", "experience", "work"),
  },
  ...RESUME_PROJECTS.flatMap((p, i) => [
    {
      id: `proj-${i}-name`,
      section: "projects" as const,
      label: "Projects",
      text: `${p.name} (${p.period}) — Stack: ${p.techStack.join(", ")}. Problem: ${p.problem} Outcome: ${p.outcome}`,
      keywords: kw("project", p.name.toLowerCase(), ...p.techStack.map((t) => t.toLowerCase())),
    },
    {
      id: `proj-${i}-detail`,
      section: "projects" as const,
      label: "Projects",
      text: `${p.name}: ${p.responsibilities} Impact: ${p.outcome}`,
      keywords: kw("project", "deliver", "built", "portfolio", p.name.split(" ")[0].toLowerCase()),
    },
  ]),
  {
    id: "edu-1",
    section: "education",
    label: "Education",
    text: `${EDUCATION.degree} — ${EDUCATION.school}, ${EDUCATION.location}. Graduation: ${EDUCATION.graduation}. Focus: ${EDUCATION.focus.join(", ")}.`,
    keywords: kw("education", "degree", "university", "college", "graduate", "bachelor", "engineering"),
  },
  ...THOUGHT_LEADERSHIP.map((s, i) => ({
    id: `thought-${i}`,
    section: "thought_leadership" as const,
    label: "Thought Leadership",
    text: s,
    keywords: kw("medium", "speaker", "author", "leadership", "community", "open source"),
  })),
];

export function formatProjectsForContext(): string {
  return RESUME_PROJECTS.map(
    (p) =>
      `PROJECT: ${p.name} (${p.period})
Tech Stack: ${p.techStack.join(", ")}
Problem: ${p.problem}
Responsibilities: ${p.responsibilities}
Outcome: ${p.outcome}`
  ).join("\n\n");
}

export function formatExperienceForContext(): string {
  return `ROLE: ${RESUME_EXPERIENCE.role} — ${RESUME_EXPERIENCE.company}
Client: ${RESUME_EXPERIENCE.client} | ${RESUME_EXPERIENCE.period}
${RESUME_EXPERIENCE.highlights.map((h) => `• ${h}`).join("\n")}`;
}