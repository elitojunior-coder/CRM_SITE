"use client";

import dynamic from "next/dynamic";

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
      <BeforeAfter />
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
