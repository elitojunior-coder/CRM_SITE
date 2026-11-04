import type { ReactNode } from "react";
import Link from "next/link";

type LegalSectionProps = {
  id: string;
  title: string;
  children: ReactNode;
};

export function LegalSection({ id, title, children }: LegalSectionProps) {
  return (
    <section id={id} className="scroll-mt-24 border-t border-line/80 pt-10 first:border-t-0 first:pt-0">
      <h2 className="group font-display text-2xl text-ink md:text-3xl">
        <Link
          href={`#${id}`}
          className="inline-flex items-baseline gap-2 no-underline hover:text-accent"
        >
          <span>{title}</span>
          <span
            className="text-base font-sans font-normal text-ink-subtle opacity-0 group-hover:opacity-100"
            aria-hidden
          >
            #
          </span>
        </Link>
      </h2>
      <div className="mt-4 space-y-4 text-ink-muted">{children}</div>
    </section>
  );
}
