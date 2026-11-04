import type { Metadata } from "next";
import Link from "next/link";
import { LegalDocument } from "@/components/legal/LegalDocument";
import { LegalSection } from "@/components/legal/LegalSection";
import { legalPageMetadata } from "@/lib/legal/metadata";
import { legalCompany } from "@/lib/legal/company";

const toc = [
  { id: "direitos", label: "Seus direitos" },
  { id: "encarregado", label: "Encarregado" },
  { id: "contatos-cliente", label: "Se você é contato de um cliente" },
  { id: "links", label: "Documentos relacionados" },
] as const;

export const metadata: Metadata = legalPageMetadata(
  "Canal LGPD",
  "/lgpd",
  "Como exercer direitos de proteção de dados e falar com o encarregado.",
);

export default function LgpdPage() {
  return (
    <LegalDocument
      title="Canal LGPD"
      intro={
        <p>
          Resumo prático para titulares de dados e contatos que conversam com empresas que usam
          nossa plataforma.
        </p>
      }
      toc={[...toc]}
    >
      <LegalSection id="direitos" title="Seus direitos (resumo)">
        <p>Pela LGPD (art. 18), você pode, entre outros:</p>
        <ul className="list-disc space-y-2 pl-5">
          <li>Confirmar se tratamos seus dados e acessá-los;</li>
          <li>Corrigir dados incompletos ou desatualizados;</li>
          <li>Solicitar anonimização, bloqueio ou eliminação de dados desnecessários;</li>
          <li>Pedir portabilidade a outro fornecedor, quando aplicável;</li>
          <li>Revogar consentimento e obter informação sobre compartilhamentos.</li>
        </ul>
      </LegalSection>

      <LegalSection id="encarregado" title="Encarregado de dados">
        <p>
          Para assuntos em que a 4Traders é controladora (conta na plataforma e site), fale com
          nosso encarregado:
        </p>
        <p>
          <a
            href={`mailto:${legalCompany.emailEncarregado}`}
            className="text-ink underline underline-offset-4"
          >
            {legalCompany.emailEncarregado}
          </a>
        </p>
        <p>Respondemos em até 15 dias, prorrogáveis conforme a ANPD.</p>
      </LegalSection>

      <LegalSection id="contatos-cliente" title="Se você é contato de um cliente nosso">
        <p>
          Se você enviou mensagem para uma empresa que usa nossa plataforma (por WhatsApp ou outro
          canal), essa empresa é a <strong className="text-ink">controladora</strong> dos seus
          dados de atendimento. Peça acesso, correção ou exclusão diretamente a ela.
        </p>
        <p>
          Atuamos como <strong className="text-ink">operadora</strong>: ajudamos nosso cliente a
          cumprir pedidos válidos, dentro dos limites técnicos e contratuais, sem substituir a
          responsabilidade do controlador.
        </p>
      </LegalSection>

      <LegalSection id="links" title="Documentos relacionados">
        <ul className="list-disc space-y-2 pl-5">
          <li>
            <Link href="/privacidade" className="text-ink underline underline-offset-4">
              Política de privacidade
            </Link>
          </li>
          <li>
            <Link href="/seguranca" className="text-ink underline underline-offset-4">
              Segurança da informação
            </Link>
          </li>
          <li>
            <Link href="/suboperadores" className="text-ink underline underline-offset-4">
              Suboperadores
            </Link>
          </li>
        </ul>
      </LegalSection>
    </LegalDocument>
  );
}
