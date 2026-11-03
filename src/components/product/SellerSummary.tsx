import { ChatTeardropText, Clock, WarningCircle } from "@phosphor-icons/react/dist/ssr";
import { cn } from "@/lib/cn";

type SellerSummaryProps = {
  className?: string;
};

export function SellerSummary({ className }: SellerSummaryProps) {
  return (
    <aside
      className={cn(
        "rounded-xl border border-line border-l-4 border-l-accent bg-surface-raised p-5 shadow-sm",
        className,
      )}
      aria-label="Resumo enviado ao vendedor humano"
    >
      <div className="mb-3 flex items-center gap-2">
        <ChatTeardropText size={22} weight="regular" className="text-accent" aria-hidden />
        <div>
          <p className="text-xs font-medium tracking-wide text-ink-muted uppercase">
            Passagem para humano
          </p>
          <h3 className="font-display text-base text-ink">Resumo do atendimento</h3>
        </div>
      </div>

      <ul className="space-y-2 text-sm text-ink">
        <li>
          <strong className="font-medium">Motivo:</strong> pediu orçamento e horário
          ainda hoje.
        </li>
        <li>
          <strong className="font-medium">Perfil:</strong> residência em Campinas;
          preferência 16h.
        </li>
        <li>
          <strong className="font-medium">Histórico:</strong> veio de anúncio; áudio
          transcrito; dados confirmados no chat.
        </li>
        <li className="flex items-start gap-2 rounded-md bg-surface p-2 text-ink-muted">
          <WarningCircle size={18} weight="regular" className="mt-0.5 shrink-0 text-accent" aria-hidden />
          Cliente pediu resposta rápida — entrar em contato antes da demo.
        </li>
      </ul>

      <p className="mt-4 flex items-center gap-1.5 text-xs text-ink-muted">
        <Clock size={14} weight="regular" aria-hidden />
        Enviado há 2 min · conversa completa anexada
      </p>
    </aside>
  );
}
