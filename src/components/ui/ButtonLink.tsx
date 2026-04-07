import Link from "next/link";
import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

type ButtonLinkProps = {
  href: string;
  children: ReactNode;
  variant?: "primary" | "outline" | "soft";
  className?: string;
};

const variants = {
  primary:
    "bg-plum text-white hover:bg-[#3f1f2f] shadow-soft border border-transparent",
  outline:
    "border border-rose/35 bg-white/90 text-plum hover:border-rose/60 hover:bg-rose/10",
  soft: "border border-gold/45 bg-gold/15 text-plum hover:bg-gold/25"
};

export function ButtonLink({ href, children, variant = "primary", className }: ButtonLinkProps) {
  return (
    <Link
      href={href}
      className={cn(
        "inline-flex items-center justify-center rounded-full px-6 py-3 text-sm font-semibold transition duration-300",
        variants[variant],
        className
      )}
    >
      {children}
    </Link>
  );
}
