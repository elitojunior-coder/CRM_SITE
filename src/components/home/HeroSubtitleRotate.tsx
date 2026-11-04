"use client";

import { WordRotate } from "@/components/ui/word-rotate";

const SEGMENTS = [
  "clínicas",
  "imobiliárias",
  "lojas",
  "barbearias",
  "clínicas odontológicas",
];

export function HeroSubtitleRotate() {
  return (
    <p className="mt-6 max-w-xl text-pretty text-lg leading-relaxed text-ink-muted-on-dark md:text-xl md:leading-relaxed">
      Agentes de IA para{" "}
      <WordRotate
        words={SEGMENTS}
        duration={2800}
        className="font-display italic text-accent"
        motionProps={{
          initial: { opacity: 1, y: 0 },
          animate: { opacity: 1, y: 0 },
          exit: { opacity: 0, y: -12 },
          transition: { duration: 0.22, ease: "easeOut" },
        }}
      />{" "}
      no WhatsApp e no site em segundos: entendem áudio, qualificam, agendam e
      passam para o seu time com tudo resumido.
    </p>
  );
}
