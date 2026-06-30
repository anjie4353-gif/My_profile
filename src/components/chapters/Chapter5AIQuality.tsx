"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";

import { ChapterTitle } from "@/components/ui/ChapterTitle";
import { AI_CAPABILITIES } from "@/lib/constants";

export function Chapter5AIQuality() {
  const sectionRef = useRef<HTMLElement>(null);
  const networkRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const network = networkRef.current;
    if (!section || !network) return;

    const ctx = gsap.context(() => {
      const neurons = network.querySelectorAll(".neuron");
      const connections = network.querySelectorAll(".connection");
      gsap.fromTo(
        neurons,
        { scale: 0, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          stagger: 0.05,
          duration: 0.5,
          ease: "back.out(2)",
          scrollTrigger: { trigger: network, start: "top 92%" },
        }
      );

      gsap.fromTo(
        connections,
        { opacity: 0 },
        {
          opacity: 0.6,
          stagger: 0.02,
          duration: 0.3,
          scrollTrigger: { trigger: network, start: "top 90%" },
        }
      );

      const capabilities = section.querySelectorAll(".ai-capability");
      gsap.fromTo(
        capabilities,
        { opacity: 0, x: -30 },
        {
          opacity: 1,
          x: 0,
          stagger: 0.1,
          duration: 0.6,
          scrollTrigger: { trigger: section, start: "top 86%" },
        }
      );
    }, section);

    return () => ctx.revert();
  }, []);

  const layers = [4, 6, 8, 6, 4];
  const neurons: { x: number; y: number; layer: number }[] = [];

  layers.forEach((count, layer) => {
    for (let i = 0; i < count; i++) {
      neurons.push({
        x: 80 + layer * 80,
        y: 50 + (i * 280) / (count + 1),
        layer,
      });
    }
  });

  return (
    <section ref={sectionRef} className="chapter-section relative z-10 px-6 md:px-12 lg:px-20 py-32">
      <ChapterTitle
        chapter="05"
        title="AI QUALITY ENGINE"
        subtitle="Where data transforms into intelligence"
      />

      <div className="grid lg:grid-cols-2 gap-12 items-center">
        <svg
          ref={networkRef}
          viewBox="0 0 480 320"
          className="w-full h-auto"
        >
          <defs>
            <radialGradient id="neuronGlow">
              <stop offset="0%" stopColor="#7C3AED" stopOpacity="1" />
              <stop offset="100%" stopColor="#7C3AED" stopOpacity="0" />
            </radialGradient>
            <filter id="glow">
              <feGaussianBlur stdDeviation="3" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {neurons.map((n, i) =>
            neurons
              .filter((m) => m.layer === n.layer + 1)
              .map((m, j) => (
                <line
                  key={`${i}-${j}`}
                  className="connection"
                  x1={n.x}
                  y1={n.y}
                  x2={m.x}
                  y2={m.y}
                  stroke="rgba(124,58,237,0.3)"
                  strokeWidth="1"
                  opacity="0"
                />
              ))
          )}

          {neurons.map((n, i) => (
            <g key={i}>
              <circle
                className="neuron"
                cx={n.x}
                cy={n.y}
                r="6"
                fill="url(#neuronGlow)"
                filter="url(#glow)"
              />
              {i % 5 === 0 && (
                <circle className="pulse" cx={n.x} cy={n.y} r="3" fill="#00F5D4" opacity="0.8">
                  <animate attributeName="opacity" values="0.8;0.2;0.8" dur="1.5s" repeatCount="indefinite" />
                </circle>
              )}
            </g>
          ))}

          <rect x="350" y="120" width="100" height="80" rx="4" fill="rgba(239,68,68,0.2)" stroke="rgba(239,68,68,0.5)" strokeWidth="1" strokeDasharray="4,4">
            <animate attributeName="opacity" values="1;0.3;1" dur="2s" repeatCount="indefinite" />
          </rect>
          <text x="400" y="165" textAnchor="middle" fill="rgba(239,68,68,0.8)" fontSize="8" fontFamily="monospace">
            ANOMALY
          </text>
        </svg>

        <div className="space-y-3">
          {AI_CAPABILITIES.map((cap) => (
            <div
              key={cap}
              className="ai-capability glass-panel px-5 py-3 flex items-center gap-4 border-secondary/20"
            >
              <div className="w-2 h-2 bg-accent rounded-full animate-pulse" />
              <span className="font-mono text-sm text-white/80">{cap}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}