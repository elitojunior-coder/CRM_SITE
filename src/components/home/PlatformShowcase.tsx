"use client";

import {
  CaretLeft,
  CaretRight,
  ChartBar,
  Kanban,
  Play,
  Sparkle,
  User,
} from "@phosphor-icons/react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useCallback, useState, type ReactNode } from "react";
import { HomeTitle } from "@/components/home/HomeTitle";
import { PlatformPainelPanel } from "@/components/home/PlatformPainelPanel";
import { PlatformProductVideo } from "@/components/home/PlatformProductVideo";
import { cn } from "@/lib/cn";

const hotspots = [
  {
    id: "inbox",
    label: "Inbox",
    hint: "WhatsApp, site e campanhas na mesma caixa — com dono e SLA.",
    top: "11%",
    left: "2%",
    labelAlign: "right" as const,
  },
  {
    id: "chat",
    label: "IA",
    hint: "Respostas em segundos, com transcrição de áudio e tom da marca.",
    top: "11%",
    left: "34%",
    labelAlign: "right" as const,
  },
  {
    id: "lead",
    label: "Lead",
    hint: "Intenção, dados coletados e resumo pronto para o vendedor.",
    top: "11%",
    left: "98%",
    labelAlign: "left" as const,
  },
  {
    id: "funnel",
    label: "Funil",
    hint: "Cada conversa vira card — etapa, valor e próximo passo.",
    top: "92%",
    left: "98%",
    labelAlign: "left" as const,
  },
] as const;

type HotspotId = (typeof hotspots)[number]["id"];
type CrmTab = "inbox" | "funnel" | "painel" | "video";

function CrmMock({
  tab,
  onTabChange,
}: {
  tab: CrmTab;
  onTabChange: (tab: CrmTab) => void;
}) {
  const reduceMotion = useReducedMotion();

  const tabButton = (id: CrmTab, label: string, icon: ReactNode) => (
    <button
      key={id}
      type="button"
      onClick={() => onTabChange(id)}
      className={cn(
        "flex items-center gap-1 rounded-md px-2 py-1 text-[10px] font-medium transition-colors",
        tab === id ? "bg-accent/10 text-accent" : "text-ink-muted hover:text-ink",
      )}
    >
      {icon}
      {label}
    </button>
  );

  return (
    <div className="flex h-full min-h-[420px] flex-col bg-[#f8f7f4] text-[11px] text-ink md:min-h-[480px] md:text-xs">
      <div className="flex shrink-0 items-center gap-2 border-b border-line bg-white px-3 py-2">
        <div className="flex gap-1.5" aria-hidden>
          <span className="size-2.5 rounded-full bg-[#ff5f57]" />
          <span className="size-2.5 rounded-full bg-[#febc2e]" />
          <span className="size-2.5 rounded-full bg-[#28c840]" />
        </div>
        <div className="mx-auto flex max-w-md flex-1 items-center justify-center rounded-md bg-surface px-3 py-1 text-[10px] text-ink-muted">
          app.seucrm.com.br /{" "}
          {tab === "painel"
            ? "painel"
            : tab === "video"
              ? "demo"
              : tab === "funnel"
                ? "funil"
                : "inbox"}
        </div>
      </div>
      <div className="flex min-h-0 flex-1 flex-col">
        {tab === "video" ? (
          <div className="relative min-h-0 flex-1 overflow-hidden bg-black">
            <PlatformProductVideo className="mt-0 h-full [&>div]:h-full [&_img]:object-cover" />
          </div>
        ) : tab === "painel" ? (
          <PlatformPainelPanel />
        ) : tab === "inbox" ? (
          <div className="flex min-h-0 flex-1">
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
          </div>
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
      <div
        className="flex shrink-0 flex-wrap gap-1 border-t border-line bg-white px-2 py-1.5"
        role="tablist"
        aria-label="Visões do CRM"
      >
        {tabButton("inbox", "Inbox", <ChartBar size={14} weight="regular" />)}
        {tabButton("funnel", "Funil", <Kanban size={14} weight="regular" />)}
        {tabButton("painel", "Painel", <ChartBar size={14} weight="fill" />)}
        {tabButton(
          "video",
          "Ver em 20s",
          <Play size={14} weight="fill" />,
        )}
      </div>
    </div>
  );
}

const mobileSlides: { id: HotspotId | "painel" | "video"; title: string }[] = [
  { id: "inbox", title: "Caixa de conversas" },
  { id: "chat", title: "Conversa com IA" },
  { id: "lead", title: "Painel do lead" },
  { id: "funnel", title: "Funil kanban" },
  { id: "painel", title: "Painel do dia" },
  { id: "video", title: "Tour em 20 segundos" },
];

function mobileTabForSlide(id: (typeof mobileSlides)[number]["id"]): CrmTab {
  if (id === "funnel") return "funnel";
  if (id === "painel") return "painel";
  if (id === "video") return "video";
  return "inbox";
}

export function PlatformShowcase() {
  const [activeHotspot, setActiveHotspot] = useState<HotspotId>("inbox");
  const [tab, setTab] = useState<CrmTab>("inbox");
  const [mobileIdx, setMobileIdx] = useState(0);
  const reduceMotion = useReducedMotion();

  const onHotspot = useCallback((id: HotspotId) => {
    setActiveHotspot(id);
    if (id === "funnel") setTab("funnel");
    else setTab("inbox");
  }, []);

  const activeHint = hotspots.find((h) => h.id === activeHotspot)?.hint;
  const showHotspots = tab === "inbox" || tab === "funnel";

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
          <CrmMock tab={tab} onTabChange={setTab} />
          {showHotspots
            ? hotspots.map((spot) => (
                <button
                  key={spot.id}
                  type="button"
                  aria-label={spot.label}
                  onClick={() => onHotspot(spot.id)}
                  className={cn(
                    "absolute z-10 flex max-w-[42%] items-center gap-1.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/50",
                    spot.labelAlign === "left"
                      ? "-translate-x-full -translate-y-1/2 flex-row-reverse"
                      : "-translate-y-1/2",
                  )}
                  style={{ left: spot.left, top: spot.top }}
                >
                  <span
                    className={cn(
                      "size-3.5 shrink-0 rounded-full border-2 border-white bg-accent shadow-md transition-transform hover:scale-110",
                      activeHotspot === spot.id && "ring-4 ring-accent/30",
                    )}
                    aria-hidden
                  />
                  <span className="rounded-md bg-white/95 px-1.5 py-0.5 text-[9px] font-semibold uppercase tracking-wide text-ink shadow-sm">
                    {spot.label}
                  </span>
                </button>
              ))
            : null}
        </div>
        <AnimatePresence mode="wait">
          {activeHint && showHotspots ? (
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
            tab={mobileTabForSlide(mobileSlides[mobileIdx]!.id)}
            onTabChange={setTab}
          />
        </div>
        <p className="mt-4 text-center text-base font-medium text-ink">
          {mobileSlides[mobileIdx]?.title}
        </p>
        <p className="mt-2 text-center text-sm text-ink-muted">
          {mobileSlides[mobileIdx]?.id === "video"
            ? "Visão rápida do produto — dados ilustrativos."
            : hotspots.find((h) => h.id === mobileSlides[mobileIdx]?.id)?.hint ??
              "Métricas e funil no mesmo painel."}
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
