"use client";

import Link from "next/link";
import { Menu, PhoneCall, X } from "lucide-react";
import { usePathname } from "next/navigation";
import { useState } from "react";

import { business, navItems } from "@/content/site";
import { cn } from "@/lib/utils";

export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-rose/15 bg-white/85 backdrop-blur-xl">
      <div className="shell flex h-20 items-center justify-between gap-4">
        <Link href="/" className="group inline-flex flex-col" aria-label="Lumiere Nail Atelier home">
          <span className="font-serif text-2xl leading-none text-plum transition group-hover:text-rose">
            Lumiere
          </span>
          <span className="text-[0.62rem] uppercase tracking-[0.2em] text-plum/75">Nail Atelier</span>
        </Link>

        <nav className="hidden items-center gap-5 lg:flex" aria-label="Primary navigation">
          {navItems.map((item) => {
            const isActive = pathname === item.href;

            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "link-underline text-sm font-medium transition",
                  isActive ? "text-plum" : "text-plum/75 hover:text-plum"
                )}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          <a
            href={`tel:${business.phone.replace(/\s+/g, "")}`}
            className="inline-flex items-center gap-2 rounded-full border border-rose/30 bg-white px-4 py-2 text-sm font-semibold text-plum transition hover:border-rose/60 hover:bg-rose/10"
          >
            <PhoneCall size={16} />
            Call Now
          </a>
        </div>

        <button
          type="button"
          className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-rose/25 text-plum lg:hidden"
          onClick={() => setOpen((prev) => !prev)}
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label="Toggle menu"
        >
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      <div
        id="mobile-menu"
        className={cn(
          "overflow-hidden border-t border-rose/15 bg-white px-4 transition-[max-height] duration-300 lg:hidden",
          open ? "max-h-[420px]" : "max-h-0"
        )}
      >
        <nav className="shell flex flex-col gap-2 py-4" aria-label="Mobile navigation">
          {navItems.map((item) => {
            const isActive = pathname === item.href;

            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className={cn(
                  "rounded-xl px-3 py-2 text-sm font-medium",
                  isActive ? "bg-rose/15 text-plum" : "text-plum/80 hover:bg-rose/10"
                )}
              >
                {item.label}
              </Link>
            );
          })}
          <a
            href={`tel:${business.mobile.replace(/\s+/g, "")}`}
            className="mt-2 inline-flex items-center justify-center gap-2 rounded-full bg-plum px-4 py-2 text-sm font-semibold text-white"
          >
            <PhoneCall size={16} />
            Call {business.mobile}
          </a>
        </nav>
      </div>
    </header>
  );
}
