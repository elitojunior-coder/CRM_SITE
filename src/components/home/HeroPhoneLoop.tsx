"use client";

import { motion, useReducedMotion } from "motion/react";
import { useEffect, useState, type ReactNode } from "react";
import { cn } from "@/lib/cn";
import {
  ChatBubble,
  WhatsAppPhoneShell,
} from "@/components/home/WhatsAppPhoneShell";

type Phase =
  | "audio"
  | "transcript"
  | "typing"
  | "reply"
  | "chips"
  | "calendar";

const TIMING: Record<Phase, number> = {
  audio: 2200,
  transcript: 1800,
  typing: 1400,
  reply: 2000,
  chips: 2200,
  calendar: 2400,
};

const ORDER: Phase[] = [
  "audio",
  "transcript",
  "typing",
  "reply",
  "chips",
  "calendar",
];

function orderIndex(p: Phase) {
  return ORDER.indexOf(p);
}

function AudioWave({ active }: { active: boolean }) {
  return (
    <div className="flex h-4 items-end gap-0.5" aria-hidden>
      {[0, 1, 2, 3, 4].map((i) => (
        <motion.span
          key={i}
          className="block w-1 origin-bottom rounded-full bg-[#128C7E]"
          animate={
            active
              ? { scaleY: [0.35, 1, 0.5, 1.1, 0.35] }
              : { scaleY: 0.35 }
          }
          transition={
            active
              ? {
                  duration: 0.9,
                  repeat: Infinity,
                  delay: i * 0.08,
                  ease: "easeInOut",
                }
              : { duration: 0.2 }
          }
          style={{ height: 16 }}
        />
      ))}
    </div>
  );
}

function PhaseBubble({
  visible,
  children,
}: {
  visible: boolean;
  children: ReactNode;
}) {
  return (
    <motion.div
      className="shrink-0 will-change-[transform,opacity]"
      initial={false}
      animate={
        visible
          ? { opacity: 1, y: 0, scale: 1 }
          : { opacity: 0, y: 8, scale: 0.98 }
      }
      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
      style={{ pointerEvents: visible ? "auto" : "none" }}
    >
      {children}
    </motion.div>
  );
}

export function HeroPhoneLoop({ className }: { className?: string }) {
  const reduceMotion = !!useReducedMotion();
  const [phase, setPhase] = useState<Phase>("audio");

  useEffect(() => {
    if (reduceMotion) return;
    let i = 0;
    let timer: ReturnType<typeof setTimeout>;
    const tick = () => {
      const current = ORDER[i];
      setPhase(current);
      timer = setTimeout(() => {
        i = (i + 1) % ORDER.length;
        tick();
      }, TIMING[current]);
    };
    tick();
    return () => clearTimeout(timer);
  }, [reduceMotion]);

  const showAll = reduceMotion;
  const show = (p: Phase) =>
    showAll || phase === p || orderIndex(phase) > orderIndex(p);

  return (
    <div
      className={cn("relative flex items-center justify-center", className)}
    >
      <WhatsAppPhoneShell
        size="hero"
        name="Atendimento · WhatsApp"
        status="online · IA + equipe"
      >
        <PhaseBubble visible={show("audio") || showAll}>
          <ChatBubble side="out" time="14:31" ticks>
            <div className="flex items-center justify-between gap-3">
              <span className="flex items-center gap-2 font-medium text-[#128C7E]">
                <span className="inline-flex size-6 items-center justify-center rounded-full bg-[#128C7E]/15">
                  ▶
                </span>
                0:24
              </span>
              <AudioWave active={!showAll && phase === "audio"} />
            </div>
          </ChatBubble>
        </PhaseBubble>

        <PhaseBubble visible={show("transcript") || showAll}>
          <ChatBubble side="out" time="14:31" ticks>
            <span className="italic text-[#333]">
              “Oi, vi o anúncio. Preciso de orçamento — atendem hoje?”
            </span>
          </ChatBubble>
        </PhaseBubble>

        <PhaseBubble
          visible={
            show("typing") || show("reply") || show("chips") || showAll
          }
        >
          <ChatBubble side="in" time="14:32">
            {!showAll && phase === "typing" ? (
              <span className="text-ink-subtle">digitando…</span>
            ) : show("reply") || showAll ? (
              <>
                Atendo sim. É residência ou empresa? Qual cidade?
              </>
            ) : null}
          </ChatBubble>
        </PhaseBubble>

        <PhaseBubble visible={show("reply") || showAll}>
          <p className="py-0.5 text-center text-[10px] font-medium text-[#128C7E]">
            Resposta em 4 segundos
          </p>
        </PhaseBubble>

        <PhaseBubble visible={show("chips") || showAll}>
          <div className="flex flex-wrap justify-end gap-1.5">
            <span className="rounded-md bg-accent/20 px-2 py-1 text-[10px] font-medium text-accent">
              orçamento: R$ 8 mil
            </span>
            <span className="rounded-md bg-white/90 px-2 py-1 text-[10px] text-ink">
              urgente
            </span>
          </div>
        </PhaseBubble>

        <PhaseBubble visible={show("calendar") || showAll}>
          <ChatBubble side="in" time="14:33" ticks>
            <span className="font-medium text-accent">
              Consulta 16h confirmada na agenda
            </span>
          </ChatBubble>
        </PhaseBubble>
      </WhatsAppPhoneShell>

      <div
        className="pointer-events-none absolute -right-8 top-1/2 -z-10 h-64 w-64 -translate-y-1/2 rounded-full bg-accent/25 blur-[80px]"
        aria-hidden
      />
    </div>
  );
}
