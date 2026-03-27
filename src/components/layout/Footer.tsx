import Link from "next/link";
import { Clock3, Instagram, Mail, MapPin, Phone } from "lucide-react";

import { business, navItems, openingHours } from "@/content/site";

export function Footer() {
  return (
    <footer className="mt-24 border-t border-rose/20 bg-[linear-gradient(160deg,#f7f2ff_0%,#fcf9ff_54%,#f5efff_100%)]">
      <div className="shell grid gap-12 py-16 md:grid-cols-2 lg:grid-cols-[1.1fr_0.8fr_0.8fr_1fr]">
        <div className="space-y-4">
          <p className="font-serif text-4xl text-plum">Hannah Nails</p>
          <p className="max-w-sm text-sm leading-relaxed text-plum/78">
            Minimal nail artistry in Wodonga with clean prep, thoughtful design, and a soft lavender studio mood.
          </p>
          <a
            href={`https://www.instagram.com/${business.instagram.replace("@", "")}`}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 text-sm font-semibold text-plum hover:text-rose"
          >
            <Instagram size={16} />
            {business.instagram}
          </a>
        </div>

        <div className="space-y-4">
          <h2 className="text-sm font-semibold uppercase tracking-[0.16em] text-plum/70">Navigate</h2>
          <ul className="space-y-2 text-sm">
            {navItems.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="link-underline text-plum/75 hover:text-plum">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="space-y-4">
          <h2 className="text-sm font-semibold uppercase tracking-[0.16em] text-plum/70">Contact</h2>
          <ul className="space-y-3 text-sm text-plum/82">
            <li className="flex items-start gap-2">
              <MapPin className="mt-0.5" size={16} />
              <span>
                {business.addressLine1}
                <br />
                {business.addressLine2}
              </span>
            </li>
            <li>
              <a href={`tel:${business.phone.replace(/\s+/g, "")}`} className="inline-flex items-center gap-2 hover:text-rose">
                <Phone size={16} />
                {business.phone}
              </a>
            </li>
            <li>
              <a href={`mailto:${business.email}`} className="inline-flex items-center gap-2 hover:text-rose">
                <Mail size={16} />
                {business.email}
              </a>
            </li>
          </ul>
        </div>

        <div className="space-y-4">
          <h2 className="text-sm font-semibold uppercase tracking-[0.16em] text-plum/70">Opening Hours</h2>
          <ul className="space-y-2 text-sm text-plum/82">
            {openingHours.map((item) => (
              <li key={item.day} className="flex items-start justify-between gap-4 rounded-2xl bg-white/65 px-3 py-2">
                <span className="inline-flex items-center gap-2">
                  <Clock3 size={14} />
                  {item.day}
                </span>
                <span>{item.hours}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="border-t border-rose/20 py-5">
        <p className="shell text-center text-xs text-plum/68">
          © {new Date().getFullYear()} {business.name}. Designed for polished appointments in Wodonga.
        </p>
      </div>
    </footer>
  );
}
