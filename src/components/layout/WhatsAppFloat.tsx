"use client";

import { WhatsappLogo } from "@phosphor-icons/react";
import { usePathname } from "next/navigation";
import { useMemo } from "react";
import { WhatsAppLink } from "@/components/layout/WhatsAppLink";

export function WhatsAppFloat() {
  const pathname = usePathname();
  const originOverride = useMemo(() => {
    if (pathname === "/") return "página inicial";
    if (pathname === "/estilo") return "página de estilo";
    return `página ${pathname}`;
  }, [pathname]);

  return (
    <WhatsAppLink
      kind="vendas"
      originOverride={originOverride}
      className="fixed bottom-5 right-5 z-40 inline-flex size-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg transition-transform hover:scale-[1.03] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#25D366]/50 focus-visible:ring-offset-2 focus-visible:ring-offset-surface motion-reduce:transition-none"
      aria-label="Falar no WhatsApp"
    >
      <WhatsappLogo size={28} weight="regular" aria-hidden />
    </WhatsAppLink>
  );
}
