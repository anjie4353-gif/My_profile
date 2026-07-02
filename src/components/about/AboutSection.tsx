"use client";

import { ABOUT_MILESTONES, ABOUT_NARRATIVE } from "@/lib/about-data";

const MILESTONE_COLORS: Record<string, string> = {
  education: "#2563eb",
  career: "#1d4ed8",
  migration: "#7c3aed",
  streaming: "#0891b2",
  automation: "#0d9488",
  community: "#2563eb",
};

export function AboutSection() {
  return (
    <section id="about" className="about-section scroll-mt-[72px]" aria-labelledby="about-heading">
      <div className="about-section__inner">
        <header className="about-section__header">
          <div className="about-section__rule" aria-hidden />
          <p className="about-section__kicker">My Story</p>
          <h2 id="about-heading" className="about-section__title">
            About
          </h2>
        </header>

        <div className="about-layout">
          <div className="about-journey" aria-label="Career journey milestones">
            <svg className="about-journey__path" viewBox="0 0 4 480" preserveAspectRatio="none" aria-hidden>
              <line x1="2" y1="0" x2="2" y2="480" stroke="#f8fafc" strokeOpacity="0.15" strokeWidth="2" strokeDasharray="6 8" />
            </svg>

            <ul className="about-journey__list">
              {ABOUT_MILESTONES.map((milestone, i) => (
                <li key={milestone.title} className="about-milestone" style={{ animationDelay: `${i * 0.08}s` }}>
                  <div
                    className="about-milestone__node"
                    style={{ borderColor: MILESTONE_COLORS[milestone.icon], backgroundColor: `${MILESTONE_COLORS[milestone.icon]}18` }}
                    aria-hidden
                  />
                  <div className="about-milestone__card">
                    <span className="about-milestone__year">{milestone.year}</span>
                    <h3 className="about-milestone__title">{milestone.title}</h3>
                    <p className="about-milestone__detail">{milestone.detail}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          <div className="about-narrative">
            <div className="about-narrative__panel">
              {ABOUT_NARRATIVE.map((paragraph, i) => (
                <p key={i} className="about-narrative__paragraph">
                  {paragraph}
                </p>
              ))}
            </div>

            <div className="about-narrative__highlights" aria-hidden>
              <div className="about-highlight">
                <span className="about-highlight__value">4+</span>
                <span className="about-highlight__label">Years Enterprise</span>
              </div>
              <div className="about-highlight">
                <span className="about-highlight__value">10TB+</span>
                <span className="about-highlight__label">Daily Pipelines</span>
              </div>
              <div className="about-highlight">
                <span className="about-highlight__value">$2M</span>
                <span className="about-highlight__label">Cost Savings</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}