import {
  demoBySegmentId,
  type DemoIntent,
  type DemoResponder,
  type DemoResponderInput,
  type DemoResponderOutput,
} from "../../../content/demo/index";

const intentPatterns: Record<DemoIntent, RegExp[]> = {
  preco: [
    /quanto\s+custa/i,
    /valor/i,
    /preço|preco/i,
    /orçamento|orcamento/i,
    /fica\s+quanto/i,
  ],
  horario: [
    /hor[aá]rio/i,
    /agenda/i,
    /marca/i,
    /visita/i,
    /amanhã|amanha|hoje|semana/i,
    /\d{1,2}[h:]/i,
  ],
  urgencia: [/urgente/i, /rápido|rapido/i, /hoje/i, /agora/i, /encaixe/i],
  localizacao: [
    /onde/i,
    /endereço|endereco/i,
    /bairro/i,
    /cidade/i,
    /região|regiao/i,
    /atende/i,
    /cep/i,
  ],
  outro: [],
};

function detectIntent(message: string): DemoIntent {
  const normalized = message.trim();
  for (const intent of [
    "preco",
    "horario",
    "urgencia",
    "localizacao",
  ] as const) {
    if (intentPatterns[intent].some((re) => re.test(normalized))) {
      return intent;
    }
  }
  return "outro";
}

function typingDuration(text: string) {
  const base = 700;
  const perChar = 22;
  return Math.min(4200, base + text.length * perChar);
}

/** Implementação roteirizada — troque por agente real mantendo `DemoResponder`. */
export const keywordDemoResponder: DemoResponder = {
  respond(input: DemoResponderInput): DemoResponderOutput {
    const script = demoBySegmentId[input.segmentId];
    const intent = detectIntent(input.message);
    const reply = script.responses[intent];
    return {
      intent,
      reply,
      chips: script.chips,
      confirmedSlot: script.confirmedSlot,
      typingMs: typingDuration(reply),
    };
  },
};
