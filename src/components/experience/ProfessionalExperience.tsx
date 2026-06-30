"use client";

import Image from "next/image";
import { PROFESSIONAL_EXPERIENCE } from "@/lib/experience-data";

export function ProfessionalExperience() {
  const exp = PROFESSIONAL_EXPERIENCE;

  return (
    <section
      id="experience"
      className="exp-section scroll-mt-[72px]"
      aria-labelledby="exp-heading"
    >
      <div className="exp-section__inner">
        <header className="exp-section__header">
          <div className="exp-section__rule" aria-hidden />
          <p className="exp-section__kicker">Career</p>
          <h2 id="exp-heading" className="exp-section__title">
            Professional Experience
          </h2>
          <p className="exp-section__subtitle">
            4+ years architecting enterprise data platforms for Fortune 500 banking infrastructure
          </p>
        </header>

        <div className="exp-layout">
          <aside className="exp-company-col">
            <article className="exp-company-card">
              <div className="exp-company-card__top">
                <span className="exp-company-card__badge">Current Role</span>
                <time className="exp-company-card__period">{exp.period}</time>
              </div>

              <div className="exp-company-card__logo">
                <Image
                  src="/images/tcs.png"
                  alt="Tata Consultancy Services — TCS corporate office"
                  width={560}
                  height={245}
                  className="exp-company-card__logo-img"
                  sizes="(max-width: 1024px) 100vw, 340px"
                />
              </div>

              <h3 className="exp-company-card__company">{exp.company}</h3>
              <p className="exp-company-card__role">{exp.role}</p>
              <p className="exp-company-card__client">{exp.client} Project</p>
              <p className="exp-company-card__location">{exp.location}</p>
              <p className="exp-company-card__summary">{exp.summary}</p>
            </article>

            <div className="exp-pipeline" aria-label="Enterprise data pipeline architecture">
              <p className="exp-pipeline__label">Data Platform Flow</p>
              <svg viewBox="0 0 360 72" className="exp-pipeline__svg" aria-hidden>
                <defs>
                  <linearGradient id="expFlowGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#2563eb" stopOpacity="0.2" />
                    <stop offset="50%" stopColor="#06b6d4" stopOpacity="0.7" />
                    <stop offset="100%" stopColor="#2563eb" stopOpacity="0.2" />
                  </linearGradient>
                </defs>
                <line x1="44" y1="36" x2="316" y2="36" stroke="url(#expFlowGrad)" strokeWidth="2" strokeDasharray="5 8" className="exp-pipeline__line" />
                <circle r="4" fill="#06b6d4" className="exp-pipeline__dot">
                  <animateMotion dur="4s" repeatCount="indefinite" path="M44,36 L316,36" />
                </circle>
              </svg>
              <div className="exp-pipeline__stages">
                {exp.pipelineStages.map((stage, i) => (
                  <div key={stage.id} className="exp-pipeline__stage" style={{ animationDelay: `${i * 0.15}s` }}>
                    <span className="exp-pipeline__stage-num">{String(i + 1).padStart(2, "0")}</span>
                    <span className="exp-pipeline__stage-label">{stage.label}</span>
                    <span className="exp-pipeline__stage-sub">{stage.sub}</span>
                  </div>
                ))}
              </div>
            </div>
          </aside>

          <div className="exp-highlights">
            {exp.highlights.map((item) => (
              <article key={item.id} className="exp-highlight">
                <div className="exp-highlight__metric">
                  <span className="exp-highlight__metric-value">{item.metric}</span>
                  <span className="exp-highlight__metric-label">{item.metricLabel}</span>
                </div>
                <div className="exp-highlight__body">
                  <h4 className="exp-highlight__title">{item.title}</h4>
                  <p className="exp-highlight__desc">{item.description}</p>
                  <div className="exp-highlight__tech">
                    {item.tech.map((t) => (
                      <span key={t} className="exp-highlight__chip">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}