import type { DemoScript } from "./types";

export const imobiliariaDemo: DemoScript = {
  segmentId: "imobiliaria",
  label: "Imobiliária",
  quickMessages: [
    "Ainda tem o apto de 3 quartos no Cambuí?",
    "Qual o valor do condomínio?",
    "Quero visitar hoje à tarde",
  ],
  responses: {
    preco:
      "O apartamento de 3 quartos no Cambuí está R$ 620 mil. Condomínio R$ 980. Quer simular financiamento?",
    horario:
      "Hoje à tarde tenho 16h ou 17h30 para visita. Qual horário prefere?",
    urgencia:
      "Esse imóvel tem alta procura. Reservo visita hoje 16h e aviso o corretor agora?",
    localizacao:
      "Fica no Cambuí, a 2 quadras da Praça Silva Filho. Envio a localização no WhatsApp?",
    outro:
      "Posso confirmar disponibilidade, documentação ou agendar visita. Como posso ajudar?",
  },
  chips: [
    { label: "imóvel", value: "3 quartos" },
    { label: "região", value: "Cambuí" },
  ],
  confirmedSlot: "Visita confirmada · hoje 16h",
};
