import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

type SectionProps = {
  id?: string;
  children: ReactNode;
  className?: string;
  containerClassName?: string;
  tone?: "default" | "muted" | "accent-band" | "dark" | "petroleum" | "warm";
  ariaLabelledBy?: string;
};

export function Section({
  id,
  children,
  className,
  containerClassName,
  tone = "default",
  ariaLabelledBy,
}: SectionProps) {
  return (
    <section
      id={id}
      aria-labelledby={ariaLabelledBy}
      className={cn(
        "py-16 md:py-24",
        tone === "muted" && "bg-surface-muted",
        tone === "warm" && "bg-surface",
        tone === "accent-band" && "bg-accent/5",
        tone === "dark" &&
          "grain-overlay bg-surface-dark text-ink-on-dark [&_.text-accent]:text-accent",
        tone === "petroleum" &&
          "grain-overlay bg-surface-petroleum text-ink-on-dark",
        className,
      )}
    >
      <div
        className={cn(
          "mx-auto w-full max-w-[1280px] px-5 md:px-8",
          containerClassName,
        )}
      >
        {children}
      </div>
    </section>
  );
}

type SectionHeaderProps = {
  id?: string;
  eyebrow?: string;
  title: string;
  lead?: string;
  align?: "left" | "wide";
  className?: string;
};

export function SectionHeader({
  id,
  eyebrow,
  title,
  lead,
  align = "left",
  className,
}: SectionHeaderProps) {
  return (
    <div
      className={cn(
        "mb-10 w-full min-w-0 md:mb-14",
        align === "wide" && "max-w-3xl",
        className,
      )}
    >
      {eyebrow ? (
        <p className="mb-3 text-xs font-semibold tracking-[0.14em] text-accent uppercase">
          {eyebrow}
        </p>
      ) : null}
      <h2
        id={id}
        className="w-full max-w-none text-pretty font-display text-3xl leading-tight text-ink md:text-4xl lg:text-[2.75rem]"
      >
        {title}
      </h2>
      {lead ? (
        <p className="mt-4 w-full max-w-2xl text-pretty text-lg leading-relaxed text-ink-muted">
          {lead}
        </p>
      ) : null}
    </div>
  );
}
