"use client";

import { useSyncExternalStore } from "react";

function subscribeNoop() {
  return () => {};
}

export function CurrentYear({ fallback = 2026 }: { fallback?: number }) {
  const year = useSyncExternalStore(
    subscribeNoop,
    () => new Date().getFullYear(),
    () => fallback,
  );
  return year;
}
