import type { DemoScript } from "./types";

export const energiaSolarDemo: DemoScript = {
  segmentId: "energia-solar",
  label: "Energia solar",
  quickMessages: [
    "Quanto fica para uma casa de 120m²?",
    "Vocês atendem Campinas?",
    "Preciso de visita ainda esta semana",
  ],
  responses: {
    preco:
      "O investimento varia com consumo e telhado — projetos residenciais similares ficam em torno de R$ 28 mil. Sua conta passa de R$ 400?",
    horario:
      "Tenho visita técnica quinta 14h ou sexta 10h. Qual encaixa melhor?",
    urgencia:
      "Priorizo seu caso. Técnico disponível amanhã entre 15h e 17h — confirmo endereço?",
    localizacao:
      "Atendemos Campinas e região. Me passa o bairro que valido a rota do técnico.",
    outro:
      "Consigo orientar sobre potência, financiamento ou prazo de instalação. O que prefere?",
  },
  chips: [
    { label: "orçamento", value: "R$ 28 mil" },
    { label: "cidade", value: "Campinas" },
  ],
  confirmedSlot: "Visita técnica · quinta 14h",
};
