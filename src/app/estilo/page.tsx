import { FunnelCard } from "@/components/product/FunnelCard";
import { SellerSummary } from "@/components/product/SellerSummary";
import { WhatsAppConversationCompact } from "@/components/product/WhatsAppConversation";
import { SiteShell } from "@/components/layout/SiteShell";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import { TextLink } from "@/components/ui/TextLink";
import { brand } from "@/config/brand";

function TypeColumn({
  title,
  themeClass,
  accentClass,
  accentLabel,
}: {
  title: string;
  themeClass: string;
  accentClass: string;
  accentLabel: string;
}) {
  return (
    <div
      className={`${themeClass} ${accentClass} rounded-2xl border border-line bg-surface-raised p-6 md:p-8`}
    >
      <p className="text-xs font-semibold tracking-[0.14em] text-accent uppercase">
        {accentLabel}
      </p>
      <h2 className="mt-2 font-display text-3xl text-ink">{title}</h2>
      <p className="mt-4 max-w-prose text-sm leading-relaxed text-ink-muted">
        Texto corrido em{" "}
        <span className="font-medium text-ink">corpo sans</span> — confortável
        para parágrafos longos, FAQs e políticas. Links{" "}
        <TextLink href="#exemplo">com sublinhado animado</TextLink>.
      </p>

      <div className="mt-8 space-y-2 border-t border-line pt-6">
        <p className="text-xs text-ink-subtle uppercase">Escala</p>
        <p className="font-display text-4xl text-ink">Display 36</p>
        <p className="font-display text-2xl text-ink">Título 24</p>
        <p className="text-base text-ink-muted">Corpo 16</p>
        <p className="text-sm text-ink-muted">Auxiliar 14</p>
        <p className="font-mono text-sm tabular-nums text-ink-muted">
          0123456789 · tabular
        </p>
      </div>

      <div className="mt-8 flex flex-wrap gap-2">
        <Button>Primário</Button>
        <Button variant="secondary">Secundário</Button>
        <Badge tone="accent">Badge</Badge>
      </div>

      <div className="mt-6 max-w-xs">
        <Input label="Campo exemplo" placeholder="Nome da empresa" hint="Texto de ajuda" />
      </div>

      <div className="mt-8 grid gap-4">
        <Card>
          <p className="text-sm font-medium text-ink">Card base</p>
          <p className="mt-1 text-sm text-ink-muted">
            Borda discreta, sombra leve, cantos md.
          </p>
        </Card>
        <WhatsAppConversationCompact />
        <div className="grid gap-4 sm:grid-cols-2">
          <FunnelCard />
          <SellerSummary />
        </div>
      </div>
    </div>
  );
}

export default function EstiloPage() {
  return (
    <SiteShell showFloat={false}>
      <div className="mx-auto max-w-6xl px-5 py-12 md:px-8 md:py-16">
          <header className="mb-12 max-w-2xl">
            <p className="text-xs font-semibold tracking-[0.14em] text-accent uppercase">
              Interno · noindex
            </p>
            <h1 className="mt-2 font-display text-4xl text-ink">
              Aprovação visual — {brand.product.name}
            </h1>
            <p className="mt-4 text-lg text-ink-muted">
              Duas combinações tipográficas e duas cores de acento sobre base
              neutra quente. Cabeçalho e rodapé abaixo refletem o site publicado.
            </p>
          </header>

          <div className="grid gap-8 lg:grid-cols-2">
            <TypeColumn
              title="Instrument Serif + Geist"
              themeClass="theme-display-a"
              accentClass="theme-accent-primary"
              accentLabel={`Acento terracota ${brand.accent.primary}`}
            />
            <TypeColumn
              title="Bricolage Grotesque + Manrope"
              themeClass="theme-display-b"
              accentClass="theme-accent-secondary"
              accentLabel={`Acento petróleo ${brand.accent.secondary}`}
            />
          </div>
      </div>
    </SiteShell>
  );
}
