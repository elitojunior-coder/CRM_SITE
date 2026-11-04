"use client";

import { motion, useReducedMotion } from "motion/react";
import { HomeTitle } from "@/components/home/HomeTitle";
import { BentoGrid } from "@/components/ui/bento-grid";
import { BorderBeam } from "@/components/ui/border-beam";
import { MagicCard } from "@/components/ui/magic-card";
import { cn } from "@/lib/cn";

const items = [
  {
    title: "Áudio virou texto",
    desc: "O cliente fala; a IA entende e continua o fluxo.",
    key: "audio",
    span: "md:col-span-2 md:row-span-2",
  },
  {
    title: "Card no funil",
    desc: "Cada conversa vira etapa, dono e próximo passo.",
    key: "funnel",
    span: "md:col-span-1 md:row-span-2",
  },
  {
    title: "Resumo pronto",
    desc: "Handoff com intenção, objeções e horário sugerido.",
    key: "summary",
    span: "",
  },
  {
    title: "Campanha certa",
    desc: "Enviado, entregue, lido — sem disparo cego.",
    key: "campaign",
    span: "",
  },
  {
    title: "Chat no site",
    desc: "Mesmo agente no WhatsApp e no widget do site.",
    key: "chat",
    span: "",
  },
  {
    title: "LGPD de verdade",
    desc: "Isolamento, trilha de acesso e encarregado nomeado.",
    key: "lgpd",
    span: "",
  },
] as const;

function MiniVisual({ kind }: { kind: (typeof items)[number]["key"] }) {
  const reduceMotion = useReducedMotion();

  switch (kind) {
    case "audio":
      return (
        <div
          className="flex h-[min(60%,140px)] min-h-[100px] items-end justify-center gap-1.5 rounded-xl bg-surface p-4"
          aria-hidden
        >
          {[3, 5, 4, 7, 4, 6, 3].map((h, i) => (
            <motion.span
              key={i}
              className="w-1.5 origin-bottom rounded-full bg-accent"
              animate={
                reduceMotion ? undefined : { scaleY: [0.4, 1, 0.55, 1.1, 0.4] }
              }
              transition={{
                repeat: Infinity,
                duration: 1.2,
                delay: i * 0.07,
              }}
              style={{ height: h * 6 }}
            />
          ))}
        </div>
      );
    case "funnel":
      return (
        <div className="relative h-[min(60%,140px)] min-h-[100px] overflow-hidden rounded-xl bg-surface p-4">
          <div className="flex h-full gap-2">
            {["Novo", "Qualif.", "Prop."].map((c) => (
              <div
                key={c}
                className="flex-1 rounded-md border border-dashed border-line bg-surface-raised/80 p-1 text-[9px] text-ink-subtle"
              >
                {c}
              </div>
            ))}
          </div>
          <motion.div
            className="absolute bottom-6 left-6 right-6 rounded-md border border-line bg-white px-2 py-2 text-[10px] shadow-md"
            animate={reduceMotion ? undefined : { x: [0, 48, 96, 48, 0] }}
            transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
          >
            Lead · R$ 8k
          </motion.div>
        </div>
      );
    case "summary":
      return (
        <div className="h-[min(60%,120px)] min-h-[88px] overflow-hidden rounded-xl bg-surface p-4">
          <motion.p
            className="text-sm leading-snug text-ink-muted"
            animate={
              reduceMotion
                ? undefined
                : {
                    opacity: [0.4, 1, 1],
                    clipPath: [
                      "inset(0 100% 0 0)",
                      "inset(0 0 0 0)",
                      "inset(0 0 0 0)",
                    ],
                  }
            }
            transition={{ repeat: Infinity, duration: 4, repeatDelay: 0.5 }}
          >
            Cliente quer orçamento hoje; prefere 16h; objeção: prazo de entrega.
          </motion.p>
        </div>
      );
    case "campaign":
      return (
        <div className="flex h-[min(60%,120px)] min-h-[88px] flex-col justify-center gap-2 rounded-xl bg-surface p-4 text-[11px]">
          {["enviado", "entregue", "lido"].map((step, i) => (
            <motion.div
              key={step}
              className="flex items-center gap-2 text-ink-muted"
              animate={
                reduceMotion ? undefined : { opacity: i <= 1 ? 1 : [0.3, 1, 0.3] }
              }
              transition={{ repeat: Infinity, duration: 2, delay: i * 0.3 }}
            >
              <span className="text-accent">✓</span>
              <span className="tabular-nums">{step}</span>
            </motion.div>
          ))}
        </div>
      );
    case "chat":
      return (
        <div className="relative h-[min(60%,120px)] min-h-[88px] rounded-xl bg-surface p-4">
          <motion.div
            className="absolute bottom-4 right-4 max-w-[85%] rounded-xl border border-line bg-white px-3 py-2 text-xs shadow-lg"
            initial={reduceMotion ? false : { opacity: 0, y: 8, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ repeat: Infinity, repeatDelay: 2.5, duration: 0.45 }}
          >
            Olá! Posso ajudar com orçamento?
          </motion.div>
        </div>
      );
    default:
      return (
        <div className="relative h-[min(60%,120px)] min-h-[88px] overflow-hidden rounded-xl bg-surface p-4">
          <div className="flex size-12 items-center justify-center rounded-full border-2 border-accent/50 text-[10px] font-bold tracking-wide text-accent">
            LGPD
          </div>
          <motion.div
            className="absolute bottom-3 left-4 right-4 h-1 rounded-full bg-line"
            aria-hidden
          >
            <motion.span
              className="block h-full rounded-full bg-accent/60"
              animate={reduceMotion ? undefined : { width: ["0%", "100%"] }}
              transition={{ repeat: Infinity, duration: 3 }}
            />
          </motion.div>
        </div>
      );
  }
}

export function BentoFeatures() {
  return (
    <div id="funcionalidades">
      <HomeTitle
        as="h2"
        text="Tudo que sustenta venda — não enfeite."
        accentWords={["venda"]}
        className="text-3xl md:text-5xl"
      />
      <BentoGrid className="mt-10 auto-rows-[minmax(180px,auto)] grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 lg:grid-rows-4">
        {items.map((item) => (
          <MagicCard
            key={item.key}
            gradientFrom="#ff5b2e"
            gradientTo="#0e3b43"
            gradientColor="rgb(255 91 46 / 0.08)"
            gradientOpacity={0.65}
            className={cn(
              "card-premium rounded-2xl bg-surface-raised shadow-sm",
              item.span,
            )}
          >
            <article className="relative flex h-full flex-col rounded-[inherit] p-5">
              <BorderBeam
                size={120}
                duration={8}
                colorFrom="#ff5b2e"
                colorTo="#0e3b43"
                borderWidth={1.5}
              />
              <MiniVisual kind={item.key} />
              <h3 className="mt-4 font-sans text-xl font-semibold tracking-tight text-ink">
                {item.title}
              </h3>
              <p className="mt-2 text-base leading-relaxed text-ink-muted">
                {item.desc}
              </p>
            </article>
          </MagicCard>
        ))}
      </BentoGrid>
    </div>
  );
}
