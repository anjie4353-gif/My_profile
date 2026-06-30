"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ChevronDown } from "lucide-react";
import { METRICS, RESUME_SKILLS } from "@/lib/constants";
import { AnimatedCounter } from "@/components/ui/AnimatedCounter";
import { CinematicPortrait } from "@/components/hero/CinematicPortrait";

export function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const portraitRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const portrait = portraitRef.current;
    if (!section || !portrait) return;

    const ctx = gsap.context(() => {
      gsap.timeline({ delay: 0.45 })
        .fromTo(
          section.querySelectorAll(".hero-reveal"),
          { opacity: 0, y: 24 },
          { opacity: 1, y: 0, duration: 0.85, stagger: 0.09, ease: "power3.out" }
        )
        .fromTo(
          portrait,
          { opacity: 0, x: 40 },
          { opacity: 1, x: 0, duration: 1, ease: "power3.out" },
          "-=0.6"
        );
    }, section);

    return () => ctx.revert();
  }, []);

  const heroSkillsRow1 = RESUME_SKILLS.slice(0, 16);
  const heroSkillsRow2 = RESUME_SKILLS.slice(16, 32);

  const scrollDown = () => {
    document.querySelector("#chapter-origin")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      ref={sectionRef}
      className="relative h-[100dvh] min-h-[600px] flex flex-col z-10 overflow-hidden"
    >
      {/* 50/50 — left content, right image */}
      <div className="flex-1 grid grid-cols-1 lg:grid-cols-2 min-h-0 w-full">
        {/* LEFT — title & content */}
        <div className="hero-half-left flex flex-col justify-center px-6 md:px-10 lg:px-14 xl:px-20 pt-24 lg:pt-28 pb-6 lg:pb-0 order-2 lg:order-1">
          <p className="hero-reveal font-mono text-[10px] tracking-[0.32em] text-highlight uppercase mb-3 opacity-0">
            The Data Universe
          </p>
          <h1 className="hero-reveal font-display text-3xl sm:text-4xl lg:text-[2.85rem] xl:text-[3.25rem] font-bold tracking-[-0.03em] text-white leading-[0.95] opacity-0">
            ANJANEYULU
            <br />
            <span className="text-primary">PALLEPAGU</span>
          </h1>
          <p className="hero-reveal mt-3 text-sm md:text-base font-medium tracking-[0.14em] uppercase text-white/50 opacity-0">
            Senior Data & AI Engineer
          </p>
          <p className="hero-reveal mt-3 text-[13px] md:text-sm text-white/38 leading-[1.65] max-w-[480px] opacity-0">
            Building Enterprise Data Platforms, AI Systems, and Intelligent
            Automation at Massive Scale.
          </p>

          <div className="hero-reveal mt-6 md:mt-8 flex flex-wrap gap-2 md:gap-2.5 opacity-0">
            {METRICS.map((metric) => (
              <div key={metric.label} className="hero-metric-chip">
                <span className="hero-metric-chip-value">
                  <AnimatedCounter
                    value={metric.value}
                    prefix={metric.prefix}
                    suffix={metric.suffix}
                    trigger={true}
                  />
                </span>
                <span className="hero-metric-chip-label">{metric.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT — image half */}
        <div
          ref={portraitRef}
          className="hero-half-right flex items-end justify-center lg:justify-end opacity-0 order-1 lg:order-2 pt-20 lg:pt-24"
        >
          <CinematicPortrait />
        </div>
      </div>

      {/* Skills */}
      <div className="shrink-0 w-full hero-skills-bar">
        <div className="hero-reveal opacity-0 w-full px-6 md:px-10 lg:px-14 xl:px-20 pt-3 pb-2">
          <div className="flex items-center gap-3 mb-2">
            <div className="h-px flex-1 bg-white/5" />
            <p className="font-mono text-[9px] tracking-[0.28em] text-white/30 uppercase shrink-0">
              Technical Skills
            </p>
            <div className="h-px flex-1 bg-white/5" />
          </div>
          <div className="space-y-1.5">
            <div className="hero-skills-track">
              <div className="flex animate-scroll-left w-max" style={{ animationDuration: "50s" }}>
                {[...heroSkillsRow1, ...heroSkillsRow1, ...heroSkillsRow1].map((skill, i) => (
                  <span key={`r1-${skill}-${i}`} className="skill-text skill-text-hero shrink-0 px-3 text-[10px] font-mono whitespace-nowrap">
                    {skill}<span className="text-white/10 mx-3">·</span>
                  </span>
                ))}
              </div>
            </div>
            <div className="hero-skills-track">
              <div className="flex animate-scroll-right w-max" style={{ animationDuration: "55s" }}>
                {[...heroSkillsRow2, ...heroSkillsRow2, ...heroSkillsRow2].map((skill, i) => (
                  <span key={`r2-${skill}-${i}`} className="skill-text skill-text-hero shrink-0 px-3 text-[10px] font-mono whitespace-nowrap">
                    {skill}<span className="text-white/10 mx-3">·</span>
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        <button
          type="button"
          onClick={scrollDown}
          className="w-full flex flex-col items-center gap-1 pb-5 text-white/20 hover:text-white/40 transition-colors cursor-pointer"
          aria-label="Scroll to explore"
        >
          <span className="text-[9px] tracking-[0.28em] uppercase font-mono">
            Scroll to explore
          </span>
          <ChevronDown className="w-3.5 h-3.5 animate-pulse" />
        </button>
      </div>
    </section>
  );
}