"use client";

interface AnswerSection {
  title: string;
  content: string;
  variant?: "default" | "recommendation";
}

const SECTION_ALIASES: Record<string, string> = {
  "Why It Matters To Employers": "Business Impact",
};

function parseStructuredAnswer(text: string): AnswerSection[] | null {
  const pattern = /\*\*([^*]+)\*\*\s*\n([\s\S]*?)(?=\n\*\*|$)/g;
  const sections: AnswerSection[] = [];
  let match: RegExpExecArray | null;

  while ((match = pattern.exec(text)) !== null) {
    const rawTitle = match[1].trim();
    const content = match[2].trim();
    if (!content) continue;

    sections.push({
      title: SECTION_ALIASES[rawTitle] ?? rawTitle,
      content,
      variant: /hiring recommendation/i.test(rawTitle) ? "recommendation" : "default",
    });
  }

  return sections.length > 0 ? sections : null;
}

function renderContent(content: string) {
  const lines = content.split("\n");
  const items: string[] = [];
  const paragraphs: string[] = [];
  let currentParagraph = "";

  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed) {
      if (currentParagraph) {
        paragraphs.push(currentParagraph);
        currentParagraph = "";
      }
      continue;
    }

    if (/^[-•*]\s/.test(trimmed)) {
      if (currentParagraph) {
        paragraphs.push(currentParagraph);
        currentParagraph = "";
      }
      items.push(trimmed.replace(/^[-•*]\s+/, ""));
    } else {
      currentParagraph = currentParagraph ? `${currentParagraph} ${trimmed}` : trimmed;
    }
  }

  if (currentParagraph) paragraphs.push(currentParagraph);

  return (
    <>
      {paragraphs.map((p) => (
        <p key={p.slice(0, 40)} className="agent-answer-section__body">
          {p}
        </p>
      ))}
      {items.length > 0 && (
        <ul className="agent-answer-section__body">
          {items.map((item) => (
            <li key={item.slice(0, 48)}>{item}</li>
          ))}
        </ul>
      )}
    </>
  );
}

export function AgentAnswer({ text }: { text: string }) {
  const sections = parseStructuredAnswer(text);

  if (!sections) {
    return <p className="helping-agent__msg helping-agent__msg--agent">{text}</p>;
  }

  return (
    <div className="agent-answer-card" role="article" aria-label="Recruiter briefing">
      {sections.map((section) => (
        <section
          key={section.title}
          className={`agent-answer-section${
            section.variant === "recommendation" ? " agent-answer-section--recommendation" : ""
          }`}
        >
          <h4 className="agent-answer-section__title">{section.title}</h4>
          {renderContent(section.content)}
        </section>
      ))}
    </div>
  );
}