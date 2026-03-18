import type { Metadata } from "next";

import { BusinessInfo } from "@/components/contact/BusinessInfo";
import { ContactForm } from "@/components/contact/ContactForm";
import { MapEmbed } from "@/components/contact/MapEmbed";
import { AnimatedInView } from "@/components/ui/AnimatedInView";
import { CTAButtons } from "@/components/ui/CTAButtons";
import { PageHero } from "@/components/ui/PageHero";

export const metadata: Metadata = {
  title: "Contact",
  description: "Contact Lumiere Nail Atelier in Wodonga via phone, message, or enquiry form."
};

export default function ContactPage() {
  return (
    <>
      <PageHero
        label="Contact"
        title="Contact Our Wodonga Nail Salon"
        description="Reach out by phone, message, or enquiry form. We do not offer online booking, so every enquiry is handled personally by our team."
        imageSrc="https://images.pexels.com/photos/7755427/pexels-photo-7755427.jpeg?auto=compress&cs=tinysrgb&w=1600"
        imageAlt="Friendly premium nail salon reception desk with blush interior styling"
      />

      <section className="shell pt-14">
        <AnimatedInView>
          <div className="rounded-[1.8rem] border border-rose/25 bg-rose/10 p-6 sm:p-8">
            <h2 className="font-serif text-4xl">Quick Actions</h2>
            <p className="mt-2 text-sm text-plum/80">
              Choose how you would like to reach us and we will assist with your preferred service.
            </p>
            <CTAButtons className="mt-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap" />
          </div>
        </AnimatedInView>
      </section>

      <section className="shell pt-10">
        <div className="grid gap-5 lg:grid-cols-2">
          <AnimatedInView>
            <ContactForm />
          </AnimatedInView>
          <AnimatedInView delay={0.08}>
            <BusinessInfo />
          </AnimatedInView>
        </div>
      </section>

      <section className="shell pt-10">
        <AnimatedInView>
          <MapEmbed />
        </AnimatedInView>
      </section>
    </>
  );
}
