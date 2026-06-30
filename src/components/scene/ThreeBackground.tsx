"use client";

import dynamic from "next/dynamic";
import { Suspense } from "react";

const ThreeScene = dynamic(() => import("./ThreeScene").then((m) => m.ThreeScene), {
  ssr: false,
  loading: () => null,
});

export function ThreeBackground() {
  return (
    <Suspense fallback={null}>
      <div className="fixed inset-0 z-[2] pointer-events-none opacity-40">
        <ThreeScene />
      </div>
    </Suspense>
  );
}