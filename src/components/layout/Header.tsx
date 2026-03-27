"use client";

import Link from "next/link";
import { CalendarCheck2, Menu, PhoneCall, X } from "lucide-react";
import { usePathname } from "next/navigation";
import { useState } from "react";

import { business, navItems, openingHours } from "@/content/site";
import { cn } from "@/lib/utils";

export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-rose/20 bg-[rgba(251,248,255,0.88)] backdrop-blur-xl">
      <div className="hidden border-b border-rose/15 lg:block">
        <div className="shell flex items-center justify-between py-3 text-[0.72rem] font-semibold uppercase tracking-[0.22em] text-plum/70">
          <p>{business.addressLine1}, {business.addressLine2}</p>
          <p>{openingHours[0].day} - {openingHours[5].day} | {openingHours[0].hours}</p>
        </div>
      </div>

      <div className="shell flex h-20 items-center justify-between gap-4">
        <Link href="/" className="group inline-flex flex-col" aria-label={`${business.name} home`}>
          <span className="font-serif text-2xl leading-none text-plum transition group-hover:text-rose">
            Hannah
          </span>
          <span className="text-[0.62rem] uppercase tracking-[0.26em] text-plum/65">Nails Studio</span>
        </Link>

        <nav className="hidden items-center gap-6 lg:flex" aria-label="Primary navigation">
          {navItems.map((item) => {
            const isActive = pathname === item.href;

            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "link-underline text-sm font-medium transition",
                  isActive ? "text-plum" : "text-plum/72 hover:text-plum"
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
            className="inline-flex items-center gap-2 rounded-full border border-rose/25 bg-white/90 px-4 py-2 text-sm font-semibold text-plum transition hover:bg-rose/10"
          >
            <PhoneCall size={16} />
            Call
          </a>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 rounded-full bg-plum px-5 py-2.5 text-sm font-semibold text-white shadow-soft transition hover:bg-[#4a2e70]"
          >
            <CalendarCheck2 size={16} />
            Book Now
          </Link>
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
          "overflow-hidden border-t border-rose/15 bg-white/95 px-4 transition-[max-height] duration-300 lg:hidden",
          open ? "max-h-[460px]" : "max-h-0"
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
                  "rounded-2xl px-3 py-3 text-sm font-medium",
                  isActive ? "bg-rose/15 text-plum" : "text-plum/80 hover:bg-rose/10"
                )}
              >
                {item.label}
              </Link>
            );
          })}
          <Link
            href="/contact"
            onClick={() => setOpen(false)}
            className="mt-2 inline-flex items-center justify-center gap-2 rounded-full bg-plum px-4 py-3 text-sm font-semibold text-white"
          >
            <CalendarCheck2 size={16} />
            Book Now
          </Link>
        </nav>
      </div>
    </header>
  );
}
