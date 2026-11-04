import { brand } from "@/config/brand";
import { brandField } from "@/lib/brand-display";
import { TextLink } from "@/components/ui/TextLink";

const items = [
  "Dados isolados por conta",
  "Criptografia em trânsito",
  "Trilha quando o suporte acessa",
  "Encarregado de dados nomeado",
];

export function SecurityStrip() {
  return (
    <div className="grid gap-8 md:grid-cols-[1fr_1.2fr] md:items-center">
      <div>
        <h2 className="font-display text-3xl text-ink-on-dark md:text-4xl">
          Segurança e LGPD
        </h2>
        <p className="mt-3 text-ink-muted-on-dark">
          Ambiente multi-cliente, políticas publicadas
          {brandField(brand.lgpd.encarregadoNome)
            ? ` e canal com ${brandField(brand.lgpd.encarregadoNome)}.`
            : " e canal com o encarregado de dados."}
        </p>
        <TextLink
          href="/seguranca"
          className="mt-4 inline-block text-ink-on-dark underline decoration-accent underline-offset-4 hover:text-white"
        >
          Ver página de segurança
        </TextLink>
      </div>
      <ul className="grid gap-3 sm:grid-cols-2">
        {items.map((item) => (
          <li
            key={item}
            className="rounded-lg border border-line-on-dark bg-white/5 px-4 py-3 text-sm text-ink-on-dark"
          >
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}
