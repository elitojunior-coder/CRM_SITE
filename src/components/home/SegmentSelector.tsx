"use client";

import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useState } from "react";
import { segmentos, type SegmentoId } from "@/lib/segmentos";
import { HomeTitle } from "@/components/home/HomeTitle";
import { cn } from "@/lib/cn";

export function SegmentSelector() {
  const [active, setActive] = useState<SegmentoId>("barbearia");
  const reduceMotion = useReducedMotion();
  const data = segmentos.find((s) => s.id === active)!;

  return (
    <div id="segmentos">
      <HomeTitle
        as="h2"
        text="O fluxo muda por segmento. A lógica é a mesma."
        accentWords={["segmento"]}
        className="text-3xl md:text-5xl"
      />
      <div
        className="mt-8 flex flex-wrap gap-2"
        role="tablist"
        aria-label="Segmentos"
      >
        {segmentos.map((seg) => (
          <button
            key={seg.id}
            type="button"
            role="tab"
            aria-selected={active === seg.id}
            onClick={() => setActive(seg.id)}
            className={cn(
              "rounded-full px-4 py-2 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/40",
              active === seg.id
                ? "bg-accent text-accent-fg"
                : "border border-line bg-surface-raised text-ink-muted hover:text-ink",
            )}
          >
            {seg.label}
          </button>
        ))}
      </div>

      <div className="mt-10 min-h-[420px] lg:min-h-[380px]">
      <AnimatePresence mode="wait">
        <motion.div
          key={active}
          initial={reduceMotion ? false : { opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={reduceMotion ? undefined : { opacity: 0, y: -8 }}
          transition={{ duration: 0.35 }}
          className="grid gap-8 lg:grid-cols-2"
          role="tabpanel"
        >
          <div>
            <p className="text-lg font-medium text-ink">{data.pain}</p>
            <ul className="mt-6 space-y-3">
              {data.features.map((f) => (
                <li
                  key={f}
                  className="flex gap-2 text-ink-muted before:text-accent before:content-['→']"
                >
                  {f}
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-xl border border-line bg-[#ECE5DD] p-4 shadow-md">
            <div className="ml-auto max-w-[88%] rounded-2xl rounded-br-md bg-[#DCF8C6] px-3 py-2 text-sm text-[#111]">
              <span className="text-[11px] font-medium text-[#128C7E]">
                {data.clientAudio}
              </span>
              <p className="mt-1 italic">{data.transcript}</p>
            </div>
            <div className="mr-auto mt-2 max-w-[88%] rounded-2xl rounded-bl-md bg-white px-3 py-2 text-sm text-ink">
              {data.agentReply}
            </div>
            <div className="mt-3 flex flex-wrap gap-2">
              {data.chips.map((c) => (
                <span
                  key={c.label}
                  className="rounded-md bg-accent/15 px-2 py-1 text-xs text-accent"
                >
                  {c.label}: {c.value}
                </span>
              ))}
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
      </div>
    </div>
  );
}
