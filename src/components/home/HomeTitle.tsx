"use client";

import { Fragment, useMemo } from "react";
import { motion, useReducedMotion } from "motion/react";
import { cn } from "@/lib/cn";

type HomeTitleProps = {
  text: string;
  as?: "h1" | "h2" | "h3";
  accentWords?: string[];
  className?: string;
  dark?: boolean;
};

export function HomeTitle({
  text,
  as: Tag = "h2",
  accentWords = [],
  className,
  dark = false,
}: HomeTitleProps) {
  const reduceMotion = useReducedMotion();
  const words = useMemo(() => text.split(/\s+/).filter(Boolean), [text]);

  const base = cn(
    "text-balance font-sans font-semibold leading-[1.08] tracking-tight",
    dark ? "text-ink-on-dark" : "text-ink",
    className,
  );

  if (reduceMotion) {
    return <Tag className={base}>{text}</Tag>;
  }

  return (
    <Tag className={base} aria-label={text}>
      <span aria-hidden="true">
        {words.map((word, i) => {
          const clean = word.replace(/[.,!?;:]/g, "");
          const accent = accentWords.some(
            (w) => w.toLowerCase() === clean.toLowerCase(),
          );
          return (
            <Fragment key={`${word}-${i}`}>
              <motion.span
                className={cn(
                  "inline-block",
                  accent && "font-display italic text-accent",
                )}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-8%" }}
                transition={{
                  delay: i * 0.035,
                  duration: 0.4,
                  ease: [0.22, 1, 0.36, 1],
                }}
              >
                {word}
              </motion.span>
              {i < words.length - 1 ? " " : null}
            </Fragment>
          );
        })}
      </span>
    </Tag>
  );
}
