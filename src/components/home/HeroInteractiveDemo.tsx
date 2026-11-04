"use client";

import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type FormEvent,
} from "react";
import {
  demoScripts,
  type DemoScript,
} from "../../../content/demo/index";
import { keywordDemoResponder } from "@/lib/demo/keywordResponder";
import {
  ChatBubble,
  WhatsAppPhoneShell,
} from "@/components/home/WhatsAppPhoneShell";
import { Iphone } from "@/components/ui/iphone";
import { cn } from "@/lib/cn";

type ChatLine =
  | { id: string; role: "user"; text: string }
  | { id: string; role: "agent"; text: string }
  | { id: string; role: "slot"; text: string };

const IDLE_MS = 6000;

function nextId() {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;
}

function FunnelCard({
  chips,
  slot,
  pulseKey,
}: {
  chips: { label: string; value: string }[];
  slot: string | null;
  pulseKey: number;
}) {
  return (
    <div className="card-dark-glow spotlight-card hidden w-full max-w-[220px] shrink-0 rounded-2xl p-4 min-[1100px]:block">
      <p className="text-[10px] font-semibold uppercase tracking-[0.12em] text-ink-muted-on-dark">
        Funil · qualificação
      </p>
      <div className="mt-3 min-h-[72px] space-y-2">
        <AnimatePresence mode="popLayout">
          {chips.map((chip) => (
            <motion.span
              key={`${chip.label}-${chip.value}-${pulseKey}`}
              layout
              initial={{ opacity: 0, x: 24, scale: 0.92 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ type: "spring", stiffness: 420, damping: 28 }}
              className="block rounded-md border border-accent/35 bg-accent/10 px-2 py-1.5 text-[11px] text-accent"
            >
              {chip.label}: {chip.value}
            </motion.span>
          ))}
        </AnimatePresence>
      </div>
      {slot ? (
        <motion.p
          key={slot}
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-3 rounded-md border border-line-on-dark bg-white/5 px-2 py-2 text-xs font-medium text-accent"
        >
          {slot}
        </motion.p>
      ) : (
        <p className="mt-3 text-[11px] text-ink-muted-on-dark">
          Chips aparecem quando a IA qualifica.
        </p>
      )}
    </div>
  );
}

export function HeroInteractiveDemo({ className }: { className?: string }) {
  const reduceMotion = useReducedMotion();
  const [segment, setSegment] = useState<DemoScript>(demoScripts[0]!);
  const [lines, setLines] = useState<ChatLine[]>([]);
  const [typing, setTyping] = useState(false);
  const [chips, setChips] = useState<{ label: string; value: string }[]>([]);
  const [slot, setSlot] = useState<string | null>(null);
  const [chipPulse, setChipPulse] = useState(0);
  const [draft, setDraft] = useState("");
  const idleRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const autoIndexRef = useRef(0);
  const segmentRef = useRef(segment);
  const typingRef = useRef(typing);
  segmentRef.current = segment;
  typingRef.current = typing;

  const resetConversation = useCallback(() => {
    setLines([]);
    setChips([]);
    setSlot(null);
    setTyping(false);
  }, []);

  const queueAutoDemoRef = useRef<() => void>(() => {});

  const runMessage = useCallback(
    async (text: string) => {
      if (!text.trim() || typingRef.current) return;
      if (idleRef.current) clearTimeout(idleRef.current);

      const userLine: ChatLine = {
        id: nextId(),
        role: "user",
        text: text.trim(),
      };
      setLines((prev) => [...prev, userLine]);
      setDraft("");
      setTyping(true);

      const result = keywordDemoResponder.respond({
        segmentId: segmentRef.current.segmentId,
        message: text,
      });

      const delay = reduceMotion ? 400 : result.typingMs;
      await new Promise((r) => setTimeout(r, delay));

      setTyping(false);
      setLines((prev) => [
        ...prev,
        { id: nextId(), role: "agent", text: result.reply },
      ]);

      await new Promise((r) => setTimeout(r, reduceMotion ? 200 : 500));
      setChips(result.chips);
      setChipPulse((n) => n + 1);

      await new Promise((r) => setTimeout(r, reduceMotion ? 200 : 700));
      setSlot(result.confirmedSlot);
      setLines((prev) => [
        ...prev,
        { id: nextId(), role: "slot", text: result.confirmedSlot },
      ]);

      queueAutoDemoRef.current();
    },
    [reduceMotion],
  );

  const runMessageRef = useRef(runMessage);
  runMessageRef.current = runMessage;

  queueAutoDemoRef.current = () => {
    if (reduceMotion) return;
    if (idleRef.current) clearTimeout(idleRef.current);
    idleRef.current = setTimeout(() => {
      const scripts = demoScripts;
      const seg = scripts[autoIndexRef.current % scripts.length]!;
      autoIndexRef.current += 1;
      setSegment(seg);
      resetConversation();
      window.setTimeout(() => {
        void runMessageRef.current(seg.quickMessages[0]!);
      }, 120);
    }, IDLE_MS);
  };

  useEffect(() => {
    const seg = demoScripts[0]!;
    setSegment(seg);
    resetConversation();
    const kickoff = window.setTimeout(() => {
      void runMessageRef.current(seg.quickMessages[0]!);
    }, reduceMotion ? 0 : 650);
    return () => {
      window.clearTimeout(kickoff);
      if (idleRef.current) clearTimeout(idleRef.current);
    };
  }, [reduceMotion, resetConversation]);

  useEffect(() => {
    resetConversation();
  }, [segment.segmentId, resetConversation]);

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    void runMessage(draft);
  };

  const footer = (
    <div className="shrink-0 space-y-2 border-t border-black/5 bg-[#F0F0F0] px-2 py-2">
      <div
        className="flex flex-wrap gap-1 pb-0.5 min-[1100px]:flex-nowrap min-[1100px]:overflow-x-auto min-[1100px]:[-ms-overflow-style:none] min-[1100px]:[scrollbar-width:none] min-[1100px]:[&::-webkit-scrollbar]:hidden"
        role="tablist"
        aria-label="Segmento da demonstração"
      >
        {demoScripts.map((s) => (
          <button
            key={s.segmentId}
            type="button"
            role="tab"
            aria-selected={segment.segmentId === s.segmentId}
            onClick={() => setSegment(s)}
            className={cn(
              "shrink-0 rounded-full px-2.5 py-1 text-[10px] font-semibold transition-colors",
              segment.segmentId === s.segmentId
                ? "bg-[#075E54] text-white"
                : "bg-white text-[#54656f] hover:bg-[#e9edef]",
            )}
          >
            {s.label}
          </button>
        ))}
      </div>
      <div className="grid grid-cols-1 gap-1 min-[400px]:grid-cols-2">
        {segment.quickMessages.map((msg) => (
          <button
            key={msg}
            type="button"
            onClick={() => void runMessage(msg)}
            className="rounded-xl border border-[#d1d7db] bg-white px-2 py-1.5 text-left text-[10px] leading-snug text-[#111] hover:border-[#075E54]/40 min-[1100px]:rounded-full min-[1100px]:py-1 min-[1100px]:text-center"
          >
            <span className="line-clamp-2">{msg}</span>
          </button>
        ))}
      </div>
      <form onSubmit={onSubmit} className="flex items-center gap-2">
        <input
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          placeholder="Digite como cliente…"
          className="min-w-0 flex-1 rounded-full border border-[#d1d7db] bg-white px-3 py-2 text-[11px] text-[#111] outline-none focus:border-[#075E54]/50"
          aria-label="Mensagem livre na demonstração"
        />
        <button
          type="submit"
          className="shrink-0 rounded-full bg-[#075E54] px-3 py-2 text-[10px] font-semibold text-white"
        >
          Enviar
        </button>
      </form>
    </div>
  );

  return (
    <div className={cn("relative flex flex-col items-center gap-3", className)}>
      <div className="flex w-full max-w-[640px] flex-col items-center justify-center gap-3 min-[1100px]:flex-row min-[1100px]:items-start min-[1100px]:gap-4">
        <Iphone
          className="mx-auto w-[min(100%,360px)] max-w-[400px] drop-shadow-[0_32px_64px_rgb(0_0_0/0.45)] min-[768px]:max-[1099px]:aspect-auto min-[768px]:max-[1099px]:h-[640px] min-[768px]:max-[1099px]:w-[min(100%,320px)] min-[1100px]:aspect-[433/882] min-[1100px]:h-auto min-[1100px]:w-[272px] min-[1100px]:max-w-[272px]"
        >
          <WhatsAppPhoneShell
            size="hero"
            name={`Demo · ${segment.label}`}
            status="online · IA roteirizada"
            footer={footer}
            className="h-full min-h-0"
          >
            {lines.map((line) =>
              line.role === "slot" ? (
                <ChatBubble key={line.id} side="in" time="agora" ticks>
                  <span className="font-medium text-accent">{line.text}</span>
                </ChatBubble>
              ) : (
                <ChatBubble
                  key={line.id}
                  side={line.role === "user" ? "out" : "in"}
                  time="agora"
                  ticks={line.role === "user"}
                >
                  {line.text}
                </ChatBubble>
              ),
            )}
            {typing ? (
              <ChatBubble side="in" time="…">
                <span className="text-on-light text-ink-subtle">digitando…</span>
              </ChatBubble>
            ) : null}
          </WhatsAppPhoneShell>
        </Iphone>
        <FunnelCard chips={chips} slot={slot} pulseKey={chipPulse} />
      </div>
      <p className="max-w-md text-center text-xs leading-relaxed text-ink-muted-on-dark">
        Isto é uma demonstração. No seu WhatsApp, a IA responde com os dados da
        sua empresa.
      </p>
    </div>
  );
}
