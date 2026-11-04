import type { Metadata } from "next";
import Link from "next/link";
import { LegalDocument } from "@/components/legal/LegalDocument";
import { LegalSection } from "@/components/legal/LegalSection";
import { SuboperadoresTable } from "@/components/legal/SuboperadoresTable";
import { legalPageMetadata } from "@/lib/legal/metadata";

const toc = [
  { id: "lista", label: "Lista de suboperadores" },
  { id: "atualizacoes", label: "Atualizações" },
] as const;

export const metadata: Metadata = legalPageMetadata(
  "Suboperadores",
  "/suboperadores",
  "Fornecedores que tratam dados em nome da 4Traders ou dos clientes na plataforma.",
);

export default function SuboperadoresPage() {
  return (
    <LegalDocument
      title="Suboperadores"
      intro={
        <p>
          Empresas que processam dados pessoais para entregar hospedagem, mensagens, IA, pagamentos
          e integrações. Quando atuamos como operadora para um cliente, estes fornecedores também
          podem tratar dados instruídos por ele.
        </p>
      }
      toc={[...toc]}
    >
      <LegalSection id="lista" title="Lista de suboperadores">
        <SuboperadoresTable />
      </LegalSection>

      <LegalSection id="atualizacoes" title="Atualizações">
        <p>
          Atualizamos esta lista quando contratamos ou substituímos fornecedores relevantes. O
          tratamento geral está descrito na{" "}
          <Link href="/privacidade" className="text-ink underline underline-offset-4">
            política de privacidade
          </Link>
          .
        </p>
      </LegalSection>
    </LegalDocument>
  );
}
