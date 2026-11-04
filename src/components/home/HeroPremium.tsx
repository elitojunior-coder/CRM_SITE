import { brand } from "@/config/brand";
import { HeroBackdrop } from "@/components/home/HeroBackdrop";
import { HeroGrainCanvas } from "@/components/home/HeroGrainCanvas";
import { HeroPhoneLazy } from "@/components/home/HeroPhoneLazy";
import { HeroSubtitleRotate } from "@/components/home/HeroSubtitleRotate";
import { MagneticButton } from "@/components/home/MagneticButton";
import Link from "next/link";

export function HeroPremium() {
  const agendarHref = brand.contact.agendamentoUrl.startsWith("[")
    ? "#demonstracao"
    : brand.contact.agendamentoUrl;

  return (
    <div className="relative isolate w-full overflow-x-clip">
      <div className="pointer-events-none absolute inset-0 overflow-x-clip" aria-hidden>
        <HeroBackdrop />
        <HeroGrainCanvas />
      </div>
      <div className="relative z-10 mx-auto grid w-full max-w-[1280px] items-center gap-8 px-5 md:px-8 min-[768px]:max-[1099px]:justify-items-center min-[1100px]:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] min-[1100px]:gap-8 min-[1100px]:items-start">
        <div className="max-w-xl min-[768px]:max-[1099px]:text-center min-[1100px]:max-w-none min-[1100px]:text-left">
          <h1 className="text-balance font-sans text-[2.65rem] font-semibold leading-[1.04] tracking-tight text-[#f5f2eb] md:text-6xl lg:text-[4rem] xl:text-[4.5rem]">
            Quem responde primeiro,{" "}
            <em className="font-display text-[1.05em] font-normal italic text-accent">
              vende.
            </em>
          </h1>
          <HeroSubtitleRotate />
          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center min-[768px]:max-[1099px]:justify-center">
            <MagneticButton href={agendarHref} className="cta-glow">
              Agendar demonstração
            </MagneticButton>
            <Link
              href="#antes-depois"
              className="inline-flex items-center justify-center rounded-md border border-line-on-dark px-6 py-3 text-sm font-semibold text-ink-on-dark transition-colors hover:bg-white/8 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/50 focus-visible:ring-offset-2 focus-visible:ring-offset-surface-dark"
            >
              Ver funcionando
            </Link>
          </div>
        </div>
        <HeroPhoneLazy className="w-full min-[768px]:max-[1099px]:max-w-[400px] min-[1100px]:justify-self-end" />
      </div>
    </div>
  );
}
