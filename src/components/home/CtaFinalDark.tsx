import { brand } from "@/config/brand";
import { MagneticButton } from "@/components/home/MagneticButton";
import Link from "next/link";

export function CtaFinalDark() {
  const agendarHref = brand.contact.agendamentoUrl.startsWith("[")
    ? "#demonstracao"
    : brand.contact.agendamentoUrl;

  return (
    <div className="relative overflow-hidden text-center">
      <div
        className="pointer-events-none absolute left-1/2 top-1/2 -z-0 h-72 w-72 -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent/30 blur-[100px]"
        aria-hidden
      />
      <h2 className="relative font-display text-4xl italic leading-tight text-ink-on-dark md:text-6xl lg:text-7xl">
        Mostre seu WhatsApp. A gente simula ao vivo.
      </h2>
      <p className="relative mx-auto mt-6 max-w-xl text-lg text-ink-muted-on-dark">
        Agende uma demonstração ou fale com vendas. Levamos exemplos do seu
        segmento — sem slide genérico.
      </p>
      <div className="relative mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
        <MagneticButton href={agendarHref}>Agendar demonstração</MagneticButton>
        <Link
          href="#antes-depois"
          className="inline-flex items-center justify-center rounded-md border border-line-on-dark px-6 py-3 text-sm font-semibold text-ink-on-dark transition-colors hover:bg-white/5"
        >
          Ver funcionando
        </Link>
      </div>
    </div>
  );
}
