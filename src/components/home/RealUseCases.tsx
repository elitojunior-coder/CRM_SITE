import { HomeTitle } from "@/components/home/HomeTitle";
import { cn } from "@/lib/cn";

const casos = [
  {
    segment: "Barbearia",
    name: "Hairzon",
    problem:
      "Confirmação de horário no WhatsApp dependia de quem estava livre na barbearia.",
    solution:
      "IA confirma serviço, barbeiro e valor; lembrete automático reduz faltas.",
    draft: true,
  },
  {
    segment: "Marina",
    name: "Docka",
    problem:
      "Pedidos de vaga e manutenção de embarcação se perdiam entre números pessoais.",
    solution:
      "Fila única qualifica urgência, tipo de serviço e encaminha com resumo para o time.",
    draft: true,
  },
] as const;

export function RealUseCases() {
  return (
    <div id="em-uso" className="scroll-mt-24">
      <HomeTitle
        as="h2"
        text="Em uso de verdade."
        accentWords={["verdade"]}
        className="text-3xl md:text-5xl"
      />
      <p className="mt-4 max-w-2xl text-lg text-ink-muted">
        Casos reais em revisão editorial — estrutura pronta para publicar com
        autorização do cliente.
      </p>
      <div className="mt-10 grid gap-6 md:grid-cols-2">
        {casos.map((c) => (
          <article
            key={c.name}
            className={cn(
              "card-premium spotlight-card rounded-2xl p-6 text-on-light",
            )}
          >
            <div className="flex flex-wrap items-center gap-2">
              <span className="rounded-full bg-surface-muted px-3 py-1 text-xs font-semibold text-ink">
                {c.segment}
              </span>
              <span className="font-display text-xl text-ink">{c.name}</span>
              {c.draft ? (
                <span className="rounded bg-accent/15 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-accent">
                  [REVISAR]
                </span>
              ) : null}
            </div>
            <p className="mt-4 text-sm font-medium text-ink">Problema</p>
            <p className="mt-1 text-base leading-relaxed text-ink-muted">
              {c.problem}
            </p>
            <p className="mt-4 text-sm font-medium text-ink">Como resolve</p>
            <p className="mt-1 text-base leading-relaxed text-ink-muted">
              {c.solution}
            </p>
          </article>
        ))}
      </div>
    </div>
  );
}
