"use client";

import * as Accordion from "@radix-ui/react-accordion";
import { CaretDown } from "@phosphor-icons/react";
import { cn } from "@/lib/cn";

export type FaqItem = {
  question: string;
  answer: string;
};

type FAQProps = {
  items: FaqItem[];
  className?: string;
};

export function FAQ({ items, className }: FAQProps) {
  return (
    <Accordion.Root
      type="single"
      collapsible
      className={cn("divide-y divide-line border-y border-line", className)}
    >
      {items.map((item, index) => (
        <Accordion.Item key={item.question} value={`item-${index}`}>
          <Accordion.Header>
            <Accordion.Trigger className="group flex w-full items-center justify-between gap-4 py-5 text-left text-base font-medium text-ink transition-colors hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/40 focus-visible:ring-offset-2 focus-visible:ring-offset-surface">
              {item.question}
              <CaretDown
                size={18}
                weight="regular"
                aria-hidden
                className="shrink-0 transition-transform duration-300 group-data-[state=open]:rotate-180 motion-reduce:transition-none"
              />
            </Accordion.Trigger>
          </Accordion.Header>
          <Accordion.Content className="overflow-hidden data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down motion-reduce:animate-none">
            <p className="pb-5 pr-8 text-pretty leading-relaxed text-ink-muted">
              {item.answer}
            </p>
          </Accordion.Content>
        </Accordion.Item>
      ))}
    </Accordion.Root>
  );
}
