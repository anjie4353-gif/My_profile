export const COLORS = {
  background: "#030712",
  primary: "#3B82F6",
  secondary: "#7C3AED",
  highlight: "#06B6D4",
  accent: "#00F5D4",
} as const;

export const METRICS = [
  { label: "Daily Data", value: 10, suffix: "TB+", prefix: "" },
  { label: "Migration", value: 100, suffix: "TB+", prefix: "" },
  { label: "Events/Sec", value: 1, suffix: "M+", prefix: "" },
  { label: "Savings", value: 2, suffix: "M+", prefix: "$" },
] as const;

export const ORIGIN_TIMELINE = [
  "Civil Engineering",
  "Data Modeling",
  "Big Data",
  "Cloud Platforms",
  "Enterprise Systems",
  "Artificial Intelligence",
  "Agentic AI",
] as const;

export const ENTERPRISE_STATS = [
  { label: "Daily Data", value: "10TB+" },
  { label: "Applications", value: "50+" },
  { label: "Table Migrations", value: "200+" },
  { label: "Uptime", value: "99.9%" },
  { label: "Annual Savings", value: "$2M" },
] as const;

export const STREAMING_STATS = [
  { label: "Events/Sec", value: "1M+" },
  { label: "Latency", value: "<100ms" },
  { label: "Uptime", value: "99.99%" },
] as const;

export const AI_CAPABILITIES = [
  "NLP",
  "LLMs",
  "AI Agents",
  "Prompt Engineering",
  "n8n",
  "Semantic Search",
  "Vector Embeddings",
] as const;

export const TECH_ORBITS = {
  core: ["Python", "SQL", "Spark", "Kafka"],
  second: ["Databricks", "Azure", "Hive", "Impala"],
  third: ["LLMs", "n8n", "AI Agents", "NLP"],
} as const;

export const TECH_DETAILS: Record<string, { proficiency: number; projects: string; usage: string }> = {
  Python: { proficiency: 95, projects: "Data Pipelines, ML Models", usage: "Enterprise ETL & AI" },
  SQL: { proficiency: 98, projects: "200+ Table Migrations", usage: "Banking Infrastructure" },
  Spark: { proficiency: 92, projects: "10TB+ Daily Processing", usage: "Big Data Analytics" },
  Kafka: { proficiency: 94, projects: "1M+ Events/Sec", usage: "Real-time Streaming" },
  Databricks: { proficiency: 90, projects: "CDH → CDP Migration", usage: "Lakehouse Platform" },
  Azure: { proficiency: 88, projects: "Cloud Data Platform", usage: "Enterprise Cloud" },
  Hive: { proficiency: 85, projects: "Data Warehouse", usage: "Legacy Migration" },
  Impala: { proficiency: 82, projects: "Query Engine", usage: "Analytics" },
  LLMs: { proficiency: 90, projects: "AI Quality Engine", usage: "Enterprise AI" },
  n8n: { proficiency: 88, projects: "Agentic Automation", usage: "Workflow Orchestration" },
  "AI Agents": { proficiency: 92, projects: "Intelligent Automation", usage: "Production Systems" },
  NLP: { proficiency: 87, projects: "Semantic Search", usage: "Text Analytics" },
};

export const THOUGHT_LEADERSHIP = [
  { title: "Enterprise Data Architecture", category: "Architecture Design", year: "2025" },
  { title: "CDH to CDP Migration Strategy", category: "Data Engineering", year: "2024" },
  { title: "Building AI Quality Engines", category: "AI Research", year: "2025" },
  { title: "Real-time Streaming at Scale", category: "Technical Writing", year: "2024" },
  { title: "Agentic AI in Production", category: "Medium Articles", year: "2025" },
  { title: "Vector Embeddings for Enterprise", category: "AI Research", year: "2025" },
] as const;

export const COMMAND_KPIS = [
  { label: "Daily Data", value: 10, suffix: "TB+", prefix: "" },
  { label: "Migration", value: 100, suffix: "TB+", prefix: "" },
  { label: "Events/Sec", value: 1, suffix: "M+", prefix: "" },
  { label: "Uptime", value: 99.99, suffix: "%", prefix: "" },
  { label: "Savings", value: 2, suffix: "M+", prefix: "$" },
  { label: "Automation", value: 90, suffix: "%", prefix: "" },
] as const;

export { EDUCATION_STAGES } from "@/lib/education-data";

export const LINKS = {
  linkedin: "https://www.linkedin.com/in/anjaneyulu-pallepagu-bb103534b",
  naukri: "https://www.naukri.com/mnjuser/profile",
  medium: "https://medium.com/@anjiepallepagu",
  email: "mailto:anjaneyulupallepagu@gmail.com",
  contactEmail: "anjaneyulupallepagu@gmail.com",
  phone: "+918463987840",
  whatsapp: "https://wa.me/918463987840",
  resume: "/resume",
} as const;

export const RESUME_FILES = {
  pdf: "/resume/Anjaneyulupallepagu_Resume_2026.pdf",
  docx: "/resume/Anjaneyulupallepagu_Resume_2026.docx",
} as const;

export const RESUME_SKILL_CATEGORIES = [
  {
    category: "Database",
    skills: ["SQL", "PostgreSQL", "Supabase", "Teradata", "Delta Lake"],
  },
  {
    category: "Programming Languages",
    skills: ["Python", "PySpark"],
  },
  {
    category: "Big Data",
    skills: [
      "Apache Hadoop",
      "Apache Kafka",
      "Hive",
      "Impala",
      "Sqoop",
      "MapReduce",
      "YARN",
    ],
  },
  {
    category: "Cloud & Platforms",
    skills: ["Databricks", "Data Lake", "Azure (Intermediate)"],
  },
  {
    category: "Data Modeling",
    skills: [
      "Conceptual Data Modeling",
      "Logical Data Modeling",
      "Physical Data Modeling",
      "ERD",
      "Star/Snowflake Schema",
      "Normalization",
      "Data Lineage",
    ],
  },
  {
    category: "ETL & Integration",
    skills: [
      "Informatica PowerCenter",
      "Parquet",
      "Avro",
      "ORC",
      "JSON",
      "CSV",
    ],
  },
  {
    category: "AI & Machine Learning",
    skills: [
      "RAG",
      "Agentic RAG",
      "Graph RAG",
      "Large Language Models (LLMs)",
      "Prompt Engineering",
      "NLP",
      "AI Agents",
      "Vector Embeddings",
      "n8n Automation",
    ],
  },
] as const;

export const RESUME_SKILLS = RESUME_SKILL_CATEGORIES.flatMap((c) => c.skills);

export const FINAL_TAGS = [
  "Enterprise Data Engineering",
  "Artificial Intelligence",
  "Data Architecture",
  "Agentic Automation",
  "Innovation Leadership",
] as const;