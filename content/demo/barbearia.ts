import type { DemoScript } from "./types";

export const barbeariaDemo: DemoScript = {
  segmentId: "barbearia",
  label: "Barbearia",
  quickMessages: [
    "Quanto custa corte e barba?",
    "Tem vaga hoje às 18h?",
    "Preciso encaixe urgente",
  ],
  responses: {
    preco:
      "Corte + barba sai R$ 85. Barba isolada R$ 35. Quer que eu reserve um horário?",
    horario:
      "18h está livre com o João. Confirmo corte + barba nesse horário?",
    urgencia:
      "Tenho encaixe hoje 17h15. É corte, barba ou os dois?",
    localizacao:
      "Estamos na Rua das Palmeiras, 45 — estacionamento na lateral. Mando pin no mapa?",
    outro:
      "Posso confirmar serviço, barbeiro ou forma de pagamento. Me conta o que precisa.",
  },
  chips: [
    { label: "serviço", value: "corte + barba" },
    { label: "valor", value: "R$ 85" },
  ],
  confirmedSlot: "Horário confirmado · hoje 18h",
};
