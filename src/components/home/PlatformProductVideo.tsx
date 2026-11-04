"use client";

import { useEffect, useRef, useState } from "react";
import { Safari } from "@/components/ui/safari";
import { cn } from "@/lib/cn";

const POSTER = "/video/product-poster.jpg";
const WEBM = "/video/product.webm";
const MP4 = "/video/product.mp4";

export function PlatformProductVideo({ className }: { className?: string }) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const [showVideo, setShowVideo] = useState(false);
  const [reduceMotion, setReduceMotion] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setReduceMotion(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  useEffect(() => {
    if (reduceMotion) return;
    const node = wrapRef.current;
    if (!node) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setShowVideo(true);
          io.disconnect();
        }
      },
      { rootMargin: "120px" },
    );
    io.observe(node);
    return () => io.disconnect();
  }, [reduceMotion]);

  return (
    <div ref={wrapRef} className={cn("relative mt-8", className)}>
      <Safari
        url="app.seucrm.com.br / demonstração"
        imageSrc={reduceMotion || !showVideo ? POSTER : undefined}
        videoSrc={!reduceMotion && showVideo ? MP4 : undefined}
        className="w-full drop-shadow-[0_24px_64px_rgb(28_25_23/0.14)]"
      />
      {!reduceMotion && showVideo ? (
        <video className="sr-only" preload="none" aria-hidden>
          <source src={WEBM} type="video/webm" />
          <source src={MP4} type="video/mp4" />
        </video>
      ) : null}
      <span className="absolute bottom-6 right-6 rounded-full border border-line-on-dark bg-black/50 px-3 py-1 text-[10px] font-semibold uppercase tracking-wide text-ink-on-dark">
        dados de exemplo
      </span>
    </div>
  );
}
