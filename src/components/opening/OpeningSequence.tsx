"use client";

import { useEffect, useState } from "react";
import { gsap } from "gsap";
import { ParticleCanvas } from "@/components/scene/ParticleCanvas";

interface OpeningSequenceProps {
  onComplete: () => void;
}

export function OpeningSequence({ onComplete }: OpeningSequenceProps) {
  const [phase, setPhase] = useState<"black" | "particles" | "forming" | "done">("black");

  useEffect(() => {
    const tl = gsap.timeline({
      onComplete: () => {
        setPhase("done");
        onComplete();
      },
    });

    tl.to({}, { duration: 0.8 })
      .call(() => setPhase("particles"))
      .to({}, { duration: 1.5 })
      .call(() => setPhase("forming"))
      .to({}, { duration: 3 })
      .to(".opening-overlay", { opacity: 0, duration: 1.5, ease: "power2.inOut" });

    return () => {
      tl.kill();
    };
  }, [onComplete]);

  if (phase === "done") return null;

  return (
    <div className="opening-overlay fixed inset-0 z-[100] bg-black flex items-center justify-center">
      {(phase === "particles" || phase === "forming") && (
        <ParticleCanvas
          mode={phase === "forming" ? "form-text" : "ambient"}
          opacity={phase === "forming" ? 1 : 0.6}
        />
      )}
      {phase === "black" && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-1 h-1 bg-primary rounded-full animate-pulse" />
        </div>
      )}
    </div>
  );
}