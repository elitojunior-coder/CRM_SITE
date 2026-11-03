import type { DemoScript } from "./types";

export const servicosDemo: DemoScript = {
  segmentId: "servicos",
  label: "Serviços",
  quickMessages: [
    "Quanto custa a visita técnica?",
    "Consegue técnico hoje?",
    "Atende no bairro Santa Rosa?",
  ],
  responses: {
    preco:
      "Visita técnica R$ 120 (abatida se fechar o serviço). Orçamento no local sem compromisso.",
    horario:
      "Hoje tenho janela 14h–16h ou 17h–19h. Qual funciona?",
    urgencia:
      "Classifiquei como urgente. Técnico a caminho da região às 15h30 — confirma endereço?",
    localizacao:
      "Atendemos Santa Rosa e bairros adjacentes. Qual rua e número?",
    outro:
      "Posso abrir chamado, passar prazo ou forma de pagamento. Descreve o problema?",
  },
  chips: [
    { label: "urgente", value: "sim" },
    { label: "serviço", value: "visita técnica" },
  ],
  confirmedSlot: "Chamado confirmado · hoje 15h30",
};
