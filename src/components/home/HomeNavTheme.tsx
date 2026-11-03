"use client";

import { useEffect } from "react";

/** Ativa cabeçalho escuro na home. */
export function HomeNavTheme() {
  useEffect(() => {
    document.documentElement.setAttribute("data-home-nav", "");
    return () => {
      document.documentElement.removeAttribute("data-home-nav");
    };
  }, []);
  return null;
}
