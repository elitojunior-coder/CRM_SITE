export type Suboperador = {
  nome: string;
  finalidade: string;
  dadosEnvolvidos: string;
  pais: string;
};

/** Suboperadores e fornecedores relevantes ao tratamento de dados. */
export const suboperadores: Suboperador[] = [
  {
    nome: "Supabase",
    finalidade: "Banco de dados, autenticação e armazenamento de arquivos da plataforma",
    dadosEnvolvidos:
      "Dados de conta, conversas, contatos, configurações e registros operacionais",
    pais: "Estados Unidos (infraestrutura global)",
  },
  {
    nome: "Vercel",
    finalidade: "Hospedagem do site institucional e entrega de conteúdo estático",
    dadosEnvolvidos: "Endereço IP, logs de acesso e cabeçalhos HTTP",
    pais: "Estados Unidos (infraestrutura global)",
  },
  {
    nome: "Anthropic",
    finalidade: "Geração das respostas de IA no atendimento, quando habilitado pelo cliente",
    dadosEnvolvidos:
      "Trechos das conversas enviados para produzir respostas (conforme configuração do cliente)",
    pais: "Estados Unidos",
  },
  {
    nome: "uazapi",
    finalidade: "Conexão do WhatsApp por leitura de QR Code (canal não oficial)",
    dadosEnvolvidos:
      "Número conectado, metadados de mensagens, conteúdo de conversas e mídias trocadas",
    pais: "Brasil",
  },
  {
    nome: "Meta",
    finalidade: "API oficial do WhatsApp Business, quando o cliente utiliza esse canal",
    dadosEnvolvidos:
      "Identificadores da conta WhatsApp, templates, mensagens e eventos de entrega",
    pais: "Estados Unidos / Irlanda (conforme produto Meta)",
  },
  {
    nome: "Google",
    finalidade: "Integração de agenda (Google Calendar), quando o cliente conecta",
    dadosEnvolvidos:
      "Tokens de acesso, eventos de calendário e dados necessários para agendamento",
    pais: "Estados Unidos (Google Cloud)",
  },
  {
    nome: "[PROVEDOR DE E-MAIL]",
    finalidade: "Envio de e-mails transacionais (acesso, alertas e comunicações da conta)",
    dadosEnvolvidos: "Endereço de e-mail, nome e conteúdo das mensagens enviadas",
    pais: "[PAÍS DO PROVEDOR]",
  },
  {
    nome: "Asaas",
    finalidade: "Processamento de pagamentos de assinatura, quando aplicável",
    dadosEnvolvidos:
      "Dados de cobrança, identificação do pagador e status de transações (não armazenamos dados completos de cartão)",
    pais: "Brasil",
  },
];
