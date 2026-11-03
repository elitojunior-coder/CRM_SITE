"use client";

import { motion, useInView, useReducedMotion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { RevealWords } from "@/components/home/RevealWords";

function formatElapsed(totalSec: number) {
  const h = Math.floor(totalSec / 3600);
  const m = Math.floor((totalSec % 3600) / 60);
  if (h > 0) return `${h}h ${m}min`;
  return `${m}min`;
}

export function BeforeAfter() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-15%" });
  const reduceMotion = useReducedMotion();
  const [elapsed, setElapsed] = useState(8040);

  useEffect(() => {
    if (!inView || reduceMotion) return;
    const start = Date.now();
    const base = 8040;
    const id = setInterval(() => {
      setElapsed(base + Math.floor((Date.now() - start) / 1000));
    }, 1000);
    return () => clearInterval(id);
  }, [inView, reduceMotion]);

  return (
    <div ref={ref} id="antes-depois">
      <RevealWords
        text="Mesma mensagem. Dois destinos."
        className="font-display text-3xl text-ink md:text-5xl"
        italicWords={["destinos"]}
      />
      <p className="mt-4 max-w-2xl text-lg text-ink-muted">
        Enquanto você demora, o cliente fecha com quem responde na hora.
      </p>

      <div className="mt-12 grid gap-6 md:grid-cols-2">
        <motion.div
          initial={reduceMotion ? false : { opacity: 0, x: -24 }}
          animate={inView ? { opacity: 1, x: 0 } : undefined}
          transition={{ duration: 0.5 }}
          className="rounded-2xl border border-line bg-surface-raised p-5"
        >
          <p className="text-xs font-semibold uppercase tracking-wide text-ink-subtle">
            Antes
          </p>
          <div className="mt-4 rounded-xl bg-[#ECE5DD] p-4">
            <div className="ml-auto max-w-[85%] rounded-2xl rounded-br-md bg-[#DCF8C6] px-3 py-2 text-sm text-[#111]">
              “Tem horário hoje? Preciso urgente.”
            </div>
            <p className="mt-6 text-center text-xs text-ink-subtle">
              visualizada há{" "}
              <span className="font-mono tabular-nums text-ink">
                {formatElapsed(elapsed)}
              </span>
            </p>
          </div>
        </motion.div>

        <motion.div
          initial={reduceMotion ? false : { opacity: 0, x: 24 }}
          animate={inView ? { opacity: 1, x: 0 } : undefined}
          transition={{ duration: 0.5, delay: 0.12 }}
          className="rounded-2xl border border-accent/30 bg-surface-raised p-5 ring-1 ring-accent/10"
        >
          <p className="text-xs font-semibold uppercase tracking-wide text-accent">
            Depois
          </p>
          <div className="mt-4 rounded-xl bg-[#ECE5DD] p-4">
            <div className="ml-auto max-w-[85%] rounded-2xl rounded-br-md bg-[#DCF8C6] px-3 py-2 text-sm text-[#111]">
              “Tem horário hoje? Preciso urgente.”
            </div>
            <div className="mr-auto mt-2 max-w-[85%] rounded-2xl rounded-bl-md bg-white px-3 py-2 text-sm text-ink shadow-sm">
              Tenho 17h ou 18h30. Qual prefere? Confirmo na agenda em seguida.
            </div>
            <p className="mt-4 text-center text-xs font-medium text-accent">
              respondido em 4 segundos
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
