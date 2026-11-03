"use client";

import dynamic from "next/dynamic";
import { useReducedMotion } from "motion/react";

const HeroGrainCanvasInner = dynamic(
  () =>
    import("@/components/home/HeroGrainCanvasInner").then(
      (m) => m.HeroGrainCanvasInner,
    ),
  { ssr: false },
);

/** WebGL leve — fallback CSS em `.grain-overlay` se falhar ou com reduced motion. */
export function HeroGrainCanvas() {
  const reduceMotion = useReducedMotion();
  if (reduceMotion) return null;
  return (
    <HeroGrainCanvasInner
      className="pointer-events-none absolute inset-0 -z-10 opacity-60"
      aria-hidden
    />
  );
}
