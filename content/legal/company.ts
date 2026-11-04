/**
 * Dados jurídicos da controladora (site e contas).
 * Enquanto houver marcadores "[...]", as páginas legais ficam em rascunho (noindex, fora do sitemap).
 */
export const legalCompany = {
  razaoSocial: "[RAZÃO SOCIAL]",
  cnpj: "[CNPJ]",
  endereco: "[ENDEREÇO]",
  emailEncarregado: "[E-MAIL DO ENCARREGADO]",
  emailContato: "[E-MAIL DE CONTATO]",
  foro: "[COMARCA]",
  /** Data de vigência das políticas (ISO ou dd/mm/aaaa). */
  dataVigencia: "04/11/2026",
} as const;

export type LegalCompany = typeof legalCompany;
