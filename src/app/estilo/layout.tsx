import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  title: "Guia de estilo (interno)",
  robots: {
    index: false,
    follow: false,
  },
};

export default function EstiloLayout({
  children,
}: {
  children: ReactNode;
}) {
  return children;
}
