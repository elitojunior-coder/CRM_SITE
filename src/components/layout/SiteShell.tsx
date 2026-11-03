import type { ReactNode } from "react";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { SkipLink } from "@/components/layout/SkipLink";
import { WhatsAppFloat } from "@/components/layout/WhatsAppFloat";

type SiteShellProps = {
  children: ReactNode;
  showFloat?: boolean;
};

export function SiteShell({ children, showFloat = true }: SiteShellProps) {
  return (
    <>
      <SkipLink />
      <Header />
      <main id="conteudo-principal" className="flex-1 pt-16">
        {children}
      </main>
      <Footer />
      {showFloat ? <WhatsAppFloat /> : null}
    </>
  );
}
