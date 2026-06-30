"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";

import { ChapterTitle } from "@/components/ui/ChapterTitle";
import { AnimatedCounter } from "@/components/ui/AnimatedCounter";

export function Chapter3Migration() {
  const sectionRef = useRef<HTMLElement>(null);
  const diagramRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const diagram = diagramRef.current;
    if (!section || !diagram) return;

    const ctx = gsap.context(() => {
      const tables = diagram.querySelectorAll(".migrate-table");
      const arrows = diagram.querySelectorAll(".migrate-arrow");

      gsap.fromTo(
        diagram.querySelector(".source-system"),
        { opacity: 0, x: -50 },
        {
          opacity: 1,
          x: 0,
          duration: 0.5,
          scrollTrigger: { trigger: diagram, start: "top 94%" },
        }
      );

      gsap.fromTo(
        diagram.querySelector(".target-system"),
        { opacity: 0, x: 50 },
        {
          opacity: 1,
          x: 0,
          duration: 0.5,
          scrollTrigger: { trigger: diagram, start: "top 94%" },
        }
      );

      gsap.to(tables, {
        x: "+=200",
        stagger: { each: 0.02, from: "random" },
        duration: 2,
        ease: "power2.inOut",
        scrollTrigger: {
          trigger: diagram,
          start: "top 82%",
          end: "top 20%",
          scrub: 1,
        },
      });

      gsap.fromTo(
        arrows,
        { opacity: 0 },
        {
          opacity: 1,
          stagger: 0.1,
          scrollTrigger: {
            trigger: diagram,
            start: "top 85%",
            end: "top 30%",
            scrub: 1,
          },
        }
      );
    }, section);

    return () => ctx.revert();
  }, []);

  const tableCount = 24;

  return (
    <section ref={sectionRef} className="chapter-section relative z-10 px-6 md:px-12 lg:px-20 py-32">
      <ChapterTitle
        chapter="03"
        title="THE MIGRATION"
        subtitle="CDH → CDP Enterprise Transformation — Zero Downtime"
      />

      <div ref={diagramRef} className="relative">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-8 min-h-[400px]">
          <div className="source-system glass-panel p-8 w-full lg:w-64 text-center">
            <p className="font-mono text-xs text-white/40 uppercase tracking-widest mb-2">Source</p>
            <h3 className="text-2xl font-bold text-secondary">CDH</h3>
            <p className="text-sm text-white/50 mt-2">Cloudera Distribution</p>
            <div className="mt-6 grid grid-cols-4 gap-1">
              {Array.from({ length: tableCount }).map((_, i) => (
                <div
                  key={i}
                  className="migrate-table w-full aspect-square bg-secondary/30 border border-secondary/50 rounded-sm"
                  style={{ opacity: 0.3 + ((i * 17) % 10) * 0.07 }}
                />
              ))}
            </div>
            <p className="mt-4 text-xs text-white/30">200+ Tables</p>
          </div>

          <div className="flex-1 relative hidden lg:block">
            <svg viewBox="0 0 400 200" className="w-full h-48">
              {Array.from({ length: 8 }).map((_, i) => (
                <g key={i}>
                  <line
                    x1="0"
                    y1={25 + i * 22}
                    x2="400"
                    y2={25 + i * 22}
                    stroke="rgba(59,130,246,0.2)"
                    strokeWidth="1"
                  />
                  <circle
                    className="migrate-arrow"
                    cx="0"
                    cy={25 + i * 22}
                    r="3"
                    fill="#06B6D4"
                    opacity="0"
                  >
                    <animate
                      attributeName="cx"
                      from="0"
                      to="400"
                      dur={`${2 + i * 0.2}s`}
                      repeatCount="indefinite"
                    />
                  </circle>
                </g>
              ))}
              <text x="200" y="190" textAnchor="middle" fill="rgba(255,255,255,0.4)" fontSize="10" fontFamily="monospace">
                ZERO DOWNTIME MIGRATION
              </text>
            </svg>
          </div>

          <div className="target-system glass-panel p-8 w-full lg:w-64 text-center">
            <p className="font-mono text-xs text-white/40 uppercase tracking-widest mb-2">Target</p>
            <h3 className="text-2xl font-bold text-primary">CDP</h3>
            <p className="text-sm text-white/50 mt-2">Cloudera Data Platform</p>
            <div className="mt-6 grid grid-cols-4 gap-1">
              {Array.from({ length: tableCount }).map((_, i) => (
                <div
                  key={i}
                  className="w-full aspect-square bg-primary/30 border border-primary/50 rounded-sm"
                  style={{ opacity: 0.5 + ((i * 13) % 10) * 0.05 }}
                />
              ))}
            </div>
            <p className="mt-4 text-xs text-white/30">100TB Migrated</p>
          </div>
        </div>

        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { label: "Annual Savings", value: 2, prefix: "$", suffix: "M" },
            { label: "Data Migrated", value: 100, prefix: "", suffix: "TB" },
            { label: "Tables Migrated", value: 500, prefix: "", suffix: "+" },
          ].map((item) => (
            <div key={item.label} className="glass-panel p-6 text-center">
              <div className="text-4xl font-bold text-accent">
                <AnimatedCounter value={item.value} prefix={item.prefix} suffix={item.suffix} />
              </div>
              <p className="mt-2 text-sm text-white/40 uppercase tracking-wider">{item.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}