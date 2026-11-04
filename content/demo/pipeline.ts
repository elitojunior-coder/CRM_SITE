export type PipelineChannel = "whatsapp" | "site" | "instagram";

export type PipelineColumnId =
  | "novo"
  | "qualificado"
  | "agendado"
  | "proposta"
  | "fechado";

export type PipelineColumn = {
  id: PipelineColumnId;
  title: string;
};

export type PipelineCard = {
  id: string;
  columnId: PipelineColumnId;
  name: string;
  initials: string;
  avatarColor: string;
  valueCents: number;
  channel: PipelineChannel;
  tags: string[];
  timeAgo: string;
  ownerInitials: string;
  ownerColor: string;
  aiHandled?: boolean;
  newMessagePulse?: boolean;
  aiResponding?: boolean;
};

export const pipelineFunnels = [
  { id: "comercial", label: "Comercial", active: true },
  { id: "pos", label: "Pós-venda", active: false },
  { id: "reativacao", label: "Reativação", active: false },
] as const;

export const pipelineColumns: PipelineColumn[] = [
  { id: "novo", title: "Novo lead" },
  { id: "qualificado", title: "Qualificado" },
  { id: "agendado", title: "Agendado" },
  { id: "proposta", title: "Proposta" },
  { id: "fechado", title: "Fechado" },
];

export const pipelineCards: PipelineCard[] = [
  {
    id: "c1",
    columnId: "novo",
    name: "Mariana Costa",
    initials: "MC",
    avatarColor: "#0E3B43",
    valueCents: 420000,
    channel: "whatsapp",
    tags: ["Urgente"],
    timeAgo: "há 3 min",
    ownerInitials: "RF",
    ownerColor: "#FF5B2E",
    aiHandled: true,
    newMessagePulse: true,
  },
  {
    id: "c2",
    columnId: "novo",
    name: "Felipe Andrade",
    initials: "FA",
    avatarColor: "#2563EB",
    valueCents: 189000,
    channel: "site",
    tags: ["Orçamento"],
    timeAgo: "há 8 min",
    ownerInitials: "AL",
    ownerColor: "#6366F1",
  },
  {
    id: "c3",
    columnId: "novo",
    name: "Camila Rocha",
    initials: "CR",
    avatarColor: "#DB2777",
    valueCents: 95000,
    channel: "instagram",
    tags: ["Retorno"],
    timeAgo: "há 12 min",
    ownerInitials: "RF",
    ownerColor: "#FF5B2E",
    aiHandled: true,
    aiResponding: true,
  },
  {
    id: "c4",
    columnId: "novo",
    name: "Ricardo Menezes",
    initials: "RM",
    avatarColor: "#059669",
    valueCents: 310000,
    channel: "whatsapp",
    tags: ["Orçamento"],
    timeAgo: "há 18 min",
    ownerInitials: "AL",
    ownerColor: "#6366F1",
  },
  {
    id: "c5",
    columnId: "qualificado",
    name: "Juliana Freitas",
    initials: "JF",
    avatarColor: "#7C3AED",
    valueCents: 275000,
    channel: "whatsapp",
    tags: ["Urgente", "Orçamento"],
    timeAgo: "há 22 min",
    ownerInitials: "RF",
    ownerColor: "#FF5B2E",
    aiHandled: true,
  },
  {
    id: "c6",
    columnId: "qualificado",
    name: "Bruno Carvalho",
    initials: "BC",
    avatarColor: "#EA580C",
    valueCents: 156000,
    channel: "site",
    tags: ["Retorno"],
    timeAgo: "há 31 min",
    ownerInitials: "AL",
    ownerColor: "#6366F1",
  },
  {
    id: "c7",
    columnId: "qualificado",
    name: "Patricia Nunes",
    initials: "PN",
    avatarColor: "#0891B2",
    valueCents: 498000,
    channel: "whatsapp",
    tags: ["Orçamento"],
    timeAgo: "há 40 min",
    ownerInitials: "RF",
    ownerColor: "#FF5B2E",
  },
  {
    id: "c8",
    columnId: "qualificado",
    name: "Lucas Ferreira",
    initials: "LF",
    avatarColor: "#4F46E5",
    valueCents: 88000,
    channel: "instagram",
    tags: ["Urgente"],
    timeAgo: "há 52 min",
    ownerInitials: "AL",
    ownerColor: "#6366F1",
    aiHandled: true,
  },
  {
    id: "c9",
    columnId: "agendado",
    name: "Amanda Souza",
    initials: "AS",
    avatarColor: "#BE185D",
    valueCents: 620000,
    channel: "whatsapp",
    tags: ["Orçamento"],
    timeAgo: "há 1 h",
    ownerInitials: "RF",
    ownerColor: "#FF5B2E",
  },
  {
    id: "c10",
    columnId: "agendado",
    name: "Thiago Lima",
    initials: "TL",
    avatarColor: "#0D9488",
    valueCents: 134000,
    channel: "site",
    tags: ["Retorno"],
    timeAgo: "há 1 h",
    ownerInitials: "AL",
    ownerColor: "#6366F1",
    aiHandled: true,
  },
  {
    id: "c11",
    columnId: "agendado",
    name: "Renata Oliveira",
    initials: "RO",
    avatarColor: "#9333EA",
    valueCents: 367000,
    channel: "whatsapp",
    tags: ["Urgente"],
    timeAgo: "há 2 h",
    ownerInitials: "RF",
    ownerColor: "#FF5B2E",
  },
  {
    id: "c12",
    columnId: "proposta",
    name: "Gustavo Pires",
    initials: "GP",
    avatarColor: "#CA8A04",
    valueCents: 890000,
    channel: "whatsapp",
    tags: ["Orçamento"],
    timeAgo: "há 3 h",
    ownerInitials: "AL",
    ownerColor: "#6366F1",
  },
  {
    id: "c13",
    columnId: "proposta",
    name: "Helena Dias",
    initials: "HD",
    avatarColor: "#DC2626",
    valueCents: 245000,
    channel: "instagram",
    tags: ["Retorno"],
    timeAgo: "há 4 h",
    ownerInitials: "RF",
    ownerColor: "#FF5B2E",
  },
  {
    id: "c14",
    columnId: "proposta",
    name: "Diego Martins",
    initials: "DM",
    avatarColor: "#0284C7",
    valueCents: 512000,
    channel: "site",
    tags: ["Urgente", "Orçamento"],
    timeAgo: "há 5 h",
    ownerInitials: "AL",
    ownerColor: "#6366F1",
    aiHandled: true,
  },
  {
    id: "c15",
    columnId: "fechado",
    name: "Carla Mendes",
    initials: "CM",
    avatarColor: "#16A34A",
    valueCents: 780000,
    channel: "whatsapp",
    tags: ["Orçamento"],
    timeAgo: "ontem",
    ownerInitials: "RF",
    ownerColor: "#FF5B2E",
  },
  {
    id: "c16",
    columnId: "fechado",
    name: "Eduardo Ramos",
    initials: "ER",
    avatarColor: "#57534E",
    valueCents: 199000,
    channel: "site",
    tags: ["Retorno"],
    timeAgo: "ontem",
    ownerInitials: "AL",
    ownerColor: "#6366F1",
  },
  {
    id: "c17",
    columnId: "fechado",
    name: "Isabela Teixeira",
    initials: "IT",
    avatarColor: "#7E22CE",
    valueCents: 445000,
    channel: "whatsapp",
    tags: ["Urgente"],
    timeAgo: "2 dias",
    ownerInitials: "RF",
    ownerColor: "#FF5B2E",
    aiHandled: true,
  },
  {
    id: "c18",
    columnId: "fechado",
    name: "Vinícius Almeida",
    initials: "VA",
    avatarColor: "#B45309",
    valueCents: 328000,
    channel: "instagram",
    tags: ["Orçamento"],
    timeAgo: "3 dias",
    ownerInitials: "AL",
    ownerColor: "#6366F1",
  },
];

/** Card usado na animação de arrastar entre colunas (~3s por passo). */
export const pipelineDragSequence = [
  { cardId: "c2", from: "novo" as const, to: "qualificado" as const },
  { cardId: "c6", from: "qualificado" as const, to: "agendado" as const },
  { cardId: "c11", from: "agendado" as const, to: "proposta" as const },
  { cardId: "c13", from: "proposta" as const, to: "fechado" as const },
];

export function formatPipelineBrl(valueCents: number): string {
  return (valueCents / 100).toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
    maximumFractionDigits: 0,
  });
}

export function columnTotals(cards: PipelineCard[], columnId: PipelineColumnId) {
  const inCol = cards.filter((c) => c.columnId === columnId);
  return {
    count: inCol.length,
    totalCents: inCol.reduce((sum, c) => sum + c.valueCents, 0),
  };
}
