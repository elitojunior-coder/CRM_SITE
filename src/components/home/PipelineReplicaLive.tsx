"use client";

import { useReducedMotion } from "motion/react";
import { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import {
  pipelineCards as initialPipelineCards,
  pipelineDragSequence,
  type PipelineCard,
} from "../../../content/demo/pipeline";
import { PipelineReplicaCanvas } from "@/components/home/PipelineReplicaCanvas";
import { PipelineCardView } from "@/components/home/PipelineReplicaCard";
import {
  PIPELINE_CANVAS_SIZE,
  PIPELINE_MOBILE_VISIBLE_W,
} from "@/components/home/pipeline-layout";
import { cn } from "@/lib/cn";

const LOOP_MS = 12000;
const STEP_MS = 3000;
const MIN_TEXT_PX = 9;
const BASE_TEXT_PX = 12;
const GHOST_W = 220;
const GHOST_H = 98;

function cloneCards(cards: PipelineCard[]) {
  return cards.map((c) => ({ ...c }));
}

type Point = { x: number; y: number };

type OverlayState = {
  visible: boolean;
  ghostX: number;
  ghostY: number;
  cursorX: number;
  cursorY: number;
  card: PipelineCard | null;
};

export function PipelineReplicaLive() {
  const reduceMotion = useReducedMotion();
  const rootRef = useRef<HTMLDivElement>(null);
  const viewportRef = useRef<HTMLDivElement>(null);
  const [cards, setCards] = useState(() => cloneCards(initialPipelineCards));
  const [scale, setScale] = useState(1);
  const [inView, setInView] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const [draggingCardId, setDraggingCardId] = useState<string | null>(null);
  const [overlay, setOverlay] = useState<OverlayState>({
    visible: false,
    ghostX: 0,
    ghostY: 0,
    cursorX: 0,
    cursorY: 0,
    card: null,
  });
  const [overlayMounted, setOverlayMounted] = useState(false);

  useEffect(() => {
    setOverlayMounted(true);
  }, []);

  const cardsRef = useRef(cards);
  cardsRef.current = cards;

  const animRef = useRef({
    stepKey: -1,
    from: null as Point | null,
    drop: null as Point | null,
    card: null as PipelineCard | null,
  });

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
    let lastCommittedStep = -1;
    let lastResetLoop = -1;
    let lastDragging: string | null = null;
    const start = performance.now();

    const boardToViewport = (canvasX: number, canvasY: number) => {
      const board = rootRef.current?.querySelector(".pipeline-board");
      if (!board) return null;
      const br = board.getBoundingClientRect();
      return {
        x: br.left + canvasX * scale,
        y: br.top + canvasY * scale,
      };
    };

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

    const measureColumnDrop = (columnId: string) => {
      const board = rootRef.current?.querySelector(".pipeline-board");
      const col = rootRef.current?.querySelector(
        `[data-pipeline-column="${columnId}"]`,
      ) as HTMLElement | null;
      const list = col?.querySelector("[data-pipeline-column-list]");
      if (!board || !col || !list) return null;
      const br = board.getBoundingClientRect();
      const lr = list.getBoundingClientRect();
      return {
        x: (col.getBoundingClientRect().left - br.left + col.clientWidth / 2) / scale,
        y: (lr.top - br.top + 36) / scale,
      };
    };

    const tick = (now: number) => {
      if (cancelled) return;
      const elapsed = now - start;
      const loopIndex = Math.floor(elapsed / LOOP_MS);
      const elapsedInLoop = elapsed % LOOP_MS;
      const stepIndex = Math.floor(elapsedInLoop / STEP_MS) % pipelineDragSequence.length;
      const phase = (elapsedInLoop % STEP_MS) / STEP_MS;
      const seq = pipelineDragSequence[stepIndex];
      if (!seq) {
        requestAnimationFrame(tick);
        return;
      }
      const stepKey = loopIndex * 100 + stepIndex;

      if (loopIndex > lastResetLoop && elapsedInLoop < 120) {
        lastResetLoop = loopIndex;
        lastCommittedStep = -1;
        animRef.current = { stepKey: -1, from: null, drop: null, card: null };
        setCards(cloneCards(initialPipelineCards));
        setDraggingCardId(null);
        lastDragging = null;
      }

      if (animRef.current.stepKey !== stepKey) {
        animRef.current.stepKey = stepKey;
        animRef.current.from = measureCard(seq.cardId);
        animRef.current.drop = measureColumnDrop(seq.to);
        animRef.current.card =
          cardsRef.current.find((c) => c.id === seq.cardId) ?? null;
      }

      if (phase < 0.14) {
        const fresh = measureCard(seq.cardId);
        if (fresh) animRef.current.from = fresh;
        animRef.current.drop = measureColumnDrop(seq.to) ?? animRef.current.drop;
        animRef.current.card =
          cardsRef.current.find((c) => c.id === seq.cardId) ?? animRef.current.card;
      }

      const shouldDrag = phase > 0.14 && phase < 0.9 ? seq.cardId : null;
      if (shouldDrag !== lastDragging) {
        lastDragging = shouldDrag;
        setDraggingCardId(shouldDrag);
      }

      if (phase >= 0.9 && lastCommittedStep !== stepKey) {
        lastCommittedStep = stepKey;
        setDraggingCardId(null);
        lastDragging = null;
        setCards((prev) =>
          prev.map((c) =>
            c.id === seq.cardId ? { ...c, columnId: seq.to } : c,
          ),
        );
      }

      const from = animRef.current.from;
      const to = animRef.current.drop;
      const card = animRef.current.card;

      if (from && to && card) {
        const t = phase < 0.14 ? 0 : phase > 0.9 ? 1 : (phase - 0.14) / 0.68;
        const ease = t * t * (3 - 2 * t);
        const cx = from.x + (to.x - from.x) * ease;
        const cy = from.y + (to.y - from.y) * ease;
        const showDrag = phase > 0.14 && phase < 0.9;
        const pointer = boardToViewport(cx, cy);

        if (pointer) {
          setOverlay({
            visible: showDrag,
            cursorX: pointer.x - 2,
            cursorY: pointer.y - 2,
            ghostX: pointer.x - (GHOST_W * scale) / 2,
            ghostY: pointer.y - (GHOST_H * scale) / 2,
            card,
          });
        }
      } else {
        setOverlay((o) =>
          o.visible ? { ...o, visible: false, card: null } : o,
        );
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
            <PipelineReplicaCanvas cards={cards} draggingCardId={draggingCardId} />
          </div>
        </div>
      </div>
      {!reduceMotion && inView && overlayMounted
        ? createPortal(
            <div
              className="pointer-events-none fixed inset-0 z-[9999] overflow-visible"
              aria-hidden
            >
              {overlay.visible && overlay.card ? (
                <div
                  data-pipeline-drag-ghost
                  className="fixed shadow-[0_16px_40px_rgba(15,23,42,0.22)]"
                  style={{
                    left: overlay.ghostX,
                    top: overlay.ghostY,
                    width: GHOST_W,
                    transform: `scale(${scale}) rotate(1.5deg)`,
                    transformOrigin: "top left",
                  }}
                >
                  <PipelineCardView
                    card={overlay.card}
                    className="bg-white ring-2 ring-[#FF5B2E]/35"
                  />
                </div>
              ) : null}
              <svg
                className={cn(
                  "fixed text-[#1c1917] drop-shadow-md",
                  overlay.visible ? "opacity-100" : "opacity-0",
                )}
                width={28 * scale}
                height={28 * scale}
                viewBox="0 0 24 24"
                style={{
                  left: overlay.cursorX,
                  top: overlay.cursorY,
                }}
              >
                <path
                  fill="currentColor"
                  d="M5.5 2.5l12 8.5-5.5.5 3 7.5-2.5 1.5-3-7.5-4.5 1.5z"
                />
              </svg>
            </div>,
            document.body,
          )
        : null}
    </div>
  );
}
