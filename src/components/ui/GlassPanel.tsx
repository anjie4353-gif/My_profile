import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

interface GlassPanelProps {
  children: ReactNode;
  className?: string;
}

export function GlassPanel({ children, className }: GlassPanelProps) {
  return (
    <div className={cn("glass-panel rounded-[28px] p-6", className)}>{children}</div>
  );
}