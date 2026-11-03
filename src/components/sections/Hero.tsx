import type { ReactNode } from "react";
import { HeroActions } from "@/components/sections/HeroActions";
import { cn } from "@/lib/cn";

type HeroProps = {
  title: ReactNode;
  lead: string;
  painLine?: string;
  className?: string;
  visual?: ReactNode;
};

export function Hero({ title, lead, painLine, className, visual }: HeroProps) {
  return (
    <div
      className={cn(
        "grid items-center gap-12 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:gap-16",
        className,
      )}
    >
      <div className="max-w-xl lg:max-w-none">
        {painLine ? (
          <p className="mb-4 text-sm font-medium text-accent">{painLine}</p>
        ) : null}
        <h1 className="font-display text-balance text-4xl leading-[1.05] text-ink md:text-5xl lg:text-[3.25rem]">
          {title}
        </h1>
        <p className="mt-6 max-w-lg text-pretty text-lg leading-relaxed text-ink-muted">
          {lead}
        </p>
        <HeroActions />
      </div>
      {visual ? (
        <div className="relative lg:justify-self-end">{visual}</div>
      ) : null}
    </div>
  );
}
