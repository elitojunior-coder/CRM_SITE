import type { Metadata } from "next";
import Link from "next/link";
import { LegalDocument } from "@/components/legal/LegalDocument";
import { LegalSection } from "@/components/legal/LegalSection";
import { legalPageMetadata } from "@/lib/legal/metadata";
import { legalCompany, legalCompanyDisplayName } from "@/lib/legal/company";

const toc = [
  { id: "papeis", label: "Papéis na LGPD" },
  { id: "dados", label: "Dados que coletamos" },
  { id: "meta-whatsapp", label: "Dados da Meta (WhatsApp oficial)" },
  { id: "finalidades", label: "Finalidades e bases legais" },
  { id: "compartilhamento", label: "Compartilhamento" },
  { id: "internacional", label: "Transferência internacional" },
  { id: "retencao", label: "Tempo de guarda" },
  { id: "seguranca", label: "Segurança" },
  { id: "direitos", label: "Seus direitos" },
  { id: "incidentes", label: "Incidentes" },
  { id: "menores", label: "Menores" },
  { id: "ia", label: "Inteligência artificial" },
  { id: "alteracoes", label: "Alterações e contato" },
] as const;

export const metadata: Metadata = legalPageMetadata(
  "Política de privacidade",
  "/privacidade",
  "Como a 4Traders trata dados pessoais no site e na plataforma de atendimento.",
);

export default function PrivacidadePage() {
  const controladora = legalCompanyDisplayName();
  return (
    <LegalDocument
      title="Política de privacidade"
      intro={
        <p>
          Esta política descreve como {controladora} trata dados pessoais quando você visita
          nosso site, cria uma conta na plataforma ou quando processamos dados em nome dos
          nossos clientes.
        </p>
      }
      toc={[...toc]}
    >
      <LegalSection id="papeis" title="Papéis na LGPD">
        <p>
          Depende de quem decide <strong className="text-ink">por que</strong> e{" "}
          <strong className="text-ink">como</strong> os dados são usados:
        </p>
        <ul className="list-disc space-y-2 pl-5">
          <li>
            <strong className="text-ink">Contatos dos clientes da plataforma</strong> (leads,
            conversas de WhatsApp, histórico de atendimento): a empresa que contrata o serviço
            é a <strong className="text-ink">controladora</strong>. A 4Traders atua como{" "}
            <strong className="text-ink">operadora</strong>, tratando esses dados apenas
            conforme as instruções e configurações dessa empresa.
          </li>
          <li>
            <strong className="text-ink">Conta na plataforma e visitantes do site</strong>{" "}
            (cadastro, login, suporte, navegação institucional): a 4Traders é a{" "}
            <strong className="text-ink">controladora</strong> dos dados necessários para
            operar o site e prestar o serviço contratado.
          </li>
        </ul>
      </LegalSection>

      <LegalSection id="dados" title="Dados que coletamos">
        <p>Podemos tratar, conforme o contexto:</p>
        <ul className="list-disc space-y-2 pl-5">
          <li>
            <strong className="text-ink">Site:</strong> endereço IP, tipo de navegador,
            páginas visitadas, data e hora de acesso e cookies estritamente necessários ao
            funcionamento (veja a{" "}
            <Link href="/cookies" className="text-ink underline underline-offset-4">
              política de cookies
            </Link>
            ).
          </li>
          <li>
            <strong className="text-ink">Conta na plataforma:</strong> nome, e-mail, telefone
            profissional, empresa, cargo, credenciais de acesso, registros de uso e
            preferências de configuração.
          </li>
          <li>
            <strong className="text-ink">Em nome do cliente (operadora):</strong> nomes,
            telefones, conteúdo de mensagens, mídias, etiquetas, notas internas, estágio no
            funil e demais dados que o cliente ou o titular compartilha no atendimento.
          </li>
        </ul>
      </LegalSection>

      <LegalSection id="meta-whatsapp" title="Dados recebidos da Meta (API oficial do WhatsApp)">
        {/* TODO(CANAL-1): confirmar este texto quando o canal oficial entrar no ar. */}
        <p>
          Quando o cliente conecta a API oficial do WhatsApp Business, recebemos da Meta
          identificadores da conta empresarial, da conta do WhatsApp e do número de telefone, além
          de um token de acesso necessário à integração. Por webhooks, recebemos mensagens,
          mídias associadas e status de entrega ou leitura, conforme configurado.
        </p>
        <p>
          Usamos esses dados exclusivamente para prestar o serviço contratado ao cliente (roteamento,
          histórico de atendimento, automações e suporte técnico). O token de acesso permanece apenas
          no servidor, com acesso restrito à equipe autorizada.
        </p>
        <p>
          Ao desconectar a integração, deixamos de receber novos eventos da Meta; os dados já
          tratados seguem os prazos de guarda descritos nesta política e podem ser excluídos conforme
          pedido do controlador. Veja também{" "}
          <Link href="/exclusao-de-dados" className="text-ink underline underline-offset-4">
            Exclusão de dados
          </Link>
          .
        </p>
      </LegalSection>

      <LegalSection id="finalidades" title="Finalidades e bases legais">
        <ul className="list-disc space-y-3 pl-5">
          <li>
            <strong className="text-ink">Prestação do contrato</strong> — operar a conta,
            integrações (WhatsApp, agenda), automações e suporte técnico (art. 7º, V, LGPD).
          </li>
          <li>
            <strong className="text-ink">Legítimo interesse</strong> — segurança, prevenção a
            fraudes, melhoria do produto com dados agregados ou pseudonimizados, e comunicações
            essenciais sobre o serviço (art. 7º, IX), sempre com balanceamento de direitos.
          </li>
          <li>
            <strong className="text-ink">Consentimento</strong> — cookies ou scripts não
            essenciais no site, quando existirem, conforme a{" "}
            <Link href="/cookies" className="text-ink underline underline-offset-4">
              política de cookies
            </Link>
            .
          </li>
          <li>
            <strong className="text-ink">Obrigação legal</strong> — guarda de registros exigida
            em lei ou resposta a autoridades competentes.
          </li>
        </ul>
      </LegalSection>

      <LegalSection id="compartilhamento" title="Com quem compartilhamos">
        <p>
          Compartilhamos dados com fornecedores que nos ajudam a entregar o serviço (hospedagem,
          banco de dados, IA, WhatsApp, pagamentos, e-mail). A lista atualizada está em{" "}
          <Link href="/suboperadores" className="text-ink underline underline-offset-4">
            Suboperadores
          </Link>
          . Não vendemos dados pessoais.
        </p>
      </LegalSection>

      <LegalSection id="internacional" title="Transferência internacional">
        <p>
          Alguns fornecedores processam dados fora do Brasil. Quando isso ocorre, adotamos
          salvaguardas previstas no art. 33 da LGPD, incluindo cláusulas contratuais padrão e
          exigências de confidencialidade e segurança compatíveis com esta política.
        </p>
      </LegalSection>

      <LegalSection id="retencao" title="Tempo de guarda e fim do contrato">
        <p>
          Mantemos os dados pelo tempo necessário às finalidades descritas e às obrigações legais.
          Encerrado o contrato, o cliente pode solicitar exportação dos dados tratados em seu
          nome; após prazo combinado no contrato ou aviso prévio, procedemos à exclusão ou
          anonimização dos dados de operação, ressalvadas cópias de backup rotacionadas pelo
          provedor de infraestrutura e registros exigidos em lei.
        </p>
      </LegalSection>

      <LegalSection id="seguranca" title="Medidas de segurança">
        <p>
          Adotamos controles técnicos e organizacionais descritos de forma resumida em{" "}
          <Link href="/seguranca" className="text-ink underline underline-offset-4">
            Segurança da informação
          </Link>
          .
        </p>
      </LegalSection>

      <LegalSection id="direitos" title="Direitos do titular (art. 18)">
        <p>
          Você pode solicitar confirmação de tratamento, acesso, correção, anonimização,
          portabilidade, eliminação, informação sobre compartilhamentos e revogação de
          consentimento, nos termos da LGPD.
        </p>
        <p>
          Quando somos controladores, envie o pedido para{" "}
          <a
            href={`mailto:${legalCompany.emailEncarregado}`}
            className="text-ink underline underline-offset-4"
          >
            {legalCompany.emailEncarregado}
          </a>
          . Respondemos em até <strong className="text-ink">15 dias</strong>, prorrogáveis
          conforme a lei.
        </p>
        <p>
          Se seus dados foram tratados porque você conversou com um cliente nosso, dirija-se
          primeiro a essa empresa (controladora); apoiamos o cliente no cumprimento do pedido
          quando aplicável.
        </p>
      </LegalSection>

      <LegalSection id="incidentes" title="Aviso de incidente">
        <p>
          Monitoramos eventos de segurança. Em incidente com risco ou dano relevante aos
          titulares, comunicaremos a Autoridade Nacional de Proteção de Dados e os titulares
          afetados, na forma da LGPD e regulamentação aplicável.
        </p>
      </LegalSection>

      <LegalSection id="menores" title="Público e menores">
        <p>
          O site e a plataforma são destinados a empresas e profissionais. Não direcionamos o
          serviço a menores de 18 anos nem coletamos intencionalmente dados de crianças.
        </p>
      </LegalSection>

      <LegalSection id="ia" title="Inteligência artificial">
        <p>
          Mensagens de atendimento podem ser processadas por um provedor de IA contratado
          exclusivamente para gerar respostas configuradas pelo cliente. O tratamento segue as
          instruções do cliente e{" "}
          {/* TODO jurídico: confirmar com o provedor se há retenção/treino e ajustar redação. */}
          conforme os termos do provedor de IA aplicáveis ao serviço.
        </p>
      </LegalSection>

      <LegalSection id="alteracoes" title="Alterações e contato">
        <p>
          Podemos atualizar esta política; a data de vigência no topo indica a versão atual.
          Dúvidas:{" "}
          <a
            href={`mailto:${legalCompany.emailContato}`}
            className="text-ink underline underline-offset-4"
          >
            {legalCompany.emailContato}
          </a>
          . Encarregado de dados:{" "}
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
