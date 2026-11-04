import type { Metadata } from "next";
import Link from "next/link";
import { LegalDocument } from "@/components/legal/LegalDocument";
import { LegalSection } from "@/components/legal/LegalSection";
import { legalPageMetadata } from "@/lib/legal/metadata";
import { legalCompany } from "@/lib/legal/company";

const toc = [
  { id: "como-pedir", label: "Como pedir a exclusão" },
  { id: "prazo", label: "Prazo de resposta" },
  { id: "o-que-apagamos", label: "O que apagamos e o que guardamos" },
  { id: "contatos-cliente", label: "Contatos dos clientes" },
  { id: "whatsapp-oficial", label: "Desconectar o WhatsApp oficial" },
  { id: "links", label: "Documentos relacionados" },
] as const;

export const metadata: Metadata = legalPageMetadata(
  "Exclusão de dados",
  "/exclusao-de-dados",
  "Como solicitar exclusão de dados pessoais tratados pela 4Traders.",
);

export default function ExclusaoDeDadosPage() {
  return (
    <LegalDocument
      title="Exclusão de dados"
      intro={
        <p>
          Esta página explica como titulares podem pedir a exclusão de dados pessoais quando a
          4Traders atua como controladora, e como funciona quando os dados foram tratados em nome
          de um cliente nosso.
        </p>
      }
      toc={[...toc]}
    >
      <LegalSection id="como-pedir" title="Como pedir a exclusão">
        <p>
          Envie o pedido para o encarregado de dados pelo e-mail{" "}
          <a
            href={`mailto:${legalCompany.emailEncarregado}`}
            className="text-ink underline underline-offset-4"
          >
            {legalCompany.emailEncarregado}
          </a>
          . Informe, sempre que possível:
        </p>
        <ul className="list-disc space-y-2 pl-5">
          <li>nome completo e e-mail usados na conta ou no contato conosco;</li>
          <li>descrição clara do que deseja (exclusão total, de um canal ou de um período);</li>
          <li>documento que comprove identidade, se solicitado para evitar fraudes;</li>
          <li>se o pedido se refere a dados de atendimento de uma empresa cliente, indique qual.</li>
        </ul>
      </LegalSection>

      <LegalSection id="prazo" title="Prazo de resposta">
        <p>
          Respondemos em até <strong className="text-ink">15 dias</strong>, prorrogáveis conforme a
          LGPD e orientações da ANPD, confirmando o recebimento e informando o andamento ou a
          conclusão do pedido.
        </p>
      </LegalSection>

      <LegalSection id="o-que-apagamos" title="O que apagamos e o que guardamos">
        <p>
          Quando somos controladores, eliminamos ou anonimizamos os dados pessoais desnecessários
          após validar o pedido, ressalvados:
        </p>
        <ul className="list-disc space-y-2 pl-5">
          <li>
            registros que precisamos manter por obrigação legal, fiscal ou regulatória, pelo prazo
            exigido;
          </li>
          <li>
            cópias de backup que serão sobrescritas no ciclo normal de rotação da infraestrutura;
          </li>
          <li>
            dados agregados ou anonimizados que não permitem identificar o titular.
          </li>
        </ul>
        <p>
          Detalhes sobre tempo de guarda estão na{" "}
          <Link href="/privacidade" className="text-ink underline underline-offset-4">
            política de privacidade
          </Link>
          .
        </p>
      </LegalSection>

      <LegalSection id="contatos-cliente" title="Contatos dos clientes da plataforma">
        <p>
          Se você conversou com uma empresa que usa nossa plataforma (por WhatsApp ou outro canal),
          essa empresa é a <strong className="text-ink">controladora</strong> dos dados do
          atendimento. O pedido de exclusão deve ser feito diretamente a ela.
        </p>
        <p>
          Atuamos como <strong className="text-ink">operadora</strong>: apoiamos nosso cliente a
          atender pedidos válidos dentro dos limites técnicos e contratuais, sem substituir a
          responsabilidade do controlador.
        </p>
      </LegalSection>

      <LegalSection id="whatsapp-oficial" title="Desconectar o WhatsApp oficial (API Meta)">
        <p>
          O cliente pode desconectar a integração com a API oficial do WhatsApp Business nas
          configurações da plataforma ou revogando o acesso no painel da Meta, conforme o fluxo
          disponível no produto.
        </p>
        <p>Ao desconectar:</p>
        <ul className="list-disc space-y-2 pl-5">
          <li>deixamos de receber novos eventos e mensagens via webhooks dessa conta;</li>
          <li>
            o token de acesso deixa de ser usado e é removido do ambiente de produção conforme nosso
            procedimento interno;
          </li>
          <li>
            os dados já recebidos seguem os prazos de guarda da{" "}
            <Link href="/privacidade" className="text-ink underline underline-offset-4">
              política de privacidade
            </Link>{" "}
            e do contrato com o cliente, podendo ser exportados ou excluídos conforme solicitado
            pelo controlador.
          </li>
        </ul>
      </LegalSection>

      <LegalSection id="links" title="Documentos relacionados">
        <ul className="list-disc space-y-2 pl-5">
          <li>
            <Link href="/privacidade" className="text-ink underline underline-offset-4">
              Política de privacidade
            </Link>
          </li>
          <li>
            <Link href="/lgpd" className="text-ink underline underline-offset-4">
              Canal LGPD
            </Link>
          </li>
          <li>
            <Link href="/termos" className="text-ink underline underline-offset-4">
              Termos de uso
            </Link>
          </li>
        </ul>
      </LegalSection>
    </LegalDocument>
  );
}
