"use client";

import dynamic from "next/dynamic";

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

const ExampleDashboard = dynamic(
  () =>
    import("@/components/home/ExampleDashboard").then((m) => ({
      default: m.ExampleDashboard,
    })),
  { ssr: false },
);

const CompareColumns = dynamic(
  () =>
    import("@/components/home/CompareColumns").then((m) => ({
      default: m.CompareColumns,
    })),
  { ssr: true },
);

const RealUseCases = dynamic(
  () =>
    import("@/components/home/RealUseCases").then((m) => ({
      default: m.RealUseCases,
    })),
  { ssr: true },
);

const BeforeAfter = dynamic(
  () =>
    import("@/components/home/BeforeAfter").then((m) => ({
      default: m.BeforeAfter,
    })),
  { ssr: true },
);

const ScrollStory = dynamic(
  () =>
    import("@/components/home/ScrollStory").then((m) => ({
      default: m.ScrollStory,
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

export function HomeBelowFold() {
  return (
    <>
      <PlatformShowcase />
      <div className="mt-24">
        <MessagePath />
      </div>
      <div className="mt-24">
        <ExampleDashboard />
      </div>
      <div className="mt-24">
        <CompareColumns />
      </div>
      <div className="mt-24">
        <RealUseCases />
      </div>
      <div className="mt-24">
        <BeforeAfter />
      </div>
      <div className="mt-24">
        <ScrollStory />
      </div>
      <div className="mt-24">
        <SegmentSelector />
      </div>
      <div className="mt-24">
        <LossCalculator />
      </div>
      <div className="mt-24">
        <BentoFeatures />
      </div>
    </>
  );
}
