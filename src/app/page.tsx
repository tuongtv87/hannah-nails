import Image from "next/image";
import Link from "next/link";
import { Gem, Heart, Instagram, ShieldCheck, Sparkles, Star } from "lucide-react";

import { BusinessInfo } from "@/components/contact/BusinessInfo";
import { MapEmbed } from "@/components/contact/MapEmbed";
import { AnimatedInView } from "@/components/ui/AnimatedInView";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { CTAButtons } from "@/components/ui/CTAButtons";
import { GalleryCard } from "@/components/ui/GalleryCard";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ServiceCard } from "@/components/ui/ServiceCard";
import { TestimonialCard } from "@/components/ui/TestimonialCard";
import {
  aboutStory,
  business,
  featuredServices,
  galleryItems,
  heroImage,
  instagramShots,
  promoOffer,
  stats,
  testimonials,
  whyChooseUs
} from "@/content/site";

const icons = [Sparkles, ShieldCheck, Heart, Gem];

export default function HomePage() {
  return (
    <>
      <section className="shell pt-8 sm:pt-10">
        <div className="relative overflow-hidden rounded-[2rem] border border-white/70 bg-rose-mist p-6 shadow-soft sm:p-10 lg:p-12">
          <div className="pointer-events-none absolute -right-20 top-4 h-48 w-48 rounded-full bg-gold/20 blur-3xl" />

          <div className="grid items-center gap-8 lg:grid-cols-[1.05fr_0.95fr]">
            <AnimatedInView>
              <span className="gold-pill">Luxury Nail Salon | Wodonga VIC</span>
              <h1 className="mt-5 font-serif text-4xl leading-tight sm:text-5xl lg:text-6xl">
                High-End Nail Artistry, Tailored for the Modern Woman
              </h1>
              <p className="mt-5 max-w-xl text-base leading-relaxed text-plum/80 sm:text-lg">
                Welcome to {business.name}, where soft pink tones, precision technique, and personalised care
                come together for beautifully polished results.
              </p>
              <CTAButtons className="mt-7 flex flex-col gap-3 sm:flex-row sm:flex-wrap" />
            </AnimatedInView>

            <AnimatedInView delay={0.1} className="relative h-80 overflow-hidden rounded-3xl border border-white/70 sm:h-96">
              <Image
                src={heroImage.src}
                alt={heroImage.alt}
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 45vw"
                className="object-cover"
              />
              <div className="absolute inset-x-4 bottom-4 rounded-2xl bg-white/84 p-4 shadow">
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-plum/70">Featured Offer</p>
                <p className="mt-1 font-serif text-2xl text-plum">{promoOffer.title}</p>
                <p className="text-sm text-plum/75">{promoOffer.subtitle}</p>
              </div>
            </AnimatedInView>
          </div>
        </div>
      </section>

      <section id="services" className="shell pt-16">
        <SectionHeading
          label="Featured Services"
          title="Signature Treatments with Premium Finishes"
          description="Every service is designed around healthy nails, elegant shaping, and long-lasting shine."
        />
        <div className="mt-8 grid gap-5 md:grid-cols-2">
          {featuredServices.map((service, idx) => (
            <AnimatedInView key={service.name} delay={idx * 0.05}>
              <ServiceCard service={service} />
            </AnimatedInView>
          ))}
        </div>
        <AnimatedInView className="mt-8">
          <ButtonLink href="/services" variant="outline">
            Explore Full Service Menu
          </ButtonLink>
        </AnimatedInView>
      </section>

      <section className="shell pt-16">
        <SectionHeading
          label="Why Choose Us"
          title="Where Luxury Beauty Meets Precise Nail Craft"
          description="From hygiene to artistry, every detail is considered so you can relax and leave fully polished."
        />
        <div className="mt-8 grid gap-4 sm:grid-cols-2">
          {whyChooseUs.map((item, idx) => {
            const Icon = icons[idx % icons.length];
            return (
              <AnimatedInView key={item.title} delay={idx * 0.06}>
                <article className="glass-card h-full p-6">
                  <Icon className="text-rose" size={22} />
                  <h3 className="mt-4 font-serif text-2xl">{item.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-plum/80">{item.description}</p>
                </article>
              </AnimatedInView>
            );
          })}
        </div>
      </section>

      <section id="gallery" className="shell pt-16">
        <div className="flex items-end justify-between gap-4">
          <SectionHeading
            label="Gallery Preview"
            title="Real Client Results & Studio Moments"
            description="A curated look at our signature manicures, nail art details, and boutique salon atmosphere."
          />
          <ButtonLink href="/gallery" variant="soft" className="hidden sm:inline-flex">
            View Full Gallery
          </ButtonLink>
        </div>
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {galleryItems.slice(0, 4).map((item, idx) => (
            <AnimatedInView key={item.src} delay={idx * 0.04}>
              <GalleryCard item={item} />
            </AnimatedInView>
          ))}
        </div>
        <div className="mt-6 sm:hidden">
          <ButtonLink href="/gallery" variant="soft" className="w-full">
            View Full Gallery
          </ButtonLink>
        </div>
      </section>

      <section id="offers" className="shell pt-16">
        <AnimatedInView>
          <div className="rounded-[2rem] border border-gold/45 bg-[linear-gradient(135deg,#fff4e9_0%,#ffeef6_55%,#fff3fa_100%)] p-6 shadow-soft sm:p-8">
            <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="gold-pill">Promo / Special Offers</p>
                <h2 className="mt-4 font-serif text-4xl leading-tight">{promoOffer.title}</h2>
                <p className="mt-2 text-lg text-plum/80">{promoOffer.subtitle}</p>
                <p className="mt-3 max-w-2xl text-sm leading-relaxed text-plum/80">{promoOffer.description}</p>
                <p className="mt-3 text-xs font-semibold uppercase tracking-[0.14em] text-plum/65">
                  {promoOffer.validity}
                </p>
              </div>
              <ButtonLink href="/offers" variant="primary">
                View Current Offers
              </ButtonLink>
            </div>
          </div>
        </AnimatedInView>
      </section>

      <section id="reviews" className="shell pt-16">
        <SectionHeading
          label="Testimonials"
          title="Loved by Clients Across Albury-Wodonga"
          description="Consistent quality and elegant results keep our clients coming back."
        />
        <div className="mt-8 grid gap-4 md:grid-cols-2">
          {testimonials.slice(0, 4).map((testimonial, idx) => (
            <AnimatedInView key={testimonial.name} delay={idx * 0.06}>
              <TestimonialCard testimonial={testimonial} />
            </AnimatedInView>
          ))}
        </div>
      </section>

      <section id="about" className="shell pt-16">
        <div className="grid gap-8 rounded-[2rem] border border-white/70 bg-white/80 p-6 shadow-card md:grid-cols-[1.1fr_0.9fr] md:p-10">
          <AnimatedInView>
            <SectionHeading
              label="About Us"
              title="A Boutique Nail Destination Built on Detail"
              description={aboutStory}
            />
            <div className="mt-6 grid grid-cols-2 gap-3">
              {stats.map((stat) => (
                <div key={stat.label} className="rounded-2xl border border-rose/20 bg-rose/10 px-4 py-3">
                  <p className="font-serif text-3xl text-plum">{stat.value}</p>
                  <p className="text-xs uppercase tracking-[0.14em] text-plum/70">{stat.label}</p>
                </div>
              ))}
            </div>
          </AnimatedInView>
          <AnimatedInView delay={0.1} className="relative h-80 overflow-hidden rounded-3xl sm:h-[420px]">
            <Image
              src="https://images.pexels.com/photos/7755637/pexels-photo-7755637.jpeg?auto=compress&cs=tinysrgb&w=1600"
              alt="Premium nail salon interior with soft blush decor and elegant manicure stations"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 45vw"
            />
          </AnimatedInView>
        </div>
      </section>

      <section className="shell pt-16">
        <div className="grid gap-8 lg:grid-cols-[0.95fr_1.05fr]">
          <AnimatedInView>
            <SectionHeading
              label="Instagram"
              title="Social Proof from Our Daily Work"
              description="Follow us for fresh designs, client transformations, and monthly offers."
            />
            <p className="mt-3 text-sm font-semibold uppercase tracking-[0.14em] text-plum/70">{business.instagram}</p>
            <div className="mt-6 grid grid-cols-2 gap-4">
              {instagramShots.map((shot) => (
                <div key={shot.src} className="relative h-40 overflow-hidden rounded-2xl border border-white/70 sm:h-44">
                  <Image src={shot.src} alt={shot.alt} fill className="object-cover" sizes="(max-width: 640px) 50vw, 25vw" />
                </div>
              ))}
            </div>
            <a
              href={`https://www.instagram.com/${business.instagram.replace("@", "")}`}
              target="_blank"
              rel="noreferrer"
              className="mt-6 inline-flex items-center gap-2 rounded-full border border-rose/35 bg-white px-5 py-3 text-sm font-semibold text-plum transition hover:bg-rose/10"
            >
              <Instagram size={16} />
              Follow on Instagram
            </a>
          </AnimatedInView>

          <AnimatedInView delay={0.1}>
            <div className="glass-card p-6 sm:p-7">
              <h2 className="font-serif text-3xl">Contact & Visit</h2>
              <p className="mt-2 text-sm text-plum/78">
                Call, message, or visit our Wodonga salon. We do not provide online booking at this stage.
              </p>
              <div className="mt-5 grid gap-4 sm:grid-cols-2">
                <a
                  href={`tel:${business.mobile.replace(/\s+/g, "")}`}
                  className="rounded-2xl border border-rose/25 bg-rose/10 px-4 py-3 text-sm font-semibold text-plum transition hover:bg-rose/20"
                >
                  Call Now
                </a>
                <a
                  href={`mailto:${business.email}`}
                  className="rounded-2xl border border-gold/35 bg-gold/15 px-4 py-3 text-sm font-semibold text-plum transition hover:bg-gold/25"
                >
                  Message Us
                </a>
              </div>
            </div>
            <div className="mt-4">
              <MapEmbed />
            </div>
          </AnimatedInView>
        </div>
      </section>

      <section id="contact" className="shell pt-16">
        <div className="grid gap-5 lg:grid-cols-[0.95fr_1.05fr]">
          <AnimatedInView>
            <BusinessInfo />
          </AnimatedInView>
          <AnimatedInView delay={0.1} className="glass-card p-6 sm:p-7">
            <h2 className="font-serif text-3xl">Ready for Your Next Nail Moment?</h2>
            <p className="mt-3 max-w-xl text-sm leading-relaxed text-plum/80">
              Whether you want a polished everyday set or a custom statement design, our team is here to craft
              your perfect look.
            </p>
            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              <ButtonLink href="/contact" variant="primary" className="sm:col-span-2">
                Send an Enquiry Form
              </ButtonLink>
              <ButtonLink href="/services" variant="outline">
                View Services
              </ButtonLink>
              <ButtonLink href="/offers" variant="soft">
                See Promotions
              </ButtonLink>
            </div>
            <div className="mt-6 rounded-2xl border border-rose/20 bg-rose/10 p-4 text-sm text-plum/85">
              {business.addressLine1}, {business.addressLine2}
            </div>
          </AnimatedInView>
        </div>
      </section>

      <section className="shell pt-16">
        <div className="rounded-[2rem] border border-plum/10 bg-plum px-6 py-10 text-center text-white shadow-soft sm:p-12">
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-rose/80">Luxury. Feminine. Modern.</p>
          <h2 className="mt-4 font-serif text-4xl sm:text-5xl">Experience Premium Nails in Wodonga</h2>
          <p className="mx-auto mt-3 max-w-2xl text-sm leading-relaxed text-white/80 sm:text-base">
            From nude gloss classics to soft pink nail art, every set is crafted to feel polished, elevated, and
            uniquely yours.
          </p>
          <div className="mt-7 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <ButtonLink href="/contact" variant="outline" className="border-white/35 bg-white/10 text-white hover:bg-white/20">
              Message Us Today
            </ButtonLink>
            <Link
              href="/gallery"
              className="inline-flex items-center gap-2 rounded-full border border-gold/50 bg-gold/20 px-6 py-3 text-sm font-semibold text-white transition hover:bg-gold/30"
            >
              <Star size={15} />
              Browse Portfolio
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
