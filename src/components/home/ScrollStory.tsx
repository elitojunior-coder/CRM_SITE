"use client";

import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "motion/react";
import { RevealWords } from "@/components/home/RevealWords";
import { cn } from "@/lib/cn";

const steps = [
  {
    title: "Conecta seu número",
    body: "Mantém o WhatsApp Business que você já usa. Filas, horários e regras da equipe.",
    scene: "connect",
  },
  {
    title: "A IA atende e entende áudio",
    body: "Responde em segundos, transcreve áudio e mantém o tom da sua marca.",
    scene: "audio",
  },
  {
    title: "Qualifica e registra no funil",
    body: "Etiquetas, temperatura e próximo passo — sem planilha paralela.",
    scene: "funnel",
  },
  {
    title: "Passa para o humano com resumo",
    body: "Vendedor entra com contexto, intenção e horário sugerido.",
    scene: "handoff",
  },
] as const;

function PhoneScene({ scene }: { scene: (typeof steps)[number]["scene"] }) {
  return (
    <div className="mx-auto w-[min(100%,260px)] rounded-[2rem] border border-line-on-dark bg-[#111] p-2">
      <div className="rounded-[1.6rem] bg-[#ECE5DD] p-3 text-[11px] leading-snug">
        {scene === "connect" && (
          <p className="rounded-lg bg-white p-2 text-ink">
            Número conectado · fila comercial ativa
          </p>
        )}
        {scene === "audio" && (
          <>
            <div className="ml-auto max-w-[90%] rounded-xl bg-[#DCF8C6] p-2">
              Áudio recebido
            </div>
            <p className="mt-2 text-[10px] text-[#128C7E]">Transcrição pronta</p>
          </>
        )}
        {scene === "funnel" && (
          <div className="space-y-1">
            <span className="block rounded bg-accent/20 px-2 py-1 text-accent">
              orçamento: R$ 8 mil
            </span>
            <span className="block rounded bg-white px-2 py-1">etapa: proposta</span>
          </div>
        )}
        {scene === "handoff" && (
          <div className="rounded-lg bg-white p-2 text-ink">
            <p className="font-medium">Resumo para vendedor</p>
            <p className="mt-1 text-ink-muted">
              Quer orçamento hoje · Campinas · prefere 16h
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export function ScrollStory() {
  const reduceMotion = useReducedMotion();
  const wrapRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);

  useEffect(() => {
    if (reduceMotion) return;
    let ctx: { revert: () => void } | undefined;

    void (async () => {
      const gsap = (await import("gsap")).default;
      const { ScrollTrigger } = await import("gsap/ScrollTrigger");
      gsap.registerPlugin(ScrollTrigger);

      const el = wrapRef.current;
      if (!el) return;

      ctx = gsap.context(() => {
        ScrollTrigger.create({
          trigger: el,
          start: "top top",
          end: "+=240%",
          pin: true,
          scrub: 0.6,
          onUpdate: (self) => {
            const idx = Math.min(
              steps.length - 1,
              Math.floor(self.progress * steps.length),
            );
            setActive(idx);
          },
        });
      }, el);
    })();

    return () => ctx?.revert();
  }, [reduceMotion]);

  if (reduceMotion) {
    return (
      <div id="como-funciona">
        <RevealWords
          text="Do número ao handoff em quatro passos."
          className="font-display text-3xl text-ink md:text-5xl"
        />
        <ol className="mt-10 grid gap-6 md:grid-cols-2">
          {steps.map((step, i) => (
            <li key={step.title} className="rounded-xl border border-line p-5">
              <span className="text-sm font-semibold text-accent">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="mt-2 font-display text-2xl">{step.title}</h3>
              <p className="mt-2 text-ink-muted">{step.body}</p>
              <div className="mt-4">
                <PhoneScene scene={step.scene} />
              </div>
            </li>
          ))}
        </ol>
      </div>
    );
  }

  return (
    <div id="como-funciona" ref={wrapRef} className="min-h-[100vh]">
      <RevealWords
        text="Do número ao handoff em quatro passos."
        className="font-display text-3xl text-ink md:text-5xl"
      />
      <div className="mt-14 grid items-start gap-10 lg:grid-cols-2">
        <ol className="space-y-6">
          {steps.map((step, i) => (
            <li
              key={step.title}
              className={cn(
                "rounded-xl border p-5 transition-colors duration-300",
                active === i
                  ? "border-accent/40 bg-surface-raised shadow-md"
                  : "border-line bg-transparent opacity-60",
              )}
            >
              <span className="text-sm font-semibold tabular-nums text-accent">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="mt-2 font-display text-2xl text-ink">{step.title}</h3>
              <p className="mt-2 text-ink-muted">{step.body}</p>
            </li>
          ))}
        </ol>
        <div className="sticky top-28">
          <PhoneScene scene={steps[active]?.scene ?? "connect"} />
        </div>
      </div>
    </div>
  );
}
