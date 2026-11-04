"use client";

import { motion, useInView, useReducedMotion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { HomeTitle } from "@/components/home/HomeTitle";

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
      <HomeTitle
        as="h2"
        text="Mesma mensagem. Dois destinos."
        accentWords={["destinos"]}
        className="text-3xl md:text-5xl"
      />
      <p className="mt-4 max-w-2xl text-lg leading-relaxed text-ink-muted md:text-xl">
        Enquanto você demora, o cliente fecha com quem responde na hora.
      </p>

      <div className="relative mt-12 w-full rounded-2xl bg-surface-dark px-5 py-14 text-ink-on-dark md:px-8 md:py-20">
        <div className="mx-auto grid max-w-[1280px] gap-10 lg:grid-cols-2 lg:gap-16">
          <motion.div
            initial={reduceMotion ? false : { opacity: 0, x: -20 }}
            animate={inView ? { opacity: 1, x: 0 } : undefined}
            transition={{ duration: 0.55 }}
            className="flex flex-col justify-center"
          >
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-ink-muted-on-dark">
              Antes
            </p>
            <p
              className="mt-4 font-sans text-5xl font-semibold tabular-nums tracking-tight md:text-7xl lg:text-8xl"
              aria-live="polite"
            >
              {formatElapsed(elapsed)}
            </p>
            <p className="mt-3 text-lg text-ink-muted-on-dark">
              visualizada · sem resposta
            </p>
            <div className="mt-8 max-w-md rounded-2xl bg-[#ECE5DD] p-4 shadow-2xl">
              <div className="ml-auto max-w-[88%] rounded-2xl rounded-br-md bg-[#DCF8C6] px-3 py-2.5 text-sm text-[#111]">
                “Tem horário hoje? Preciso urgente.”
              </div>
              <p className="mt-4 text-center text-xs text-[#667781]">
                ✓✓ visualizada
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={reduceMotion ? false : { opacity: 0, x: 20 }}
            animate={inView ? { opacity: 1, x: 0 } : undefined}
            transition={{ duration: 0.55, delay: 0.1 }}
            className="flex flex-col justify-center"
          >
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-accent">
              Depois
            </p>
            <p className="mt-4 font-sans text-5xl font-semibold tabular-nums tracking-tight text-accent md:text-7xl lg:text-8xl">
              4 segundos
            </p>
            <p className="mt-3 text-lg text-ink-muted-on-dark">
              resposta pronta · agenda sugerida
            </p>
            <div className="mt-8 max-w-md rounded-2xl bg-[#ECE5DD] p-4 shadow-2xl ring-1 ring-accent/30">
              <div className="ml-auto max-w-[88%] rounded-2xl rounded-br-md bg-[#DCF8C6] px-3 py-2.5 text-sm text-[#111]">
                “Tem horário hoje? Preciso urgente.”
              </div>
              <div className="mr-auto mt-2 max-w-[88%] rounded-2xl rounded-bl-md bg-white px-3 py-2.5 text-sm text-ink shadow-sm">
                Tenho 17h ou 18h30. Qual prefere? Confirmo na agenda em seguida.
              </div>
              <p className="mt-4 text-center text-xs font-medium text-accent">
                respondido em 4 segundos
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
