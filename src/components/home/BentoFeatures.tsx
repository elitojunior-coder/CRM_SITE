"use client";

import { motion, useReducedMotion } from "motion/react";
import { useCallback } from "react";
import { RevealWords } from "@/components/home/RevealWords";
import { cn } from "@/lib/cn";

const items = [
  {
    title: "Áudio virou texto",
    desc: "O cliente fala; a IA entende e continua o fluxo.",
    key: "audio",
  },
  {
    title: "Card no funil",
    desc: "Cada conversa vira etapa, dono e próximo passo.",
    key: "funnel",
  },
  {
    title: "Resumo pronto",
    desc: "Handoff com intenção, objeções e horário sugerido.",
    key: "summary",
  },
  {
    title: "Campanha certa",
    desc: "Enviado, entregue, lido — sem disparo cego.",
    key: "campaign",
  },
  {
    title: "Chat no site",
    desc: "Mesmo agente no WhatsApp e no widget do site.",
    key: "chat",
  },
  {
    title: "LGPD de verdade",
    desc: "Isolamento, trilha de acesso e encarregado nomeado.",
    key: "lgpd",
  },
] as const;

function MiniVisual({ kind }: { kind: (typeof items)[number]["key"] }) {
  const reduceMotion = useReducedMotion();

  switch (kind) {
    case "audio":
      return (
        <div className="flex items-end gap-1" aria-hidden>
          {[3, 5, 4, 6, 3].map((h, i) => (
            <motion.span
              key={i}
              className="w-1 rounded-full bg-accent"
              animate={reduceMotion ? undefined : { height: [h, h + 8, h] }}
              transition={{
                repeat: Infinity,
                duration: 1,
                delay: i * 0.1,
              }}
              style={{ height: h * 4 }}
            />
          ))}
        </div>
      );
    case "funnel":
      return (
        <motion.div
          className="h-2 w-24 rounded-full bg-accent/30"
          animate={reduceMotion ? undefined : { x: [0, 40, 0] }}
          transition={{ repeat: Infinity, duration: 2.5 }}
        />
      );
    case "summary":
      return (
        <motion.p
          className="text-xs text-ink-muted"
          initial={{ width: 0 }}
          animate={reduceMotion ? undefined : { width: "100%" }}
          transition={{ repeat: Infinity, duration: 3, repeatDelay: 1 }}
          style={{ overflow: "hidden", whiteSpace: "nowrap" }}
        >
          Cliente quer orçamento hoje…
        </motion.p>
      );
    case "campaign":
      return (
        <div className="flex gap-2 text-[10px] text-ink-muted">
          <span>enviado</span>
          <span>lido</span>
        </div>
      );
    case "chat":
      return (
        <motion.div
          className="rounded-lg border border-line bg-surface px-2 py-1 text-xs"
          initial={reduceMotion ? false : { scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ repeat: Infinity, repeatDelay: 2, duration: 0.4 }}
        >
          Olá! Posso ajudar?
        </motion.div>
      );
    default:
      return (
        <div className="size-10 rounded-full border-2 border-accent/40" aria-hidden />
      );
  }
}

export function BentoFeatures() {
  const onMove = useCallback((e: React.MouseEvent<HTMLElement>) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    card.style.setProperty("--spot-x", `${e.clientX - rect.left}px`);
    card.style.setProperty("--spot-y", `${e.clientY - rect.top}px`);
  }, []);

  return (
    <div id="funcionalidades">
      <RevealWords
        text="Tudo que sustenta venda — não enfeite."
        className="font-display text-3xl text-ink md:text-5xl"
        italicWords={["venda"]}
      />
      <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((item, i) => (
          <article
            key={item.key}
            onMouseMove={onMove}
            className={cn(
              "spotlight-card rounded-2xl border border-line bg-surface-raised p-5 transition-shadow hover:shadow-md",
              i === 0 && "sm:col-span-2 lg:col-span-1",
            )}
          >
            <MiniVisual kind={item.key} />
            <h3 className="mt-4 font-display text-xl text-ink">{item.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-ink-muted">
              {item.desc}
            </p>
          </article>
        ))}
      </div>
    </div>
  );
}
