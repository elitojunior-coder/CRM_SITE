import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

type BadgeProps = {
  children: ReactNode;
  className?: string;
  tone?: "neutral" | "accent" | "success";
};

export function Badge({
  children,
  className,
  tone = "neutral",
}: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium tracking-wide uppercase",
        tone === "neutral" && "bg-surface-raised text-ink-muted",
        tone === "accent" && "bg-accent/10 text-accent",
        tone === "success" && "bg-success/10 text-success",
        className,
      )}
    >
      {children}
    </span>
  );
}
