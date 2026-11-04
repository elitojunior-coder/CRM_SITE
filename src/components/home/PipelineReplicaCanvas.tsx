import {
  Globe,
  InstagramLogo,
  MagnifyingGlass,
  SlidersHorizontal,
  WhatsappLogo,
} from "@phosphor-icons/react/dist/ssr";
import {
  columnTotals,
  formatPipelineBrl,
  pipelineCards,
  pipelineColumns,
  pipelineFunnels,
  type PipelineCard,
  type PipelineChannel,
} from "../../../content/demo/pipeline";
import { cn } from "@/lib/cn";

const CANVAS_W = 1280;
const CANVAS_H = 800;

function ChannelIcon({ channel }: { channel: PipelineChannel }) {
  const cls = "size-3.5 shrink-0 opacity-70";
  if (channel === "whatsapp") return <WhatsappLogo className={cls} weight="fill" />;
  if (channel === "instagram") return <InstagramLogo className={cls} weight="fill" />;
  return <Globe className={cls} weight="duotone" />;
}

function PipelineCardView({ card }: { card: PipelineCard }) {
  return (
    <article
      data-pipeline-card={card.id}
      data-pipeline-column={card.columnId}
      className="pipeline-card rounded-lg border border-[#e8e4dc] bg-white p-2.5 shadow-[0_1px_0_rgba(15,23,42,0.04)]"
    >
      <div className="flex items-start justify-between gap-2">
        <div className="flex min-w-0 items-center gap-2">
          <span
            className="flex size-7 shrink-0 items-center justify-center rounded-full text-[11px] font-semibold text-white"
            style={{ backgroundColor: card.avatarColor }}
          >
            {card.initials}
          </span>
          <div className="min-w-0">
            <p className="truncate text-[12px] font-semibold leading-tight text-[#1c1917]">
              {card.name}
            </p>
            <p className="text-[12px] font-medium text-[#57534e]">
              {formatPipelineBrl(card.valueCents)}
            </p>
          </div>
        </div>
        <ChannelIcon channel={card.channel} />
      </div>
      <div className="mt-2 flex flex-wrap gap-1">
        {card.tags.map((tag) => (
          <span
            key={tag}
            className="rounded bg-[#f5f2eb] px-1.5 py-0.5 text-[10px] font-medium text-[#57534e]"
          >
            {tag}
          </span>
        ))}
        {card.aiHandled ? (
          <span className="rounded bg-[#FF5B2E]/12 px-1.5 py-0.5 text-[10px] font-semibold text-[#E84E24]">
            IA
          </span>
        ) : null}
        {card.newMessagePulse ? (
          <span
            data-pipeline-pulse="new-message"
            className="rounded bg-[#0E3B43]/10 px-1.5 py-0.5 text-[10px] font-semibold text-[#0E3B43]"
          >
            nova mensagem
          </span>
        ) : null}
        {card.aiResponding ? (
          <span
            data-pipeline-pulse="ai-typing"
            className="rounded bg-[#FF5B2E]/10 px-1.5 py-0.5 text-[10px] font-semibold text-[#E84E24]"
          >
            IA respondendo…
          </span>
        ) : null}
      </div>
      <div className="mt-2 flex items-center justify-between gap-2 text-[11px] text-[#78716c]">
        <span>{card.timeAgo}</span>
        <span
          className="flex size-6 items-center justify-center rounded-full text-[10px] font-semibold text-white"
          style={{ backgroundColor: card.ownerColor }}
          title="Responsável"
        >
          {card.ownerInitials}
        </span>
      </div>
    </article>
  );
}

export function PipelineReplicaCanvas() {
  return (
    <div
      className="pipeline-board flex shrink-0 flex-col bg-[#f3f1ec] text-[#1c1917]"
      style={{ width: CANVAS_W, height: CANVAS_H, fontSize: 12 }}
      aria-hidden
    >
      <div className="flex min-h-0 flex-1">
        <aside className="flex w-[52px] shrink-0 flex-col border-r border-[#e7e5e4] bg-[#fafaf9] py-3">
          {pipelineFunnels.map((funnel) => (
            <div
              key={funnel.id}
              className={cn(
                "mx-auto mb-2 flex h-14 w-9 items-center justify-center rounded-md text-[10px] font-semibold leading-tight [writing-mode:vertical-rl] rotate-180",
                funnel.active
                  ? "bg-[#0E3B43] text-white"
                  : "bg-transparent text-[#78716c]",
              )}
            >
              {funnel.label}
            </div>
          ))}
        </aside>
        <div className="flex min-w-0 flex-1 flex-col">
          <header className="flex shrink-0 items-center gap-3 border-b border-[#e7e5e4] bg-white px-4 py-2.5">
            <div>
              <p className="text-[13px] font-semibold text-[#1c1917]">Comercial</p>
              <p className="text-[11px] text-[#78716c]">Funil principal · WhatsApp + site</p>
            </div>
            <div className="ml-auto flex items-center gap-2">
              <button
                type="button"
                className="inline-flex items-center gap-1.5 rounded-md border border-[#e7e5e4] px-2.5 py-1.5 text-[12px] font-medium text-[#44403c]"
              >
                <SlidersHorizontal className="size-3.5" />
                Filtros
              </button>
              <div className="flex items-center gap-1.5 rounded-md border border-[#e7e5e4] bg-[#fafaf9] px-2.5 py-1.5">
                <MagnifyingGlass className="size-3.5 text-[#78716c]" />
                <span className="text-[12px] text-[#a8a29e]">Buscar lead</span>
              </div>
              <div className="flex -space-x-1.5 pl-1">
                {[
                  { i: "RF", c: "#FF5B2E" },
                  { i: "AL", c: "#6366F1" },
                  { i: "MP", c: "#0E3B43" },
                ].map((m) => (
                  <span
                    key={m.i}
                    className="flex size-7 items-center justify-center rounded-full border-2 border-white text-[10px] font-semibold text-white"
                    style={{ backgroundColor: m.c }}
                  >
                    {m.i}
                  </span>
                ))}
              </div>
            </div>
          </header>
          <div className="grid min-h-0 flex-1 grid-cols-5 gap-0 overflow-hidden">
            {pipelineColumns.map((col) => {
              const cards = pipelineCards.filter((c) => c.columnId === col.id);
              const totals = columnTotals(pipelineCards, col.id);
              return (
                <div
                  key={col.id}
                  data-pipeline-column={col.id}
                  className="flex min-h-0 min-w-0 flex-col border-r border-[#e7e5e4] bg-[#f8f7f4] last:border-r-0"
                >
                  <div className="shrink-0 border-b border-[#ebe8e2] px-2.5 py-2">
                    <p className="text-[12px] font-semibold text-[#1c1917]">{col.title}</p>
                    <p className="text-[11px] text-[#78716c]">
                      {totals.count} · {formatPipelineBrl(totals.totalCents)}
                    </p>
                  </div>
                  <div className="flex min-h-0 flex-1 flex-col gap-2 overflow-hidden p-2">
                    {cards.map((card) => (
                      <PipelineCardView key={card.id} card={card} />
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

export const PIPELINE_CANVAS_SIZE = { width: CANVAS_W, height: CANVAS_H };
