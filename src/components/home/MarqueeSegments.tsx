import { Marquee } from "@/components/ui/marquee";
import { segmentos } from "@/lib/segmentos";

export function MarqueeSegments() {
  const labels = segmentos.map((s) => s.label.toLowerCase());

  return (
    <div
      className="overflow-hidden border-y border-line bg-surface-muted py-8"
      aria-hidden
    >
      <Marquee pauseOnHover className="[--duration:45s] [--gap:2.5rem]">
        {labels.map((label) => (
          <span
            key={label}
            className="font-display text-4xl text-ink/90 md:text-6xl lg:text-7xl"
          >
            {label}
          </span>
        ))}
      </Marquee>
    </div>
  );
}
