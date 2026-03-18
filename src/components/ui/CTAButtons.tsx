import { MessageCircle, Navigation, Phone } from "lucide-react";

import { business } from "@/content/site";

type CTAButtonsProps = {
  className?: string;
};

export function CTAButtons({ className }: CTAButtonsProps) {
  return (
    <div className={className}>
      <a
        href={`tel:${business.mobile.replace(/\s+/g, "")}`}
        className="inline-flex items-center justify-center gap-2 rounded-full bg-plum px-5 py-3 text-sm font-semibold text-white shadow-soft transition hover:bg-[#3d1e2d]"
      >
        <Phone size={16} />
        Call Now
      </a>
      <a
        href={`mailto:${business.email}`}
        className="inline-flex items-center justify-center gap-2 rounded-full border border-rose/35 bg-white px-5 py-3 text-sm font-semibold text-plum transition hover:bg-rose/10"
      >
        <MessageCircle size={16} />
        Message Us
      </a>
      <a
        href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(business.fullAddress)}`}
        target="_blank"
        rel="noreferrer"
        className="inline-flex items-center justify-center gap-2 rounded-full border border-gold/45 bg-gold/15 px-5 py-3 text-sm font-semibold text-plum transition hover:bg-gold/25"
      >
        <Navigation size={16} />
        Visit Our Salon
      </a>
    </div>
  );
}
