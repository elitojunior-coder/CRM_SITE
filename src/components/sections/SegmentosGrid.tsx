import Link from "next/link";
import { ArrowUpRight } from "@phosphor-icons/react/dist/ssr";

const segmentos = [
  {
    slug: "barbearias-e-saloes",
    title: "Barbearias e salões",
    pain: "Horário lotado e mensagem sem resposta vira cliente na concorrência.",
  },
  {
    slug: "clinicas-e-consultorios",
    title: "Clínicas e consultórios",
    pain: "Paciente manda áudio pedindo horário — recepção nem sempre vê a tempo.",
  },
  {
    slug: "energia-solar",
    title: "Energia solar",
    pain: "Lead quente esfria quando o orçamento demora mais que alguns minutos.",
  },
  {
    slug: "imobiliarias",
    title: "Imobiliárias",
    pain: "Interesse no imóvel some se ninguém confirma visita no mesmo dia.",
  },
  {
    slug: "servicos-e-assistencia-tecnica",
    title: "Serviços e assistência técnica",
    pain: "Chamado urgente no WhatsApp não pode ficar na fila até alguém liberar.",
  },
  {
    slug: "lojas-e-varejo",
    title: "Lojas e varejo",
    pain: "Pergunta sobre estoque, entrega ou troca precisa de resposta objetiva, não de silêncio.",
  },
];

export function SegmentosGrid() {
  return (
    <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {segmentos.map((item, index) => (
        <li
          key={item.slug}
          className={index === 0 ? "sm:col-span-2 lg:col-span-1" : undefined}
        >
          <Link
            href={`/segmentos/${item.slug}`}
            className="group flex h-full flex-col justify-between rounded-xl border border-line bg-surface-raised p-5 transition-colors hover:border-accent/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/40 focus-visible:ring-offset-2 focus-visible:ring-offset-surface"
          >
            <div>
              <h3 className="font-display text-xl text-ink">{item.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-ink-muted">
                {item.pain}
              </p>
            </div>
            <span className="mt-6 inline-flex items-center gap-1 text-sm font-medium text-accent">
              Ver como funciona
              <ArrowUpRight
                size={16}
                weight="regular"
                className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 motion-reduce:transform-none"
                aria-hidden
              />
            </span>
          </Link>
        </li>
      ))}
    </ul>
  );
}
