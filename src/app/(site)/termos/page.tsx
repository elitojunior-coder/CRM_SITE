import type { Metadata } from "next";
import Link from "next/link";
import {
  WHATSAPP_QR_TERMS_BODY,
  WHATSAPP_QR_TERMS_VERSION,
} from "../../../../content/legal/whatsapp-qr-terms";
import { LegalDocument } from "@/components/legal/LegalDocument";
import { LegalSection } from "@/components/legal/LegalSection";
import { legalPageMetadata } from "@/lib/legal/metadata";
import { legalCompany, legalCompanyDisplayName } from "@/lib/legal/company";

const toc = [
  { id: "servico", label: "O serviço e a conta" },
  { id: "uso-aceitavel", label: "Uso aceitável" },
  { id: "whatsapp-qr", label: "WhatsApp por QR" },
  { id: "whatsapp-api", label: "API oficial Meta" },
  { id: "ia", label: "Inteligência artificial" },
  { id: "planos", label: "Planos e cobrança" },
  { id: "disponibilidade", label: "Disponibilidade" },
  { id: "responsabilidade", label: "Responsabilidade" },
  { id: "suspensao", label: "Suspensão e encerramento" },
  { id: "dados", label: "Dados ao encerrar" },
  { id: "pi", label: "Propriedade intelectual" },
  { id: "alteracoes", label: "Alterações e foro" },
] as const;

export const metadata: Metadata = legalPageMetadata(
  "Termos de uso",
  "/termos",
  "Condições de uso da plataforma de atendimento e integrações WhatsApp.",
);

export default function TermosPage() {
  const empresa = legalCompanyDisplayName();
  return (
    <LegalDocument
      title="Termos de uso"
      intro={
        <p>
          Estes termos regem o uso da plataforma oferecida por {empresa} ({legalCompany.razaoSocial}
          , CNPJ {legalCompany.cnpj}). Ao criar uma conta ou usar o serviço, você concorda com
          eles e com a{" "}
          <Link href="/privacidade" className="text-ink underline underline-offset-4">
            política de privacidade
          </Link>
          .
        </p>
      }
      toc={[...toc]}
    >
      <LegalSection id="servico" title="O serviço e a conta">
        <p>
          Oferecemos software de CRM e atendimento com foco em WhatsApp, automações e agentes de
          IA configuráveis. A conta é pessoal e intransferível dentro da organização contratante;
          você deve manter credenciais seguras e informar usuários autorizados.
        </p>
      </LegalSection>

      <LegalSection id="uso-aceitavel" title="Uso aceitável">
        <p>É proibido, entre outros:</p>
        <ul className="list-disc space-y-2 pl-5">
          <li>Enviar spam, mensagens em massa não solicitadas ou usar listas compradas;</li>
          <li>Contatar pessoas que não pediram informação ou não consentiram;</li>
          <li>Publicar conteúdo ilegal, enganoso, discriminatório ou que viole direitos de terceiros;</li>
          <li>Ignorar pedidos de parada (opt-out) ou bloqueio de contato;</li>
          <li>Tentar burlar limites de segurança, acessar dados de outros clientes ou abusar de APIs.</li>
        </ul>
        <p>
          Você responde pelo conteúdo enviado por sua equipe, bots e integrações configuradas na
          conta.
        </p>
      </LegalSection>

      <LegalSection id="whatsapp-qr" title="Canais de WhatsApp — conexão por QR">
        <p>
          A conexão por leitura de QR Code utiliza tecnologia não oficial. Além destes Termos,
          valem as condições abaixo (versão {WHATSAPP_QR_TERMS_VERSION}):
        </p>
        <div className="rounded-xl border border-line bg-surface-muted/60 p-5 text-sm leading-relaxed whitespace-pre-wrap text-ink">
          {WHATSAPP_QR_TERMS_BODY}
        </div>
      </LegalSection>

      <LegalSection id="whatsapp-api" title="Canais de WhatsApp — API oficial da Meta">
        <p>
          Se você usar a API oficial do WhatsApp Business, também se aplicam as políticas,
          limites e regras da Meta, incluindo uso de modelos (templates) aprovados e a janela de
          24 horas para mensagens de sessão. É sua responsabilidade manter a conta Meta em
          conformidade.
        </p>
      </LegalSection>

      <LegalSection id="ia" title="Inteligência artificial">
        <p>
          Respostas geradas por IA podem conter erros ou informações incompletas. Você configura
          prompts, fluxos e limites; deve acompanhar conversas sensíveis e pode assumir o
          atendimento humano a qualquer momento.
        </p>
        <p>
          A IA não substitui profissionais habilitados (saúde, jurídico, financeiro ou outros
          regulados). Não use o serviço como única base para decisões que exijam licença
          profissional.
        </p>
      </LegalSection>

      <LegalSection id="planos" title="Planos e cobrança">
        <p>
          Valores, ciclos de faturamento, limites de uso e formas de pagamento:{" "}
          <strong className="text-ink">[A DEFINIR]</strong> no contrato comercial ou painel de
          assinatura. Impostos e tarifas de terceiros podem ser repassados conforme contrato.
        </p>
      </LegalSection>

      <LegalSection id="disponibilidade" title="Disponibilidade">
        <p>
          Buscamos alta disponibilidade, mas não garantimos operação ininterrupta. O serviço
          depende de terceiros (WhatsApp, Meta, provedores de nuvem, operadoras e internet). Manutenções
          programadas serão comunicadas quando possível.
        </p>
      </LegalSection>

      <LegalSection id="responsabilidade" title="Limitação de responsabilidade">
        <p>
          Na extensão permitida pela lei, não respondemos por lucros cessantes, danos indiretos ou
          perdas decorrentes de bloqueio de números WhatsApp, indisponibilidade de terceiros ou
          conteúdo enviado pelo cliente. Nossa responsabilidade total, quando cabível, limita-se ao
          valor pago nos 12 meses anteriores ao evento que deu causa ao pedido.
        </p>
      </LegalSection>

      <LegalSection id="suspensao" title="Suspensão e encerramento">
        <p>
          Podemos suspender ou encerrar o acesso por violação destes termos, risco à plataforma ou
          inadimplência, com aviso quando razoável. Você pode encerrar a conta conforme o contrato;
          obrigações de confidencialidade e tratamento de dados sobrevivem conforme a lei.
        </p>
      </LegalSection>

      <LegalSection id="dados" title="Dados ao encerrar">
        <p>
          Após o encerramento, disponibilizamos exportação dos dados tratados em seu nome por prazo
          definido no contrato; depois, excluímos ou anonimizamos conforme a{" "}
          <Link href="/privacidade" className="text-ink underline underline-offset-4">
            política de privacidade
          </Link>
          , salvo retenção legal.
        </p>
      </LegalSection>

      <LegalSection id="pi" title="Propriedade intelectual">
        <p>
          A plataforma, marcas, interface e documentação pertencem à {empresa} ou licenciantes. Você
          mantém os direitos sobre o conteúdo que envia; concede licença limitada para hospedarmos e
          processarmos esse conteúdo para prestar o serviço.
        </p>
      </LegalSection>

      <LegalSection id="alteracoes" title="Alterações, lei aplicável e foro">
        <p>
          Podemos alterar estes termos; publicaremos a versão vigente nesta página. O uso continuado
          após a vigência indicada constitui aceite, salvo direitos irrenunciáveis do consumidor
          quando aplicável.
        </p>
        <p>
          Aplica-se a lei brasileira. Fica eleito o foro da comarca de {legalCompany.foro}, com
          renúncia a outro, salvo competência absoluta diversa.
        </p>
        <p>
          Contato:{" "}
          <a
            href={`mailto:${legalCompany.emailContato}`}
            className="text-ink underline underline-offset-4"
          >
            {legalCompany.emailContato}
          </a>
          .
        </p>
      </LegalSection>
    </LegalDocument>
  );
}
