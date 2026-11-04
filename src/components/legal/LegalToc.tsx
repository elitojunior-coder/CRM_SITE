"use client";

import { useEffect, useState } from "react";

export type LegalTocItem = {
  id: string;
  label: string;
};

type LegalTocProps = {
  items: LegalTocItem[];
};

export function LegalToc({ items }: LegalTocProps) {
  const [active, setActive] = useState<string | null>(items[0]?.id ?? null);

  useEffect(() => {
    const sections = items
      .map((item) => document.getElementById(item.id))
      .filter(Boolean) as HTMLElement[];
    if (!sections.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible[0]?.target.id) setActive(visible[0].target.id);
      },
      { rootMargin: "-20% 0px -55% 0px", threshold: [0, 0.25, 0.5, 1] },
    );

    for (const el of sections) observer.observe(el);
    return () => observer.disconnect();
  }, [items]);

  if (!items.length) return null;

  return (
    <aside className="hidden lg:block">
      <nav
        aria-label="Sumário"
        className="sticky top-24 rounded-xl border border-line bg-surface-raised p-4 text-sm"
      >
        <p className="text-xs font-semibold uppercase tracking-[0.1em] text-ink-subtle">
          Nesta página
        </p>
        <ol className="mt-3 space-y-2">
          {items.map((item) => (
            <li key={item.id}>
              <a
                href={`#${item.id}`}
                className={
                  active === item.id
                    ? "font-medium text-accent"
                    : "text-ink-muted hover:text-ink"
                }
              >
                {item.label}
              </a>
            </li>
          ))}
        </ol>
      </nav>
    </aside>
  );
}
