"use client";

import {
  CaretLeft,
  CaretRight,
  ChartBar,
  Kanban,
  Sparkle,
  User,
} from "@phosphor-icons/react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useCallback, useState } from "react";
import { HomeTitle } from "@/components/home/HomeTitle";
import { cn } from "@/lib/cn";

const hotspots = [
  {
    id: "inbox",
    label: "Fila unificada",
    hint: "WhatsApp, site e campanhas na mesma caixa — com dono e SLA.",
    x: 12,
    y: 28,
  },
  {
    id: "chat",
    label: "IA na conversa",
    hint: "Respostas em segundos, com transcrição de áudio e tom da marca.",
    x: 48,
    y: 38,
  },
  {
    id: "lead",
    label: "Painel do lead",
    hint: "Intenção, dados coletados e resumo pronto para o vendedor.",
    x: 78,
    y: 32,
  },
  {
    id: "funnel",
    label: "Funil kanban",
    hint: "Cada conversa vira card — etapa, valor e próximo passo.",
    x: 55,
    y: 72,
  },
] as const;

type HotspotId = (typeof hotspots)[number]["id"];

function CrmMock({ tab }: { tab: "inbox" | "funnel" }) {
  const reduceMotion = useReducedMotion();

  return (
    <div className="flex h-full min-h-[420px] flex-col bg-[#f8f7f4] text-[11px] text-ink md:min-h-[480px] md:text-xs">
      <div className="flex shrink-0 items-center gap-2 border-b border-line bg-white px-3 py-2">
        <div className="flex gap-1.5" aria-hidden>
          <span className="size-2.5 rounded-full bg-[#ff5f57]" />
          <span className="size-2.5 rounded-full bg-[#febc2e]" />
          <span className="size-2.5 rounded-full bg-[#28c840]" />
        </div>
        <div className="mx-auto flex max-w-md flex-1 items-center justify-center rounded-md bg-surface px-3 py-1 text-[10px] text-ink-muted">
          app.seucrm.com.br / inbox
        </div>
      </div>
      <div className="flex min-h-0 flex-1">
        {tab === "inbox" ? (
          <>
            <aside className="hidden w-[22%] min-w-[120px] shrink-0 border-r border-line bg-white md:block">
              <p className="border-b border-line px-3 py-2 font-semibold text-ink">
                Conversas
              </p>
              {[
                { name: "Marina L.", preview: "Preciso de orçamento hoje", tag: "IA", time: "14:32" },
                { name: "João P.", preview: "Áudio transcrito…", tag: "Humano", time: "14:28" },
                { name: "Clínica Sol", preview: "Confirmado 16h", tag: "IA", time: "13:55" },
              ].map((row, i) => (
                <div
                  key={row.name}
                  className={cn(
                    "border-b border-line/80 px-3 py-2.5",
                    i === 0 && "bg-accent/5",
                  )}
                >
                  <div className="flex items-center gap-2">
                    <div className="size-7 shrink-0 rounded-full bg-surface-muted" />
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center justify-between gap-1">
                        <span className="truncate font-medium">{row.name}</span>
                        <span className="tabular-nums text-[10px] text-ink-subtle">
                          {row.time}
                        </span>
                      </div>
                      <p className="truncate text-[10px] text-ink-muted">
                        {row.preview}
                      </p>
                    </div>
                  </div>
                  <span
                    className={cn(
                      "mt-1 inline-block rounded px-1.5 py-0.5 text-[9px] font-semibold uppercase",
                      row.tag === "IA"
                        ? "bg-accent/15 text-accent"
                        : "bg-surface-muted text-ink-muted",
                    )}
                  >
                    {row.tag}
                  </span>
                </div>
              ))}
            </aside>
            <main className="flex min-w-0 flex-1 flex-col border-r border-line bg-[#ece5dd]/40">
              <div className="flex items-center gap-2 border-b border-line bg-[#075E54] px-3 py-2 text-white">
                <User size={16} weight="duotone" />
                <span className="font-medium">Marina L.</span>
                <span className="ml-auto flex items-center gap-1 text-[10px] text-white/80">
                  <Sparkle size={12} weight="fill" className="text-accent" />
                  IA respondendo
                </span>
              </div>
              <div className="flex flex-1 flex-col justify-end gap-2 p-3">
                <div className="ml-auto max-w-[85%] rounded-2xl rounded-br-md bg-[#DCF8C6] px-3 py-2 shadow-sm">
                  “Vi o anúncio — atendem Campinas hoje?”
                </div>
                <motion.div
                  className="mr-auto max-w-[85%] rounded-2xl rounded-bl-md border border-line bg-white px-3 py-2 shadow-sm"
                  animate={
                    reduceMotion
                      ? undefined
                      : { opacity: [1, 0.92, 1] }
                  }
                  transition={{ repeat: Infinity, duration: 2.4 }}
                >
                  Atendo sim! Residência ou empresa? Já anoto no funil.
                </motion.div>
              </div>
            </main>
            <aside className="hidden w-[26%] min-w-[140px] shrink-0 bg-white lg:block">
              <p className="border-b border-line px-3 py-2 font-semibold">
                Lead · Marina L.
              </p>
              <div className="space-y-3 p-3">
                <div>
                  <p className="text-[10px] font-semibold uppercase text-ink-subtle">
                    Intenção
                  </p>
                  <p className="mt-1 font-medium text-accent">Alta · orçamento hoje</p>
                </div>
                <div>
                  <p className="text-[10px] font-semibold uppercase text-ink-subtle">
                    Coletado
                  </p>
                  <ul className="mt-1 space-y-1 text-ink-muted">
                    <li>Campinas · residência</li>
                    <li>Preferência: tarde</li>
                  </ul>
                </div>
                <div>
                  <p className="text-[10px] font-semibold uppercase text-ink-subtle">
                    Funil
                  </p>
                  <p className="mt-1">Qualificação → Proposta</p>
                </div>
                <div className="rounded-lg border border-line bg-surface p-2">
                  <p className="text-[10px] font-semibold text-ink-subtle">
                    Resumo vendedor
                  </p>
                  <p className="mt-1 leading-snug text-ink-muted">
                    Quer valor hoje; confirmar visita técnica 16h.
                  </p>
                </div>
              </div>
            </aside>
          </>
        ) : (
          <div className="flex min-w-0 flex-1 flex-col bg-white p-3">
            <div className="mb-3 flex items-center gap-2 text-sm font-semibold">
              <Kanban size={18} weight="duotone" />
              Funil comercial
            </div>
            <div className="grid min-h-0 flex-1 grid-cols-3 gap-2 md:gap-3">
              {["Novo", "Qualificação", "Proposta"].map((col, ci) => (
                <div
                  key={col}
                  className="flex min-h-[200px] flex-col rounded-lg bg-surface p-2"
                >
                  <p className="text-[10px] font-semibold uppercase text-ink-subtle">
                    {col}
                  </p>
                  <motion.div
                    className="mt-2 rounded-md border border-line bg-surface-raised p-2 shadow-sm"
                    animate={
                      reduceMotion || ci !== 1
                        ? undefined
                        : { x: [0, 6, 0] }
                    }
                    transition={{ repeat: Infinity, duration: 3 }}
                  >
                    <p className="font-medium">Marina L.</p>
                    <p className="text-[10px] text-ink-muted">R$ 8 mil · urgente</p>
                  </motion.div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
      <div className="flex shrink-0 gap-1 border-t border-line bg-white px-2 py-1.5">
        <button
          type="button"
          className={cn(
            "flex items-center gap-1 rounded-md px-2 py-1 text-[10px] font-medium",
            tab === "inbox" ? "bg-accent/10 text-accent" : "text-ink-muted",
          )}
        >
          <ChartBar size={14} weight="regular" />
          Inbox
        </button>
        <button
          type="button"
          className={cn(
            "flex items-center gap-1 rounded-md px-2 py-1 text-[10px] font-medium",
            tab === "funnel" ? "bg-accent/10 text-accent" : "text-ink-muted",
          )}
        >
          <Kanban size={14} weight="regular" />
          Funil
        </button>
      </div>
    </div>
  );
}

const mobileSlides: { id: HotspotId; title: string }[] = [
  { id: "inbox", title: "Caixa de conversas" },
  { id: "chat", title: "Conversa com IA" },
  { id: "lead", title: "Painel do lead" },
  { id: "funnel", title: "Funil kanban" },
];

export function PlatformShowcase() {
  const [activeHotspot, setActiveHotspot] = useState<HotspotId>("inbox");
  const [tab, setTab] = useState<"inbox" | "funnel">("inbox");
  const [mobileIdx, setMobileIdx] = useState(0);
  const reduceMotion = useReducedMotion();

  const onHotspot = useCallback((id: HotspotId) => {
    setActiveHotspot(id);
    if (id === "funnel") setTab("funnel");
    else setTab("inbox");
  }, []);

  const activeHint = hotspots.find((h) => h.id === activeHotspot)?.hint;

  return (
    <section id="plataforma" className="scroll-mt-24">
      <HomeTitle
        as="h2"
        text="A plataforma por trás do WhatsApp."
        accentWords={["plataforma"]}
        className="text-3xl md:text-5xl"
      />
      <p className="mt-4 max-w-2xl text-lg leading-relaxed text-ink-muted md:text-xl">
        CRM completo: conversas, funil e handoff humano — desenhado para densidade
        real de operação, não só um botão verde.
      </p>

      <div className="mt-10 hidden md:block">
        <div className="relative mx-auto w-full max-w-[960px] overflow-hidden rounded-2xl border border-[rgb(28_25_23/0.1)] bg-surface-raised shadow-[0_24px_64px_rgb(28_25_23/0.12),0_1px_0_rgb(255_255_255/0.9)_inset]">
          <CrmMock tab={tab} />
          {hotspots.map((spot) => (
            <button
              key={spot.id}
              type="button"
              aria-label={spot.label}
              onClick={() => onHotspot(spot.id)}
              className={cn(
                "absolute z-10 size-4 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-white bg-accent shadow-md transition-transform hover:scale-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/50",
                activeHotspot === spot.id && "ring-4 ring-accent/30",
              )}
              style={{ left: `${spot.x}%`, top: `${spot.y}%` }}
            />
          ))}
        </div>
        <AnimatePresence mode="wait">
          {activeHint ? (
            <motion.p
              key={activeHotspot}
              initial={reduceMotion ? false : { opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -4 }}
              className="mx-auto mt-6 max-w-xl text-center text-base text-ink-muted"
            >
              {activeHint}
            </motion.p>
          ) : null}
        </AnimatePresence>
      </div>

      <div className="mt-8 md:hidden">
        <div className="overflow-hidden rounded-2xl border border-line bg-surface-raised shadow-md">
          <CrmMock
            tab={mobileSlides[mobileIdx]?.id === "funnel" ? "funnel" : "inbox"}
          />
        </div>
        <p className="mt-4 text-center text-base font-medium text-ink">
          {mobileSlides[mobileIdx]?.title}
        </p>
        <p className="mt-2 text-center text-sm text-ink-muted">
          {hotspots.find((h) => h.id === mobileSlides[mobileIdx]?.id)?.hint}
        </p>
        <div className="mt-4 flex items-center justify-center gap-4">
          <button
            type="button"
            aria-label="Tela anterior"
            className="inline-flex size-10 items-center justify-center rounded-full border border-line bg-surface-raised"
            onClick={() =>
              setMobileIdx((i) => (i - 1 + mobileSlides.length) % mobileSlides.length)
            }
          >
            <CaretLeft size={18} weight="bold" />
          </button>
          <span className="text-sm tabular-nums text-ink-muted">
            {mobileIdx + 1} / {mobileSlides.length}
          </span>
          <button
            type="button"
            aria-label="Próxima tela"
            className="inline-flex size-10 items-center justify-center rounded-full border border-line bg-surface-raised"
            onClick={() => setMobileIdx((i) => (i + 1) % mobileSlides.length)}
          >
            <CaretRight size={18} weight="bold" />
          </button>
        </div>
      </div>
    </section>
  );
}
