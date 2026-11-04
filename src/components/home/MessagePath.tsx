"use client";

import { useRef } from "react";
import { HomeTitle } from "@/components/home/HomeTitle";
import { AnimatedBeam } from "@/components/ui/animated-beam";

const stations = [
  {
    id: "whatsapp",
    title: "Conecta seu número",
    body: "Mantém o WhatsApp Business que você já usa. Filas, horários e regras da equipe.",
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
    title: "A IA atende e entende áudio",
    body: "Responde em segundos, transcreve áudio e mantém o tom da sua marca.",
    mini: (
      <div className="space-y-1 rounded-lg border border-line bg-white p-2 text-[10px] text-on-light">
        <p className="font-medium text-accent">Intenção: agendar</p>
        <p className="text-ink-muted">Áudio → texto em 2s</p>
      </div>
    ),
  },
  {
    id: "funil",
    title: "Qualifica e registra no funil",
    body: "Etiquetas, temperatura e próximo passo — sem planilha paralela.",
    mini: (
      <div className="card-dark-glow rounded-lg p-2 text-[10px] text-ink-on-dark">
        <p className="font-medium text-accent">Qualificado</p>
        <p className="text-ink-muted-on-dark">R$ 8 mil · urgente</p>
      </div>
    ),
  },
  {
    id: "vendedor",
    title: "Passa para o humano com resumo",
    body: "Vendedor entra com contexto, intenção e horário sugerido.",
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

function StationNode({
  innerRef,
  label,
}: {
  innerRef: React.RefObject<HTMLDivElement | null>;
  label: string;
}) {
  return (
    <div
      ref={innerRef}
      className="mx-auto flex size-11 items-center justify-center rounded-full border border-accent/35 bg-surface-raised text-xs font-bold text-accent shadow-[0_0_24px_rgb(255_91_46/0.2)]"
    >
      {label}
    </div>
  );
}

export function MessagePath() {
  const containerRef = useRef<HTMLDivElement>(null);
  const ref0 = useRef<HTMLDivElement>(null);
  const ref1 = useRef<HTMLDivElement>(null);
  const ref2 = useRef<HTMLDivElement>(null);
  const ref3 = useRef<HTMLDivElement>(null);
  const refs = [ref0, ref1, ref2, ref3];

  return (
    <div id="caminho-mensagem" className="scroll-mt-24 py-6 md:py-10">
      <HomeTitle
        as="h2"
        text="O caminho da mensagem."
        accentWords={["caminho"]}
        className="text-3xl md:text-5xl"
      />
      <p className="mt-4 max-w-2xl text-lg text-ink-muted">
        Do primeiro contato ao vendedor com contexto — sem buraco no meio.
      </p>

      <div ref={containerRef} className="relative mt-14 hidden md:block">
        <div className="mb-6 grid grid-cols-4 gap-4">
          {stations.map((st, i) => (
            <StationNode
              key={st.id}
              innerRef={refs[i]!}
              label={String(i + 1)}
            />
          ))}
        </div>
        {refs.slice(0, -1).map((fromRef, i) => (
          <AnimatedBeam
            key={stations[i]!.id}
            containerRef={containerRef}
            fromRef={fromRef}
            toRef={refs[i + 1]!}
            curvature={20}
            duration={4}
            delay={i * 0.35}
            pathColor="#e7e0d6"
            pathWidth={2}
            pathOpacity={0.35}
            gradientStartColor="#ff5b2e"
            gradientStopColor="#0e3b43"
          />
        ))}
        <div className="mt-2 grid grid-cols-4 gap-4">
          {stations.map((st) => (
            <div
              key={st.id}
              className="card-premium rounded-2xl border border-line p-4 text-on-light"
            >
              <p className="text-xs font-semibold uppercase tracking-[0.12em] text-accent">
                {st.title}
              </p>
              <p className="mt-2 text-sm text-ink-muted">{st.body}</p>
              <div className="mt-4">{st.mini}</div>
            </div>
          ))}
        </div>
      </div>

      <ol className="mt-10 space-y-4 md:hidden">
        {stations.map((st, i) => (
          <li
            key={st.id}
            className="rounded-2xl border border-line bg-surface-raised p-4 text-on-light"
          >
            <span className="text-xs font-semibold text-accent">
              {String(i + 1).padStart(2, "0")}
            </span>
            <h3 className="mt-1 font-semibold text-ink">{st.title}</h3>
            <p className="mt-1 text-sm text-ink-muted">{st.body}</p>
            <div className="mt-3">{st.mini}</div>
          </li>
        ))}
      </ol>
    </div>
  );
}
