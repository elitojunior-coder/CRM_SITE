"use client";

import type { ReactNode } from "react";
import { cn } from "@/lib/cn";
import { PHONE_ASPECT } from "@/components/home/phone-styles";

export { PHONE_ASPECT };

type PhoneSize = "hero" | "story";

const widthBySize: Record<PhoneSize, string> = {
  hero: "w-[min(100%,340px)] lg:w-[400px]",
  story: "w-[min(100%,340px)] lg:w-[390px]",
};

type WhatsAppPhoneShellProps = {
  size?: PhoneSize;
  name?: string;
  status?: string;
  children: ReactNode;
  className?: string;
  footer?: ReactNode;
};

export function WhatsAppPhoneShell({
  size = "hero",
  name = "Atendimento",
  status = "online",
  children,
  className,
  footer,
}: WhatsAppPhoneShellProps) {
  return (
    <div
      className={cn(
        "relative mx-auto shrink-0 rounded-[2.4rem] border border-white/10 bg-[#111] p-2 shadow-[0_40px_80px_rgb(0_0_0/0.55)]",
        widthBySize[size],
        className,
      )}
      style={{ aspectRatio: PHONE_ASPECT, height: "auto" }}
      aria-hidden={false}
    >
      <div
        className="absolute left-1/2 top-2.5 z-20 h-6 w-[5.5rem] -translate-x-1/2 rounded-full bg-black/85"
        aria-hidden
      />
      <div className="flex h-full min-h-0 flex-col overflow-hidden rounded-[2rem] bg-[#ECE5DD]">
        <div className="relative z-10 shrink-0 bg-[#075E54] px-3.5 pb-2.5 pt-9 text-white">
          <div className="flex items-center gap-2.5">
            <div className="size-9 shrink-0 rounded-full bg-[#128C7E]/80 ring-2 ring-white/20" />
            <div className="min-w-0">
              <p className="truncate text-sm font-semibold">{name}</p>
              <p className="text-[11px] text-white/80">{status}</p>
            </div>
          </div>
        </div>
        <div
          className="relative min-h-0 flex-1 overflow-hidden bg-[#ECE5DD]"
          style={{
            backgroundImage:
              "radial-gradient(circle at 20% 30%, rgb(255 255 255 / 0.35) 0%, transparent 45%), radial-gradient(circle at 80% 70%, rgb(0 0 0 / 0.04) 0%, transparent 40%)",
          }}
        >
          <div className="absolute inset-x-0 bottom-0 top-0 flex flex-col justify-end gap-2 overflow-hidden p-3 pb-2">
            {children}
          </div>
        </div>
        {footer ?? (
          <div className="shrink-0 border-t border-black/5 bg-[#F0F0F0] px-2 py-2">
            <div className="flex items-center gap-2 rounded-full bg-white px-3 py-2 text-[11px] text-[#667781] shadow-sm">
              <span className="flex-1">Mensagem</span>
              <span className="size-7 rounded-full bg-[#075E54]/90" aria-hidden />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export function ChatBubble({
  side,
  children,
  time = "14:32",
  ticks,
  className,
}: {
  side: "in" | "out";
  children: ReactNode;
  time?: string;
  ticks?: boolean;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "max-w-[92%] shrink-0 rounded-2xl px-3 py-2 text-[12px] leading-snug shadow-sm will-change-[transform,opacity]",
        side === "out"
          ? "ml-auto rounded-br-md bg-[#DCF8C6] text-[#111]"
          : "mr-auto rounded-bl-md border border-[#000]/5 bg-white text-on-light text-[#111]",
        className,
      )}
    >
      {children}
      <div
        className={cn(
          "mt-1 flex items-center justify-end gap-1 text-[10px]",
          side === "out" ? "text-[#667781]" : "text-ink-subtle",
        )}
      >
        <span className="tabular-nums">{time}</span>
        {ticks ? (
          <span className="text-[#53BDEB]" aria-label="Lida">
            ✓✓
          </span>
        ) : null}
      </div>
    </div>
  );
}
