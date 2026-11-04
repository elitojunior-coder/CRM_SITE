"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { useRef, type ReactNode } from "react";
import { cn } from "@/lib/cn";

type Props = {
  children: ReactNode;
  className?: string;
};

export function ProductStageShell({ children, className }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "center center"],
  });
  const scale = useTransform(scrollYProgress, [0, 1], [0.96, 1]);

  return (
    <div ref={ref} className={cn("relative mx-auto w-full max-w-[1200px] px-5 md:px-8", className)}>
      <div
        className="pointer-events-none absolute -inset-x-[10%] -top-[8%] bottom-[28%] -z-10"
        aria-hidden
      >
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_85%_55%_at_50%_100%,rgba(255,91,46,0.38),transparent_58%),radial-gradient(ellipse_70%_45%_at_50%_105%,rgba(14,59,67,0.55),transparent_52%)]" />
      </div>
      <motion.div
        className="relative w-full origin-center"
        style={reduceMotion ? undefined : { scale }}
      >
        <div
          className="relative overflow-hidden rounded-[18px] border border-white/10 bg-[#121416]/90 shadow-[inset_0_1px_0_rgba(255,255,255,0.08),inset_0_-24px_48px_rgba(0,0,0,0.35),0_24px_80px_rgba(0,0,0,0.45)]"
          style={{ aspectRatio: "16 / 10" }}
        >
          <div className="absolute inset-0 overflow-hidden rounded-[17px]">{children}</div>
        </div>
      </motion.div>
    </div>
  );
}
