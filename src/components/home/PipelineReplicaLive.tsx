"use client";

import { useReducedMotion } from "motion/react";
import { useCallback, useEffect, useRef, useState, type ReactNode } from "react";
import { pipelineDragSequence } from "../../../content/demo/pipeline";
import { PIPELINE_CANVAS_SIZE } from "@/components/home/PipelineReplicaCanvas";
import { cn } from "@/lib/cn";

const LOOP_MS = 12000;
const STEP_MS = 3000;

type Props = {
  children: ReactNode;
};

export function PipelineReplicaLive({ children }: Props) {
  const reduceMotion = useReducedMotion();
  const rootRef = useRef<HTMLDivElement>(null);
  const viewportRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);
  const [inView, setInView] = useState(true);
  const [cursor, setCursor] = useState<{ x: number; y: number; visible: boolean }>({
    x: 0,
    y: 0,
    visible: false,
  });
  const [dragGhost, setDragGhost] = useState<{
    visible: boolean;
    x: number;
    y: number;
    label: string;
  }>({ visible: false, x: 0, y: 0, label: "" });

  const updateScale = useCallback(() => {
    const el = viewportRef.current;
    if (!el) return;
    const w = el.clientWidth;
    const h = el.clientHeight;
    setScale(
      Math.min(w / PIPELINE_CANVAS_SIZE.width, h / PIPELINE_CANVAS_SIZE.height),
    );
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
    let stepIndex = 0;
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
        label: card.querySelector("p")?.textContent?.trim() ?? "",
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
      const elapsed = (now - start) % LOOP_MS;
      const nextStep = Math.floor(elapsed / STEP_MS) % pipelineDragSequence.length;
      stepIndex = nextStep;

      const seq = pipelineDragSequence[stepIndex];
      const from = measureCard(seq.cardId);
      const to = measureColumnCenter(seq.to);
      const phase = (elapsed % STEP_MS) / STEP_MS;

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
          label: from.label,
        });
      } else {
        setCursor((c) => ({ ...c, visible: false }));
        setDragGhost((g) => ({ ...g, visible: false }));
      }

      requestAnimationFrame(tick);
    };

    const id = requestAnimationFrame(tick);
    return () => {
      cancelled = true;
      cancelAnimationFrame(id);
    };
  }, [reduceMotion, inView, scale]);

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
          <div className="pipeline-mobile-clip overflow-hidden">{children}</div>
          {!reduceMotion && inView ? (
            <>
              {dragGhost.visible ? (
                <div
                  className="absolute z-20 w-[200px] rounded-lg border border-[#e8e4dc] bg-white/95 p-2 shadow-lg"
                  style={{ left: dragGhost.x, top: dragGhost.y }}
                >
                  <p className="truncate text-[12px] font-semibold text-[#1c1917]">
                    {dragGhost.label}
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
