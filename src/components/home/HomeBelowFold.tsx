import type { ReactNode } from "react";
import { Futuro } from "@/components/Futuro";
import { BeforeAfter } from "@/components/home/BeforeAfter";
import { BentoFeatures } from "@/components/home/BentoFeatures";
import { LossCalculator } from "@/components/home/LossCalculator";
import { MessagePath } from "@/components/home/MessagePath";
import { PlatformShowcase } from "@/components/home/PlatformShowcase";
import { RealUseCases } from "@/components/home/RealUseCases";
import { SegmentSelector } from "@/components/home/SegmentSelector";

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
