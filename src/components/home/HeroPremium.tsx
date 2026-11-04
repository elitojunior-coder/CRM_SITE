import { brand } from "@/config/brand";
import { HeroBackdrop } from "@/components/home/HeroBackdrop";
import { HeroGrainCanvas } from "@/components/home/HeroGrainCanvas";
import { MagneticButton } from "@/components/home/MagneticButton";
import { ProductStage } from "@/components/home/ProductStage";
import { WhatsAppLink } from "@/components/layout/WhatsAppLink";

export function HeroPremium() {
  const agendarHref = brand.contact.agendamentoUrl.startsWith("[")
    ? "#agendamento"
    : brand.contact.agendamentoUrl;

  return (
    <div className="relative isolate w-full min-w-full overflow-x-clip bg-surface-dark">
      <div className="pointer-events-none absolute inset-0 overflow-x-clip" aria-hidden>
        <HeroBackdrop />
        <HeroGrainCanvas />
      </div>
      <div className="relative z-10 mx-auto flex w-full max-w-[1280px] flex-col items-center px-5 pb-10 pt-2 text-center md:px-8 md:pb-14">
        <p className="mb-5 inline-flex rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.14em] text-ink-muted-on-dark">
          CRM + WhatsApp com IA
        </p>
        <h1 className="max-w-4xl text-balance font-sans text-[2.65rem] font-semibold leading-[1.04] tracking-tight text-[#f5f2eb] md:text-6xl lg:text-[4rem] xl:text-[4.5rem]">
          Quem responde primeiro,{" "}
          <em className="font-display text-[1.05em] font-normal italic text-accent">
            vende.
          </em>
        </h1>
        <p className="mt-6 max-w-2xl text-pretty text-lg leading-relaxed text-ink-muted-on-dark md:text-xl md:leading-relaxed">
          Agentes de IA no WhatsApp e no site que entendem áudio, qualificam, agendam e
          passam para o seu time com tudo resumido.
        </p>
        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <MagneticButton href={agendarHref} className="cta-glow whitespace-nowrap">
            Agendar demo
          </MagneticButton>
          <WhatsAppLink
            id="whatsapp-vendas-hero"
            aria-label="Falar no WhatsApp"
            className="inline-flex size-11 shrink-0 items-center justify-center rounded-md border border-line-on-dark text-ink-on-dark transition-colors hover:bg-white/8 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/50 focus-visible:ring-offset-2 focus-visible:ring-offset-surface-dark"
          >
            <span className="sr-only">Falar no WhatsApp</span>
            <svg className="size-5" viewBox="0 0 256 256" fill="currentColor" aria-hidden>
              <path d="M128 24A104 104 0 0 0 36.18 176.88L24 232l55.47-12.09A104 104 0 1 0 128 24Zm0 192a87.87 87.87 0 0 1-44.06-11.81l-3.15-1.86-32.89 7.16 7-32-1.85-3.18A88 88 0 1 1 128 216Z" />
            </svg>
          </WhatsAppLink>
        </div>
        <ProductStage media={{ type: "replica" }} className="mt-10 md:mt-12" />
      </div>
    </div>
  );
}
