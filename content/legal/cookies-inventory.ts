/**
 * Inventário declarado na política de cookies.
 * Atualize após scripts/inspect-cookies.mjs (build + Playwright).
 */
export type CookieEntry = {
  nome: string;
  tipo: "essencial" | "analitico" | "marketing" | "funcional";
  finalidade: string;
  duracao: string;
  origem: string;
};

/** Scripts de terceiros carregados no site (não na aplicação logada). */
export type SiteScriptEntry = {
  origem: string;
  finalidade: string;
  requerConsentimento: boolean;
};

/** Preenchido com base na inspeção real — ver relatório S1-B. */
export const siteCookies: CookieEntry[] = [];

export const siteScripts: SiteScriptEntry[] = [];

/** true = exibir banner e só carregar scripts não essenciais após aceite. */
export const requiresCookieConsent = siteScripts.some((s) => s.requerConsentimento);
