"use client";

import { useEffect, useRef } from "react";

export function useReveal(staggerMs = 45) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = ref.current;
    if (!root) return;

    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const items = root.querySelectorAll<HTMLElement>("[data-reveal]");

    if (prefersReduced) {
      items.forEach((el) => el.classList.add("is-visible"));
      return;
    }

    const reveal = (el: HTMLElement, delay: number) => {
      setTimeout(() => el.classList.add("is-visible"), delay);
    };

    const isInView = (el: HTMLElement) => {
      const rect = el.getBoundingClientRect();
      return rect.top < window.innerHeight * 0.92 && rect.bottom > 0;
    };

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const el = entry.target as HTMLElement;
          const delay = Number(el.dataset.revealDelay || 0);
          reveal(el, delay);
          observer.unobserve(el);
        });
      },
      { threshold: 0.02, rootMargin: "0px 0px 100px 0px" }
    );

    items.forEach((el, i) => {
      const delay = i * staggerMs;
      el.dataset.revealDelay = String(delay);

      if (isInView(el)) {
        reveal(el, delay);
      } else {
        observer.observe(el);
      }
    });

    return () => observer.disconnect();
  }, [staggerMs]);

  return ref;
}