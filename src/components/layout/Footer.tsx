import Link from "next/link";
import { CurrentYear } from "@/components/layout/CurrentYear";
import { brand } from "@/config/brand";
import { TextLink } from "@/components/ui/TextLink";

const legalLinks = [
  { href: "/privacidade", label: "Privacidade" },
  { href: "/termos", label: "Termos de uso" },
  { href: "/cookies", label: "Cookies" },
  { href: "/lgpd", label: "Canal LGPD" },
  { href: "/suboperadores", label: "Suboperadores" },
];

export function Footer() {
  return (
    <footer className="mt-auto border-t border-line bg-surface-muted">
      <div className="mx-auto grid max-w-6xl gap-10 px-5 py-14 md:grid-cols-[1.2fr_1fr_1fr] md:px-8">
        <div>
          <p className="font-display text-xl text-ink">{brand.product.name}</p>
          <p className="mt-2 max-w-sm text-sm leading-relaxed text-ink-muted">
            {brand.product.slogan}
          </p>
          <p className="mt-6 text-xs leading-relaxed text-ink-muted">
            {brand.company.razaoSocial}
            <br />
            CNPJ {brand.company.cnpj}
            <br />
            {brand.company.endereco} · {brand.company.cidade}
          </p>
        </div>

        <div>
          <h2 className="text-sm font-semibold text-ink">Contato</h2>
          <ul className="mt-3 space-y-2 text-sm text-ink-muted">
            <li>
              Vendas:{" "}
              <a
                className="text-ink underline underline-offset-4 hover:text-accent"
                href={`mailto:${brand.contact.emailComercial}`}
              >
                {brand.contact.emailComercial}
              </a>
            </li>
            <li>
              Suporte:{" "}
              <a
                className="text-ink underline underline-offset-4 hover:text-accent"
                href={`mailto:${brand.contact.emailSuporte}`}
              >
                {brand.contact.emailSuporte}
              </a>
            </li>
            <li>Telefone: {brand.contact.telefone}</li>
            <li>
              Encarregado de dados: {brand.lgpd.encarregadoNome} ·{" "}
              <a
                className="text-ink underline underline-offset-4 hover:text-accent"
                href={`mailto:${brand.lgpd.encarregadoEmail}`}
              >
                {brand.lgpd.encarregadoEmail}
              </a>
            </li>
          </ul>
        </div>

        <div>
          <h2 className="text-sm font-semibold text-ink">Legal</h2>
          <ul className="mt-3 space-y-2">
            {legalLinks.map((link) => (
              <li key={link.href}>
                <TextLink href={link.href} className="text-sm text-ink-muted">
                  {link.label}
                </TextLink>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="border-t border-line/80">
        <div className="mx-auto flex max-w-6xl flex-col gap-2 px-5 py-5 text-xs text-ink-muted md:flex-row md:items-center md:justify-between md:px-8">
          <p>
            © <CurrentYear /> {brand.company.razaoSocial}. Todos os direitos reservados.
          </p>
          <p>
            Dados tratados conforme a LGPD ·{" "}
            <Link href="/seguranca" className="underline-offset-4 hover:underline">
              Segurança
            </Link>
          </p>
        </div>
      </div>
    </footer>
  );
}
