"use client";

import { useRef, type ReactNode, type MouseEvent } from "react";
import { cn } from "@/lib/utils";

interface MagneticButtonProps {
  children: ReactNode;
  href?: string;
  onClick?: () => void;
  className?: string;
  strength?: number;
}

export function MagneticButton({
  children,
  href,
  onClick,
  className,
  strength = 0.3,
}: MagneticButtonProps) {
  const ref = useRef<HTMLAnchorElement | HTMLButtonElement>(null);

  const handleMove = (e: MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    el.style.transform = `translate(${x * strength}px, ${y * strength}px)`;
  };

  const handleLeave = () => {
    const el = ref.current;
    if (!el) return;
    el.style.transform = "translate(0, 0)";
    el.style.transition = "transform 0.4s cubic-bezier(0.23, 1, 0.32, 1)";
    setTimeout(() => {
      if (el) el.style.transition = "";
    }, 400);
  };

  const baseClass = cn(
    "glass-panel relative inline-flex items-center gap-2 px-6 py-3 rounded-full",
    "text-sm font-semibold tracking-wide text-white/90",
    "transition-all duration-300 hover:text-primary",
    "hover:border-primary/40 hover:shadow-[0_4px_20px_rgba(59,130,246,0.2)]",
    "active:scale-[0.98]",
    className
  );

  if (href) {
    return (
      <a
        ref={ref as React.RefObject<HTMLAnchorElement>}
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={baseClass}
        onMouseMove={handleMove}
        onMouseLeave={handleLeave}
      >
        {children}
      </a>
    );
  }

  return (
    <button
      ref={ref as React.RefObject<HTMLButtonElement>}
      onClick={onClick}
      className={baseClass}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
    >
      {children}
    </button>
  );
}