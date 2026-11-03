"use client";

import { motion, useInView, useReducedMotion } from "motion/react";
import { useRef } from "react";
import { brand } from "@/config/brand";
import { HomeTitle } from "@/components/home/HomeTitle";
import { cn } from "@/lib/cn";

const pairs = [
  { common: "Responde em horas", ours: "Responde em segundos" },
  { common: "Perde áudio", ours: "Entende áudio" },
  { common: "Lead some", ours: "Lead no funil" },
  { common: "Vendedor começa do zero", ours: "Chega com resumo" },
  { common: "Fim de semana parado", ours: "Atendimento 24h" },
] as const;

export function CompareColumns() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-10%" });
  const reduceMotion = useReducedMotion();
  const product = brand.product.name.startsWith("[")
    ? "a plataforma"
    : brand.product.name;

  return (
    <div
      id="comparativo"
      ref={ref}
      className="scroll-mt-24 rounded-3xl bg-surface-dark px-5 py-14 text-ink-on-dark grain-overlay md:px-8 md:py-16"
    >
      <HomeTitle
        as="h2"
        dark
        text={`Atendimento comum x Com ${product}.`}
        accentWords={["Com"]}
        className="text-3xl md:text-5xl"
      />

      <div className="mt-10 grid gap-6 lg:grid-cols-3">
        <div className="rounded-2xl border border-line-on-dark bg-white/5 p-5">
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-ink-muted-on-dark">
            Atendimento comum
          </p>
          <ul className="mt-6 space-y-3">
            {pairs.map((row, i) => (
              <li
                key={row.common}
                className="rounded-lg border border-white/10 bg-black/20 px-3 py-2 text-sm text-ink-muted-on-dark"
              >
                {row.common}
              </li>
            ))}
          </ul>
        </div>

        <div className="flex flex-col justify-center gap-3 lg:col-span-1">
          {pairs.map((row, i) => (
            <motion.div
              key={row.ours}
              initial={reduceMotion ? false : { opacity: 0.35, scale: 0.98 }}
              animate={
                inView
                  ? { opacity: 1, scale: 1 }
                  : { opacity: 0.35, scale: 0.98 }
              }
              transition={{ delay: i * 0.12, duration: 0.45 }}
              className="flex items-center gap-2"
            >
              <span
                className={cn(
                  "inline-flex shrink-0 rounded-full px-3 py-1.5 text-xs font-semibold transition-colors",
                  inView
                    ? "bg-accent/20 text-accent shadow-[0_0_24px_rgb(255_91_46/0.25)]"
                    : "bg-white/5 text-ink-muted-on-dark",
                )}
              >
                {row.ours}
              </span>
            </motion.div>
          ))}
        </div>

        <div className="card-dark-glow rounded-2xl border border-accent/30 p-5 shadow-[inset_0_1px_0_rgb(255_255_255/0.08)]">
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-accent">
            Com {product}
          </p>
          <ul className="mt-6 space-y-3">
            {pairs.map((row) => (
              <li
                key={row.ours}
                className="rounded-lg border border-accent/25 bg-accent/10 px-3 py-2 text-sm font-medium text-ink-on-dark"
              >
                {row.ours}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
