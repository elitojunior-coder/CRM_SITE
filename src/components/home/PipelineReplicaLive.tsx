"use client";

import { useReducedMotion } from "motion/react";
import { useCallback, useEffect, useRef, useState } from "react";
import {
  formatPipelineBrl,
  pipelineCards as initialPipelineCards,
  pipelineDragSequence,
  type PipelineCard,
} from "../../../content/demo/pipeline";
import { PipelineReplicaCanvas } from "@/components/home/PipelineReplicaCanvas";
import {
  PIPELINE_CANVAS_SIZE,
  PIPELINE_MOBILE_VISIBLE_W,
} from "@/components/home/pipeline-layout";
import { cn } from "@/lib/cn";

const LOOP_MS = 12000;
const STEP_MS = 3000;
const MIN_TEXT_PX = 9;
const BASE_TEXT_PX = 12;

function cloneCards(cards: PipelineCard[]) {
  return cards.map((c) => ({ ...c }));
}

export function PipelineReplicaLive() {
  const reduceMotion = useReducedMotion();
  const rootRef = useRef<HTMLDivElement>(null);
  const viewportRef = useRef<HTMLDivElement>(null);
  const [cards, setCards] = useState(() => cloneCards(initialPipelineCards));
  const [scale, setScale] = useState(1);
  const [inView, setInView] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const [hiddenCardId, setHiddenCardId] = useState<string | null>(null);
  const [cursor, setCursor] = useState<{ x: number; y: number; visible: boolean }>({
    x: 0,
    y: 0,
    visible: false,
  });
  const [dragGhost, setDragGhost] = useState<{
    visible: boolean;
    x: number;
    y: number;
    card: PipelineCard | null;
  }>({ visible: false, x: 0, y: 0, card: null });
  const cardsRef = useRef(cards);
  cardsRef.current = cards;

  const updateScale = useCallback(() => {
    const el = viewportRef.current;
    if (!el) return;
    const w = el.clientWidth;
    const h = el.clientHeight;
    const mobile = w < 768;
    setIsMobile(mobile);

    const minScale = MIN_TEXT_PX / BASE_TEXT_PX;
    if (mobile) {
      const fitW = w / PIPELINE_MOBILE_VISIBLE_W;
      const fitH = h / PIPELINE_CANVAS_SIZE.height;
      setScale(Math.max(Math.min(fitW, fitH), minScale));
    } else {
      setScale(
        Math.min(w / PIPELINE_CANVAS_SIZE.width, h / PIPELINE_CANVAS_SIZE.height),
      );
    }
  }, []);

  useEffect(() => {
    updateScale();
    const el = viewportRef.current;
    if (!el) return;
    const ro = new ResizeObserver(updateScale);
    ro.observe(el);
    return () => ro.disconnect();
  }, [updateScale]);

  useEffect(() => {
    const node = rootRef.current;
    if (!node) return;
    const io = new IntersectionObserver(
      ([entry]) => setInView(entry?.isIntersecting ?? false),
      { threshold: 0.15 },
    );
    io.observe(node);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (reduceMotion || !inView) return;

    let cancelled = false;
    let lastHidden: string | null = null;
    let lastCommittedStep = -1;
    let lastResetLoop = -1;
    const start = performance.now();

    const measureCard = (cardId: string) => {
      const board = rootRef.current?.querySelector(".pipeline-board");
      const card = rootRef.current?.querySelector(
        `[data-pipeline-card="${cardId}"]`,
      ) as HTMLElement | null;
      if (!board || !card) return null;
      const br = board.getBoundingClientRect();
      const cr = card.getBoundingClientRect();
      return {
        x: (cr.left - br.left + cr.width / 2) / scale,
        y: (cr.top - br.top + cr.height / 2) / scale,
      };
    };

    const measureColumnCenter = (columnId: string) => {
      const board = rootRef.current?.querySelector(".pipeline-board");
      const col = rootRef.current?.querySelector(
        `[data-pipeline-column="${columnId}"]`,
      ) as HTMLElement | null;
      if (!board || !col) return null;
      const br = board.getBoundingClientRect();
      const cr = col.getBoundingClientRect();
      return {
        x: (cr.left - br.left + cr.width / 2) / scale,
        y: (cr.top - br.top + 120) / scale,
      };
    };

    const tick = (now: number) => {
      if (cancelled) return;
      const elapsed = now - start;
      const loopIndex = Math.floor(elapsed / LOOP_MS);
      const elapsedInLoop = elapsed % LOOP_MS;
      const stepIndex = Math.floor(elapsedInLoop / STEP_MS) % pipelineDragSequence.length;
      const phase = (elapsedInLoop % STEP_MS) / STEP_MS;

      if (loopIndex > lastResetLoop && elapsedInLoop < 120) {
        lastResetLoop = loopIndex;
        lastCommittedStep = -1;
        lastHidden = null;
        setCards(cloneCards(initialPipelineCards));
        setHiddenCardId(null);
      }

      const seq = pipelineDragSequence[stepIndex];
      const card = cardsRef.current.find((c) => c.id === seq.cardId) ?? null;
      const from = measureCard(seq.cardId);
      const to = measureColumnCenter(seq.to);

      const shouldHide = phase > 0.12 && phase < 0.88 ? seq.cardId : null;
      if (shouldHide !== lastHidden) {
        lastHidden = shouldHide;
        setHiddenCardId(shouldHide);
      }

      const stepKey = loopIndex * pipelineDragSequence.length + stepIndex;
      if (phase >= 0.88 && lastCommittedStep !== stepKey) {
        lastCommittedStep = stepKey;
        setHiddenCardId(null);
        lastHidden = null;
        setCards((prev) =>
          prev.map((c) =>
            c.id === seq.cardId ? { ...c, columnId: seq.to } : c,
          ),
        );
      }

      if (from && to) {
        const t = phase < 0.15 ? 0 : phase > 0.85 ? 1 : (phase - 0.15) / 0.7;
        const ease = t * t * (3 - 2 * t);
        const x = from.x + (to.x - from.x) * ease;
        const y = from.y + (to.y - from.y) * ease;
        setCursor({ x, y, visible: phase > 0.05 && phase < 0.95 });
        setDragGhost({
          visible: phase > 0.12 && phase < 0.88,
          x: x - 100,
          y: y - 28,
          card,
        });
      } else {
        setCursor((c) => ({ ...c, visible: false }));
        setDragGhost((g) => ({ ...g, visible: false, card: null }));
      }

      requestAnimationFrame(tick);
    };

    const id = requestAnimationFrame(tick);
    return () => {
      cancelled = true;
      cancelAnimationFrame(id);
    };
  }, [reduceMotion, inView, scale]);

  const clipRight =
    ((PIPELINE_CANVAS_SIZE.width - PIPELINE_MOBILE_VISIBLE_W) /
      PIPELINE_CANVAS_SIZE.width) *
    100;

  return (
    <div ref={rootRef} className="relative h-full w-full">
      <div ref={viewportRef} className="relative h-full w-full overflow-hidden">
        <div
          className="pointer-events-none absolute left-0 top-0 origin-top-left"
          style={{
            width: PIPELINE_CANVAS_SIZE.width,
            height: PIPELINE_CANVAS_SIZE.height,
            transform: `scale(${scale})`,
          }}
        >
          <div
            className="overflow-hidden"
            style={
              isMobile
                ? { clipPath: `inset(0 ${clipRight.toFixed(2)}% 0 0)` }
                : undefined
            }
          >
            <PipelineReplicaCanvas cards={cards} hiddenCardId={hiddenCardId} />
          </div>
          {!reduceMotion && inView ? (
            <>
              {dragGhost.visible && dragGhost.card ? (
                <div
                  className="absolute z-20 w-[200px] rounded-lg border border-[#e8e4dc] bg-white/95 p-2.5 shadow-lg"
                  style={{ left: dragGhost.x, top: dragGhost.y }}
                >
                  <p className="truncate text-[12px] font-semibold text-[#1c1917]">
                    {dragGhost.card.name}
                  </p>
                  <p className="text-[12px] font-medium text-[#57534e]">
                    {formatPipelineBrl(dragGhost.card.valueCents)}
                  </p>
                </div>
              ) : null}
              <svg
                className={cn(
                  "absolute z-30 text-[#1c1917] drop-shadow-md transition-opacity",
                  cursor.visible ? "opacity-100" : "opacity-0",
                )}
                width="28"
                height="28"
                viewBox="0 0 24 24"
                style={{
                  left: cursor.x - 2,
                  top: cursor.y - 2,
                }}
                aria-hidden
              >
                <path
                  fill="currentColor"
                  d="M5.5 2.5l12 8.5-5.5.5 3 7.5-2.5 1.5-3-7.5-4.5 1.5z"
                />
              </svg>
            </>
          ) : null}
        </div>
      </div>
    </div>
  );
}
