import Link from "next/link";
import { Slot } from "@radix-ui/react-slot";
import type { ComponentProps, ReactNode } from "react";
import { cn } from "@/lib/cn";

const base =
  "inline-flex items-center justify-center gap-2 rounded-md px-5 py-2.5 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/40 focus-visible:ring-offset-2 focus-visible:ring-offset-surface disabled:pointer-events-none disabled:opacity-50 motion-reduce:transition-none";

const variants = {
  primary: "bg-accent text-accent-fg hover:bg-accent-hover",
  secondary:
    "border border-line bg-surface-raised text-ink hover:border-ink-muted hover:bg-surface",
  ghost: "text-ink hover:bg-surface-raised",
} as const;

type Variant = keyof typeof variants;

type ButtonBaseProps = {
  variant?: Variant;
  className?: string;
  children: ReactNode;
};

type ButtonAsButton = ButtonBaseProps &
  ComponentProps<"button"> & { href?: undefined };

type ButtonAsLink = ButtonBaseProps &
  Omit<ComponentProps<typeof Link>, "href"> & { href: string };

export function Button(props: ButtonAsButton | ButtonAsLink) {
  const { variant = "primary", className, children } = props;
  const classes = cn(base, variants[variant], className);

  if ("href" in props && props.href) {
    const { href, ...linkProps } = props;
    return (
      <Link href={href} className={classes} {...linkProps}>
        {children}
      </Link>
    );
  }

  const { ...buttonProps } = props as ButtonAsButton;
  return (
    <button type="button" className={classes} {...buttonProps}>
      {children}
    </button>
  );
}

type IconButtonProps = ComponentProps<"button"> & {
  asChild?: boolean;
  className?: string;
};

export function IconButton({
  asChild,
  className,
  children,
  ...props
}: IconButtonProps) {
  const Comp = asChild ? Slot : "button";
  return (
    <Comp
      className={cn(
        "inline-flex size-10 items-center justify-center rounded-md text-ink transition-colors hover:bg-surface-raised focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/40 focus-visible:ring-offset-2 focus-visible:ring-offset-surface",
        className,
      )}
      {...props}
    >
      {children}
    </Comp>
  );
}
