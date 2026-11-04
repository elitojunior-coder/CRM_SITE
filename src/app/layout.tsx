import type { Metadata } from "next";
import type { ReactNode } from "react";
import {
  Bricolage_Grotesque,
  Geist,
  Geist_Mono,
  Instrument_Serif,
  Manrope,
} from "next/font/google";
import { brand } from "@/config/brand";
import { productSloganDisplay, siteBrandSuffix } from "@/lib/brand-display";
import "./globals.css";

const geist = Geist({
  variable: "--font-geist",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

const instrumentSerif = Instrument_Serif({
  variable: "--font-instrument-serif",
  subsets: ["latin"],
  weight: "400",
  display: "swap",
});

const bricolage = Bricolage_Grotesque({
  variable: "--font-bricolage",
  subsets: ["latin"],
  display: "swap",
});

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
  display: "swap",
});

const siteUrl =
  !brand.product.domain.startsWith("[")
    ? `https://${brand.product.domain}`
    : (process.env.NEXT_PUBLIC_SITE_URL ?? "http://127.0.0.1:3200");

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: siteBrandSuffix(),
    template: `%s · ${siteBrandSuffix()}`,
  },
  description: productSloganDisplay(),
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html
      lang="pt-BR"
      className={`${geist.variable} ${geistMono.variable} ${instrumentSerif.variable} ${bricolage.variable} ${manrope.variable} theme-display-a theme-accent-primary h-full`}
    >
      <body className="min-h-full flex flex-col antialiased">{children}</body>
    </html>
  );
}
