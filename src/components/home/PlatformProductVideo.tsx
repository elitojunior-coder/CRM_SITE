"use client";

import { useEffect, useRef, useState } from "react";
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
    <div
      ref={wrapRef}
      className={cn(
        "relative mt-8 overflow-hidden rounded-2xl border border-line bg-surface-dark shadow-lg",
        className,
      )}
    >
      {reduceMotion || !showVideo ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={POSTER}
          alt=""
          className="aspect-video w-full object-cover"
          loading="lazy"
          decoding="async"
        />
      ) : (
        <video
          className="aspect-video w-full object-cover"
          autoPlay
          loop
          muted
          playsInline
          preload="none"
          poster={POSTER}
        >
          <source src={WEBM} type="video/webm" />
          <source src={MP4} type="video/mp4" />
        </video>
      )}
      <span className="absolute bottom-3 right-3 rounded-full border border-line-on-dark bg-black/50 px-3 py-1 text-[10px] font-semibold uppercase tracking-wide text-ink-on-dark">
        dados de exemplo
      </span>
    </div>
  );
}
