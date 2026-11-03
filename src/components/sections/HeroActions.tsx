"use client";

import { brand } from "@/config/brand";
import { Button } from "@/components/ui/Button";
import { WhatsAppLink } from "@/components/layout/WhatsAppLink";

export function HeroActions() {
  const agendarHref = brand.contact.agendamentoUrl.startsWith("[")
    ? "#demonstracao"
    : brand.contact.agendamentoUrl;

  return (
    <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
      <Button href={agendarHref}>Agendar demonstração</Button>
      <WhatsAppLink
        id="whatsapp-vendas"
        className="inline-flex items-center justify-center gap-2 rounded-md border border-line bg-surface-raised px-5 py-2.5 text-sm font-medium text-ink transition-colors hover:border-ink-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/40 focus-visible:ring-offset-2 focus-visible:ring-offset-surface"
      >
        Falar no WhatsApp
      </WhatsAppLink>
    </div>
  );
}
