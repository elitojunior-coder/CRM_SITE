import { brand } from "@/config/brand";

/** Valor ainda não preenchido em brand.ts (marcador interno). */
export function isBrandPlaceholder(value: string): boolean {
  return value.startsWith("[");
}

export function productNameOrNull(): string | null {
  return isBrandPlaceholder(brand.product.name) ? null : brand.product.name;
}

/** Sufixo neutro para título da aba quando o nome do produto não foi definido. */
export function siteBrandSuffix(): string {
  return productNameOrNull() ?? "Atendimento IA";
}

export function productSloganDisplay(): string {
  return isBrandPlaceholder(brand.product.slogan)
    ? "Agentes de IA no WhatsApp e no site — qualificam, agendam e passam para sua equipe."
    : brand.product.slogan;
}

export function brandField(value: string, fallback = ""): string {
  return isBrandPlaceholder(value) ? fallback : value;
}

/** Inicial para monograma quando há nome; senão null (use o ícone neutro). */
export function productMonogramLetter(): string | null {
  const name = productNameOrNull();
  if (!name) return null;
  const ch = name.trim()[0];
  return ch ? ch.toUpperCase() : null;
}
