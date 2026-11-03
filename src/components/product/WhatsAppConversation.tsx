"use client";

import type { ReactNode } from "react";
import {
  CalendarCheck,
  Microphone,
  PaperPlaneTilt,
  Sparkle,
} from "@phosphor-icons/react";
import { motion, useReducedMotion } from "motion/react";
import { Badge } from "@/components/ui/Badge";
import { cn } from "@/lib/cn";

type WhatsAppConversationProps = {
  className?: string;
  variant?: "default" | "clinica";
};

const copy = {
  default: {
    header: "Atendimento · WhatsApp Business",
    clientAudio: "Áudio · 0:24",
    clientAudioTranscript:
      "“Oi, vi o anúncio. Vocês atendem hoje à tarde? Preciso de orçamento.”",
    agentReply:
      "Atendo sim. Para te passar valor certo: é para residência ou empresa? E qual cidade?",
    clientText: "Residência, em Campinas.",
    agentQualify: "Perfeito. Qual horário funciona melhor: 14h ou 16h?",
    clientSchedule: "16h serve.",
    agentConfirm:
      "Agendei conversa com o consultor às 16h. Envio o resumo para a equipe agora.",
  },
  clinica: {
    header: "Clínica · WhatsApp",
    clientAudio: "Áudio · 0:18",
    clientAudioTranscript:
      "“Boa tarde, quero marcar retorno com a dermato. Só tenho quinta de manhã.”",
    agentReply:
      "Consigo te ajudar. Retorno é com a mesma médica? Tem preferência de horário entre 8h e 11h?",
    clientText: "Com a Dra. Marina, por favor. 9h se tiver.",
    agentQualify: "Verifico agenda… quinta, 9h15 está livre. Confirma?",
    clientSchedule: "Confirmo.",
    agentConfirm:
      "Consulta reservada. Envio orientações de preparo e aviso a recepção com seu resumo.",
  },
};

export function WhatsAppConversation({
  className,
  variant = "default",
}: WhatsAppConversationProps) {
  const reduceMotion = useReducedMotion();
  const t = copy[variant];

  const bubble = (side: "client" | "agent", children: ReactNode) => (
    <div
      className={cn(
        "max-w-[88%] rounded-2xl px-3.5 py-2.5 text-[13px] leading-snug shadow-sm",
        side === "client"
          ? "ml-auto rounded-br-md bg-[#DCF8C6] text-[#111]"
          : "mr-auto rounded-bl-md border border-line bg-surface text-ink",
      )}
    >
      {children}
    </div>
  );

  const items = [
    { key: "audio", side: "client" as const },
    { key: "reply", side: "agent" as const },
    { key: "text", side: "client" as const },
    { key: "qualify", side: "agent" as const },
    { key: "schedule", side: "client" as const },
    { key: "confirm", side: "agent" as const },
  ];

  return (
    <div
      className={cn(
        "overflow-hidden rounded-xl border border-line bg-[#ECE5DD] shadow-md",
        className,
      )}
      aria-label="Simulação de conversa no WhatsApp"
    >
      <div className="flex items-center gap-2 border-b border-black/5 bg-[#075E54] px-4 py-3 text-white">
        <div className="size-8 rounded-full bg-white/20" aria-hidden />
        <div>
          <p className="text-sm font-medium">{t.header}</p>
          <p className="text-[11px] text-white/80">online · agente + equipe</p>
        </div>
      </div>

      <div className="space-y-3 p-4">
        {items.map((item, index) => {
          const content = (() => {
            switch (item.key) {
              case "audio":
                return (
                  <>
                    <div className="mb-1 flex items-center gap-2 text-[11px] font-medium text-[#128C7E]">
                      <Microphone size={14} weight="regular" aria-hidden />
                      {t.clientAudio}
                    </div>
                    <p className="text-[12px] text-[#333] italic">
                      {t.clientAudioTranscript}
                    </p>
                    <p className="mt-2 flex items-center gap-1 text-[10px] text-[#128C7E]">
                      <Sparkle size={12} weight="regular" aria-hidden />
                      Áudio transcrito e entendido
                    </p>
                  </>
                );
              case "reply":
                return t.agentReply;
              case "text":
                return t.clientText;
              case "qualify":
                return t.agentQualify;
              case "schedule":
                return t.clientSchedule;
              case "confirm":
                return (
                  <>
                    {t.agentConfirm}
                    <span className="mt-2 flex items-center gap-1 text-[11px] text-accent">
                      <CalendarCheck size={14} weight="regular" aria-hidden />
                      Compromisso na agenda
                    </span>
                  </>
                );
              default:
                return null;
            }
          })();

          const inner = bubble(item.side, content);

          if (reduceMotion) {
            return (
              <div key={item.key} className="flex">
                {inner}
              </div>
            );
          }

          return (
            <motion.div
              key={item.key}
              className="flex"
              initial={{ opacity: 0, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-20%" }}
              transition={{ delay: index * 0.08, duration: 0.35 }}
            >
              {inner}
            </motion.div>
          );
        })}
      </div>

      <div className="flex items-center gap-2 border-t border-black/5 bg-surface px-3 py-2">
        <div className="flex-1 rounded-full bg-surface-raised px-3 py-2 text-xs text-ink-subtle">
          Mensagem automática + humano quando precisar
        </div>
        <PaperPlaneTilt
          size={20}
          weight="regular"
          className="text-[#128C7E]"
          aria-hidden
        />
      </div>
    </div>
  );
}

export function WhatsAppConversationCompact({
  className,
}: {
  className?: string;
}) {
  return (
    <div className={cn("relative", className)}>
      <Badge tone="accent" className="absolute -top-2 left-4 z-10">
        Ao vivo no WhatsApp
      </Badge>
      <WhatsAppConversation />
    </div>
  );
}
