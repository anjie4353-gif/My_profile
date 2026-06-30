"use client";

import { useEffect, useState } from "react";

export function ScrollExplore() {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const hero = document.getElementById("intro");
    if (!hero) return;

    const observer = new IntersectionObserver(
      ([entry]) => setVisible(entry.isIntersecting),
      { threshold: 0.15, rootMargin: "0px 0px -10% 0px" }
    );

    observer.observe(hero);
    return () => observer.disconnect();
  }, []);

  if (!visible) return null;

  return (
    <a href="#about" className="intro-scroll" aria-label="Scroll down to explore">
      <span className="intro-scroll__label">Scroll down to explore</span>
      <span className="intro-scroll__arrow-wrap" aria-hidden>
        <svg className="intro-scroll__arrow" viewBox="0 0 24 32" fill="none">
          <path
            d="M12 4v20M6 18l6 6 6-6"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M12 10v14M7 22l5 5 5-5"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            opacity="0.45"
          />
        </svg>
      </span>
    </a>
  );
}