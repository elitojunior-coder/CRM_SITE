import type { SegmentoId } from "../segmentos/index";

export type DemoIntent =
  | "preco"
  | "horario"
  | "urgencia"
  | "localizacao"
  | "outro";

export type DemoChip = {
  label: string;
  value: string;
};

export type DemoScript = {
  segmentId: SegmentoId;
  label: string;
  /** Mensagens prontas que o visitante pode tocar */
  quickMessages: [string, string, string];
  /** Respostas por intenção detectada */
  responses: Record<DemoIntent, string>;
  chips: DemoChip[];
  confirmedSlot: string;
};

export type DemoResponderInput = {
  segmentId: SegmentoId;
  message: string;
};

export type DemoResponderOutput = {
  intent: DemoIntent;
  reply: string;
  chips: DemoChip[];
  confirmedSlot: string;
  typingMs: number;
};

export interface DemoResponder {
  respond(input: DemoResponderInput): DemoResponderOutput;
}
