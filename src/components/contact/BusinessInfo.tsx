import { Clock3, Mail, MapPin, Phone } from "lucide-react";

import { business, openingHours } from "@/content/site";

export function BusinessInfo() {
  return (
    <section className="glass-card p-6 sm:p-7">
      <h2 className="font-serif text-3xl">Visit Lumiere Nail Atelier</h2>
      <ul className="mt-6 space-y-4 text-sm text-plum/85">
        <li className="flex items-start gap-3">
          <MapPin className="mt-0.5" size={18} />
          <span>
            {business.addressLine1}
            <br />
            {business.addressLine2}
          </span>
        </li>
        <li>
          <a
            href={`tel:${business.phone.replace(/\s+/g, "")}`}
            className="inline-flex items-center gap-3 hover:text-rose"
          >
            <Phone size={18} />
            {business.phone}
          </a>
        </li>
        <li>
          <a href={`mailto:${business.email}`} className="inline-flex items-center gap-3 hover:text-rose">
            <Mail size={18} />
            {business.email}
          </a>
        </li>
      </ul>

      <div className="mt-8">
        <h3 className="inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.14em] text-plum/80">
          <Clock3 size={16} />
          Opening Hours
        </h3>
        <ul className="mt-3 space-y-2 text-sm text-plum/80">
          {openingHours.map((item) => (
            <li key={item.day} className="flex justify-between gap-4 rounded-lg bg-rose/8 px-3 py-2">
              <span>{item.day}</span>
              <span>{item.hours}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
