"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";

import { ChapterTitle } from "@/components/ui/ChapterTitle";
import { THOUGHT_LEADERSHIP } from "@/lib/constants";

export function Chapter7ThoughtLeadership() {
  const sectionRef = useRef<HTMLElement>(null);
  const articlesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const articles = articlesRef.current;
    if (!articles) return;

    const ctx = gsap.context(() => {
      const items = articles.querySelectorAll(".article-holo");

      items.forEach((item, i) => {
        gsap.fromTo(
          item,
          {
            opacity: 0,
            z: -100,
            rotateY: -15,
          },
          {
            opacity: 1,
            z: 0,
            rotateY: 0,
            duration: 1,
            delay: i * 0.15,
            scrollTrigger: {
              trigger: item,
              start: "top 94%",
            },
          }
        );

        gsap.to(item, {
          y: -10 + Math.sin(i) * 5,
          duration: 3 + i * 0.5,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
        });
      });
    }, articles);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="chapter-section relative z-10 px-6 md:px-12 lg:px-20 py-32">
      <ChapterTitle
        chapter="07"
        title="THOUGHT LEADERSHIP"
        subtitle="Holographic insights floating through the data universe"
      />

      <div
        ref={articlesRef}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 perspective-[1000px]"
      >
        {THOUGHT_LEADERSHIP.map((article, i) => (
          <div
            key={article.title}
            className="article-holo glass-panel p-6 relative overflow-hidden group cursor-pointer"
            style={{
              transform: `translateZ(${i * 10}px) rotateY(${i % 2 === 0 ? -2 : 2}deg)`,
            }}
          >
            <div
              className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
              style={{
                background:
                  "linear-gradient(135deg, rgba(59,130,246,0.1) 0%, rgba(124,58,237,0.1) 100%)",
              }}
            />
            <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
            <p className="font-mono text-[10px] text-highlight uppercase tracking-widest mb-3">
              {article.category}
            </p>
            <h3 className="text-lg font-semibold text-white/90 leading-snug mb-4">
              {article.title}
            </h3>
            <p className="font-mono text-xs text-white/30">{article.year}</p>
            <div className="absolute bottom-4 right-4 w-8 h-8 border border-primary/20 rounded-sm opacity-30 group-hover:opacity-60 transition-opacity" />
          </div>
        ))}
      </div>
    </section>
  );
}