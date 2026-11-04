import { brand } from "@/config/brand";
import { isBrandPlaceholder } from "@/lib/brand-display";

/** Campos jurídicos expostos nas páginas legais — sempre derivados de brand.ts. */
export const legalCompany = {
  razaoSocial: brand.company.razaoSocial,
  cnpj: brand.company.cnpj,
  endereco: brand.company.endereco,
  emailEncarregado: brand.lgpd.encarregadoEmail,
  emailContato: brand.contact.emailContato,
  foro: brand.company.foro,
  dataVigencia: brand.legal.dataVigencia,
} as const;

export type LegalCompany = typeof legalCompany;

const LEGAL_DRAFT_FIELDS = [
  brand.company.razaoSocial,
  brand.company.cnpj,
  brand.company.endereco,
  brand.lgpd.encarregadoEmail,
  brand.contact.emailContato,
  brand.company.foro,
] as const;

export function legalFieldHasPlaceholder(value: string): boolean {
  return isBrandPlaceholder(value);
}

export function isLegalDraft(): boolean {
  return LEGAL_DRAFT_FIELDS.some(isBrandPlaceholder);
}

export function missingLegalCompanyFields(): (keyof LegalCompany)[] {
  const draftKeys: (keyof LegalCompany)[] = [
    "razaoSocial",
    "cnpj",
    "endereco",
    "emailEncarregado",
    "emailContato",
    "foro",
  ];
  return draftKeys.filter((key) =>
    legalFieldHasPlaceholder(String(legalCompany[key])),
  );
}

export function legalCompanyDisplayName(): string {
  return isBrandPlaceholder(legalCompany.razaoSocial)
    ? "4Traders"
    : legalCompany.razaoSocial;
}
