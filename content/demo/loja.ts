import type { DemoScript } from "./types";

export const lojaDemo: DemoScript = {
  segmentId: "loja",
  label: "Loja",
  quickMessages: [
    "Quanto custa o tênis 42 preto?",
    "Entrega amanhã em BH?",
    "Preciso para presente hoje",
  ],
  responses: {
    preco:
      "O tênis 42 preto está R$ 349 à vista ou 3x sem juros. Reservo a numeração?",
    horario:
      "Retirada na loja hoje até 19h ou entrega amanhã 9h–12h. Qual prefere?",
    urgencia:
      "Consigo separar agora e deixar pronto para retirada em 40 minutos. Confirmo?",
    localizacao:
      "Entregamos em BH e região metropolitana. Me passa o CEP que calculo frete e prazo.",
    outro:
      "Posso checar estoque, troca ou rastreio. O que você procura?",
  },
  chips: [
    { label: "SKU", value: "tênis 42 preto" },
    { label: "entrega", value: "amanhã" },
  ],
  confirmedSlot: "Pedido reservado · retirada hoje 18h30",
};
