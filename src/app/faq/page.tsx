import type { Metadata } from "next";

import { AnimatedInView } from "@/components/ui/AnimatedInView";
import { PageHero } from "@/components/ui/PageHero";
import { faqs } from "@/content/site";

export const metadata: Metadata = {
  title: "FAQ",
  description: "Frequently asked questions about services, appointments, and salon details."
};

export default function FaqPage() {
  return (
    <>
      <PageHero
        label="FAQ"
        title="Frequently Asked Questions"
        description="Helpful answers about our services, care standards, and visiting the salon."
        imageSrc="https://images.pexels.com/photos/7755470/pexels-photo-7755470.jpeg?auto=compress&cs=tinysrgb&w=1600"
        imageAlt="Nail technician consulting with client about manicure options"
      />

      <section className="shell pt-14">
        <div className="space-y-4">
          {faqs.map((faq, idx) => (
            <AnimatedInView key={faq.question} delay={idx * 0.04}>
              <details className="glass-card group p-5 open:border-rose/35" open={idx === 0}>
                <summary className="cursor-pointer list-none pr-6 font-serif text-2xl text-plum">
                  {faq.question}
                </summary>
                <p className="mt-3 text-sm leading-relaxed text-plum/80">{faq.answer}</p>
              </details>
            </AnimatedInView>
          ))}
        </div>
      </section>
    </>
  );
}
