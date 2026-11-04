import { legalCompany, type LegalCompany } from "../../../content/legal/company";

export { legalCompany, type LegalCompany };

const PLACEHOLDER = /\[[^\]]+\]/;

export function legalFieldHasPlaceholder(value: string): boolean {
  return PLACEHOLDER.test(value);
}

export function isLegalDraft(): boolean {
  return Object.values(legalCompany).some(
    (value) => typeof value === "string" && legalFieldHasPlaceholder(value),
  );
}

export function missingLegalCompanyFields(): (keyof LegalCompany)[] {
  return (Object.keys(legalCompany) as (keyof LegalCompany)[]).filter((key) =>
    legalFieldHasPlaceholder(String(legalCompany[key])),
  );
}

export function legalCompanyDisplayName(): string {
  return legalFieldHasPlaceholder(legalCompany.razaoSocial)
    ? "4Traders"
    : legalCompany.razaoSocial;
}
