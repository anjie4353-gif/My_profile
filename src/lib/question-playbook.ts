import { FEATURED_QUESTIONS } from "@/lib/talent-agent";
import {
  RESUME_EXPERIENCE,
  RESUME_PROJECTS,
  RESUME_SUMMARY,
  SKILL_CATEGORIES,
} from "@/lib/resume-facts";

export type QuestionIntent =
  | "consider"
  | "skills"
  | "standout"
  | "projects"
  | "value"
  | "summary60"
  | "strengths"
  | "recommend"
  | "experience"
  | "custom";

const QUESTION_MAP: { pattern: RegExp; intent: QuestionIntent; featured: string }[] = [
  {
    pattern: /why should we consider|why consider|why hire/i,
    intent: "consider",
    featured: FEATURED_QUESTIONS[0],
  },
  {
    pattern: /strongest skills|strongest technical skills|technical skills/i,
    intent: "skills",
    featured: FEATURED_QUESTIONS[1],
  },
  {
    pattern: /what makes him stand out|stand out|differentiat/i,
    intent: "standout",
    featured: FEATURED_QUESTIONS[2],
  },
  {
    pattern: /projects demonstrate|which projects|project expertise/i,
    intent: "projects",
    featured: FEATURED_QUESTIONS[3],
  },
  {
    pattern: /business value|value can he bring|employer value/i,
    intent: "value",
    featured: FEATURED_QUESTIONS[4],
  },
  {
    pattern: /recommend interviewing|would you recommend|should we interview/i,
    intent: "recommend",
    featured: FEATURED_QUESTIONS[5],
  },
  {
    pattern: /60 second|summarize this candidate|summarize his profile|one minute|minute pitch/i,
    intent: "summary60",
    featured: FEATURED_QUESTIONS[6],
  },
  {
    pattern: /top strengths|key strengths|key achievements|achievements/i,
    intent: "strengths",
    featured: FEATURED_QUESTIONS[7],
  },
  {
    pattern: /professional experience|work history|current role|(?:what is (?:your|his) )?experience|tcs|pnc/i,
    intent: "experience",
    featured: "",
  },
];

export function resolveQuestionIntent(query: string): QuestionIntent {
  for (const entry of QUESTION_MAP) {
    if (entry.pattern.test(query)) return entry.intent;
  }
  return "custom";
}

export function isFeaturedQuestion(query: string): boolean {
  const normalized = query.trim().toLowerCase();
  return FEATURED_QUESTIONS.some((q) => q.toLowerCase() === normalized);
}

function projectBlock(p: (typeof RESUME_PROJECTS)[number]): string {
  return `**${p.name}** (${p.period})
- *Stack:* ${p.techStack.join(", ")}
- *Challenge:* ${p.problem}
- *What he delivered:* ${p.responsibilities}
- *Impact:* ${p.outcome}`;
}

/** Deterministic, fact-grounded answers — zero hallucination, best-candidate tone */
export function composePlaybookAnswer(intent: QuestionIntent): string | null {
  switch (intent) {
    case "consider":
      return `**Executive Summary**
Anjaneyulu Pallepagu is a Senior Data & AI Engineer who has already operated at Fortune 500 scale — ${RESUME_SUMMARY.split(".")[0]}.

**Key Strengths**
- Enterprise pipeline ownership: 50TB+ daily processing with 99.9% uptime across 10,000+ applications
- Migration leadership: zero-downtime CDH-to-CDP move across 500+ tables → $2M annual savings
- Full-stack data craft: modeling, streaming (Kafka/Spark), cloud lakehouses, and AI automation
- Proven delivery at TCS for PNC since May 2022

**Evidence From Resume**
- [Professional Summary] ${RESUME_SUMMARY}
- [Experience] ${RESUME_EXPERIENCE.highlights[0]}
- [Experience] ${RESUME_EXPERIENCE.highlights[1]}

**Why It Matters To Employers**
You get someone who doesn't just build pipelines — he reduces infrastructure cost, protects uptime, and translates vague business asks into production-grade data architecture. That combination is rare at the 4-year experience mark.

**Hiring Recommendation**
Strong yes — interview for senior data engineering, lakehouse modernization, or data+AI hybrid roles. His resume shows measurable outcomes, not buzzwords.`;

    case "skills":
      return `**Executive Summary**
His strongest technical skills span data modeling, distributed big-data engineering, cloud lakehouse platforms, and applied AI — backed by production use at enterprise scale.

**Key Strengths**
${SKILL_CATEGORIES.map((s) => `- ${s}`).join("\n")}

**Evidence From Resume**
- [Technical Skills] Full stack listed above — from ERD/dimensional modeling through Kafka, PySpark, Databricks, and LLM/agent workflows
- [Experience] Production Spark pipelines at 50TB+/day; Kafka streaming at 1M+ events/sec
- [Projects] Azure Databricks + Delta Lake lakehouse; Spark Streaming + ML fraud detection; NLP data-quality automation

**Why It Matters To Employers**
He covers the full modern data platform — ingest, model, stream, quality, and AI layer — so teams don't need to stitch together multiple narrow specialists.

**Hiring Recommendation**
Excellent fit for roles requiring hands-on Spark/Kafka plus cloud lakehouse and emerging AI integration skills.`;

    case "standout":
      return `**Executive Summary**
What sets Anjaneyulu apart is the combination of enterprise-scale reliability, migration leadership, and AI-forward automation — all with documented dollar and uptime impact.

**Key Strengths**
- Led a zero-downtime CDH-to-CDP migration (500+ tables) saving $2M/year — not many engineers his tenure have that on their resume
- Operates 50TB+/day pipelines at 99.9% uptime serving 10,000+ downstream apps
- Bridges classical data engineering with AI: NLP quality frameworks, LLM/agent workflows, n8n automation
- Mentors teams — boosted a 5-person squad's productivity by 50%

**Evidence From Resume**
- [Summary] CDH-to-CDP migration with $2M annual infrastructure cost reductions
- [Experience] 99.9% uptime, 60% faster queries, 75% fewer data defects
- [Projects] AI-Powered Data Quality Framework eliminated 90% of manual validation

**Why It Matters To Employers**
He delivers outcomes executives care about — cost, uptime, fraud accuracy, compliance speed — while staying hands-on in the stack.

**Hiring Recommendation**
Prioritize him for teams that need a builder who can also own high-stakes migrations and modernization programs.`;

    case "projects":
      return `**Executive Summary**
Three projects on his resume directly demonstrate end-to-end expertise — modern lakehouse migration, real-time fraud analytics, and AI-driven data quality. These are discrete PROJECT entries (not general job duties).

**Key Strengths**
${RESUME_PROJECTS.map((p) => `- **${p.name}** — ${p.outcome.split(";")[0]}`).join("\n")}

**Evidence From Resume**
${RESUME_PROJECTS.map((p) => projectBlock(p)).join("\n\n")}

**Why It Matters To Employers**
Each project shows a full arc: business problem → architecture decision → measurable outcome. That's exactly how a top candidate proves expertise beyond day-to-day ticket work.

**Hiring Recommendation**
Use these three projects as interview anchors — lakehouse modernization, streaming ML, and AI quality automation map to most senior data platform hiring bars.`;

    case "value":
      return `**Executive Summary**
Anjaneyulu brings quantified business value: cost reduction, uptime, speed, accuracy, and team multiplier effects — all documented on his resume.

**Key Strengths**
- **$2M/year** infrastructure savings from CDH-to-CDP migration (zero downtime)
- **45%** compute cost reduction via Enterprise Data Lake Modernization (100TB+ migrated)
- **99.9%** pipeline uptime across 10,000+ apps; **99.99%** on real-time analytics platform
- **35%** better fraud detection; **90%** less manual data-quality validation
- **50%** team productivity lift through mentoring 5 engineers

**Evidence From Resume**
- [Experience] ${RESUME_EXPERIENCE.highlights[1]}
- [Experience] ${RESUME_EXPERIENCE.highlights[0]}
- [Projects] ${RESUME_PROJECTS[0].outcome}
- [Projects] ${RESUME_PROJECTS[2].outcome}

**Why It Matters To Employers**
Hiring him isn't a bet on potential — the resume already shows ROI in cost, reliability, fraud prevention, and compliance velocity.

**Hiring Recommendation**
Strong value hire for cost-conscious platform teams and regulated industries (e.g., financial services).`;

    case "summary60":
      return `**Executive Summary**
In 60 seconds: Anjaneyulu Pallepagu is a Senior Data & AI Engineer (4+ years, TCS/PNC) who runs 50TB+/day Spark pipelines at 99.9% uptime, led a zero-downtime CDH-to-CDP migration saving $2M/year, and has delivered lakehouse modernization, sub-100ms fraud analytics, and AI-powered data quality automation.

**Key Strengths**
- Big data at scale: Spark, Kafka, Hive, Impala, Databricks
- Data modeling + AI: ERD/dimensional design, LLMs, NLP, agentic workflows
- Track record: cost cuts, uptime, fraud accuracy, compliance automation

**Evidence From Resume**
- [Summary] ${RESUME_SUMMARY}
- [Projects] Enterprise Data Lake Modernization, Real-time Analytics Platform, AI-Powered Data Quality Framework

**Why It Matters To Employers**
He's a ready-now senior contributor for enterprise data platform teams — not a junior learning on your dime.

**Hiring Recommendation**
Schedule the interview. Lead with the three named projects and the CDH-to-CDP migration story.`;

    case "strengths":
      return `**Executive Summary**
His top strengths cluster around scalable data architecture, production reliability, and applied AI — with consistent metric-backed proof.

**Key Strengths**
- **Data modeling & architecture** — ERD, star/snowflake schemas, entity mapping, lineage
- **Distributed engineering** — 50TB+/day Spark, Kafka streaming at 1M+ events/sec
- **Migration & modernization** — CDH-to-CDP (500+ tables), 100TB+ lakehouse migration
- **Quality & governance** — 99.8% accuracy, NLP-driven anomaly detection
- **Leadership** — mentors 5 engineers, internal tech speaker, Medium author

**Evidence From Resume**
- [Data Modeling Strengths] Requirements translation, schema architecture, referential integrity
- [Experience] ${RESUME_EXPERIENCE.highlights[3]}
- [AI Knowledge] LLMs, vector embeddings, agentic workflows with n8n

**Why It Matters To Employers**
These strengths cover build, scale, fix, and automate — the four things every data platform team actually needs.

**Hiring Recommendation**
Top strengths align with senior/staff data engineer and data architect interviews.`;

    case "recommend":
      return `**Executive Summary**
Yes — I recommend interviewing Anjaneyulu. His resume shows enterprise-scale delivery, named high-impact projects, and hard metrics across cost, uptime, and quality.

**Key Strengths**
- 4+ years with Fortune 500-scale data (50TB+/day, 10,000+ downstream apps)
- Zero-downtime migration leadership ($2M/year saved)
- Three portfolio-grade projects with clear business outcomes
- AI integration beyond buzzwords (NLP quality engine, agent workflows)

**Evidence From Resume**
- [Experience] ${RESUME_EXPERIENCE.highlights[1]}
- [Projects] All three projects include problem → solution → quantified outcome
- [Thought Leadership] Medium author, internal speaker, open-source contributor

**Why It Matters To Employers**
Interviewing him is low-risk — resume evidence is specific enough to drill into real technical depth in the room.

**Hiring Recommendation**
**Proceed to interview.** Suggested focus areas: lakehouse architecture decisions, CDH-to-CDP migration approach, and the AI-Powered Data Quality Framework design.`;

    case "experience":
      return `**Executive Summary**
${RESUME_EXPERIENCE.role} at ${RESUME_EXPERIENCE.company} on the ${RESUME_EXPERIENCE.client} engagement (${RESUME_EXPERIENCE.period}) — enterprise-scale data engineering with measurable cost, uptime, and quality outcomes.

**Key Strengths**
${RESUME_EXPERIENCE.highlights.map((h) => `- ${h}`).join("\n")}

**Evidence From Resume**
- [Professional Experience] ${RESUME_EXPERIENCE.role} — ${RESUME_EXPERIENCE.company} | ${RESUME_EXPERIENCE.client} | ${RESUME_EXPERIENCE.period}
${RESUME_EXPERIENCE.highlights.map((h) => `- ${h}`).join("\n")}

**Why It Matters To Employers**
This is hands-on production ownership at Fortune 500 scale — not advisory or peripheral contribution.

**Hiring Recommendation**
Strong experience profile for senior data engineer interviews. Note: CDH-to-CDP = 500+ tables; 200+ = daily batch processes (CA7).`;

    default:
      return null;
  }
}