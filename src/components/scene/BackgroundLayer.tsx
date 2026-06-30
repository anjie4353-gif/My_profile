"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import Image from "next/image";

export function BackgroundLayer() {
  const containerRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const image = imageRef.current;
    if (!image) return;

    gsap.to(image, {
      scale: 1.08,
      duration: 20,
      ease: "none",
      repeat: -1,
      yoyo: true,
    });

    gsap.to(image, {
      x: 15,
      y: -10,
      duration: 15,
      ease: "sine.inOut",
      repeat: -1,
      yoyo: true,
    });
  }, []);

  return (
    <div ref={containerRef} className="fixed inset-0 z-0 overflow-hidden">
      <div ref={imageRef} className="absolute inset-[-5%] w-[110%] h-[110%]">
        <Image
          src="/images/background.jpg"
          alt=""
          fill
          priority
          className="object-cover"
          quality={90}
        />
      </div>
      <div className="absolute inset-0 bg-[#030712]/85" />
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at 30% 50%, rgba(59,130,246,0.08) 0%, transparent 60%), radial-gradient(ellipse at 70% 30%, rgba(124,58,237,0.06) 0%, transparent 50%)",
        }}
      />
      <div
        className="absolute inset-0 opacity-30"
        style={{
          background:
            "linear-gradient(180deg, transparent 0%, rgba(3,7,18,0.8) 100%)",
        }}
      />
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-[120px] animate-pulse" />
        <div className="absolute bottom-1/3 right-1/4 w-80 h-80 bg-secondary/5 rounded-full blur-[100px] animate-pulse" style={{ animationDelay: "2s" }} />
      </div>
    </div>
  );
}