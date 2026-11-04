"use client";

import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useState } from "react";
import { DeviceFrame } from "@/components/home/DeviceFrame";
import { ChatBubble, WhatsAppPhoneShell } from "@/components/home/WhatsAppPhoneShell";
import { HomeTitle } from "@/components/home/HomeTitle";
import { segmentos, type SegmentoId } from "@/lib/segmentos";
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

      <div className="mt-10 min-h-[380px]">
        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial={reduceMotion ? false : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduceMotion ? undefined : { opacity: 0, y: -8 }}
            transition={{ duration: 0.35 }}
            className="grid gap-8 lg:grid-cols-2 lg:items-start"
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
              <div className="mt-6 flex flex-wrap gap-2">
                {data.chips.map((c) => (
                  <span
                    key={c.label}
                    className="rounded-md border border-line bg-surface-raised px-2.5 py-1 text-xs font-medium text-ink"
                  >
                    {c.label}: {c.value}
                  </span>
                ))}
              </div>
            </div>
            <DeviceFrame className="mx-auto w-full max-w-[320px] lg:mx-0 lg:justify-self-end">
              <WhatsAppPhoneShell
                name={data.label}
                status="exemplo de conversa"
                className="min-h-[420px]"
              >
                <ChatBubble side="out" time="14:31" ticks>
                  <span className="text-[11px] font-medium text-[#128C7E]">
                    {data.clientAudio}
                  </span>
                  <p className="mt-1 italic">{data.transcript}</p>
                </ChatBubble>
                <ChatBubble side="in" time="14:32" ticks>
                  {data.agentReply}
                </ChatBubble>
              </WhatsAppPhoneShell>
            </DeviceFrame>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
