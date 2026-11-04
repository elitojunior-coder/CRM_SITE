import type { MetadataRoute } from "next";
import { brand } from "@/config/brand";
import { isBrandPlaceholder } from "@/lib/brand-display";

const siteUrl =
  !isBrandPlaceholder(brand.product.domain)
    ? `https://${brand.product.domain}`
    : (process.env.NEXT_PUBLIC_SITE_URL ?? "http://127.0.0.1:3200");

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/estilo"],
    },
    sitemap: `${siteUrl}/sitemap.xml`,
  };
}
