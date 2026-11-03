"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";

const HomeBelowFold = dynamic(
  () =>
    import("@/components/home/HomeBelowFold").then((m) => ({
      default: m.HomeBelowFold,
    })),
  { ssr: false, loading: () => <div className="min-h-[40vh]" aria-hidden /> },
);

export function HomeBelowFoldLazy() {
  const sentinelRef = useRef<HTMLDivElement>(null);
  const [mount, setMount] = useState(false);

  useEffect(() => {
    const node = sentinelRef.current;
    if (!node) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setMount(true);
          observer.disconnect();
        }
      },
      { rootMargin: "320px 0px" },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={sentinelRef}>
      {mount ? <HomeBelowFold /> : <div className="min-h-[40vh]" aria-hidden />}
    </div>
  );
}
