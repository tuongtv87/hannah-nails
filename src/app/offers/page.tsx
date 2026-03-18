import type { Metadata } from "next";
import { Gift, Sparkles, Tag, Timer } from "lucide-react";

import { AnimatedInView } from "@/components/ui/AnimatedInView";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { CTAButtons } from "@/components/ui/CTAButtons";
import { PageHero } from "@/components/ui/PageHero";
import { promoOffer } from "@/content/site";

export const metadata: Metadata = {
  title: "Special Offers",
  description: "Discover limited-time promotions at Lumiere Nail Atelier."
};

const offers = [
  {
    name: "Soft Pink Glow Offer",
    detail: "15% off selected nail art this month",
    note: "Includes blush chrome, minimalist line art, and soft ombre upgrades.",
    icon: Sparkles
  },
  {
    name: "Midweek Luxe Upgrade",
    detail: "Complimentary cuticle oil gift with deluxe manicure on Tuesdays and Wednesdays",
    note: "Available while stock lasts.",
    icon: Gift
  },
  {
    name: "Pedicure Pairing",
    detail: "Save $18 AUD when booking a gel manicure with luxury spa pedicure",
    note: "Ideal for event prep and seasonal self-care.",
    icon: Tag
  }
];

export default function OffersPage() {
  return (
    <>
      <PageHero
        label="Promo / Special Offers"
        title="Current Promotions at Lumiere"
        description="Seasonal and limited-time offers designed to elevate your regular nail routine."
        imageSrc="https://images.pexels.com/photos/7755656/pexels-photo-7755656.jpeg?auto=compress&cs=tinysrgb&w=1600"
        imageAlt="Luxury nail art close-up with rose and subtle gold accents"
      />

      <section className="shell pt-14">
        <AnimatedInView className="rounded-[1.8rem] border border-gold/50 bg-[linear-gradient(135deg,#fff3e7_0%,#ffeef7_60%,#fff4fb_100%)] p-6 shadow-soft sm:p-8">
          <p className="gold-pill">Featured Promotion</p>
          <h2 className="mt-4 font-serif text-4xl">{promoOffer.title}</h2>
          <p className="mt-2 text-lg text-plum/80">{promoOffer.subtitle}</p>
          <p className="mt-3 max-w-3xl text-sm leading-relaxed text-plum/78">{promoOffer.description}</p>
          <p className="mt-4 inline-flex items-center gap-2 rounded-full bg-white/85 px-4 py-2 text-xs font-semibold uppercase tracking-[0.12em] text-plum/70">
            <Timer size={14} />
            {promoOffer.validity}
          </p>
        </AnimatedInView>
      </section>

      <section className="shell pt-10">
        <div className="grid gap-4 md:grid-cols-3">
          {offers.map((offer, idx) => {
            const Icon = offer.icon;
            return (
              <AnimatedInView key={offer.name} delay={idx * 0.05}>
                <article className="glass-card h-full p-6">
                  <Icon className="text-rose" size={22} />
                  <h3 className="mt-4 font-serif text-3xl">{offer.name}</h3>
                  <p className="mt-2 text-sm font-semibold text-plum/85">{offer.detail}</p>
                  <p className="mt-2 text-sm text-plum/75">{offer.note}</p>
                </article>
              </AnimatedInView>
            );
          })}
        </div>
      </section>

      <section className="shell pt-14">
        <AnimatedInView className="rounded-[1.8rem] border border-rose/25 bg-rose/10 p-6 sm:p-8">
          <h2 className="font-serif text-4xl">Claim an Offer</h2>
          <p className="mt-2 max-w-2xl text-sm leading-relaxed text-plum/80">
            Mention your chosen promotion when you call or send your enquiry so our team can apply it.
          </p>
          <CTAButtons className="mt-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap" />
          <ButtonLink href="/contact" variant="outline" className="mt-4">
            Send Enquiry Form
          </ButtonLink>
        </AnimatedInView>
      </section>
    </>
  );
}
