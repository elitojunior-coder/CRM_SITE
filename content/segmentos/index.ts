export type SegmentoId =
  | "barbearia"
  | "clinica"
  | "energia-solar"
  | "imobiliaria"
  | "loja"
  | "servicos";

export type SegmentoContent = {
  id: SegmentoId;
  label: string;
  pain: string;
  clientAudio: string;
  transcript: string;
  agentReply: string;
  chips: { label: string; value: string }[];
  features: [string, string, string];
};

export const segmentos: SegmentoContent[] = [
  {
    id: "barbearia",
    label: "Barbearia",
    pain: "Cliente manda horário no WhatsApp e some se ninguém confirma na hora.",
    clientAudio: "Áudio · 0:19",
    transcript:
      "“Fala, tem vaga hoje às 18h? Quero corte e barba.”",
    agentReply:
      "Tenho sim. Corte + barba às 18h fica R$ 85. Confirmo com o barbeiro João?",
    chips: [
      { label: "serviço", value: "corte + barba" },
      { label: "horário", value: "18h hoje" },
    ],
    features: [
      "Confirma horário e serviço sem planilha",
      "Lista de espera quando enche a agenda",
      "Lembrete automático no dia do corte",
    ],
  },
  {
    id: "clinica",
    label: "Clínica",
    pain: "Paciente manda áudio pedindo retorno — recepção vê tarde demais.",
    clientAudio: "Áudio · 0:22",
    transcript:
      "“Preciso remarcar a dermato. Só consigo quinta de manhã.”",
    agentReply:
      "Quinta, 9h15 com a Dra. Marina está livre. Confirmo e mando orientações de preparo?",
    chips: [
      { label: "especialidade", value: "dermatologia" },
      { label: "urgência", value: "retorno" },
    ],
    features: [
      "Entende áudio e encaixa na agenda",
      "Triagem antes de passar para recepção",
      "Confirmação e preparo por mensagem",
    ],
  },
  {
    id: "energia-solar",
    label: "Energia solar",
    pain: "Lead quente esfria quando o orçamento demora mais que minutos.",
    clientAudio: "Áudio · 0:28",
    transcript:
      "“Vi o anúncio. Quanto fica placa pra casa de 120m² em Campinas?”",
    agentReply:
      "Consigo te orientar. Sua conta de luz passa de R$ 400? Telhado é cerâmico ou fibro?",
    chips: [
      { label: "orçamento", value: "R$ 8 mil" },
      { label: "cidade", value: "Campinas" },
    ],
    features: [
      "Qualifica consumo e telhado antes do vendedor",
      "Agenda visita técnica no fluxo do chat",
      "Registra origem do lead no funil",
    ],
  },
  {
    id: "imobiliaria",
    label: "Imobiliária",
    pain: "Interesse no imóvel some se ninguém confirma visita no mesmo dia.",
    clientAudio: "Áudio · 0:16",
    transcript:
      "“Ainda tem o apartamento de três quartos no Cambuí? Quero ver hoje.”",
    agentReply:
      "Ainda tem. Posso agendar visita hoje às 17h ou amanhã 10h — qual prefere?",
    chips: [
      { label: "imóvel", value: "3 quartos" },
      { label: "região", value: "Cambuí" },
    ],
    features: [
      "Responde disponibilidade na hora",
      "Marca visita e avisa o corretor",
      "Resume perfil do comprador no handoff",
    ],
  },
  {
    id: "loja",
    label: "Loja",
    pain: "Pergunta sobre estoque ou entrega não pode ficar no vácuo.",
    clientAudio: "Áudio · 0:14",
    transcript:
      "“Tem tênis 42 preto? Entrega amanhã em BH?”",
    agentReply:
      "Tenho 42 preto em estoque. Entrega amanhã em BH: frete R$ 19 ou retira na loja. Quer reservar?",
    chips: [
      { label: "SKU", value: "tênis 42" },
      { label: "entrega", value: "amanhã" },
    ],
    features: [
      "Consulta estoque e prazo no roteiro",
      "Carrinho e pagamento com link seguro",
      "Pós-venda e troca no mesmo número",
    ],
  },
  {
    id: "servicos",
    label: "Serviços",
    pain: "Chamado urgente no WhatsApp não pode esperar alguém liberar.",
    clientAudio: "Áudio · 0:20",
    transcript:
      "“Ar condicionado parou. Consegue técnico ainda hoje?”",
    agentReply:
      "Atendemos urgência. Qual bairro e marca do aparelho? Tenho janela entre 14h e 16h.",
    chips: [
      { label: "urgente", value: "sim" },
      { label: "serviço", value: "ar condicionado" },
    ],
    features: [
      "Classifica urgência e região",
      "Encaixa técnico na rota do dia",
      "Resumo com fotos para o profissional",
    ],
  },
];

export const segmentoById = Object.fromEntries(
  segmentos.map((s) => [s.id, s]),
) as Record<SegmentoId, SegmentoContent>;
