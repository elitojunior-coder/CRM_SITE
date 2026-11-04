"use client";

import { Microphone, Paperclip, Smiley } from "@phosphor-icons/react";
import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

export { PHONE_ASPECT } from "@/components/home/phone-styles";

const CHAT_WALLPAPER =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200' viewBox='0 0 200 200'%3E%3Cg fill='%23b8a99a' fill-opacity='0.11'%3E%3Ccircle cx='28' cy='36' r='3'/%3E%3Ccircle cx='92' cy='18' r='2'/%3E%3Ccircle cx='160' cy='52' r='2.5'/%3E%3Ccircle cx='48' cy='120' r='2'/%3E%3Ccircle cx='130' cy='140' r='3'/%3E%3Ccircle cx='170' cy='170' r='2'/%3E%3Cpath d='M70 80h12v2H70zM110 100h16v2h-16z'/%3E%3C/g%3E%3C/svg%3E\")";

type WhatsAppPhoneShellProps = {
  name?: string;
  status?: string;
  children: ReactNode;
  className?: string;
  footer?: ReactNode;
};

/** WhatsApp-style chat UI for inside DeviceFrame — not a device bezel. */
export function WhatsAppPhoneShell({
  name = "Atendimento",
  status = "online",
  children,
  className,
  footer,
}: WhatsAppPhoneShellProps) {
  return (
    <div
      className={cn(
        "flex h-full min-h-0 w-full flex-col overflow-hidden bg-[#E8E0D5]",
        className,
      )}
    >
      <div className="relative z-10 shrink-0 bg-[#075E54] px-3 pb-2.5 pt-2 text-white">
        <div className="flex items-center gap-2.5">
          <div className="size-9 shrink-0 rounded-full bg-[#128C7E]/85 ring-2 ring-white/15" />
          <div className="min-w-0">
            <p className="text-sm font-semibold leading-tight break-words">{name}</p>
            <p className="text-[11px] text-white/80">{status}</p>
          </div>
        </div>
      </div>
      <div
        className="relative min-h-0 flex-1 overflow-hidden bg-[#E8E0D5]"
        style={{
          backgroundImage: `${CHAT_WALLPAPER}, radial-gradient(circle at 15% 20%, rgb(255 255 255 / 0.35) 0%, transparent 42%), radial-gradient(circle at 85% 75%, rgb(0 0 0 / 0.04) 0%, transparent 38%)`,
          backgroundSize: "200px 200px, auto, auto",
        }}
      >
        <div className="absolute inset-0 flex flex-col justify-end gap-2 overflow-y-auto overflow-x-hidden p-3 pb-2 pt-2 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {children}
        </div>
      </div>
      {footer ?? (
        <div className="shrink-0 border-t border-black/5 bg-[#F0F0F0] px-2 py-2">
          <div className="flex items-center gap-1.5 rounded-full bg-white px-2 py-1.5 text-[#667781] shadow-sm">
            <Smiley size={18} weight="regular" className="shrink-0 opacity-70" aria-hidden />
            <Paperclip size={18} weight="regular" className="shrink-0 opacity-70" aria-hidden />
            <span className="min-w-0 flex-1 truncate px-1 text-[11px]">Mensagem</span>
            <Microphone size={18} weight="regular" className="shrink-0 opacity-70" aria-hidden />
            <span
              className="flex size-7 shrink-0 items-center justify-center rounded-full bg-[#075E54] text-[10px] font-bold text-white"
              aria-hidden
            >
              →
            </span>
          </div>
        </div>
      )}
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
          : "chat-bubble-light mr-auto rounded-bl-md border border-[#000]/5 bg-white text-[#111]",
        className,
      )}
    >
      <div className={side === "in" ? "text-[#111]" : undefined}>{children}</div>
      <div className="mt-1 flex items-center justify-end gap-1 text-[10px] text-[#667781]">
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
