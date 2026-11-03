import { SiteShell } from "@/components/layout/SiteShell";
import { HeroPhoneLoop } from "@/components/home/HeroPhoneLoop";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import { TextLink } from "@/components/ui/TextLink";
import { brand } from "@/config/brand";
import { MagneticButton } from "@/components/home/MagneticButton";

const swatches = [
  { name: "Quase preto (hero / CTA)", token: brand.surfaces.dark },
  { name: "Off-white quente", token: "#F5F2EB" },
  { name: "Petróleo profundo", token: brand.surfaces.petroleum },
  { name: "Laranja-brasa (acento)", token: brand.accent.primary },
];

export default function EstiloPage() {
  return (
    <SiteShell showFloat={false}>
      <div className="mx-auto max-w-6xl px-5 py-12 md:px-8 md:py-16">
        <header className="mb-12 max-w-2xl">
          <p className="text-xs font-semibold tracking-[0.14em] text-accent uppercase">
            Interno · noindex
          </p>
          <h1 className="mt-2 font-display text-4xl text-ink md:text-5xl">
            Sistema visual — {brand.product.name}
          </h1>
          <p className="mt-4 text-lg text-ink-muted">
            Instrument Serif nos títulos (itálico para ênfase), Geist no corpo.
            Ritmo escuro/claro, acento laranja só em CTA e estados ativos.
          </p>
        </header>

        <section className="mb-16">
          <h2 className="font-display text-2xl text-ink">Paleta</h2>
          <ul className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {swatches.map((s) => (
              <li
                key={s.token}
                className="overflow-hidden rounded-xl border border-line"
              >
                <div
                  className="h-24"
                  style={{ backgroundColor: s.token }}
                  aria-hidden
                />
                <div className="bg-surface-raised p-3 text-sm">
                  <p className="font-medium text-ink">{s.name}</p>
                  <p className="font-mono text-xs text-ink-muted">{s.token}</p>
                </div>
              </li>
            ))}
          </ul>
        </section>

        <section className="mb-16">
          <h2 className="font-display text-2xl text-ink">Tipografia</h2>
          <div className="mt-6 space-y-4 rounded-2xl border border-line bg-surface-raised p-8">
            <p className="font-display text-5xl leading-none text-ink md:text-7xl">
              Quem responde primeiro,{" "}
              <em className="italic text-accent">vende.</em>
            </p>
            <p className="max-w-prose text-lg text-ink-muted">
              Corpo Geist — parágrafos, FAQs e interface.{" "}
              <TextLink href="#exemplo">Link com sublinhado</TextLink>.
            </p>
            <p className="font-mono text-sm tabular-nums text-ink-muted">
              R$ 12.400 · 4 segundos · 88–120px hero desktop
            </p>
          </div>
        </section>

        <section className="mb-16">
          <h2 className="font-display text-2xl text-ink">Componentes</h2>
          <div className="mt-6 flex flex-wrap gap-3">
            <Button>Primário</Button>
            <Button variant="secondary">Secundário</Button>
            <MagneticButton href="#exemplo">Magnético (CTA)</MagneticButton>
            <Badge tone="accent">Estado ativo</Badge>
          </div>
          <div className="mt-6 max-w-sm">
            <Input label="Campo" placeholder="Sua empresa" hint="Geist 14px" />
          </div>
          <div className="mt-6 grid gap-4 lg:grid-cols-2">
            <Card className="card-dark-glow bg-surface-dark text-ink-on-dark">
              <p className="text-sm font-medium">Card escuro</p>
              <p className="mt-1 text-sm text-ink-muted-on-dark">
                Borda luminosa 1px + granulado em seções dark.
              </p>
            </Card>
            <Card className="spotlight-card">
              <p className="text-sm font-medium text-ink">Spotlight no hover</p>
              <p className="mt-1 text-sm text-ink-muted">
                Usado no bento de funcionalidades.
              </p>
            </Card>
          </div>
        </section>

        <section className="grain-overlay overflow-hidden rounded-2xl bg-surface-dark p-8 text-ink-on-dark">
          <h2 className="font-display text-3xl italic text-ink-on-dark">
            Bloco hero / CTA
          </h2>
          <p className="mt-4 max-w-lg text-ink-muted-on-dark">
            Fundo #0B0D0E, granulado, brilho suave atrás do produto. Shader
            WebGL opcional com fallback CSS.
          </p>
          <div className="mt-8">
            <HeroPhoneLoop />
          </div>
        </section>
      </div>
    </SiteShell>
  );
}
