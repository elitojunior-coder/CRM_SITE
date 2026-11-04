import { productMonogramLetter } from "@/lib/brand-display";
import { cn } from "@/lib/cn";

type BrandMarkProps = {
  className?: string;
  size?: "sm" | "md" | "lg";
};

const sizeClass = {
  sm: "size-8 text-sm",
  md: "size-9 text-base",
  lg: "size-11 text-lg",
} as const;

/** Logotipo: monograma com inicial ou marca neutra quando brand.product.name não foi preenchido. */
export function BrandMark({ className, size = "md" }: BrandMarkProps) {
  const letter = productMonogramLetter();

  return (
    <span
      className={cn(
        "inline-flex shrink-0 items-center justify-center rounded-lg bg-accent/12 font-semibold text-accent ring-1 ring-accent/25",
        sizeClass[size],
        className,
      )}
      aria-hidden={letter ? undefined : true}
    >
      {letter ?? (
        <svg
          viewBox="0 0 24 24"
          className="size-[55%]"
          fill="none"
          aria-hidden
        >
          <path
            d="M6 18V6l6 4.5L18 6v12"
            stroke="currentColor"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      )}
    </span>
  );
}
