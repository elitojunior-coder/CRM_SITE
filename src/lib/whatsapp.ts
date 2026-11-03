import { brand } from "@/config/brand";

const UTM_STORAGE_KEY = "crm_site_utms";

export type UtmParams = {
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  utm_content?: string;
  utm_term?: string;
};

export function parseUtmsFromSearch(search: string): UtmParams {
  const params = new URLSearchParams(search);
  const utms: UtmParams = {};
  for (const key of [
    "utm_source",
    "utm_medium",
    "utm_campaign",
    "utm_content",
    "utm_term",
  ] as const) {
    const value = params.get(key);
    if (value) utms[key] = value;
  }
  return utms;
}

export function persistUtms(utms: UtmParams): void {
  if (typeof window === "undefined") return;
  if (Object.keys(utms).length === 0) return;
  try {
    const existing = getStoredUtms();
    sessionStorage.setItem(
      UTM_STORAGE_KEY,
      JSON.stringify({ ...existing, ...utms }),
    );
  } catch {
    /* sessionStorage indisponível */
  }
}

export function getStoredUtms(): UtmParams {
  if (typeof window === "undefined") return {};
  try {
    const raw = sessionStorage.getItem(UTM_STORAGE_KEY);
    if (!raw) return {};
    return JSON.parse(raw) as UtmParams;
  } catch {
    return {};
  }
}

export function buildWhatsAppUrl(options: {
  kind: "vendas" | "suporte";
  pageOrigin: string;
  baseMessage?: string;
  utms?: UtmParams;
}): string {
  const cfg =
    options.kind === "vendas"
      ? brand.contact.whatsappVendas
      : brand.contact.whatsappSuporte;

  const parts = [
    options.baseMessage ?? cfg.defaultMessage,
    options.pageOrigin ? `Vim pela ${options.pageOrigin}.` : "",
  ].filter(Boolean);

  const utms = options.utms ?? {};
  const utmLabels = Object.entries(utms)
    .map(([k, v]) => `${k}=${v}`)
    .join("&");
  if (utmLabels) parts.push(`(${utmLabels})`);

  const text = encodeURIComponent(parts.join(" "));
  const number = cfg.number.replace(/\D/g, "");
  return `https://wa.me/${number}?text=${text}`;
}
