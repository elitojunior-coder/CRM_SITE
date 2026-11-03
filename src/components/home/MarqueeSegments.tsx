import { segmentos } from "@/lib/segmentos";

export function MarqueeSegments() {
  const line = segmentos.map((s) => s.label.toLowerCase()).join(" · ");
  const doubled = `${line} · ${line} · `;

  return (
    <div
      className="overflow-hidden border-y border-line bg-surface-muted py-8"
      aria-hidden
    >
      <div className="flex whitespace-nowrap motion-reduce:justify-center">
        <p className="animate-marquee font-display text-4xl text-ink/90 md:text-6xl lg:text-7xl motion-reduce:animate-none">
          {doubled}
        </p>
        <p
          className="animate-marquee font-display text-4xl text-ink/90 md:text-6xl lg:text-7xl motion-reduce:hidden"
          aria-hidden
        >
          {doubled}
        </p>
      </div>
    </div>
  );
}
