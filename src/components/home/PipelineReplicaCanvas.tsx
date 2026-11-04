import {
  ArrowsClockwise,
  Funnel,
  MagnifyingGlass,
  SlidersHorizontal,
} from "@phosphor-icons/react/dist/ssr";
import {
  columnTotals,
  formatPipelineBrl,
  pipelineColumns,
  pipelineFunnels,
  type PipelineCard,
} from "../../../content/demo/pipeline";
import { PipelineCardView } from "@/components/home/PipelineReplicaCard";
import { cn } from "@/lib/cn";
import {
  PIPELINE_CANVAS_SIZE,
  PIPELINE_SIDEBAR_W,
} from "@/components/home/pipeline-layout";

type Props = {
  cards: PipelineCard[];
  draggingCardId?: string | null;
};

export function PipelineReplicaCanvas({ cards, draggingCardId }: Props) {
  return (
    <div
      className="pipeline-board flex shrink-0 flex-col bg-[#f3f1ec] text-[#1c1917]"
      style={{
        width: PIPELINE_CANVAS_SIZE.width,
        height: PIPELINE_CANVAS_SIZE.height,
        fontSize: 12,
      }}
      aria-hidden
    >
      <div className="flex min-h-0 flex-1 flex-col">
        <header className="flex shrink-0 items-center gap-3 border-b border-[#e7e5e4] bg-[#fafaf9] px-4 py-2.5">
          <div className="min-w-0">
            <p className="text-[13px] font-semibold text-[#1c1917]">Comercial</p>
            <p className="text-[11px] text-[#78716c]">Funil principal · WhatsApp + site</p>
          </div>
          <div className="ml-auto flex shrink-0 items-center gap-2">
            <button
              type="button"
              className="inline-flex items-center gap-1.5 rounded-md border border-[#e7e5e4] bg-white px-2.5 py-1.5 text-[12px] font-medium text-[#44403c]"
            >
              <SlidersHorizontal className="size-3.5" />
              Filtros
            </button>
            <div className="flex items-center gap-1.5 rounded-md border border-[#e7e5e4] bg-white px-2.5 py-1.5">
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
                  className="flex size-7 items-center justify-center rounded-full border-2 border-[#fafaf9] text-[10px] font-semibold text-white"
                  style={{ backgroundColor: m.c }}
                >
                  {m.i}
                </span>
              ))}
            </div>
          </div>
        </header>
        <div className="flex min-h-0 flex-1">
          <aside
            className="flex shrink-0 flex-col gap-1 border-r border-[#e7e5e4] bg-[#fafaf9] p-2"
            style={{ width: PIPELINE_SIDEBAR_W }}
          >
            {pipelineFunnels.map((funnel) => (
              <div
                key={funnel.id}
                className={cn(
                  "flex items-center gap-2 rounded-md px-2 py-2 text-[11px] font-semibold leading-tight",
                  funnel.active
                    ? "bg-[#0E3B43] text-white"
                    : "text-[#78716c] hover:bg-[#f5f5f4]",
                )}
              >
                {funnel.id === "reativacao" ? (
                  <ArrowsClockwise className="size-4 shrink-0" weight="duotone" />
                ) : (
                  <Funnel className="size-4 shrink-0" weight={funnel.active ? "fill" : "duotone"} />
                )}
                <span className="truncate">{funnel.label}</span>
              </div>
            ))}
          </aside>
          <div className="grid min-h-0 flex-1 grid-cols-5 gap-0 overflow-hidden">
            {pipelineColumns.map((col) => {
              const inCol = cards.filter((c) => c.columnId === col.id);
              const totals = columnTotals(cards, col.id);
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
                  <div className="flex flex-col gap-2 p-2" data-pipeline-column-list>
                    {inCol.map((card) => (
                      <PipelineCardView
                        key={card.id}
                        card={card}
                        dragging={draggingCardId === card.id}
                      />
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

export { PIPELINE_CANVAS_SIZE } from "@/components/home/pipeline-layout";
