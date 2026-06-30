"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { Mail, FileText, BookOpen, Share2, Briefcase } from "lucide-react";
import { polarXY } from "@/lib/polar-math";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { FINAL_TAGS, LINKS } from "@/lib/constants";

export function FinalScene() {
  const sectionRef = useRef<HTMLElement>(null);
  const networkRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const network = networkRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        section.querySelectorAll(".finale-reveal"),
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          stagger: 0.15,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: section,
            start: "top 88%",
          },
        }
      );

      if (network) {
        const nodes = network.querySelectorAll(".network-node");
        gsap.fromTo(
          nodes,
          { scale: 0, opacity: 0 },
          {
            scale: 1,
            opacity: 1,
            stagger: 0.05,
            duration: 0.5,
            scrollTrigger: { trigger: network, start: "top 92%" },
          }
        );
      }
    }, section);

    return () => ctx.revert();
  }, []);

  const networkNodes = Array.from({ length: 20 }, (_, i) =>
    polarXY(i, 20, 50, 50, 80 + (i % 3) * 30)
  );

  return (
    <section
      ref={sectionRef}
      className="relative z-10 min-h-screen flex flex-col items-center justify-center px-6 md:px-12 py-32"
    >
      <svg
        ref={networkRef}
        viewBox="0 0 600 400"
        className="absolute inset-0 w-full h-full opacity-30 pointer-events-none"
      >
        <circle cx="300" cy="200" r="4" fill="#3B82F6" className="network-node" />
        {networkNodes.map((node, i) => (
          <g key={i}>
            <line
              x1="300"
              y1="200"
              x2={node.x * 3}
              y2={node.y * 2}
              stroke="rgba(59,130,246,0.2)"
              strokeWidth="1"
            />
            <circle
              className="network-node"
              cx={node.x * 3}
              cy={node.y * 2}
              r="3"
              fill="#06B6D4"
              opacity="0.6"
            >
              <animate
                attributeName="opacity"
                values="0.3;0.8;0.3"
                dur={`${2 + i * 0.2}s`}
                repeatCount="indefinite"
              />
            </circle>
          </g>
        ))}
      </svg>

      <div className="relative z-10 text-center max-w-4xl mx-auto">
        <p className="finale-reveal font-mono text-xs tracking-[0.4em] text-highlight uppercase mb-8">
          The Data Universe
        </p>

        <h2 className="finale-reveal text-3xl md:text-5xl lg:text-6xl font-bold text-white text-glow leading-tight">
          Building the Future of Data & AI,
          <br />
          <span className="text-primary">One Intelligent System at a Time.</span>
        </h2>

        <div className="finale-reveal mt-10 flex flex-wrap justify-center gap-3">
          {FINAL_TAGS.map((tag) => (
            <span
              key={tag}
              className="px-4 py-2 text-xs font-mono text-white/50 border border-white/10 tracking-wide"
            >
              {tag}
            </span>
          ))}
        </div>

        <div className="finale-reveal mt-16 flex flex-wrap justify-center gap-4">
          <MagneticButton href={LINKS.linkedin}>
            <Share2 className="w-4 h-4" />
            LinkedIn
          </MagneticButton>
          <MagneticButton href={LINKS.naukri}>
            <Briefcase className="w-4 h-4" />
            Naukri
          </MagneticButton>
          <MagneticButton href={LINKS.medium}>
            <BookOpen className="w-4 h-4" />
            Medium
          </MagneticButton>
          <MagneticButton href={LINKS.email}>
            <Mail className="w-4 h-4" />
            Email
          </MagneticButton>
          <MagneticButton href={LINKS.resume}>
            <FileText className="w-4 h-4" />
            Resume
          </MagneticButton>
        </div>

        <p className="finale-reveal mt-20 font-mono text-[10px] text-white/20 tracking-widest">
          ANJANEYULU PALLEPAGU — ENTERPRISE DATA & AI ARCHITECT © 2026
        </p>
      </div>
    </section>
  );
}