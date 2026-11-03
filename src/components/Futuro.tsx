import type { ReactNode } from "react";
import { brand, type BrandFlag } from "@/config/brand";

type FuturoProps = {
  flag: BrandFlag;
  children: ReactNode;
};

export function Futuro({ flag, children }: FuturoProps) {
  if (!brand.flags[flag]) return null;
  return <>{children}</>;
}
