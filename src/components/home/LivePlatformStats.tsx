"use client";

import { useEffect, useState } from "react";
import { brand } from "@/config/brand";
import { NumberTicker } from "@/components/ui/number-ticker";

type StatsPayload = {
  conversasUltimos30Dias?: number;
  leadsQualificados?: number;
  agendamentos?: number;
};

export function LivePlatformStats() {
  const url = brand.liveStats.url.trim();
  const [data, setData] = useState<StatsPayload | null>(null);

  useEffect(() => {
    if (!url || url.startsWith("[")) return;
    let cancelled = false;
    void fetch(url)
      .then((r) => (r.ok ? r.json() : null))
      .then((json) => {
        if (!cancelled && json) setData(json as StatsPayload);
      })
      .catch(() => {});
    return () => {
      cancelled = true;
    };
  }, [url]);

  if (!url || url.startsWith("[") || !data) return null;

  const items = [
    { label: "Conversas atendidas (30d)", value: data.conversasUltimos30Dias },
    { label: "Leads qualificados", value: data.leadsQualificados },
    { label: "Agendamentos", value: data.agendamentos },
  ].filter((i) => typeof i.value === "number");

  if (items.length === 0) return null;

  return (
    <div className="mt-10 grid gap-4 sm:grid-cols-3">
      {items.map((item) => (
        <div
          key={item.label}
          className="rounded-2xl border border-line bg-surface-raised p-5 text-on-light"
        >
          <p className="text-sm text-ink-muted">{item.label}</p>
          <p className="mt-2 font-sans text-3xl font-semibold tabular-nums text-ink">
            <NumberTicker value={item.value!} />
          </p>
        </div>
      ))}
    </div>
  );
}
