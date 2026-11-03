"use client";

import { motion, useReducedMotion } from "motion/react";
import { useMemo } from "react";
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
    return (
      <Tag className={base}>
        {words.map((word, i) => {
          const clean = word.replace(/[.,!?;:]/g, "");
          const accent = accentWords.some(
            (w) => w.toLowerCase() === clean.toLowerCase(),
          );
          return (
            <span key={`${word}-${i}`}>
              {accent ? (
                <em className="font-display not-italic text-accent italic">
                  {word}
                </em>
              ) : (
                word
              )}
              {i < words.length - 1 ? " " : ""}
            </span>
          );
        })}
      </Tag>
    );
  }

  return (
    <Tag className={base} aria-label={text}>
      <span className="sr-only">{text}</span>
      <span aria-hidden>
        {words.map((word, i) => {
          const clean = word.replace(/[.,!?;:]/g, "");
          const accent = accentWords.some(
            (w) => w.toLowerCase() === clean.toLowerCase(),
          );
          return (
            <motion.span
              key={`${word}-${i}`}
              className={cn(
                "mr-[0.22em] inline-block",
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
          );
        })}
      </span>
    </Tag>
  );
}
