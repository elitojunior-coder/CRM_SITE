"use client";

import NumberFlow from "@number-flow/react";
import { brand } from "@/config/brand";
import { MagneticButton } from "@/components/home/MagneticButton";
import { RevealWords } from "@/components/home/RevealWords";
import { useMemo, useState } from "react";

function Slider({
  label,
  value,
  min,
  max,
  step,
  format,
  onChange,
}: {
  label: string;
  value: number;
  min: number;
  max: number;
  step: number;
  format: (v: number) => string;
  onChange: (v: number) => void;
}) {
  return (
    <label className="block">
      <div className="flex items-baseline justify-between gap-4">
        <span className="text-sm font-medium text-ink">{label}</span>
        <span className="font-mono text-sm tabular-nums text-ink-muted">
          {format(value)}
        </span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="mt-2 h-2 w-full cursor-pointer appearance-none rounded-full bg-surface-muted accent-accent"
      />
    </label>
  );
}

export function LossCalculator() {
  const [msgs, setMsgs] = useState(25);
  const [offHours, setOffHours] = useState(40);
  const [ticket, setTicket] = useState(800);
  const [closeRate, setCloseRate] = useState(18);

  const perMonth = useMemo(() => {
    const volume =
      msgs * 30 * (offHours / 100) * (closeRate / 100) * ticket;
    return Math.round(volume);
  }, [msgs, offHours, ticket, closeRate]);

  const ticketLabel = ticket.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
    maximumFractionDigits: 0,
  });

  const agendarHref = brand.contact.agendamentoUrl.startsWith("[")
    ? "#demonstracao"
    : brand.contact.agendamentoUrl;

  return (
    <div id="calculadora">
      <RevealWords
        text="Quanto você perde sem responder?"
        className="font-display text-3xl text-ink md:text-5xl"
        italicWords={["perde"]}
      />
      <p className="mt-4 max-w-xl text-lg text-ink-muted">
        Ajuste com os números do seu negócio. É estimativa — não promessa de
        resultado.
      </p>

      <div className="mt-10 grid gap-10 lg:grid-cols-[1fr_minmax(0,320px)]">
        <div className="space-y-8 rounded-2xl border border-line bg-surface-raised p-6 md:p-8">
          <Slider
            label="Mensagens comerciais por dia"
            value={msgs}
            min={5}
            max={120}
            step={1}
            format={(v) => `${v}/dia`}
            onChange={setMsgs}
          />
          <Slider
            label="Chegam fora do horário comercial"
            value={offHours}
            min={10}
            max={90}
            step={5}
            format={(v) => `${v}%`}
            onChange={setOffHours}
          />
          <Slider
            label="Ticket médio (R$)"
            value={ticket}
            min={100}
            max={15000}
            step={100}
            format={(v) =>
              v.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })
            }
            onChange={setTicket}
          />
          <Slider
            label="Taxa de fechamento hoje"
            value={closeRate}
            min={5}
            max={60}
            step={1}
            format={(v) => `${v}%`}
            onChange={setCloseRate}
          />
        </div>

        <div className="flex flex-col justify-center rounded-2xl border border-accent/25 bg-surface-dark p-6 text-ink-on-dark md:p-8">
          <p className="text-sm text-ink-muted-on-dark">Estimativa mensal</p>
          <p className="mt-2 font-display text-4xl md:text-5xl">
            <NumberFlow
              value={perMonth}
              format={{
                style: "currency",
                currency: "BRL",
                maximumFractionDigits: 0,
              }}
              locales="pt-BR"
              className="tabular-nums"
            />
          </p>
          <p className="mt-3 text-sm text-ink-muted-on-dark">
            estimativa feita com os seus números
          </p>
          <div className="mt-4 rounded-lg border border-line-on-dark/50 bg-white/5 p-3 text-left text-xs leading-relaxed text-ink-muted-on-dark">
            <p className="font-semibold text-ink-on-dark">Como calculamos</p>
            <p className="mt-2 font-mono tabular-nums">
              {msgs} msgs/dia × 30 dias × {offHours}% fora do horário × {closeRate}%
              fechamento × {ticketLabel}
            </p>
            <p className="mt-2">
              = {msgs * 30} msgs/mês × {(offHours / 100).toLocaleString("pt-BR", { style: "percent", maximumFractionDigits: 0 })} fora do horário ×{" "}
              {(closeRate / 100).toLocaleString("pt-BR", { style: "percent", maximumFractionDigits: 0 })} × {ticketLabel}
            </p>
          </div>
          <div className="mt-8">
            <MagneticButton href={agendarHref}>Agendar demonstração</MagneticButton>
          </div>
        </div>
      </div>
    </div>
  );
}
