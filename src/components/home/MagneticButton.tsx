"use client";

import Link from "next/link";
import { motion, useMotionValue, useReducedMotion, useSpring } from "motion/react";
import type { MouseEvent, ReactNode } from "react";
import { cn } from "@/lib/cn";

type MagneticButtonProps = {
  href: string;
  children: ReactNode;
  className?: string;
  variant?: "primary" | "ghost-dark";
};

export function MagneticButton({
  href,
  children,
  className,
  variant = "primary",
}: MagneticButtonProps) {
  const reduceMotion = useReducedMotion();
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 280, damping: 22 });
  const sy = useSpring(y, { stiffness: 280, damping: 22 });

  const onMove = (e: MouseEvent<HTMLAnchorElement>) => {
    if (reduceMotion) return;
    const rect = e.currentTarget.getBoundingClientRect();
    x.set((e.clientX - rect.left - rect.width / 2) * 0.12);
    y.set((e.clientY - rect.top - rect.height / 2) * 0.12);
  };

  const onLeave = () => {
    x.set(0);
    y.set(0);
  };

  const styles =
    variant === "primary"
      ? "bg-accent text-accent-fg hover:bg-accent-hover shadow-lg shadow-accent/25"
      : "border border-line-on-dark bg-white/5 text-ink-on-dark hover:bg-white/10";

  return (
    <motion.div style={reduceMotion ? undefined : { x: sx, y: sy }}>
      <Link
        href={href}
        onMouseMove={onMove}
        onMouseLeave={onLeave}
        className={cn(
          "inline-flex items-center justify-center rounded-md px-6 py-3 text-sm font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/50 focus-visible:ring-offset-2 focus-visible:ring-offset-surface-dark motion-reduce:transform-none",
          styles,
          className,
        )}
      >
        {children}
      </Link>
    </motion.div>
  );
}
