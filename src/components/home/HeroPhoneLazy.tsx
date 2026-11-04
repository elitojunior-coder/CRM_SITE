"use client";

import dynamic from "next/dynamic";
import { PHONE_ASPECT } from "@/components/home/phone-styles";

const HeroInteractiveDemo = dynamic(
  () =>
    import("@/components/home/HeroInteractiveDemo").then((m) => ({
      default: m.HeroInteractiveDemo,
    })),
  {
    ssr: false,
    loading: () => (
      <div
        className="mx-auto w-[min(100%,300px)] rounded-[2.4rem] border border-white/10 bg-[#111]/80 lg:w-[320px]"
        style={{ aspectRatio: PHONE_ASPECT }}
        aria-hidden
      />
    ),
  },
);

export function HeroPhoneLazy({ className }: { className?: string }) {
  return (
    <div className={className}>
      <HeroInteractiveDemo />
    </div>
  );
}
