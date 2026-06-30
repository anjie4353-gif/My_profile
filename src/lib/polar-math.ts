/** Deterministic polar coords — rounded to avoid SSR/client hydration drift */

export function polarXY(
  index: number,
  total: number,
  cx: number,
  cy: number,
  radius: number
): { x: number; y: number } {
  const angle = (index / total) * Math.PI * 2 - Math.PI / 2;
  return {
    x: Number((cx + Math.cos(angle) * radius).toFixed(2)),
    y: Number((cy + Math.sin(angle) * radius).toFixed(2)),
  };
}

export function polarOffset(
  index: number,
  total: number,
  radius: number
): { x: number; y: number } {
  const angle = (index / total) * Math.PI * 2 - Math.PI / 2;
  return {
    x: Number((Math.cos(angle) * radius).toFixed(2)),
    y: Number((Math.sin(angle) * radius).toFixed(2)),
  };
}