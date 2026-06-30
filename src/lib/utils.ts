import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatMetric(value: number, suffix: string): string {
  if (value >= 1000000) return `${(value / 1000000).toFixed(1)}M${suffix}`;
  if (value >= 1000) return `${Math.round(value / 1000)}K${suffix}`;
  return `${Math.round(value)}${suffix}`;
}