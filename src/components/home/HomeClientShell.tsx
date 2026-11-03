"use client";

import dynamic from "next/dynamic";

const HomeNavTheme = dynamic(
  () =>
    import("@/components/home/HomeNavTheme").then((m) => ({
      default: m.HomeNavTheme,
    })),
  { ssr: false },
);

const HomeSmoothScroll = dynamic(
  () =>
    import("@/components/home/HomeSmoothScroll").then((m) => ({
      default: m.HomeSmoothScroll,
    })),
  { ssr: false },
);

export function HomeClientShell() {
  return (
    <>
      <HomeNavTheme />
      <HomeSmoothScroll />
    </>
  );
}
