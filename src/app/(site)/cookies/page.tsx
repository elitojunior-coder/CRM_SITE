import type { Metadata } from "next";
import Link from "next/link";
import { siteCookies, siteScripts } from "../../../../content/legal/cookies-inventory";
import { LegalDocument } from "@/components/legal/LegalDocument";
import { LegalSection } from "@/components/legal/LegalSection";
import { legalPageMetadata } from "@/lib/legal/metadata";
import { legalCompany } from "@/lib/legal/company";

const toc = [
  { id: "o-que-sao", label: "O que são cookies" },
  { id: "como-usamos", label: "Como usamos hoje" },
  { id: "lista", label: "Lista técnica" },
  { id: "gerenciar", label: "Como gerenciar" },
  { id: "contato", label: "Contato" },
] as const;

export const metadata: Metadata = legalPageMetadata(
  "Política de cookies",
  "/cookies",
  "Cookies e scripts usados no site institucional da 4Traders.",
);

export default function CookiesPage() {
  const onlyEssential =
    siteCookies.length === 0 ||
    siteCookies.every((c) => c.tipo === "essencial");
  const hasNonEssentialScripts = siteScripts.some((s) => s.requerConsentimento);

  return (
    <LegalDocument
      title="Política de cookies"
      intro={
        <p>
          Esta página descreve cookies e scripts carregados no <strong className="text-ink">site
          institucional</strong> (não substitui avisos dentro do aplicativo logado).
        </p>
      }
      toc={[...toc]}
    >
      <LegalSection id="o-que-sao" title="O que são cookies">
        <p>
          Cookies são pequenos arquivos gravados no navegador. Servem para lembrar preferências,
          manter sessões seguras ou medir audiência, conforme o tipo.
        </p>
      </LegalSection>

      <LegalSection id="como-usamos" title="Como usamos hoje">
        {onlyEssential && !hasNonEssentialScripts ? (
          <p>
            Na inspeção do site publicado, <strong className="text-ink">não identificamos cookies
            de analytics, marketing ou pixels de terceiros</strong>. O site não exibe banner de
            consentimento porque, neste momento, só utilizamos recursos estritamente necessários à
            navegação (por exemplo, entrega de páginas pelo provedor de hospedagem) ou não persistimos
            cookies opcionais no seu dispositivo.
          </p>
        ) : (
          <p>
            Utilizamos cookies essenciais e, com seu consentimento, cookies ou scripts analíticos.
            Você pode aceitar ou recusar categorias não essenciais pelo banner exibido na primeira
            visita.
          </p>
        )}
        <p>
          Para o tratamento de dados pessoais em geral, consulte a{" "}
          <Link href="/privacidade" className="text-ink underline underline-offset-4">
            política de privacidade
          </Link>
          .
        </p>
      </LegalSection>

      <LegalSection id="lista" title="Lista técnica">
        {siteCookies.length === 0 && siteScripts.length === 0 ? (
          <p className="rounded-xl border border-line bg-surface-muted/50 p-4 text-sm">
            Nenhum cookie ou script de terceiros foi catalogado na última inspeção automatizada.
            Fontes self-hosted (fontes tipográficas via Next.js) não definem cookies de rastreamento
            próprios.
          </p>
        ) : (
          <>
            {siteCookies.length > 0 ? (
              <div className="overflow-x-auto rounded-xl border border-line">
                <table className="w-full min-w-[520px] text-left text-sm">
                  <thead className="bg-surface-muted text-xs font-semibold uppercase text-ink-subtle">
                    <tr>
                      <th className="px-4 py-3">Nome</th>
                      <th className="px-4 py-3">Tipo</th>
                      <th className="px-4 py-3">Finalidade</th>
                      <th className="px-4 py-3">Duração</th>
                      <th className="px-4 py-3">Origem</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-line bg-surface-raised">
                    {siteCookies.map((c) => (
                      <tr key={c.nome}>
                        <td className="px-4 py-3 font-medium text-ink">{c.nome}</td>
                        <td className="px-4 py-3">{c.tipo}</td>
                        <td className="px-4 py-3">{c.finalidade}</td>
                        <td className="px-4 py-3">{c.duracao}</td>
                        <td className="px-4 py-3">{c.origem}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : null}
            {siteScripts.length > 0 ? (
              <ul className="mt-4 list-disc space-y-2 pl-5">
                {siteScripts.map((s) => (
                  <li key={s.origem}>
                    <strong className="text-ink">{s.origem}</strong> — {s.finalidade}
                    {s.requerConsentimento ? " (requer consentimento)" : ""}
                  </li>
                ))}
              </ul>
            ) : null}
          </>
        )}
      </LegalSection>

      <LegalSection id="gerenciar" title="Como gerenciar">
        <p>
          Você pode bloquear ou apagar cookies nas configurações do navegador. Isso pode afetar
          funcionalidades básicas. Se passarmos a usar cookies não essenciais, o banner permitirá
          aceitar ou recusar antes do carregamento.
        </p>
      </LegalSection>

      <LegalSection id="contato" title="Contato">
        <p>
          Dúvidas:{" "}
          <a
            href={`mailto:${legalCompany.emailEncarregado}`}
            className="text-ink underline underline-offset-4"
          >
            {legalCompany.emailEncarregado}
          </a>
          .
        </p>
      </LegalSection>
    </LegalDocument>
  );
}
