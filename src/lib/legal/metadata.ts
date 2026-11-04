import type { Metadata } from "next";
import { isLegalDraft } from "@/lib/legal/company";

export function legalPageMetadata(
  title: string,
  pathname: `/${string}`,
  description: string,
): Metadata {
  const draft = isLegalDraft();
  return {
    title,
    description,
    alternates: { canonical: pathname },
    ...(draft
      ? {
          robots: {
            index: false,
            follow: true,
            googleBot: { index: false, follow: true },
          },
        }
      : {}),
  };
}
