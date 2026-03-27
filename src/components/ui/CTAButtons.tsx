import { CalendarCheck2, Navigation, Phone } from "lucide-react";

import { business } from "@/content/site";

type CTAButtonsProps = {
  className?: string;
};

export function CTAButtons({ className }: CTAButtonsProps) {
  return (
    <div className={className}>
      <a
        href={`tel:${business.mobile.replace(/\s+/g, "")}`}
        className="inline-flex items-center justify-center gap-2 rounded-full bg-plum px-5 py-3 text-sm font-semibold text-white shadow-soft transition hover:bg-[#8b4562]"
      >
        <Phone size={16} />
        Call Now
      </a>
      <a
        href="/contact"
        className="inline-flex items-center justify-center gap-2 rounded-full border border-rose/35 bg-white px-5 py-3 text-sm font-semibold text-plum transition hover:bg-rose/10"
      >
        <CalendarCheck2 size={16} />
        Book Now
      </a>
      <a
        href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(business.fullAddress)}`}
        target="_blank"
        rel="noreferrer"
        className="inline-flex items-center justify-center gap-2 rounded-full border border-rose/25 bg-rose/10 px-5 py-3 text-sm font-semibold text-plum transition hover:bg-rose/18"
      >
        <Navigation size={16} />
        Get Directions
      </a>
    </div>
  );
}
