"use client";

import * as Dialog from "@radix-ui/react-dialog";
import { List, WhatsappLogo, X } from "@phosphor-icons/react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { BrandMark } from "@/components/brand/BrandMark";
import { brand } from "@/config/brand";
import { productNameOrNull } from "@/lib/brand-display";
import { Button } from "@/components/ui/Button";
import { IconButton } from "@/components/ui/Button";
import { WhatsAppLink } from "@/components/layout/WhatsAppLink";
import { cn } from "@/lib/cn";

const navLinks = [
  { href: "#plataforma", label: "Plataforma" },
  { href: "#segmentos", label: "Segmentos" },
  { href: "#calculadora", label: "Calculadora" },
  { href: "#faq", label: "Dúvidas" },
  { href: "#antes-depois", label: "Antes / depois" },
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
      data-site-header
      data-compact={homeNav && compact ? "true" : undefined}
      className={cn(
        "fixed inset-x-0 top-0 z-50 border-b border-line/80 bg-surface/90 backdrop-blur-sm",
        homeNav && "border-b-0",
      )}
    >
      <div className="mx-auto flex h-16 max-w-[1280px] items-center justify-between gap-4 px-5 md:px-8">
        <Link
          href="/"
          className="inline-flex shrink-0 items-center gap-2.5 font-display text-lg text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/40 focus-visible:ring-offset-2 focus-visible:ring-offset-surface"
        >
          <BrandMark size="sm" />
          {productNameOrNull() ? (
            <span className="whitespace-nowrap">{productNameOrNull()}</span>
          ) : (
            <span className="sr-only">Início</span>
          )}
        </Link>

        <nav
          className="hidden min-[1100px]:flex min-[1100px]:items-center min-[1100px]:gap-6 min-[1100px]:gap-8"
          aria-label="Principal"
        >
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "whitespace-nowrap text-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/40 focus-visible:ring-offset-2",
                homeNav
                  ? "text-ink-muted-on-dark hover:text-ink-on-dark focus-visible:ring-offset-surface-dark"
                  : "text-ink-muted hover:text-ink focus-visible:ring-offset-surface",
              )}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="hidden shrink-0 items-center gap-2 min-[1100px]:flex">
          <WhatsAppLink
            id="whatsapp-vendas-header"
            data-header-secondary
            aria-label="Falar no WhatsApp"
            className={cn(
              "header-whatsapp-cta inline-flex size-10 shrink-0 items-center justify-center rounded-md border transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/40 focus-visible:ring-offset-2",
              homeNav
                ? "border-[rgb(245_242_235/0.55)] bg-transparent text-ink-on-dark shadow-[inset_0_0_0_1px_rgb(245_242_235/0.35)] hover:border-[rgb(245_242_235/0.75)] hover:bg-white/8 focus-visible:ring-offset-surface-dark"
                : "border-line bg-transparent text-ink shadow-[inset_0_0_0_1px_rgb(28_25_23/0.12)] hover:border-ink-muted hover:bg-surface-muted focus-visible:ring-offset-surface",
            )}
          >
            <WhatsappLogo className="size-5" weight="fill" aria-hidden />
          </WhatsAppLink>
          <Button href={agendarHref} className="whitespace-nowrap">
            Agendar demo
          </Button>
        </div>

        <Dialog.Root open={open} onOpenChange={setOpen}>
          <Dialog.Trigger asChild>
            <IconButton className="header-menu-trigger min-[1100px]:hidden" aria-label="Abrir menu">
              <List size={22} weight="regular" />
            </IconButton>
          </Dialog.Trigger>
          <Dialog.Portal>
            <Dialog.Overlay className="fixed inset-0 z-50 bg-ink/40 min-[1100px]:hidden" />
            <Dialog.Content className="fixed inset-y-0 right-0 z-50 flex w-[min(100%,20rem)] flex-col bg-surface p-5 shadow-xl focus:outline-none min-[1100px]:hidden">
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
                  className="inline-flex items-center justify-center gap-2 rounded-md border border-line px-4 py-2.5 text-sm font-medium"
                  onClick={() => setOpen(false)}
                  aria-label="Falar no WhatsApp"
                >
                  <WhatsappLogo className="size-5" weight="fill" aria-hidden />
                  WhatsApp
                </WhatsAppLink>
                <Button href={agendarHref} className="whitespace-nowrap" onClick={() => setOpen(false)}>
                  Agendar demo
                </Button>
              </div>
            </Dialog.Content>
          </Dialog.Portal>
        </Dialog.Root>
      </div>
    </header>
  );
}
