import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

type CardProps = {
  children: ReactNode;
  className?: string;
  as?: "div" | "article";
};

export function Card({ children, className, as: Tag = "div" }: CardProps) {
  return (
    <Tag
      className={cn(
        "rounded-lg border border-line bg-surface-raised p-6 shadow-sm",
        className,
      )}
    >
      {children}
    </Tag>
  );
}
