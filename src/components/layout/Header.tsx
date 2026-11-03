"use client";

import * as Dialog from "@radix-ui/react-dialog";
import { List, X } from "@phosphor-icons/react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { brand } from "@/config/brand";
import { Button } from "@/components/ui/Button";
import { IconButton } from "@/components/ui/Button";
import { WhatsAppLink } from "@/components/layout/WhatsAppLink";
import { cn } from "@/lib/cn";

const navLinks = [
  { href: "#plataforma", label: "Plataforma" },
  { href: "#caminho-mensagem", label: "Caminho" },
  { href: "#painel-exemplo", label: "Painel" },
  { href: "#comparativo", label: "Comparativo" },
  { href: "#como-funciona", label: "Como funciona" },
  { href: "#faq", label: "Dúvidas" },
];

export function Header() {
  const [open, setOpen] = useState(false);
  const [compact, setCompact] = useState(false);
  const [homeNav, setHomeNav] = useState(false);

  useEffect(() => {
    const root = document.documentElement;
    const syncHome = () => setHomeNav(root.hasAttribute("data-home-nav"));
    syncHome();
    const observer = new MutationObserver(syncHome);
    observer.observe(root, { attributes: true, attributeFilter: ["data-home-nav"] });

    const onScroll = () => setCompact(window.scrollY > 32);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  const agendarHref = brand.contact.agendamentoUrl.startsWith("[")
    ? "#demonstracao"
    : brand.contact.agendamentoUrl;

  return (
    <header
      data-compact={homeNav && compact ? "true" : undefined}
      className={cn(
        "fixed inset-x-0 top-0 z-50 border-b border-line/80 bg-surface/90 backdrop-blur-sm",
        homeNav && "border-b-0",
      )}
    >
      <div className="mx-auto flex h-16 max-w-[1280px] items-center justify-between gap-4 px-5 md:px-8">
        <Link
          href="/"
          className="font-display text-lg text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/40 focus-visible:ring-offset-2 focus-visible:ring-offset-surface"
        >
          {brand.product.name}
        </Link>

        <nav
          className="hidden items-center gap-6 lg:flex lg:gap-8"
          aria-label="Principal"
        >
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm text-ink-muted transition-colors hover:text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/40 focus-visible:ring-offset-2 focus-visible:ring-offset-surface"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-2 lg:flex">
          <WhatsAppLink
            id="whatsapp-vendas-header"
            data-header-secondary
            className={cn(
              "inline-flex items-center justify-center rounded-md border border-line bg-surface-raised px-4 py-2 text-sm font-medium text-ink transition-colors hover:border-ink-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/40 focus-visible:ring-offset-2 focus-visible:ring-offset-surface",
            )}
          >
            Falar no WhatsApp
          </WhatsAppLink>
          <Button href={agendarHref}>Agendar demonstração</Button>
        </div>

        <Dialog.Root open={open} onOpenChange={setOpen}>
          <Dialog.Trigger asChild>
            <IconButton className="header-menu-trigger lg:hidden" aria-label="Abrir menu">
              <List size={22} weight="regular" />
            </IconButton>
          </Dialog.Trigger>
          <Dialog.Portal>
            <Dialog.Overlay className="fixed inset-0 z-50 bg-ink/40 lg:hidden" />
            <Dialog.Content className="fixed inset-y-0 right-0 z-50 flex w-[min(100%,20rem)] flex-col bg-surface p-5 shadow-xl focus:outline-none lg:hidden">
              <div className="mb-6 flex items-center justify-between">
                <Dialog.Title className="font-display text-lg">
                  Menu
                </Dialog.Title>
                <Dialog.Close asChild>
                  <IconButton aria-label="Fechar menu">
                    <X size={22} weight="regular" />
                  </IconButton>
                </Dialog.Close>
              </div>
              <nav className="flex flex-col gap-4" aria-label="Mobile">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className="text-base text-ink"
                  >
                    {link.label}
                  </Link>
                ))}
              </nav>
              <div className="mt-auto flex flex-col gap-2 pt-8">
                <WhatsAppLink
                  className="inline-flex items-center justify-center rounded-md border border-line px-4 py-2.5 text-sm font-medium"
                  onClick={() => setOpen(false)}
                >
                  Falar no WhatsApp
                </WhatsAppLink>
                <Button href={agendarHref} onClick={() => setOpen(false)}>
                  Agendar demonstração
                </Button>
              </div>
            </Dialog.Content>
          </Dialog.Portal>
        </Dialog.Root>
      </div>
    </header>
  );
}
