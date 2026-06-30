"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";

import { ChapterTitle } from "@/components/ui/ChapterTitle";
import { ENTERPRISE_STATS } from "@/lib/constants";
import { REVEAL_DURATION, REVEAL_START, REVEAL_START_EARLY } from "@/lib/scroll-config";

const VIZ_NODES = [
  { id: "banking", label: "Banking", x: 120, y: 95, r: 14 },
  { id: "finance", label: "Finance", x: 680, y: 95, r: 14 },
  { id: "analytics", label: "Analytics", x: 120, y: 405, r: 14 },
  { id: "apps", label: "Applications", x: 680, y: 405, r: 14 },
  { id: "cloud", label: "Cloud", x: 400, y: 55, r: 12 },
  { id: "streaming", label: "Streaming", x: 400, y: 445, r: 12 },
] as const;

export function Chapter2Enterprise() {
  const sectionRef = useRef<HTMLElement>(null);
  const vizRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const viz = vizRef.current;
    const stats = statsRef.current;
    if (!viz && !stats) return;

    const ctx = gsap.context(() => {
      if (viz) {
        gsap.fromTo(
          viz,
          { opacity: 0, scale: 0.98, y: 12 },
          {
            opacity: 1,
            scale: 1,
            y: 0,
            duration: REVEAL_DURATION,
            ease: "power2.out",
            scrollTrigger: {
              trigger: viz,
              start: REVEAL_START_EARLY,
            },
          }
        );
      }

      if (stats) {
        gsap.fromTo(
          stats.querySelectorAll(".stat-item"),
          { opacity: 0, x: 14 },
          {
            opacity: 1,
            x: 0,
            stagger: 0.06,
            duration: REVEAL_DURATION,
            ease: "power2.out",
            scrollTrigger: {
              trigger: stats,
              start: REVEAL_START,
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="work" ref={sectionRef} className="chapter-section relative z-10 px-6 md:px-12 lg:px-20 py-32 scroll-mt-[72px]">
      <ChapterTitle
        chapter="02"
        title="ENTERPRISE IMPACT"
        subtitle="Powering Fortune 500 infrastructure at global scale"
      />

      <div className="grid lg:grid-cols-2 gap-12 items-center">
        <div ref={vizRef} className="enterprise-viz">
          <div className="enterprise-viz__glow" aria-hidden />
          <svg
            viewBox="0 0 800 500"
            className="enterprise-viz__svg"
            role="img"
            aria-label="Enterprise data platform architecture diagram"
          >
            <defs>
              <radialGradient id="hubGrad" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.95" />
                <stop offset="100%" stopColor="#1d4ed8" stopOpacity="0.75" />
              </radialGradient>
              <linearGradient id="linkGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#2563eb" stopOpacity="0.15" />
                <stop offset="50%" stopColor="#06b6d4" stopOpacity="0.55" />
                <stop offset="100%" stopColor="#2563eb" stopOpacity="0.15" />
              </linearGradient>
              <filter id="nodeGlow" x="-50%" y="-50%" width="200%" height="200%">
                <feGaussianBlur stdDeviation="4" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>

            <circle cx="400" cy="250" r="168" className="enterprise-viz__ring enterprise-viz__ring--outer" />
            <circle cx="400" cy="250" r="128" className="enterprise-viz__ring enterprise-viz__ring--mid" />
            <circle cx="400" cy="250" r="88" className="enterprise-viz__ring enterprise-viz__ring--inner" />

            {VIZ_NODES.map((node) => (
              <line
                key={`link-${node.id}`}
                x1="400"
                y1="250"
                x2={node.x}
                y2={node.y}
                stroke="url(#linkGrad)"
                strokeWidth="2"
                strokeDasharray="6 10"
                className="enterprise-viz__link"
              />
            ))}

            <circle cx="400" cy="250" r="52" fill="url(#hubGrad)" filter="url(#nodeGlow)" />
            <circle cx="400" cy="250" r="62" fill="none" stroke="rgba(37,99,235,0.35)" strokeWidth="1.5" className="enterprise-viz__hub-pulse" />
            <text x="400" y="244" textAnchor="middle" className="enterprise-viz__hub-title">
              Data
            </text>
            <text x="400" y="264" textAnchor="middle" className="enterprise-viz__hub-sub">
              Lakehouse
            </text>

            {VIZ_NODES.map((node, i) => (
              <g key={node.id} className="enterprise-viz__node" style={{ animationDelay: `${i * 0.35}s` }}>
                <circle cx={node.x} cy={node.y} r={node.r + 6} fill="rgba(37,99,235,0.08)" />
                <circle
                  cx={node.x}
                  cy={node.y}
                  r={node.r}
                  fill="rgba(255,255,255,0.92)"
                  stroke="rgba(37,99,235,0.45)"
                  strokeWidth="1.5"
                  filter="url(#nodeGlow)"
                />
                <circle cx={node.x} cy={node.y} r="4" fill="#2563eb" />
                <text
                  x={node.x}
                  y={node.y + (node.y < 250 ? -26 : 32)}
                  textAnchor="middle"
                  className="enterprise-viz__label"
                >
                  {node.label}
                </text>
              </g>
            ))}

            <g className="enterprise-viz__flow-dots">
              {[0, 1, 2].map((i) => (
                <circle key={i} r="3" fill="#06b6d4" className="enterprise-viz__dot">
                  <animateMotion
                    dur={`${3.2 + i * 0.6}s`}
                    repeatCount="indefinite"
                    path="M120,95 Q260,170 400,250 Q540,330 680,405"
                  />
                </circle>
              ))}
            </g>
          </svg>
          <p className="enterprise-viz__caption">Enterprise data flows across banking, cloud &amp; analytics layers</p>
        </div>

        <div ref={statsRef} className="space-y-5">
          {ENTERPRISE_STATS.map((stat) => (
            <div
              key={stat.label}
              className="stat-item glass-panel flex items-center justify-between p-5"
            >
              <span className="text-sm uppercase tracking-wider">
                {stat.label}
              </span>
              <span className="text-2xl md:text-3xl font-bold metric-value">
                {stat.value}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}