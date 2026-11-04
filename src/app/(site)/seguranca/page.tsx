import type { Metadata } from "next";
import Link from "next/link";
import { LegalDocument } from "@/components/legal/LegalDocument";
import { LegalSection } from "@/components/legal/LegalSection";
import { legalPageMetadata } from "@/lib/legal/metadata";
import { legalCompany } from "@/lib/legal/company";

const toc = [
  { id: "isolamento", label: "Isolamento entre clientes" },
  { id: "transito", label: "Dados em trânsito" },
  { id: "equipe", label: "Acesso da equipe" },
  { id: "suporte", label: "Suporte" },
  { id: "whatsapp", label: "Risco no WhatsApp" },
  { id: "backups", label: "Backups" },
  { id: "vulnerabilidades", label: "Reportar vulnerabilidade" },
] as const;

export const metadata: Metadata = legalPageMetadata(
  "Segurança da informação",
  "/seguranca",
  "Medidas de segurança da plataforma 4Traders em linguagem simples.",
);

export default function SegurancaPage() {
  return (
    <LegalDocument
      title="Segurança da informação"
      intro={
        <p>
          Resumo das práticas que aplicamos para proteger dados na plataforma. Detalhes contratuais
          podem complementar este documento.
        </p>
      }
      toc={[...toc]}
    >
      <LegalSection id="isolamento" title="Isolamento entre clientes">
        <p>
          Dados de cada cliente ficam separados no banco de dados (multi-inquilino), com
          identificadores de organização em consultas e políticas de acesso no aplicativo.
        </p>
      </LegalSection>

      <LegalSection id="transito" title="Conexão criptografada">
        <p>
          O tráfego entre navegador, aplicativo e nossos servidores usa HTTPS/TLS. Integrações com
          terceiros usam credenciais e tokens conforme cada provedor exige.
        </p>
      </LegalSection>

      <LegalSection id="equipe" title="Acesso da equipe da plataforma">
        <p>
          Colaboradores com acesso administrativo usam autenticação em duas etapas. Ações sensíveis
          geram registros de auditoria para investigação posterior.
        </p>
      </LegalSection>

      <LegalSection id="suporte" title="Acesso de suporte">
        <p>
          Quando necessário para diagnosticar um chamado, o suporte pode acessar a conta em modo
          somente leitura, por tempo limitado e com registro do motivo e do responsável.
        </p>
      </LegalSection>

      <LegalSection id="whatsapp" title="Pausa automática em risco">
        <p>
          Sinais de desconexão, restrição ou banimento no WhatsApp podem disparar pausa automática
          de envios para proteger o número conectado, conforme descrito nos{" "}
          <Link href="/termos" className="text-ink underline underline-offset-4">
            termos de uso
          </Link>
          .
        </p>
      </LegalSection>

      <LegalSection id="backups" title="Backups">
        <p>
          Backups e retenção seguem as políticas do provedor de banco de dados e infraestrutura.
          Testamos restauração conforme nossa rotina interna de continuidade.
        </p>
      </LegalSection>

      <LegalSection id="vulnerabilidades" title="Reportar vulnerabilidade">
        <p>
          Se você encontrou uma falha de segurança, envie detalhes técnicos (sem explorar além do
          necessário) para{" "}
          <a
            href={`mailto:${legalCompany.emailContato}`}
            className="text-ink underline underline-offset-4"
          >
            {legalCompany.emailContato}
          </a>
          . Agradecemos disclosure responsável e responderemos com prazo de triagem.
        </p>
      </LegalSection>
    </LegalDocument>
  );
}
