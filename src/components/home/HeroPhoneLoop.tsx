"use client";

import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useEffect, useState } from "react";
import { cn } from "@/lib/cn";

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

function AudioWave({ active }: { active: boolean }) {
  return (
    <div className="flex items-end gap-0.5" aria-hidden>
      {[0, 1, 2, 3, 4].map((i) => (
        <motion.span
          key={i}
          className="w-1 rounded-full bg-[#128C7E]"
          animate={
            active
              ? { height: [6, 16, 8, 18, 6] }
              : { height: 6 }
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
          style={{ height: 6 }}
        />
      ))}
    </div>
  );
}

export function HeroPhoneLoop({ className }: { className?: string }) {
  const reduceMotion = useReducedMotion();
  const [phase, setPhase] = useState<Phase>("audio");

  useEffect(() => {
    if (reduceMotion) return;
    const order: Phase[] = [
      "audio",
      "transcript",
      "typing",
      "reply",
      "chips",
      "calendar",
    ];
    let i = 0;
    let timer: ReturnType<typeof setTimeout>;
    const tick = () => {
      const current = order[i];
      setPhase(current);
      timer = setTimeout(() => {
        i = (i + 1) % order.length;
        tick();
      }, TIMING[current]);
    };
    tick();
    return () => clearTimeout(timer);
  }, [reduceMotion]);

  const showAll = reduceMotion;
  const show = (p: Phase) => showAll || phase === p || orderIndex(phase) > orderIndex(p);

  function orderIndex(p: Phase) {
    const order: Phase[] = [
      "audio",
      "transcript",
      "typing",
      "reply",
      "chips",
      "calendar",
    ];
    return order.indexOf(p);
  }

  return (
    <div className={cn("relative flex items-center justify-center gap-4", className)}>
      <div
        className="relative mx-auto w-[min(100%,280px)] rounded-[2.4rem] border border-white/10 bg-[#111] p-2 shadow-[0_40px_80px_rgb(0_0_0/0.55)]"
        aria-label="Simulação de atendimento no WhatsApp"
      >
        <div className="absolute left-1/2 top-2 z-10 h-6 w-24 -translate-x-1/2 rounded-full bg-black/80" aria-hidden />
        <div className="overflow-hidden rounded-[2rem] bg-[#ECE5DD]">
          <div className="bg-[#075E54] px-4 py-3 text-white">
            <p className="text-sm font-medium">Atendimento · WhatsApp</p>
            <p className="text-[11px] text-white/75">online · IA + equipe</p>
          </div>
          <div className="min-h-[320px] space-y-2.5 p-3 text-[12px] leading-snug">
            {(show("audio") || showAll) && (
              <div className="ml-auto max-w-[88%] rounded-2xl rounded-br-md bg-[#DCF8C6] px-3 py-2 text-[#111] shadow-sm">
                <div className="mb-1 flex items-center justify-between gap-2 text-[10px] font-medium text-[#128C7E]">
                  <span>Áudio · 0:24</span>
                  <AudioWave active={!showAll && phase === "audio"} />
                </div>
              </div>
            )}

            {(show("transcript") || showAll) && (
              <motion.div
                initial={showAll ? false : { opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                className="ml-auto max-w-[88%] rounded-2xl rounded-br-md bg-[#DCF8C6] px-3 py-2 italic text-[#333]"
              >
                “Oi, vi o anúncio. Preciso de orçamento — atendem hoje?”
              </motion.div>
            )}

            {(show("typing") || show("reply") || showAll) && (
              <div className="mr-auto max-w-[88%] rounded-2xl rounded-bl-md border border-line bg-white px-3 py-2 text-ink">
                {!showAll && phase === "typing" ? (
                  <span className="text-ink-subtle">digitando…</span>
                ) : show("reply") || showAll ? (
                  <motion.span
                    initial={showAll ? false : { opacity: 0 }}
                    animate={{ opacity: 1 }}
                  >
                    Atendo sim. É residência ou empresa? Qual cidade?
                  </motion.span>
                ) : null}
              </div>
            )}

            {(show("reply") || showAll) && (
              <p className="text-center text-[10px] text-[#128C7E]">
                Resposta em 4 segundos
              </p>
            )}
          </div>
        </div>
      </div>

      <AnimatePresence mode="popLayout">
        {(show("chips") || show("calendar") || showAll) && (
          <motion.div
            key="funnel"
            initial={showAll ? false : { opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 10 }}
            className="hidden w-44 shrink-0 lg:block"
          >
            <div className="card-dark-glow rounded-xl p-3 text-ink-on-dark">
              <p className="text-[10px] font-semibold uppercase tracking-wide text-ink-muted-on-dark">
                Funil
              </p>
              <div className="mt-2 space-y-1.5">
                {(show("chips") || showAll) && (
                  <>
                    <motion.span
                      layout
                      className="block rounded-md bg-accent/20 px-2 py-1 text-[11px] text-accent"
                      initial={showAll ? false : { x: -40, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                    >
                      orçamento: R$ 8 mil
                    </motion.span>
                    <motion.span
                      layout
                      className="block rounded-md bg-white/10 px-2 py-1 text-[11px]"
                      initial={showAll ? false : { x: -40, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ delay: 0.15 }}
                    >
                      urgente
                    </motion.span>
                  </>
                )}
                {(show("calendar") || showAll) && (
                  <motion.p
                    className="mt-2 flex items-center gap-1 text-[11px] text-accent"
                    initial={showAll ? false : { opacity: 0 }}
                    animate={{ opacity: 1 }}
                  >
                    Consulta 16h confirmada
                  </motion.p>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div
        className="pointer-events-none absolute -right-8 top-1/2 -z-10 h-64 w-64 -translate-y-1/2 rounded-full bg-accent/25 blur-[80px]"
        aria-hidden
      />
    </div>
  );
}
