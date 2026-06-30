"use client";

import { useEffect, useRef } from "react";

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  alpha: number;
  targetX?: number;
  targetY?: number;
  phase: "wander" | "form" | "settled";
}

interface ParticleCanvasProps {
  mode?: "ambient" | "form-text" | "stream";
  className?: string;
  opacity?: number;
}

export function ParticleCanvas({
  mode = "ambient",
  className = "",
  opacity = 1,
}: ParticleCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const animationRef = useRef<number>(0);
  const modeRef = useRef(mode);

  useEffect(() => {
    modeRef.current = mode;
  }, [mode]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const count = mode === "form-text" ? 2000 : mode === "stream" ? 800 : 150;
    const particles: Particle[] = [];

    for (let i = 0; i < count; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        size: Math.random() * 2 + 0.5,
        alpha: Math.random() * 0.5 + 0.2,
        phase: "wander",
      });
    }
    particlesRef.current = particles;

    const getTextPoints = (): { x: number; y: number }[] => {
      const offCanvas = document.createElement("canvas");
      const w = canvas.width;
      const h = canvas.height;
      offCanvas.width = w;
      offCanvas.height = h;
      const offCtx = offCanvas.getContext("2d");
      if (!offCtx) return [];

      offCtx.fillStyle = "#fff";
      offCtx.font = `bold ${Math.min(w * 0.04, 48)}px system-ui`;
      offCtx.textAlign = "center";
      offCtx.textBaseline = "middle";
      offCtx.fillText("ANJANEYULU PALLEPAGU", w / 2, h / 2);

      const imageData = offCtx.getImageData(0, 0, w, h);
      const points: { x: number; y: number }[] = [];
      const gap = 4;

      for (let y = 0; y < h; y += gap) {
        for (let x = 0; x < w; x += gap) {
          const idx = (y * w + x) * 4;
          if (imageData.data[idx + 3] > 128) {
            points.push({ x, y });
          }
        }
      }
      return points;
    };

    let textPoints: { x: number; y: number }[] = [];
    let formStartTime = 0;
    const FORM_DELAY = 2000;

    const animate = (time: number) => {
      if (!formStartTime) formStartTime = time;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const currentMode = modeRef.current;

      if (currentMode === "form-text" && textPoints.length === 0) {
        textPoints = getTextPoints();
        particles.forEach((p, i) => {
          const target = textPoints[i % textPoints.length];
          if (target) {
            p.targetX = target.x;
            p.targetY = target.y;
            p.phase = "wander";
          }
        });
      }

      particles.forEach((p) => {
        if (currentMode === "form-text" && time - formStartTime > FORM_DELAY) {
          if (p.targetX !== undefined && p.targetY !== undefined) {
            const dx = p.targetX - p.x;
            const dy = p.targetY - p.y;
            p.vx += dx * 0.002;
            p.vy += dy * 0.002;
            p.vx *= 0.92;
            p.vy *= 0.92;
            if (Math.abs(dx) < 2 && Math.abs(dy) < 2) p.phase = "settled";
          }
        } else if (currentMode === "stream") {
          p.x += p.vx * 3;
          p.y += p.vy;
          if (p.x > canvas.width) p.x = 0;
          if (p.x < 0) p.x = canvas.width;
          if (p.y > canvas.height) p.y = 0;
          if (p.y < 0) p.y = canvas.height;
        } else {
          p.x += p.vx;
          p.y += p.vy;
          if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
          if (p.y < 0 || p.y > canvas.height) p.vy *= -1;
        }

        const gradient = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.size * 2);
        gradient.addColorStop(0, `rgba(59, 130, 246, ${p.alpha})`);
        gradient.addColorStop(1, `rgba(6, 182, 212, 0)`);

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = gradient;
        ctx.fill();
      });

      if (currentMode === "ambient") {
        particles.forEach((p, i) => {
          particles.slice(i + 1).forEach((p2) => {
            const dist = Math.hypot(p.x - p2.x, p.y - p2.y);
            if (dist < 100) {
              ctx.beginPath();
              ctx.moveTo(p.x, p.y);
              ctx.lineTo(p2.x, p2.y);
              ctx.strokeStyle = `rgba(59, 130, 246, ${0.05 * (1 - dist / 100)})`;
              ctx.lineWidth = 0.5;
              ctx.stroke();
            }
          });
        });
      }

      animationRef.current = requestAnimationFrame(animate);
    };

    animationRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(animationRef.current);
    };
  }, [mode]);

  return (
    <canvas
      ref={canvasRef}
      className={`fixed inset-0 pointer-events-none z-[1] ${className}`}
      style={{ opacity }}
    />
  );
}