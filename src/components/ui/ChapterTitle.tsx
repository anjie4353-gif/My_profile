"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { cn } from "@/lib/utils";
import { REVEAL_DURATION, REVEAL_START_EARLY } from "@/lib/scroll-config";

interface ChapterTitleProps {
  chapter: string;
  title: string;
  subtitle?: string;
  className?: string;
}

export function ChapterTitle({ chapter, title, subtitle, className }: ChapterTitleProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        el.querySelectorAll(".chapter-animate"),
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: REVEAL_DURATION,
          stagger: 0.08,
          ease: "power2.out",
          scrollTrigger: {
            trigger: el,
            start: REVEAL_START_EARLY,
            toggleActions: "play none none none",
          },
        }
      );
    }, el);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={ref} className={cn("mb-16 md:mb-24", className)}>
      <p className="chapter-animate font-[family-name:var(--font-dm)] text-[0.6rem] tracking-[0.28em] text-white/50 uppercase mb-4">
        Chapter {chapter}
      </p>
      <h2 className="chapter-animate text-spark font-[family-name:var(--font-cormorant)] text-3xl md:text-5xl lg:text-6xl font-semibold tracking-tight text-white">
        {title}
      </h2>
      {subtitle && (
        <p className="chapter-animate mt-4 text-lg md:text-xl text-white/80 max-w-2xl">
          {subtitle}
        </p>
      )}
    </div>
  );
}