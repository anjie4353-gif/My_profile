"use client";

import { useState, useRef, useEffect, type FormEvent } from "react";
import { SITE } from "@/lib/site-config";
import { AGENT_INTRO, FEATURED_QUESTIONS } from "@/lib/talent-agent";
import { AgentAnswer } from "@/components/hero/AgentAnswer";

interface Message {
  role: "user" | "agent";
  text: string;
}

function AgentPanel({ onClose }: { onClose: () => void }) {
  const [messages, setMessages] = useState<Message[]>([
    { role: "agent", text: AGENT_INTRO },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  const ask = async (text: string) => {
    const question = text.trim();
    if (!question || loading) return;

    const userMessage: Message = { role: "user", text: question };
    const nextMessages = [...messages, userMessage];
    setMessages(nextMessages);
    setInput("");
    setLoading(true);

    const history = nextMessages
      .filter((m) => m.text !== AGENT_INTRO)
      .map((m) => ({
        role: m.role === "agent" ? ("assistant" as const) : ("user" as const),
        content: m.text,
      }));

    try {
      const res = await fetch("/api/talent-agent", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: history }),
      });

      const data = await res.json();

      if (res.ok && data.reply) {
        setMessages((m) => [...m, { role: "agent", text: data.reply }]);
      } else {
        const errMsg =
          data.error ||
          "Unable to reach the AI assistant. Please check your connection and try again.";
        setMessages((m) => [...m, { role: "agent", text: errMsg }]);
      }
    } catch {
      setMessages((m) => [
        ...m,
        {
          role: "agent",
          text: "Connection error — could not reach the talent assistant API. Please try again.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    ask(input);
  };

  return (
    <div
      className="agent-popup"
      role="dialog"
      aria-modal="true"
      aria-labelledby="agent-popup-title"
    >
      <div className="agent-popup__panel helping-agent">
        <div className="agent-popup__header">
          <div className="helping-agent__header">
            <div className="helping-agent__avatar" aria-hidden>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2">
                <circle cx="12" cy="8" r="3.5" />
                <path d="M5 20c0-3.5 3-6 7-6s7 2.5 7 6" />
              </svg>
            </div>
            <div>
              <p id="agent-popup-title" className="helping-agent__title">
                {SITE.agent.title}
              </p>
              <p className="helping-agent__greeting">{SITE.agent.greeting}</p>
            </div>
          </div>
          <button
            type="button"
            className="agent-popup__close"
            onClick={onClose}
            aria-label="Close AI talent assistant"
          >
            ×
          </button>
        </div>

        <div className="helping-agent__suggestions" aria-label="Suggested recruiter questions">
          <p className="helping-agent__suggestions-label">Recruiter Quick Questions</p>
          <div className="helping-agent__chips">
            {FEATURED_QUESTIONS.map((q) => (
              <button
                key={q}
                type="button"
                className="helping-agent__chip"
                disabled={loading}
                onClick={() => ask(q)}
              >
                {q}
              </button>
            ))}
          </div>
        </div>

        <div className="helping-agent__messages" aria-live="polite">
          {messages.map((msg, i) =>
            msg.role === "agent" && i > 0 ? (
              <AgentAnswer key={`${msg.role}-${i}`} text={msg.text} />
            ) : (
              <div
                key={`${msg.role}-${i}`}
                className={`helping-agent__msg helping-agent__msg--${msg.role}`}
              >
                {msg.text}
              </div>
            )
          )}
          {loading && (
            <p className="helping-agent__typing" aria-busy="true">
              Composing from resume facts…
            </p>
          )}
          <div ref={messagesEndRef} />
        </div>

        <form className="helping-agent__form" onSubmit={handleSubmit}>
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={SITE.agent.placeholder}
            className="helping-agent__input"
            aria-label="Ask the AI talent assistant"
            disabled={loading}
          />
          <button
            type="submit"
            className="helping-agent__send"
            aria-label="Send message"
            disabled={loading || !input.trim()}
          >
            <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M5 12h14M13 6l6 6-6 6" />
            </svg>
          </button>
        </form>
      </div>
    </div>
  );
}

export function HelpingAgent() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        type="button"
        className="agent-tab"
        onClick={() => setOpen(true)}
        aria-expanded={open}
        aria-haspopup="dialog"
        aria-label="Open AI Talent Assistant for recruiters"
      >
        <span className="agent-tab__dot" aria-hidden />
        <span className="agent-tab__label">AI Talent Assistant</span>
        <span className="agent-tab__hint">· Recruiters</span>
      </button>

      {open && (
        <>
          <button
            type="button"
            className="agent-backdrop"
            aria-label="Close assistant"
            onClick={() => setOpen(false)}
          />
          <AgentPanel onClose={() => setOpen(false)} />
        </>
      )}
    </>
  );
}