import type { ReactNode } from "react";
import { LegalDraftBanner } from "@/components/legal/LegalDraftBanner";
import { LegalToc, type LegalTocItem } from "@/components/legal/LegalToc";
import { legalCompany } from "@/lib/legal/company";

type LegalDocumentProps = {
  title: string;
  intro?: ReactNode;
  toc: LegalTocItem[];
  children: ReactNode;
};

export function LegalDocument({ title, intro, toc, children }: LegalDocumentProps) {
  return (
    <>
      <LegalDraftBanner />
      <div className="mx-auto max-w-6xl px-5 py-10 md:px-8 md:py-14">
        <div className="lg:grid lg:grid-cols-[minmax(0,1fr)_220px] lg:gap-14">
          <article className="legal-prose min-w-0">
            <header className="mb-10 border-b border-line pb-8">
              <p className="text-xs font-semibold uppercase tracking-[0.12em] text-ink-subtle">
                Vigência: {legalCompany.dataVigencia}
              </p>
              <h1 className="mt-2 font-display text-4xl text-ink md:text-5xl">{title}</h1>
              {intro ? <div className="mt-4 text-lg text-ink-muted">{intro}</div> : null}
            </header>
            {children}
          </article>
          <LegalToc items={toc} />
        </div>
      </div>
    </>
  );
}
