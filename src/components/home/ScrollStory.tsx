"use client";

import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { HomeTitle } from "@/components/home/HomeTitle";
import {
  ChatBubble,
  WhatsAppPhoneShell,
} from "@/components/home/WhatsAppPhoneShell";
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

type Scene = (typeof steps)[number]["scene"];

function StoryPhoneScene({ scene }: { scene: Scene }) {
  return (
    <WhatsAppPhoneShell
      size="story"
      name={
        scene === "connect"
          ? "Configuração"
          : scene === "handoff"
            ? "Handoff · CRM"
            : "Atendimento · WhatsApp"
      }
      status={
        scene === "connect"
          ? "número verificado"
          : scene === "audio"
            ? "transcrevendo áudio…"
            : scene === "funnel"
              ? "funil atualizado"
              : "resumo enviado"
      }
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={scene}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.35 }}
          className="flex w-full flex-col gap-2"
        >
          {scene === "connect" && (
            <>
              <ChatBubble side="in" time="09:00">
                Número conectado · fila comercial ativa. Horário: seg–sex 8h–19h.
              </ChatBubble>
              <ChatBubble side="in" time="09:00">
                Regras de handoff: orçamento acima de R$ 5 mil → vendedor sênior.
              </ChatBubble>
            </>
          )}
          {scene === "audio" && (
            <>
              <ChatBubble side="out" time="14:31" ticks>
                <span className="font-medium text-[#128C7E]">Áudio · 0:24</span>
              </ChatBubble>
              <ChatBubble side="out" time="14:31" ticks>
                <span className="italic">
                  “Preciso de orçamento ainda hoje, vocês atendem Campinas?”
                </span>
              </ChatBubble>
              <p className="text-center text-[10px] font-medium text-[#128C7E]">
                Transcrição pronta em 2s
              </p>
              <ChatBubble side="in" time="14:32" ticks>
                Atendo sim! Residência ou empresa?
              </ChatBubble>
            </>
          )}
          {scene === "funnel" && (
            <>
              <ChatBubble side="in" time="14:33" ticks>
                Perfeito — registrei orçamento estimado e urgência.
              </ChatBubble>
              <div className="flex flex-wrap gap-1.5">
                <span className="rounded-md bg-accent/20 px-2 py-1 text-[10px] font-medium text-accent">
                  orçamento: R$ 8 mil
                </span>
                <span className="rounded-md bg-white px-2 py-1 text-[10px] text-ink">
                  etapa: proposta
                </span>
                <span className="rounded-md bg-white px-2 py-1 text-[10px] text-ink">
                  temperatura: quente
                </span>
              </div>
            </>
          )}
          {scene === "handoff" && (
            <>
              <ChatBubble side="in" time="14:34" ticks>
                <span className="font-semibold">Resumo para vendedor</span>
                <p className="mt-1 text-ink-muted">
                  Quer orçamento hoje · Campinas · prefere 16h · objeção: prazo.
                </p>
              </ChatBubble>
              <ChatBubble side="out" time="14:35">
                Pode ser 16h. Manda proposta por aqui?
              </ChatBubble>
            </>
          )}
        </motion.div>
      </AnimatePresence>
    </WhatsAppPhoneShell>
  );
}

export function ScrollStory() {
  const reduceMotion = useReducedMotion();
  const wrapRef = useRef<HTMLDivElement>(null);
  const phoneColRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const [pinEnabled, setPinEnabled] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px)");
    const sync = () => setPinEnabled(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  useEffect(() => {
    if (reduceMotion || !pinEnabled) return;
    let ctx: { revert: () => void } | undefined;

    void (async () => {
      const gsap = (await import("gsap")).default;
      const { ScrollTrigger } = await import("gsap/ScrollTrigger");
      ScrollTrigger.config({ ignoreMobileResize: true });
      gsap.registerPlugin(ScrollTrigger);

      const el = wrapRef.current;
      if (!el) return;

      ctx = gsap.context(() => {
        ScrollTrigger.create({
          trigger: el,
          start: "top top",
          end: "+=240%",
          pin: true,
          pinSpacing: true,
          scrub: 0.6,
          anticipatePin: 1,
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
  }, [reduceMotion, pinEnabled]);

  const stepList = (
    <ol className="space-y-4 lg:space-y-5">
      {steps.map((step, i) => (
        <li
          key={step.title}
          className={cn(
            "relative overflow-hidden rounded-2xl border border-[rgb(28_25_23/0.08)] bg-surface-raised p-5 shadow-[0_1px_0_rgb(255_255_255/0.8)_inset,0_12px_32px_rgb(28_25_23/0.06)] transition-[border-color,box-shadow] duration-300",
            active === i &&
              "border-accent/35 shadow-[0_1px_0_rgb(255_255_255/0.9)_inset,0_16px_40px_rgb(255_91_46/0.08)]",
          )}
        >
          {active === i ? (
            <motion.div
              layoutId="story-progress"
              className="absolute inset-y-0 left-0 w-1 bg-accent"
              transition={{ type: "spring", stiffness: 380, damping: 32 }}
            />
          ) : null}
          <span className="text-sm font-semibold tabular-nums text-accent">
            {String(i + 1).padStart(2, "0")}
          </span>
          <h3 className="mt-2 font-sans text-xl font-semibold tracking-tight text-ink md:text-2xl">
            {step.title}
          </h3>
          <p className="mt-2 text-base leading-relaxed text-ink-muted">
            {step.body}
          </p>
          {!pinEnabled ? (
            <div className="mt-6 min-h-[520px] lg:hidden">
              <StoryPhoneScene scene={step.scene} />
            </div>
          ) : null}
        </li>
      ))}
    </ol>
  );

  if (reduceMotion) {
    return (
      <div id="como-funciona">
        <HomeTitle
          as="h2"
          text="Do número ao handoff em quatro passos."
          accentWords={["handoff"]}
          className="text-3xl md:text-5xl"
        />
        <ol className="mt-10 grid gap-6 md:grid-cols-2">
          {steps.map((step, i) => (
            <li
              key={step.title}
              className="rounded-2xl border border-line bg-surface-raised p-5 shadow-md"
            >
              <span className="text-sm font-semibold text-accent">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="mt-2 font-sans text-2xl font-semibold">
                {step.title}
              </h3>
              <p className="mt-2 text-base text-ink-muted">{step.body}</p>
              <div className="mt-4 min-h-[520px]">
                <StoryPhoneScene scene={step.scene} />
              </div>
            </li>
          ))}
        </ol>
      </div>
    );
  }

  return (
    <div
      id="como-funciona"
      ref={wrapRef}
      className={cn(pinEnabled && "min-h-[100svh]")}
    >
      <HomeTitle
        as="h2"
        text="Do número ao handoff em quatro passos."
        accentWords={["handoff"]}
        className="text-3xl md:text-5xl"
      />
      <div className="mt-12 grid items-start gap-10 lg:grid-cols-2 lg:gap-14">
        {stepList}
        {pinEnabled ? (
          <div
            ref={phoneColRef}
            className="sticky top-24 hidden min-h-[640px] lg:flex lg:items-center lg:justify-center"
          >
            <StoryPhoneScene scene={steps[active]?.scene ?? "connect"} />
          </div>
        ) : null}
      </div>
    </div>
  );
}
