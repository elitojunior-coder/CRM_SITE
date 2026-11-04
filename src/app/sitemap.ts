import type { MetadataRoute } from "next";
import { brand } from "@/config/brand";
import { isBrandPlaceholder } from "@/lib/brand-display";
import { isLegalDraft } from "@/lib/legal/company";

const siteUrl =
  !isBrandPlaceholder(brand.product.domain)
    ? `https://${brand.product.domain}`
    : (process.env.NEXT_PUBLIC_SITE_URL ?? "http://127.0.0.1:3200");

const legalPaths = [
  "/termos",
  "/privacidade",
  "/cookies",
  "/lgpd",
  "/exclusao-de-dados",
  "/suboperadores",
  "/seguranca",
] as const;

export default function sitemap(): MetadataRoute.Sitemap {
  const entries: MetadataRoute.Sitemap = [
    {
      url: `${siteUrl}/`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
  ];

  if (!isLegalDraft()) {
    for (const path of legalPaths) {
      entries.push({
        url: `${siteUrl}${path}`,
        lastModified: new Date(),
        changeFrequency: "monthly",
        priority: 0.5,
      });
    }
  }

  return entries;
}
