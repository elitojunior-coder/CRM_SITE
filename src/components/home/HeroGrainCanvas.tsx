"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

const HeroGrainCanvasInner = dynamic(
  () =>
    import("@/components/home/HeroGrainCanvasInner").then(
      (m) => m.HeroGrainCanvasInner,
    ),
  { ssr: false },
);

/** WebGL leve — só desktop; mobile usa CSS (`.grain-overlay`). */
export function HeroGrainCanvas() {
  const [desktop, setDesktop] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 768px)");
    const sync = () => setDesktop(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  if (!desktop) return null;

  return (
    <div
      className="pointer-events-none absolute inset-0 -z-20 overflow-hidden motion-reduce:hidden"
      aria-hidden
    >
      <HeroGrainCanvasInner className="hero-shader-fade h-full w-full opacity-70" />
    </div>
  );
}
