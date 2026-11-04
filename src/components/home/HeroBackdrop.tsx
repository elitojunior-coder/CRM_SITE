"use client";

import dynamic from "next/dynamic";
import { HeroSpotlight } from "@/components/home/HeroSpotlight";

const Particles = dynamic(
  () => import("@/components/ui/particles").then((m) => m.Particles),
  { ssr: false },
);

/** Luz + partículas atrás do conteúdo (z-index negativo). */
export function HeroBackdrop() {
  return (
    <>
      <HeroSpotlight />
      <Particles
        className="absolute inset-0 -z-20 opacity-70"
        quantity={36}
        staticity={40}
        ease={70}
        size={0.45}
        color="#ff5b2e"
      />
    </>
  );
}
