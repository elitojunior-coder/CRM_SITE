import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

type FeatureSplitProps = {
  title: string;
  answer: string;
  body: string;
  visual: ReactNode;
  reverse?: boolean;
  id?: string;
};

export function FeatureSplit({
  title,
  answer,
  body,
  visual,
  reverse,
  id,
}: FeatureSplitProps) {
  return (
    <article
      id={id}
      className={cn(
        "grid items-center gap-10 border-t border-line pt-14 md:grid-cols-2 md:gap-14 md:pt-20",
        reverse && "md:[&>*:first-child]:order-2",
      )}
    >
      <div>
        <p className="text-sm font-medium text-ink-muted">{answer}</p>
        <h3 className="mt-2 font-display text-2xl text-ink md:text-3xl">{title}</h3>
        <p className="mt-4 text-pretty leading-relaxed text-ink-muted">{body}</p>
      </div>
      <div className="md:justify-self-end">{visual}</div>
    </article>
  );
}
