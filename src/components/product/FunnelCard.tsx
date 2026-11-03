import { ArrowRight, UserCircle } from "@phosphor-icons/react/dist/ssr";
import { Badge } from "@/components/ui/Badge";
import { cn } from "@/lib/cn";

type FunnelCardProps = {
  className?: string;
};

export function FunnelCard({ className }: FunnelCardProps) {
  return (
    <div
      className={cn(
        "rounded-xl border border-line bg-surface-raised p-5 shadow-sm",
        className,
      )}
      aria-label="Card de lead no funil de vendas"
    >
      <div className="mb-4 flex items-start justify-between gap-3">
        <div>
          <p className="text-xs font-medium tracking-wide text-ink-muted uppercase">
            Funil · Qualificação
          </p>
          <h3 className="font-display text-lg text-ink">Mariana Costa</h3>
          <p className="text-sm text-ink-muted">WhatsApp · Campinas/SP</p>
        </div>
        <Badge tone="success">Quente</Badge>
      </div>

      <dl className="mb-4 grid gap-2 text-sm">
        <div className="flex justify-between gap-4 border-b border-line/60 pb-2">
          <dt className="text-ink-muted">Interesse</dt>
          <dd className="font-medium text-ink">Orçamento residencial</dd>
        </div>
        <div className="flex justify-between gap-4 border-b border-line/60 pb-2">
          <dt className="text-ink-muted">Próximo passo</dt>
          <dd className="font-medium text-ink">Demo às 16h</dd>
        </div>
        <div className="flex justify-between gap-4">
          <dt className="text-ink-muted">Responsável</dt>
          <dd className="flex items-center gap-1.5 font-medium text-ink">
            <UserCircle size={18} weight="regular" aria-hidden />
            Equipe comercial
          </dd>
        </div>
      </dl>

      <div className="flex items-center justify-between rounded-lg bg-surface px-3 py-2 text-xs text-ink-muted">
        <span>Arraste entre etapas ou automatize regras</span>
        <ArrowRight size={16} weight="regular" aria-hidden />
      </div>
    </div>
  );
}
