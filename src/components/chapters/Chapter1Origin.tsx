"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ChapterTitle } from "@/components/ui/ChapterTitle";
import { ORIGIN_TIMELINE } from "@/lib/constants";
import { polarXY } from "@/lib/polar-math";
export function Chapter1Origin() {
  const sectionRef = useRef<HTMLElement>(null);
  const timelineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const timeline = timelineRef.current;
    if (!section || !timeline) return;

    const ctx = gsap.context(() => {
      const items = timeline.querySelectorAll(".timeline-item");

      items.forEach((item, i) => {
        gsap.fromTo(
          item,
          { opacity: 0.2, scale: 0.9 },
          {
            opacity: 1,
            scale: 1,
            duration: 0.6,
            scrollTrigger: {
              trigger: item,
              start: "top 90%",
              end: "top 30%",
              toggleActions: "play reverse play reverse",
            },
          }
        );

        const dot = item.querySelector(".timeline-dot");
        const line = item.querySelector(".timeline-line");
        if (dot) {
          gsap.to(dot, {
            boxShadow: "0 0 30px rgba(59,130,246,0.8), 0 0 60px rgba(6,182,212,0.4)",
            scrollTrigger: {
              trigger: item,
              start: "top 88%",
              end: "top 40%",
              toggleActions: "play reverse play reverse",
            },
          });
        }
        if (line && i < items.length - 1) {
          gsap.fromTo(
            line,
            { scaleY: 0 },
            {
              scaleY: 1,
              transformOrigin: "top",
              duration: 0.8,
              scrollTrigger: {
                trigger: item,
                start: "top 85%",
                toggleActions: "play none none reverse",
              },
            }
          );
        }
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section id="origin" ref={sectionRef} className="chapter-section relative z-10 px-6 md:px-12 lg:px-20 py-32 scroll-mt-[72px]">
      <ChapterTitle
        chapter="01"
        title="ORIGIN"
        subtitle="From Civil Engineering to Artificial Intelligence"
      />

      <div ref={timelineRef} className="relative max-w-lg mx-auto md:mx-0 md:ml-20">
        <div className="absolute left-6 top-0 bottom-0 w-px bg-gradient-to-b from-primary/50 via-highlight/30 to-secondary/50" />

        {ORIGIN_TIMELINE.map((milestone, i) => (
          <div key={milestone} className="timeline-item relative flex items-center gap-8 mb-12 last:mb-0">
            <div className="timeline-dot relative z-10 w-3 h-3 rounded-full bg-primary border-2 border-primary/50 shrink-0 ml-[18px]" />
            <div className="flex-1">
              <p className="font-mono text-[10px] tracking-widest text-white/30 uppercase mb-1">
                Phase {String(i + 1).padStart(2, "0")}
              </p>
              <h3 className="text-xl md:text-2xl font-semibold text-white/90">{milestone}</h3>
            </div>
            {i < ORIGIN_TIMELINE.length - 1 && (
              <div className="timeline-line absolute left-6 top-6 w-px h-12 bg-primary/40 origin-top" />
            )}
          </div>
        ))}
      </div>

      <div className="hidden md:block absolute right-10 top-1/3 -translate-y-1/2 w-64 h-64 opacity-20 pointer-events-none">
        <svg viewBox="0 0 200 200" className="w-full h-full">
          {ORIGIN_TIMELINE.map((_, i) => {
            const { x, y } = polarXY(i, ORIGIN_TIMELINE.length, 100, 100, 80);
            return (
              <circle key={i} cx={x} cy={y} r="3" fill="#3B82F6" opacity={0.3 + i * 0.1}>
                <animate attributeName="opacity" values="0.3;1;0.3" dur={`${2 + i * 0.3}s`} repeatCount="indefinite" />
              </circle>
            );
          })}
        </svg>
      </div>
    </section>
  );
}