import Link from "next/link";
import { CurrentYear } from "@/components/layout/CurrentYear";
import { BrandMark } from "@/components/brand/BrandMark";
import { brand } from "@/config/brand";
import { brandField, productNameOrNull, productSloganDisplay } from "@/lib/brand-display";
import { TextLink } from "@/components/ui/TextLink";

const legalLinks = [
  { href: "/privacidade", label: "Privacidade" },
  { href: "/termos", label: "Termos de uso" },
  { href: "/cookies", label: "Cookies" },
  { href: "/lgpd", label: "Canal LGPD" },
  { href: "/exclusao-de-dados", label: "Exclusão de dados" },
  { href: "/suboperadores", label: "Suboperadores" },
  { href: "/seguranca", label: "Segurança" },
];

export function Footer() {
  const razaoSocial = brandField(brand.company.razaoSocial);
  const cnpj = brandField(brand.company.cnpj);
  const enderecoLinha = [brandField(brand.company.endereco), brandField(brand.company.cidade)]
    .filter(Boolean)
    .join(" · ");
  const encarregadoNome = brandField(brand.lgpd.encarregadoNome);
  const encarregadoEmail = brandField(brand.lgpd.encarregadoEmail);

  return (
    <footer className="mt-auto border-t border-line bg-surface-muted">
      <div className="mx-auto grid max-w-6xl gap-10 px-5 py-14 md:grid-cols-[1.2fr_1fr_1fr] md:px-8">
        <div>
          <div className="flex items-center gap-3">
            <BrandMark size="md" />
            {productNameOrNull() ? (
              <p className="font-display text-xl text-ink">{productNameOrNull()}</p>
            ) : null}
          </div>
          <p className="mt-2 max-w-sm text-sm leading-relaxed text-ink-muted">
            {productSloganDisplay()}
          </p>
          {razaoSocial || cnpj || enderecoLinha ? (
            <p className="mt-6 text-xs leading-relaxed text-ink-muted">
              {razaoSocial ? (
                <>
                  {razaoSocial}
                  {cnpj || enderecoLinha ? <br /> : null}
                </>
              ) : null}
              {cnpj ? (
                <>
                  CNPJ {cnpj}
                  {enderecoLinha ? <br /> : null}
                </>
              ) : null}
              {enderecoLinha ? enderecoLinha : null}
            </p>
          ) : null}
        </div>

        <div>
          <h2 className="text-sm font-semibold text-ink">Contato</h2>
          <ul className="mt-3 space-y-2 text-sm text-ink-muted">
            {brandField(brand.contact.emailComercial) ? (
              <li>
                Vendas:{" "}
                <a
                  className="text-ink underline underline-offset-4 hover:text-accent"
                  href={`mailto:${brandField(brand.contact.emailComercial)}`}
                >
                  {brandField(brand.contact.emailComercial)}
                </a>
              </li>
            ) : null}
            {brandField(brand.contact.emailSuporte) ? (
              <li>
                Suporte:{" "}
                <a
                  className="text-ink underline underline-offset-4 hover:text-accent"
                  href={`mailto:${brandField(brand.contact.emailSuporte)}`}
                >
                  {brandField(brand.contact.emailSuporte)}
                </a>
              </li>
            ) : null}
            {brandField(brand.contact.telefone) ? (
              <li>Telefone: {brandField(brand.contact.telefone)}</li>
            ) : null}
            {encarregadoNome || encarregadoEmail ? (
              <li>
                Encarregado de dados: {encarregadoNome}
                {encarregadoEmail ? (
                  <>
                    {encarregadoNome ? " · " : ""}
                    <a
                      className="text-ink underline underline-offset-4 hover:text-accent"
                      href={`mailto:${encarregadoEmail}`}
                    >
                      {encarregadoEmail}
                    </a>
                  </>
                ) : null}
              </li>
            ) : null}
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
            © <CurrentYear /> {razaoSocial || "4Traders"}. Todos os direitos reservados.
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
