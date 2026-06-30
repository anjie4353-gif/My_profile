import {
  composePlaybookAnswer,
  resolveQuestionIntent,
  type QuestionIntent,
} from "@/lib/question-playbook";
import {
  EXPERIENCE_ONLY_MARKERS,
  RESUME_FACT_REGISTRY,
  type FactSection,
  type ResumeFact,
} from "@/lib/resume-facts";

const STOP_WORDS = new Set([
  "a", "an", "the", "is", "are", "was", "were", "be", "been", "being",
  "have", "has", "had", "do", "does", "did", "will", "would", "could",
  "should", "may", "might", "must", "shall", "can", "need", "to", "of",
  "in", "for", "on", "with", "at", "by", "from", "as", "into", "about",
  "what", "which", "who", "whom", "this", "that", "these", "those",
  "he", "his", "him", "she", "her", "they", "their", "them", "it", "its",
  "and", "or", "but", "if", "then", "so", "than", "when", "where", "why",
  "how", "all", "any", "both", "each", "few", "more", "most", "other",
  "some", "such", "no", "nor", "not", "only", "own", "same", "too", "very",
  "just", "also", "tell", "give", "show", "explain", "describe", "summarize",
  "list", "does", "did", "can", "you", "me", "please",
]);

const INTENT_ALLOWED_SECTIONS: Record<QuestionIntent, FactSection[] | null> = {
  projects: ["projects"],
  skills: ["skills", "ai_knowledge", "data_modeling"],
  experience: ["experience", "summary"],
  consider: null,
  standout: null,
  value: null,
  summary60: null,
  strengths: null,
  recommend: null,
  custom: null,
};

function tokenize(text: string): string[] {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9+#.\s-]/g, " ")
    .split(/\s+/)
    .filter((t) => t.length > 1 && !STOP_WORDS.has(t));
}

function scoreFact(fact: ResumeFact, terms: string[]): number {
  let score = 0;
  const textLower = fact.text.toLowerCase();
  for (const term of terms) {
    if (fact.keywords.some((k) => k.includes(term) || term.includes(k))) score += 3;
    if (textLower.includes(term)) score += 2;
    if (fact.label.toLowerCase().includes(term)) score += 1;
  }
  return score;
}

const MIN_FACT_SCORE = 4;

function retrieveFacts(
  query: string,
  intent: QuestionIntent,
  limit = 6
): ResumeFact[] {
  const terms = tokenize(query);
  if (terms.length === 0) return [];

  const allowed = INTENT_ALLOWED_SECTIONS[intent];

  const scored = RESUME_FACT_REGISTRY.map((fact) => ({
    fact,
    score: scoreFact(fact, terms),
  }))
    .filter((s) => {
      if (allowed && !allowed.includes(s.fact.section)) return false;
      return s.score >= MIN_FACT_SCORE;
    })
    .sort((a, b) => b.score - a.score);

  return scored.slice(0, limit).map((s) => s.fact);
}

function hiringLine(intent: QuestionIntent): string {
  const lines: Partial<Record<QuestionIntent, string>> = {
    projects:
      "Proceed to interview — use the three named projects as technical depth anchors.",
    skills:
      "Strong match for senior data engineering roles requiring Spark, Kafka, Databricks, and AI integration.",
    experience:
      "Ready-now senior contributor at TCS/PNC with Fortune 500-scale delivery evidence.",
    recommend: "Yes — proceed to interview based on resume evidence above.",
    consider: "Strong yes — shortlist for senior data/AI engineering roles.",
  };
  return (
    lines[intent] ??
    "Review the evidence above to assess fit. All facts are from the official resume only."
  );
}

function composeFromFacts(
  query: string,
  intent: QuestionIntent,
  facts: ResumeFact[]
): string {
  const strengths = facts.slice(0, 5).map((f) => `- [${f.label}] ${f.text}`);
  const evidence = facts.map((f) => `- [${f.label}] ${f.text}`).join("\n");

  const summaryFact = facts.find((f) => f.section === "summary") ?? facts[0];
  const executive =
    summaryFact?.text ??
    `The following resume evidence addresses your question: "${query}"`;

  return `**Executive Summary**
${executive}

**Key Strengths**
${strengths.join("\n")}

**Evidence From Resume**
${evidence}

**Why It Matters To Employers**
Each point above is extracted verbatim from Anjaneyulupallepagu_Reume_2026.docx — no generated or inferred claims.

**Hiring Recommendation**
${hiringLine(intent)}`;
}

function notInResumeAnswer(query: string): string {
  return `**Executive Summary**
This is not explicitly mentioned in the resume.

**Key Strengths**
- Unable to locate specific evidence for: "${query}"

**Evidence From Resume**
No matching facts found in Anjaneyulupallepagu_Reume_2026.docx for this question.

**Why It Matters To Employers**
This assistant only answers from verified resume facts — it will not guess or invent information.

**Hiring Recommendation**
Ask about topics covered on the resume: skills, experience at TCS/PNC, projects, education, or business impact metrics.`;
}

export interface DeterministicReply {
  reply: string;
  meta: {
    source: "playbook" | "facts";
    intent: QuestionIntent;
    factIds: string[];
    sections: string[];
  };
}

/**
 * Zero-hallucination answer engine.
 * Never calls an LLM — answers are composed only from canonical resume facts.
 */
export function composeDeterministicAnswer(query: string): DeterministicReply {
  const intent = resolveQuestionIntent(query);

  const playbook = composePlaybookAnswer(intent);
  if (playbook) {
    return {
      reply: playbook,
      meta: {
        source: "playbook",
        intent,
        factIds: [],
        sections: ["canonical-resume-facts"],
      },
    };
  }

  const facts = retrieveFacts(query, intent);

  if (facts.length === 0) {
    return {
      reply: notInResumeAnswer(query),
      meta: {
        source: "facts",
        intent,
        factIds: [],
        sections: [],
      },
    };
  }

  if (intent === "projects") {
    const contaminated = facts.some((f) =>
      EXPERIENCE_ONLY_MARKERS.some((m) => f.text.toLowerCase().includes(m))
    );
    if (contaminated) {
      const projectOnly = RESUME_FACT_REGISTRY.filter((f) => f.section === "projects");
      return {
        reply: composeFromFacts(query, intent, projectOnly),
        meta: {
          source: "facts",
          intent,
          factIds: projectOnly.map((f) => f.id),
          sections: ["Projects"],
        },
      };
    }
  }

  return {
    reply: composeFromFacts(query, intent, facts),
    meta: {
      source: "facts",
      intent,
      factIds: facts.map((f) => f.id),
      sections: [...new Set(facts.map((f) => f.label))],
    },
  };
}