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
    "border border-transparent bg-plum text-white shadow-soft hover:bg-[#8b4562]",
  outline:
    "border border-rose/35 bg-white/90 text-plum hover:border-rose/55 hover:bg-rose/10",
  soft: "border border-rose/25 bg-rose/10 text-plum hover:bg-rose/20"
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
