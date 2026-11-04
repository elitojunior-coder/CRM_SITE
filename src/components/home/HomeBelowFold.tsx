"use client";

import dynamic from "next/dynamic";
import type { ReactNode } from "react";
import { Futuro } from "@/components/Futuro";

const BeforeAfter = dynamic(
  () =>
    import("@/components/home/BeforeAfter").then((m) => ({
      default: m.BeforeAfter,
    })),
  { ssr: true },
);

const PlatformShowcase = dynamic(
  () =>
    import("@/components/home/PlatformShowcase").then((m) => ({
      default: m.PlatformShowcase,
    })),
  { ssr: false },
);

const MessagePath = dynamic(
  () =>
    import("@/components/home/MessagePath").then((m) => ({
      default: m.MessagePath,
    })),
  { ssr: false },
);

const SegmentSelector = dynamic(
  () =>
    import("@/components/home/SegmentSelector").then((m) => ({
      default: m.SegmentSelector,
    })),
  { ssr: false },
);

const LossCalculator = dynamic(
  () =>
    import("@/components/home/LossCalculator").then((m) => ({
      default: m.LossCalculator,
    })),
  { ssr: true },
);

const BentoFeatures = dynamic(
  () =>
    import("@/components/home/BentoFeatures").then((m) => ({
      default: m.BentoFeatures,
    })),
  { ssr: false },
);

const RealUseCases = dynamic(
  () =>
    import("@/components/home/RealUseCases").then((m) => ({
      default: m.RealUseCases,
    })),
  { ssr: true },
);

function SectionGap({ children }: { children: ReactNode }) {
  return <div className="mt-16 md:mt-20">{children}</div>;
}

export function HomeBelowFold() {
  return (
    <>
      <BeforeAfter />
      <SectionGap>
        <PlatformShowcase />
      </SectionGap>
      <SectionGap>
        <MessagePath />
      </SectionGap>
      <SectionGap>
        <SegmentSelector />
      </SectionGap>
      <SectionGap>
        <LossCalculator />
      </SectionGap>
      <SectionGap>
        <BentoFeatures />
      </SectionGap>
      <Futuro flag="mostrarCasos">
        <SectionGap>
          <RealUseCases />
        </SectionGap>
      </Futuro>
    </>
  );
}
