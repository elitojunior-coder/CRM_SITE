import {
  Globe,
  InstagramLogo,
  WhatsappLogo,
} from "@phosphor-icons/react/dist/ssr";
import type { PipelineCard, PipelineChannel } from "../../../content/demo/pipeline";
import { formatPipelineBrl } from "../../../content/demo/pipeline";
import { cn } from "@/lib/cn";

function ChannelIcon({ channel }: { channel: PipelineChannel }) {
  const cls = "size-3.5 shrink-0 opacity-70";
  if (channel === "whatsapp") return <WhatsappLogo className={cls} weight="fill" />;
  if (channel === "instagram") return <InstagramLogo className={cls} weight="fill" />;
  return <Globe className={cls} weight="duotone" />;
}

type PipelineCardViewProps = {
  card: PipelineCard;
  dragging?: boolean;
  className?: string;
};

export function PipelineCardView({
  card,
  dragging = false,
  className,
}: PipelineCardViewProps) {
  return (
    <article
      data-pipeline-card={card.id}
      data-pipeline-column={card.columnId}
      className={cn(
        "pipeline-card rounded-lg border border-[#e8e4dc] bg-white p-2.5 shadow-[0_1px_0_rgba(15,23,42,0.04)] transition-opacity duration-150",
        dragging && "pointer-events-none opacity-0",
        className,
      )}
      aria-hidden={dragging || undefined}
    >
      <div className="flex items-start justify-between gap-2">
        <div className="flex min-w-0 items-center gap-2">
          <span
            className="flex size-7 shrink-0 items-center justify-center rounded-full text-[11px] font-semibold text-white"
            style={{ backgroundColor: card.avatarColor }}
          >
            {card.initials}
          </span>
          <div className="min-w-0">
            <p className="truncate text-[12px] font-semibold leading-tight text-[#1c1917]">
              {card.name}
            </p>
            <p className="text-[12px] font-medium text-[#57534e]">
              {formatPipelineBrl(card.valueCents)}
            </p>
          </div>
        </div>
        <ChannelIcon channel={card.channel} />
      </div>
      <div className="mt-2 flex flex-wrap gap-1">
        {card.tags.map((tag) => (
          <span
            key={tag}
            className="rounded bg-[#f5f2eb] px-1.5 py-0.5 text-[10px] font-medium leading-snug text-[#57534e]"
          >
            {tag}
          </span>
        ))}
        {card.aiHandled ? (
          <span className="rounded bg-[#FF5B2E]/12 px-1.5 py-0.5 text-[10px] font-semibold text-[#E84E24]">
            IA
          </span>
        ) : null}
        {card.newMessagePulse ? (
          <span
            data-pipeline-pulse="new-message"
            className="rounded bg-[#0E3B43]/10 px-1.5 py-0.5 text-[10px] font-semibold leading-snug text-[#0E3B43]"
          >
            nova msg
          </span>
        ) : null}
        {card.aiResponding ? (
          <span
            data-pipeline-pulse="ai-typing"
            className="shrink-0 rounded bg-[#FF5B2E]/10 px-1.5 py-0.5 text-[10px] font-semibold leading-snug text-[#E84E24]"
            title="IA respondendo"
          >
            Respondendo
          </span>
        ) : null}
      </div>
      <div className="mt-2 flex items-center justify-between gap-2 text-[11px] text-[#78716c]">
        <span>{card.timeAgo}</span>
        <span
          className="flex size-6 items-center justify-center rounded-full text-[10px] font-semibold text-white"
          style={{ backgroundColor: card.ownerColor }}
          title="Responsável"
        >
          {card.ownerInitials}
        </span>
      </div>
    </article>
  );
}
