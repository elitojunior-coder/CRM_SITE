"use client";

import dynamic from "next/dynamic";

const HeroGrainCanvasInner = dynamic(
  () =>
    import("@/components/home/HeroGrainCanvasInner").then(
      (m) => m.HeroGrainCanvasInner,
    ),
  { ssr: false },
);

/** WebGL leve — fallback CSS em `.grain-overlay` se falhar ou com reduced motion. */
export function HeroGrainCanvas() {
  return (
    <div
      className="pointer-events-none absolute inset-y-0 left-1/2 z-0 w-[100vw] -translate-x-1/2 overflow-hidden motion-reduce:hidden"
      aria-hidden
    >
      <HeroGrainCanvasInner className="hero-shader-fade h-full w-full opacity-70" />
    </div>
  );
}
