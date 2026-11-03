"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";
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
        className="mx-auto min-h-[520px] w-[min(100%,340px)] rounded-[2.4rem] border border-white/10 bg-[#111]/80 lg:min-h-[580px] lg:w-[400px]"
        style={{ aspectRatio: PHONE_ASPECT }}
        aria-hidden
      />
    ),
  },
);

export function HeroPhoneLazy({ className }: { className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setReady(true);
          observer.disconnect();
        }
      },
      { rootMargin: "80px" },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} className={className}>
      {ready ? (
        <HeroInteractiveDemo />
      ) : (
        <div
          className="mx-auto min-h-[520px] w-[min(100%,340px)] rounded-[2.4rem] border border-white/10 bg-[#111]/80 lg:min-h-[580px] lg:w-[400px]"
          style={{ aspectRatio: PHONE_ASPECT }}
          aria-hidden
        />
      )}
    </div>
  );
}
