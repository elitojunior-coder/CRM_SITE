import type { DemoScript } from "./types";

export const clinicaDemo: DemoScript = {
  segmentId: "clinica",
  label: "Clínica",
  quickMessages: [
    "Quanto custa uma limpeza?",
    "Tem horário amanhã de manhã?",
    "Preciso remarcar urgente",
  ],
  responses: {
    preco:
      "A limpeza está a partir de R$ 180. Posso encaixar avaliação no mesmo dia — prefere manhã ou tarde?",
    horario:
      "Amanhã tenho 9h15 ou 10h40. Qual horário funciona melhor para você?",
    urgencia:
      "Entendi a urgência. Tenho encaixe hoje às 16h30 com a Dra. Marina. Confirmo?",
    localizacao:
      "Atendemos na unidade Centro — Av. Brasil, 1200. Quer que eu envie o link do mapa?",
    outro:
      "Posso ajudar com agendamento, valores ou preparo do exame. O que você precisa?",
  },
  chips: [
    { label: "procedimento", value: "limpeza" },
    { label: "intenção", value: "agendar" },
  ],
  confirmedSlot: "Consulta confirmada · amanhã 9h15",
};
