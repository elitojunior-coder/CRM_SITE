import { CtaFinalActions } from "@/components/sections/CtaFinalActions";

type CtaFinalProps = {
  title: string;
  description: string;
};

export function CtaFinal({ title, description }: CtaFinalProps) {
  return (
    <div className="rounded-2xl border border-line bg-surface-raised px-6 py-10 md:px-10 md:py-14">
      <div className="grid gap-8 md:grid-cols-[1fr_auto] md:items-center">
        <div className="max-w-xl">
          <h2 className="font-display text-3xl text-ink md:text-4xl">{title}</h2>
          <p className="mt-3 text-pretty text-lg text-ink-muted">{description}</p>
        </div>
        <CtaFinalActions />
      </div>
    </div>
  );
}
