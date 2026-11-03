"use client";

import {
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useTransform,
} from "motion/react";
import { useRef, useState } from "react";
import { HomeTitle } from "@/components/home/HomeTitle";
import { cn } from "@/lib/cn";

const stations = [
  {
    id: "whatsapp",
    title: "WhatsApp / site",
    body: "Cliente manda texto, áudio ou clica no widget.",
    mini: (
      <div className="rounded-lg bg-[#ECE5DD] p-2 text-[10px] text-[#111]">
        <div className="ml-auto max-w-[90%] rounded-lg rounded-br-sm bg-[#DCF8C6] px-2 py-1">
          “Tem horário hoje?”
        </div>
      </div>
    ),
  },
  {
    id: "ia",
    title: "IA",
    body: "Entende intenção, transcreve áudio e responde em segundos.",
    mini: (
      <div className="space-y-1 rounded-lg border border-line bg-white p-2 text-[10px] text-on-light">
        <p className="font-medium text-accent">Intenção: agendar</p>
        <p className="text-ink-muted">Áudio → texto em 2s</p>
      </div>
    ),
  },
  {
    id: "funil",
    title: "Funil",
    body: "Card qualificado com valor, urgência e etapa.",
    mini: (
      <div className="card-dark-glow rounded-lg p-2 text-[10px] text-ink-on-dark">
        <p className="font-medium text-accent">Qualificado</p>
        <p className="text-ink-muted-on-dark">R$ 8 mil · urgente</p>
      </div>
    ),
  },
  {
    id: "vendedor",
    title: "Vendedor",
    body: "Resumo pronto — um clique para assumir a conversa.",
    mini: (
      <div className="rounded-lg border border-line bg-white p-2 text-[10px] text-on-light">
        <p className="font-medium text-ink">Resumo do lead</p>
        <p className="text-ink-muted">Quer orçamento hoje · prefere 16h</p>
        <span className="mt-2 inline-block rounded bg-accent px-2 py-0.5 text-[9px] font-semibold text-accent-fg">
          Assumir conversa
        </span>
      </div>
    ),
  },
] as const;

export function MessagePath() {
  const ref = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();
  const [active, setActive] = useState(0);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.75", "end 0.3"],
  });
  const dotLeft = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);
  const pathOffset = useTransform(scrollYProgress, [0, 1], [1, 0]);

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    if (reduceMotion) return;
    setActive(Math.min(stations.length - 1, Math.floor(v * stations.length)));
  });

  return (
    <div id="caminho-mensagem" ref={ref} className="scroll-mt-24 py-8 md:py-12">
      <HomeTitle
        as="h2"
        text="O caminho da mensagem."
        accentWords={["caminho"]}
        className="text-3xl md:text-5xl"
      />
      <p className="mt-4 max-w-2xl text-lg text-ink-muted">
        Do primeiro contato ao vendedor com contexto — sem buraco no meio.
      </p>

      <div className="relative mt-14 hidden md:block">
        <svg
          viewBox="0 0 1000 120"
          className="h-28 w-full text-line"
          aria-hidden
        >
          <path
            d="M 40 60 H 960"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeDasharray="6 8"
            opacity="0.45"
          />
          <motion.path
            d="M 40 60 H 960"
            fill="none"
            stroke="url(#pathGlow)"
            strokeWidth="3"
            strokeLinecap="round"
            pathLength={1}
            strokeDasharray="1"
            style={{ strokeDashoffset: reduceMotion ? 0 : pathOffset }}
          />
          <defs>
            <linearGradient id="pathGlow" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#ff5b2e" stopOpacity="0.2" />
              <stop offset="50%" stopColor="#ff5b2e" stopOpacity="0.9" />
              <stop offset="100%" stopColor="#0e3b43" stopOpacity="0.5" />
            </linearGradient>
          </defs>
        </svg>
        {!reduceMotion ? (
          <motion.span
            className="absolute top-1/2 size-3 -translate-y-1/2 rounded-full bg-accent shadow-[0_0_24px_rgb(255_91_46/0.85)]"
            style={{ left: dotLeft }}
            aria-hidden
          />
        ) : null}
        <div className="mt-2 grid grid-cols-4 gap-4">
          {stations.map((st, i) => (
            <div
              key={st.id}
              className={cn(
                "rounded-2xl border p-4 transition-[border-color,box-shadow] duration-300",
                active === i
                  ? "card-dark-glow border-accent/40 bg-surface-dark text-ink-on-dark shadow-[0_0_40px_rgb(255_91_46/0.12)]"
                  : "border-line bg-surface-raised text-on-light",
              )}
            >
              <p
                className={cn(
                  "text-xs font-semibold uppercase tracking-[0.12em]",
                  active === i ? "text-accent" : "text-ink-muted",
                )}
              >
                {st.title}
              </p>
              <p
                className={cn(
                  "mt-2 text-sm",
                  active === i ? "text-ink-muted-on-dark" : "text-ink-muted",
                )}
              >
                {st.body}
              </p>
              <div className="mt-4">{st.mini}</div>
            </div>
          ))}
        </div>
      </div>

      <ol className="mt-10 space-y-4 md:hidden">
        {stations.map((st, i) => (
          <li
            key={st.id}
            className={cn(
              "rounded-2xl border p-4",
              active === i
                ? "card-dark-glow border-accent/35 bg-surface-dark text-ink-on-dark"
                : "border-line bg-surface-raised text-on-light",
            )}
          >
            <span className="text-xs font-semibold text-accent">
              {String(i + 1).padStart(2, "0")}
            </span>
            <h3
              className={cn(
                "mt-1 font-semibold",
                active === i ? "text-ink-on-dark" : "text-ink",
              )}
            >
              {st.title}
            </h3>
            <p
              className={cn(
                "mt-1 text-sm",
                active === i ? "text-ink-muted-on-dark" : "text-ink-muted",
              )}
            >
              {st.body}
            </p>
            <div className="mt-3">{st.mini}</div>
          </li>
        ))}
      </ol>
    </div>
  );
}
