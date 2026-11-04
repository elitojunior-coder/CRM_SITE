"use client";

import { NumberTicker } from "@/components/ui/number-ticker";
import { useCallback, useMemo, useState } from "react";
import { HomeTitle } from "@/components/home/HomeTitle";
import { cn } from "@/lib/cn";

type Range = "hoje" | "7d" | "30d";

const data: Record<
  Range,
  {
    atendimentos: number;
    tempoResposta: number;
    qualificados: number;
    agendamentos: number;
    funnel: [number, number, number, number];
  }
> = {
  hoje: {
    atendimentos: 47,
    tempoResposta: 8,
    qualificados: 19,
    agendamentos: 11,
    funnel: [47, 31, 19, 11],
  },
  "7d": {
    atendimentos: 312,
    tempoResposta: 11,
    qualificados: 128,
    agendamentos: 74,
    funnel: [312, 210, 128, 74],
  },
  "30d": {
    atendimentos: 1184,
    tempoResposta: 9,
    qualificados: 492,
    agendamentos: 286,
    funnel: [1184, 802, 492, 286],
  },
};

const funnelLabels = ["Entrada", "Respondidos", "Qualificados", "Agendados"];

export function ExampleDashboard() {
  const [range, setRange] = useState<Range>("hoje");
  const onMove = useCallback((e: React.MouseEvent<HTMLElement>) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    card.style.setProperty("--spot-x", `${e.clientX - rect.left}px`);
    card.style.setProperty("--spot-y", `${e.clientY - rect.top}px`);
  }, []);
  const stats = data[range];
  const maxFunnel = useMemo(
    () => Math.max(...stats.funnel, 1),
    [stats.funnel],
  );

  return (
    <div id="painel-exemplo" className="scroll-mt-24">
      <HomeTitle
        as="h2"
        text="Painel do dia — sem adivinhação."
        accentWords={["Painel"]}
        className="text-3xl md:text-5xl"
      />
      <p className="mt-4 max-w-2xl text-lg text-ink-muted">
        Atendimentos, tempo de resposta e funil no mesmo lugar. Números abaixo
        são ilustrativos.
      </p>

      <div
        onMouseMove={onMove}
        className="card-dark-glow spotlight-card relative mt-10 overflow-hidden rounded-3xl border border-line-on-dark bg-surface-dark p-6 text-ink-on-dark md:p-8"
      >
        <span className="absolute right-4 top-4 rounded-full border border-accent/40 bg-accent/10 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.1em] text-accent">
          dados de exemplo
        </span>

        <div className="flex flex-wrap gap-2">
          {(
            [
              ["hoje", "Hoje"],
              ["7d", "7 dias"],
              ["30d", "30 dias"],
            ] as const
          ).map(([id, label]) => (
            <button
              key={id}
              type="button"
              onClick={() => setRange(id)}
              className={cn(
                "rounded-full px-4 py-2 text-sm font-medium transition-colors",
                range === id
                  ? "bg-accent text-accent-fg"
                  : "border border-line-on-dark text-ink-muted-on-dark hover:text-ink-on-dark",
              )}
            >
              {label}
            </button>
          ))}
        </div>

        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { label: "Atendimentos", value: stats.atendimentos, suffix: "" },
            {
              label: "Tempo médio resposta",
              value: stats.tempoResposta,
              suffix: "s",
            },
            { label: "Leads qualificados", value: stats.qualificados, suffix: "" },
            { label: "Agendamentos", value: stats.agendamentos, suffix: "" },
          ].map((item) => (
            <div
              key={item.label}
              className="rounded-2xl border border-line-on-dark bg-white/5 p-4"
            >
              <p className="text-xs text-ink-muted-on-dark">{item.label}</p>
              <p className="mt-2 font-sans text-3xl font-semibold tabular-nums">
                <NumberTicker value={item.value} />
                {item.suffix}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-8">
          <p className="text-sm font-medium text-ink-muted-on-dark">Funil</p>
          <div className="mt-4 grid gap-3 md:grid-cols-4">
            {stats.funnel.map((value, i) => (
              <div key={funnelLabels[i]}>
                <div className="flex items-baseline justify-between text-xs text-ink-muted-on-dark">
                  <span>{funnelLabels[i]}</span>
                  <NumberTicker value={value} className="tabular-nums" />
                </div>
                <div className="mt-2 h-2 overflow-hidden rounded-full bg-white/10">
                  <FunnelBar
                    key={`${range}-${i}`}
                    width={(value / maxFunnel) * 100}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function FunnelBar({ width }: { width: number }) {
  return (
    <div
      className="h-full rounded-full bg-gradient-to-r from-accent to-[#0e3b43] transition-[width] duration-700 ease-out"
      style={{ width: `${width}%` }}
    />
  );
}
