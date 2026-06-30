"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ChapterTitle } from "@/components/ui/ChapterTitle";
import { TECH_ORBITS, TECH_DETAILS } from "@/lib/constants";
import { polarOffset, polarXY } from "@/lib/polar-math";

export function Chapter6TechConstellation() {
  const sectionRef = useRef<HTMLElement>(null);
  const orbitRef = useRef<HTMLDivElement>(null);
  const [hoveredTech, setHoveredTech] = useState<string | null>(null);

  useEffect(() => {
    const orbit = orbitRef.current;
    if (!orbit) return;

    const ctx = gsap.context(() => {
      gsap.to(".orbit-ring-1", {
        rotation: 360,
        duration: 30,
        repeat: -1,
        ease: "none",
      });
      gsap.to(".orbit-ring-2", {
        rotation: -360,
        duration: 45,
        repeat: -1,
        ease: "none",
      });
      gsap.to(".orbit-ring-3", {
        rotation: 360,
        duration: 60,
        repeat: -1,
        ease: "none",
      });

      gsap.fromTo(
        orbit,
        { opacity: 0, scale: 0.8 },
        {
          opacity: 1,
          scale: 1,
          duration: 1.5,
          scrollTrigger: { trigger: orbit, start: "top 92%" },
        }
      );
    }, orbit);

    return () => ctx.revert();
  }, []);

  const orbits = [
    {
      techs: TECH_ORBITS.core,
      radius: 100,
      className: "orbit-ring-1",
      size: "text-xs",
      nodeColor: "#3b82f6",
    },
    {
      techs: TECH_ORBITS.second,
      radius: 180,
      className: "orbit-ring-2",
      size: "text-[10px]",
      nodeColor: "#8b5cf6",
    },
    {
      techs: TECH_ORBITS.third,
      radius: 260,
      className: "orbit-ring-3",
      size: "text-[10px]",
      nodeColor: "#06b6d4",
    },
  ];

  return (
    <section ref={sectionRef} className="chapter-section relative z-10 px-6 md:px-12 lg:px-20 py-32">
      <ChapterTitle
        chapter="06"
        title="TECH STACK CONSTELLATION"
        subtitle="Technologies orbiting the enterprise data universe"
      />

      <div className="flex flex-col lg:flex-row items-center gap-12 w-full min-w-0">
        <div className="constellation-orbit-wrap w-full min-w-0">
        <div
          ref={orbitRef}
          className="constellation-orbit relative w-[520px] h-[520px] max-w-full shrink-0"
        >
          <svg
            className="constellation-lines absolute inset-0 w-full h-full pointer-events-none z-[1]"
            viewBox="0 0 520 520"
            aria-hidden
          >
            {orbits.map((orbit) =>
              orbit.techs.map((tech, i) => {
                const { x, y } = polarXY(i, orbit.techs.length, 260, 260, orbit.radius);
                return (
                  <line
                    key={`${orbit.className}-${tech}`}
                    x1="260"
                    y1="260"
                    x2={x}
                    y2={y}
                    stroke="#0a0a0a"
                    strokeOpacity="0.28"
                    strokeWidth="1"
                  />
                );
              })
            )}
          </svg>

          <div className="constellation-core absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 rounded-full bg-[#2563eb]/15 border-2 border-[#2563eb] flex items-center justify-center z-10">
            <span className="font-mono text-[8px] text-[#0a0a0a] text-center leading-tight font-semibold">
              CORE
              <br />
              ENGINE
            </span>
          </div>

          {orbits.map((orbit) => (
            <div
              key={orbit.className}
              className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 ${orbit.className}`}
              style={{ width: orbit.radius * 2, height: orbit.radius * 2 }}
            >
              <div
                className="constellation-ring absolute inset-0 rounded-full border-2"
                style={{
                  width: orbit.radius * 2,
                  height: orbit.radius * 2,
                  borderColor: "#0a0a0a",
                  opacity: 0.22,
                }}
              />
              {orbit.techs.map((tech, i) => {
                const { x, y } = polarOffset(i, orbit.techs.length, orbit.radius);
                return (
                  <button
                    key={tech}
                    className={`orbit-tech absolute ${orbit.size} font-mono text-[#0a0a0a] hover:text-[#2563eb] transition-colors cursor-pointer z-[2]`}
                    style={{
                      left: `calc(50% + ${x}px)`,
                      top: `calc(50% + ${y}px)`,
                      transform: "translate(-50%, -50%)",
                    }}
                    onMouseEnter={() => setHoveredTech(tech)}
                    onMouseLeave={() => setHoveredTech(null)}
                  >
                    <span className="constellation-node flex flex-col items-center gap-1.5">
                      <span
                        className="constellation-node__dot w-3 h-3 rounded-full border-2 border-white shadow-sm"
                        style={{ backgroundColor: orbit.nodeColor }}
                      />
                      <span className="px-2 py-1 glass-panel whitespace-nowrap">{tech}</span>
                    </span>
                  </button>
                );
              })}
            </div>
          ))}
        </div>
        </div>

        <div className="flex-1 min-h-[200px] w-full min-w-0">
          {hoveredTech && TECH_DETAILS[hoveredTech] ? (
            <div className="glass-panel p-8 animate-in fade-in duration-300">
              <h3 className="text-2xl font-bold text-white mb-4">{hoveredTech}</h3>
              <div className="space-y-4">
                <div>
                  <p className="text-xs text-white/40 uppercase tracking-widest mb-1">Proficiency</p>
                  <div className="h-1 bg-white/10 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-primary to-accent rounded-full transition-all duration-500"
                      style={{ width: `${TECH_DETAILS[hoveredTech].proficiency}%` }}
                    />
                  </div>
                  <p className="text-right text-sm text-accent mt-1">
                    {TECH_DETAILS[hoveredTech].proficiency}%
                  </p>
                </div>
                <div>
                  <p className="text-xs text-white/40 uppercase tracking-widest mb-1">Projects</p>
                  <p className="text-white/70">{TECH_DETAILS[hoveredTech].projects}</p>
                </div>
                <div>
                  <p className="text-xs text-white/40 uppercase tracking-widest mb-1">Enterprise Usage</p>
                  <p className="text-white/70">{TECH_DETAILS[hoveredTech].usage}</p>
                </div>
              </div>
            </div>
          ) : (
            <div className="glass-panel p-8 text-center">
              <p className="text-white/40 font-mono text-sm">
                Hover over a technology to explore proficiency and enterprise impact
              </p>
            </div>
          )}
        </div>
      </div>


    </section>
  );
}