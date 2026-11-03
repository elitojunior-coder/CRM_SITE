import { brand } from "@/config/brand";
import { HeroGrainCanvas } from "@/components/home/HeroGrainCanvas";
import { HeroPhoneLoop } from "@/components/home/HeroPhoneLoop";
import { MagneticButton } from "@/components/home/MagneticButton";
import Link from "next/link";

export function HeroPremium() {
  const agendarHref = brand.contact.agendamentoUrl.startsWith("[")
    ? "#demonstracao"
    : brand.contact.agendamentoUrl;

  return (
    <div className="relative overflow-hidden">
      <HeroGrainCanvas />
      <div className="grid items-center gap-14 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:gap-12">
        <div className="max-w-xl lg:max-w-none">
          <h1 className="font-display text-balance text-[2.75rem] leading-[1.02] text-ink-on-dark md:text-6xl lg:text-[5.5rem] xl:text-[7.5rem]">
            Quem responde primeiro,{" "}
            <em className="italic text-accent">vende.</em>
          </h1>
          <p className="mt-6 max-w-lg text-pretty text-lg leading-relaxed text-ink-muted-on-dark md:text-xl">
            Agentes de IA que atendem no seu WhatsApp e no seu site em segundos:
            entendem áudio, qualificam, agendam e passam para o seu time com tudo
            resumido.
          </p>
          <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center">
            <MagneticButton href={agendarHref}>
              Agendar demonstração
            </MagneticButton>
            <Link
              href="#antes-depois"
              className="inline-flex items-center justify-center rounded-md border border-line-on-dark px-6 py-3 text-sm font-semibold text-ink-on-dark transition-colors hover:bg-white/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/50 focus-visible:ring-offset-2 focus-visible:ring-offset-surface-dark"
            >
              Ver funcionando
            </Link>
          </div>
        </div>
        <HeroPhoneLoop className="lg:justify-self-end" />
      </div>
    </div>
  );
}
