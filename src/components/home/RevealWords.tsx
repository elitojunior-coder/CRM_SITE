"use client";

import { Fragment, useMemo } from "react";
import { motion, useReducedMotion } from "motion/react";
import { cn } from "@/lib/cn";

type RevealWordsProps = {
  text: string;
  as?: "h2" | "h3" | "p";
  className?: string;
  italicWords?: string[];
};

export function RevealWords({
  text,
  as: Tag = "h2",
  className,
  italicWords = [],
}: RevealWordsProps) {
  const reduceMotion = useReducedMotion();
  const words = useMemo(
    () => text.split(/\s+/).filter(Boolean),
    [text],
  );

  if (reduceMotion) {
    return <Tag className={className}>{text}</Tag>;
  }

  return (
    <Tag className={className} aria-label={text}>
      <span aria-hidden="true" className="inline">
        {words.map((word, i) => {
          const clean = word.replace(/[.,!?;:]/g, "");
          const emphasis = italicWords.some(
            (w) => w.toLowerCase() === clean.toLowerCase(),
          );
          return (
            <Fragment key={`${word}-${i}`}>
              <motion.span
                className={cn("inline-block", emphasis && "italic")}
                initial={{ opacity: 0, y: 12, filter: "blur(4px)" }}
                whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                viewport={{ once: true, margin: "-10%" }}
                transition={{
                  delay: i * 0.04,
                  duration: 0.45,
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
