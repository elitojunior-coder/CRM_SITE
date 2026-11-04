import { isLegalDraft } from "@/lib/legal/company";

export function LegalDraftBanner() {
  if (!isLegalDraft()) return null;
  return (
    <div
      role="status"
      className="border-b border-amber-700/30 bg-amber-100 px-5 py-3 text-center text-sm font-medium text-amber-950 md:px-8"
    >
      Rascunho em revisão — conteúdo provisório para análise jurídica. Não use como
      versão final.
    </div>
  );
}
