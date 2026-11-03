import { barbeariaDemo } from "./barbearia";
import { clinicaDemo } from "./clinica";
import { energiaSolarDemo } from "./energia-solar";
import { imobiliariaDemo } from "./imobiliaria";
import { lojaDemo } from "./loja";
import { servicosDemo } from "./servicos";
import type { DemoScript } from "./types";

export type { DemoIntent, DemoResponder, DemoResponderInput, DemoResponderOutput, DemoScript } from "./types";

export const demoScripts: DemoScript[] = [
  clinicaDemo,
  energiaSolarDemo,
  imobiliariaDemo,
  barbeariaDemo,
  lojaDemo,
  servicosDemo,
];

export const demoBySegmentId = Object.fromEntries(
  demoScripts.map((s) => [s.segmentId, s]),
) as Record<DemoScript["segmentId"], DemoScript>;
