import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, CalendarCheck2, Instagram, MapPin, Star } from "lucide-react";

import { BusinessInfo } from "@/components/contact/BusinessInfo";
import { ContactForm } from "@/components/contact/ContactForm";
import { MapEmbed } from "@/components/contact/MapEmbed";
import { AnimatedInView } from "@/components/ui/AnimatedInView";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { CTAButtons } from "@/components/ui/CTAButtons";
import { GalleryCard } from "@/components/ui/GalleryCard";
import { SectionHeading } from "@/components/ui/SectionHeading";
import {
  aboutStory,
  business,
  faqs,
  founder,
  galleryItems,
  heroPanels,
  promoOffer,
  serviceGroups,
  servicePreviews,
  stats,
  teamMembers,
  testimonials
} from "@/content/site";

export default function HomePage() {
  return (
    <>
      <section className="shell pt-8 sm:pt-10">
        <div className="soft-panel overflow-hidden p-6 sm:p-8 lg:p-10">
          <div className="grid gap-10 lg:grid-cols-[0.92fr_1.08fr] lg:items-center">
            <AnimatedInView>
              <span className="gold-pill">Minimal Nails In Wodonga</span>
              <h1 className="mt-5 max-w-xl font-serif text-5xl leading-[0.96] sm:text-6xl lg:text-7xl">
                Nails that feel polished, personal, and easy to wear.
              </h1>
              <p className="mt-5 max-w-lg text-base leading-relaxed text-plum/78 sm:text-lg">
                {business.name} is a blush-toned boutique nail studio focused on clean prep, soft design,
                and modern finishes that still feel like you.
              </p>
              <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                <ButtonLink href="/contact" className="gap-2">
                  <CalendarCheck2 size={16} />
                  Book Now
                </ButtonLink>
                <ButtonLink href="/services" variant="outline">
                  View Services
                </ButtonLink>
              </div>
              <div className="mt-8 flex flex-wrap items-center gap-6 text-sm text-plum/72">
                <span className="inline-flex items-center gap-2">
                  <Star size={16} className="fill-gold text-gold" />
                  4.9 rating from returning clients
                </span>
                <span className="inline-flex items-center gap-2">
                  <MapPin size={16} className="text-rose" />
                  {business.addressLine1}, Wodonga
                </span>
              </div>
            </AnimatedInView>

            <AnimatedInView delay={0.08}>
              <div className="grid gap-4 sm:grid-cols-[1.2fr_0.8fr]">
                <div className="relative h-[420px] overflow-hidden rounded-[2rem] border border-white/80 shadow-card">
                  <Image
                    src={heroPanels[0].src}
                    alt={heroPanels[0].alt}
                    fill
                    priority
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 38vw"
                  />
                </div>
                <div className="grid gap-4">
                  {heroPanels.slice(1).map((panel) => (
                    <div key={panel.src} className="relative h-[202px] overflow-hidden rounded-[2rem] border border-white/80 shadow-card">
                      <Image src={panel.src} alt={panel.alt} fill className="object-cover" sizes="(max-width: 768px) 100vw, 24vw" />
                    </div>
                  ))}
                </div>
              </div>
            </AnimatedInView>
          </div>
        </div>
      </section>

      <section className="shell pt-10">
        <div className="grid gap-4 md:grid-cols-3">
          {servicePreviews.map((preview, index) => (
            <AnimatedInView key={preview.title} delay={index * 0.05}>
              <article className="glass-card h-full p-6">
                <p className="text-xs font-semibold uppercase tracking-[0.22em] text-plum/55">{preview.count}</p>
                <h2 className="mt-3 font-serif text-3xl">{preview.title}</h2>
                <p className="mt-3 text-sm leading-relaxed text-plum/78">{preview.description}</p>
                <Link href={preview.href} className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-plum hover:text-rose">
                  Explore
                  <ArrowUpRight size={15} />
                </Link>
              </article>
            </AnimatedInView>
          ))}
        </div>
      </section>

      <section id="about" className="shell pt-16">
        <div className="soft-panel overflow-hidden p-6 sm:p-8 lg:p-10">
          <div className="grid gap-8 lg:grid-cols-[0.92fr_1.08fr] lg:items-center">
            <AnimatedInView className="relative h-[420px] overflow-hidden rounded-[2rem] border border-white/80">
              <Image
                src="https://images.pexels.com/photos/7755637/pexels-photo-7755637.jpeg?auto=compress&cs=tinysrgb&w=1600"
                alt="Minimal salon interior and client beauty styling in a blush-toned studio"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 40vw"
              />
            </AnimatedInView>

            <AnimatedInView delay={0.08}>
              <SectionHeading
                label="About Hannah Nails"
                title="A calmer, cleaner take on nail appointments."
                description={aboutStory}
              />
              <p className="mt-5 max-w-2xl text-sm leading-relaxed text-plum/78">
                {founder.quote}
              </p>
              <p className="mt-3 text-sm font-semibold uppercase tracking-[0.2em] text-plum/62">
                {founder.name} | {founder.role}
              </p>
              <div className="mt-7 grid grid-cols-2 gap-3">
                {stats.map((stat) => (
                  <div key={stat.label} className="rounded-[1.5rem] border border-rose/20 bg-white/80 px-4 py-4">
                    <p className="font-serif text-3xl text-plum">{stat.value}</p>
                    <p className="text-xs uppercase tracking-[0.16em] text-plum/62">{stat.label}</p>
                  </div>
                ))}
              </div>
            </AnimatedInView>
          </div>
        </div>
      </section>

      <section id="services" className="shell pt-16">
        <SectionHeading
          label="Our Services"
          title="Simple service menus, refined results."
          description="Our most-booked treatments are designed to feel wearable, polished, and easy to maintain."
          align="center"
        />
        <div className="mt-10 grid gap-5 lg:grid-cols-3">
          {serviceGroups.map((group, index) => (
            <AnimatedInView key={group.title} delay={index * 0.06}>
              <article className="glass-card h-full p-6">
                <p className="text-xs font-semibold uppercase tracking-[0.22em] text-plum/55">{group.items.length} treatments</p>
                <h3 className="mt-3 font-serif text-3xl">{group.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-plum/76">{group.description}</p>
                <div className="mt-6 space-y-4">
                  {group.items.map((item) => (
                    <div key={item.name} className="border-b border-rose/15 pb-4 last:border-b-0 last:pb-0">
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <p className="font-semibold text-plum">{item.name}</p>
                          <p className="mt-1 text-xs uppercase tracking-[0.15em] text-plum/55">{item.duration}</p>
                        </div>
                        <p className="text-sm font-semibold text-plum">{item.price}</p>
                      </div>
                      <p className="mt-2 text-sm leading-relaxed text-plum/72">{item.description}</p>
                    </div>
                  ))}
                </div>
                <ButtonLink href="/contact" variant="soft" className="mt-6 w-full">
                  Book {group.title}
                </ButtonLink>
              </article>
            </AnimatedInView>
          ))}
        </div>
      </section>

      <section className="shell pt-16">
        <div className="grid gap-6 lg:grid-cols-[1.05fr_0.95fr]">
          <AnimatedInView>
            <div className="soft-panel p-6 sm:p-8">
              <p className="gold-pill">Special Offer</p>
              <h2 className="mt-5 max-w-xl font-serif text-4xl leading-tight sm:text-5xl">{promoOffer.title}</h2>
              <p className="mt-3 text-lg text-plum/82">{promoOffer.subtitle}</p>
              <p className="mt-4 max-w-2xl text-sm leading-relaxed text-plum/76">{promoOffer.description}</p>
              <div className="mt-6 flex flex-wrap gap-3">
                <span className="rounded-full border border-rose/20 bg-white/80 px-4 py-2 text-xs font-semibold uppercase tracking-[0.16em] text-plum/60">
                  BIAB + minimalist art
                </span>
                <span className="rounded-full border border-rose/20 bg-white/80 px-4 py-2 text-xs font-semibold uppercase tracking-[0.16em] text-plum/60">
                  New and returning clients
                </span>
              </div>
              <div className="mt-7 flex flex-col gap-3 sm:flex-row">
                <ButtonLink href="/contact">Book Offer</ButtonLink>
                <ButtonLink href="/offers" variant="outline">
                  View Offer Details
                </ButtonLink>
              </div>
            </div>
          </AnimatedInView>

          <AnimatedInView delay={0.08}>
            <div className="grid gap-4 sm:grid-cols-2">
              {galleryItems.slice(0, 4).map((item) => (
                <GalleryCard key={item.src} item={item} />
              ))}
            </div>
          </AnimatedInView>
        </div>
      </section>

      <section id="reviews" className="shell pt-16">
        <SectionHeading
          label="Client Love"
          title="Soft, clean, compliment-worthy nails."
          description="A few words from clients who book us for everyday polish, bridal nails, and BIAB maintenance."
          align="center"
        />
        <div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {testimonials.map((testimonial, index) => (
            <AnimatedInView key={testimonial.name} delay={index * 0.05}>
              <article className="glass-card h-full p-6">
                <div className="flex items-center gap-1 text-gold">
                  {Array.from({ length: testimonial.rating }).map((_, i) => (
                    <Star key={i} size={16} fill="currentColor" strokeWidth={0} />
                  ))}
                </div>
                <p className="mt-4 text-sm leading-relaxed text-plum/82">“{testimonial.quote}”</p>
                <div className="mt-5">
                  <p className="font-semibold text-plum">{testimonial.name}</p>
                  <p className="text-xs uppercase tracking-[0.16em] text-plum/55">{testimonial.role}</p>
                </div>
              </article>
            </AnimatedInView>
          ))}
        </div>
      </section>

      <section className="shell pt-16">
        <SectionHeading
          label="Meet The Team"
          title="Small team, polished standards."
          description="We keep the experience personal, calm, and consistent from the first message to the final top coat."
        />
        <div className="mt-10 grid gap-5 lg:grid-cols-3">
          {teamMembers.map((member, index) => (
            <AnimatedInView key={member.name} delay={index * 0.05}>
              <article className="glass-card h-full overflow-hidden">
                <div className="relative h-72">
                  <Image src={member.image} alt={member.alt} fill className="object-cover" sizes="(max-width: 1024px) 100vw, 30vw" />
                </div>
                <div className="p-6">
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-plum/55">{member.role}</p>
                  <h3 className="mt-2 font-serif text-3xl">{member.name}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-plum/76">{member.quote}</p>
                  <div className="mt-5 flex gap-3">
                    <ButtonLink href="/contact" variant="soft" className="flex-1">
                      Book With {member.name}
                    </ButtonLink>
                  </div>
                </div>
              </article>
            </AnimatedInView>
          ))}
        </div>
      </section>

      <section className="shell pt-16">
        <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
          <AnimatedInView>
            <SectionHeading
              label="Instagram"
              title="Our latest sets, studio moments, and close-up detail."
              description="Follow our feed for fresh BIAB sets, soft chrome finishes, and appointment updates."
            />
            <a
              href={`https://www.instagram.com/${business.instagram.replace("@", "")}`}
              target="_blank"
              rel="noreferrer"
              className="mt-6 inline-flex items-center gap-2 rounded-full border border-rose/30 bg-white/85 px-5 py-3 text-sm font-semibold text-plum transition hover:bg-rose/10"
            >
              <Instagram size={16} />
              Follow {business.instagram}
            </a>
          </AnimatedInView>
          <AnimatedInView delay={0.08}>
            <div className="grid gap-4 sm:grid-cols-2">
              {galleryItems.slice(4, 8).map((item) => (
                <GalleryCard key={item.src} item={item} />
              ))}
            </div>
          </AnimatedInView>
        </div>
      </section>

      <section id="faq" className="shell pt-16">
        <SectionHeading
          label="FAQ"
          title="A few things clients usually ask first."
          description="If you are unsure what to book, start with the enquiry form and we will guide you."
          align="center"
        />
        <div className="mx-auto mt-10 max-w-4xl space-y-4">
          {faqs.map((faq, index) => (
            <AnimatedInView key={faq.question} delay={index * 0.03}>
              <details className="glass-card p-5" open={index === 0}>
                <summary className="cursor-pointer list-none pr-6 font-serif text-2xl text-plum">
                  {faq.question}
                </summary>
                <p className="mt-3 text-sm leading-relaxed text-plum/78">{faq.answer}</p>
              </details>
            </AnimatedInView>
          ))}
        </div>
      </section>

      <section id="contact" className="shell pt-16">
        <div className="grid gap-5 lg:grid-cols-[1.02fr_0.98fr]">
          <AnimatedInView>
            <ContactForm />
          </AnimatedInView>
          <AnimatedInView delay={0.08}>
            <BusinessInfo />
            <div className="mt-4">
              <MapEmbed />
            </div>
          </AnimatedInView>
        </div>
      </section>

      <section className="shell pt-16">
        <div className="soft-panel p-6 text-center sm:p-10">
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-plum/55">Ready To Book?</p>
          <h2 className="mt-4 font-serif text-4xl sm:text-5xl">Your next clean, glossy set starts here.</h2>
          <p className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-plum/76 sm:text-base">
            Book by call, message, or enquiry form. We will help you choose the right service and make sure the final set feels exactly right.
          </p>
          <div className="mt-7 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <ButtonLink href="/contact">Book Now</ButtonLink>
            <CTAButtons className="flex flex-col gap-3 sm:flex-row" />
          </div>
        </div>
      </section>
    </>
  );
}
