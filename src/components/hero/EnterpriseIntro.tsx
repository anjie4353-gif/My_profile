"use client";

import { useState } from "react";
import Image from "next/image";

import { SITE } from "@/lib/site-config";
import { RESUME_SKILL_CATEGORIES } from "@/lib/constants";
import { useReveal } from "@/lib/hooks/useReveal";
import { useStatCounter } from "@/lib/hooks/useStatCounter";
import { ScrollExplore } from "@/components/hero/ScrollExplore";

function PortraitPlaceholder() {
  return (
    <div className="intro-portrait-placeholder" aria-hidden>
      <svg viewBox="0 0 200 260" fill="none" xmlns="http://www.w3.org/2000/svg">
        <ellipse cx="100" cy="88" rx="52" ry="58" fill="rgba(26,35,50,0.06)" />
        <path
          d="M36 248c0-42 28-72 64-72s64 30 64 72"
          fill="rgba(26,35,50,0.05)"
        />
      </svg>
    </div>
  );
}

function StatItem({ label, target }: { label: string; target: number }) {
  const { ref, value } = useStatCounter(target);
  return (
    <div className="intro-stat" data-reveal>
      <span ref={ref} className="intro-stat__value">
        {value}+
      </span>
      <span className="intro-stat__label">{label}</span>
    </div>
  );
}

export function EnterpriseIntro() {
  const revealRef = useReveal(40);
  const [portraitError, setPortraitError] = useState(false);
  return (
    <section id="intro" className="intro-hero" ref={revealRef}>
      <div className="intro-mesh" aria-hidden />

      <div className="intro-hero__grid">
        {/* LEFT 40% — portrait, no box */}
        <div className="intro-hero__portrait-col" data-reveal>
          <div className="intro-portrait-wrap">
            {portraitError ? (
              <PortraitPlaceholder />
            ) : (
              <Image
                src={SITE.portraitSrc}
                alt={SITE.portraitAlt}
                width={480}
                height={640}
                priority
                className="intro-portrait-img"
                onError={() => setPortraitError(true)}
              />
            )}
          </div>
        </div>

        {/* RIGHT 60% — content */}
        <div className="intro-hero__content-col">
          <p className="intro-kicker" data-reveal>
            {SITE.kicker}
          </p>

          <h1 className="intro-name" data-reveal>
            <span>{SITE.name.line1}</span>
            <span>{SITE.name.line2}</span>
          </h1>

          <div className="intro-rule" data-reveal aria-hidden />

          <p className="intro-descriptor" data-reveal>
            {SITE.heroDescriptor.map((part, i) => (
              <span key={part} className="intro-descriptor__part">
                {i > 0 && (
                  <span className="intro-descriptor__pipe" aria-hidden>
                    {" "}|{" "}
                  </span>
                )}
                <span className={i === 0 ? "intro-descriptor__lead" : undefined}>
                  {part}
                </span>
              </span>
            ))}
          </p>

          <div className="intro-stats" data-reveal>
            <StatItem label="Years" target={SITE.stats.years} />
            <StatItem label="Projects" target={SITE.stats.projects} />
            <StatItem label="Clients" target={SITE.stats.clients} />
          </div>
        </div>
      </div>

      {/* Skills */}
      <div className="intro-skills">
        <div className="intro-skills__rule" aria-hidden />
        <p className="intro-skills__label">Technical Skills</p>
        <div className="intro-skills__tracks">
          {RESUME_SKILL_CATEGORIES.map((row, rowIndex) => (
            <div key={row.category} className="intro-skills__row">
              <p className="intro-skills__category">{row.category}</p>
              <div className="intro-skills__track">
                <div
                  className={`intro-skills__marquee ${rowIndex % 2 === 0 ? "animate-scroll-left" : "animate-scroll-right"}`}
                  style={{ animationDuration: `${20 + rowIndex * 2}s` }}
                >
                  {[...row.skills, ...row.skills, ...row.skills].map((skill, i) => (
                    <span key={`${row.category}-${i}`} className="intro-skill-item">
                      {skill}
                      <span className="intro-skill-dot">·</span>
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <ScrollExplore />
    </section>
  );
}