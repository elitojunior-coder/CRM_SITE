"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";
import { useSyncExternalStore } from "react";
import {
  buildWhatsAppUrl,
  getStoredUtms,
  parseUtmsFromSearch,
  persistUtms,
} from "@/lib/whatsapp";
import { cn } from "@/lib/cn";

const PAGE_ORIGINS: Record<string, string> = {
  "/": "página inicial",
};

function subscribeNoop() {
  return () => {};
}

function getClientWhatsAppHref(
  kind: "vendas" | "suporte",
  pageOrigin: string,
  messageOverride?: string,
): string {
  persistUtms(parseUtmsFromSearch(window.location.search));
  return buildWhatsAppUrl({
    kind,
    pageOrigin,
    baseMessage: messageOverride,
    utms: getStoredUtms(),
  });
}

type WhatsAppLinkProps = {
  kind?: "vendas" | "suporte";
  className?: string;
  children: ReactNode;
  id?: string;
  originOverride?: string;
  messageOverride?: string;
  onClick?: () => void;
  "aria-label"?: string;
};

export function WhatsAppLink({
  kind = "vendas",
  className,
  children,
  id,
  originOverride,
  messageOverride,
  onClick,
  "aria-label": ariaLabel,
}: WhatsAppLinkProps) {
  const pathname = usePathname();
  const pageOrigin = originOverride ?? PAGE_ORIGINS[pathname] ?? `página ${pathname}`;

  const href = useSyncExternalStore(
    subscribeNoop,
    () => getClientWhatsAppHref(kind, pageOrigin, messageOverride),
    () => "#",
  );

  return (
    <Link
      id={id}
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(className)}
      onClick={onClick}
      aria-label={ariaLabel}
      suppressHydrationWarning
    >
      {children}
    </Link>
  );
}
