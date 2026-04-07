import type { Metadata } from "next";

import { AnimatedInView } from "@/components/ui/AnimatedInView";
import { CTAButtons } from "@/components/ui/CTAButtons";
import { PageHero } from "@/components/ui/PageHero";
import { ServiceCard } from "@/components/ui/ServiceCard";
import { serviceGroups } from "@/content/site";

export const metadata: Metadata = {
  title: "Services",
  description: "Explore premium manicure, pedicure, and nail art services with AUD pricing."
};

export default function ServicesPage() {
  return (
    <>
      <PageHero
        label="Services"
        title="Premium Nail Services & Transparent AUD Pricing"
        description="Our treatment menu balances precision, durability, and a refined beauty aesthetic tailored to each client."
        imageSrc="https://images.pexels.com/photos/3997379/pexels-photo-3997379.jpeg?auto=compress&cs=tinysrgb&w=1600"
        imageAlt="Nail technician detailing a soft pink manicure at a premium salon station"
      />

      <section className="shell pt-14">
        <div className="space-y-10">
          {serviceGroups.map((group, groupIdx) => (
            <AnimatedInView key={group.title} delay={groupIdx * 0.04}>
              <div className="rounded-[1.8rem] border border-white/70 bg-white/85 p-5 shadow-card sm:p-7">
                <h2 className="font-serif text-4xl">{group.title}</h2>
                <p className="mt-2 text-sm text-plum/78">{group.description}</p>
                <div className="mt-6 grid gap-4 md:grid-cols-2">
                  {group.items.map((item) => (
                    <ServiceCard key={item.name} service={item} />
                  ))}
                </div>
              </div>
            </AnimatedInView>
          ))}
        </div>
      </section>

      <section className="shell pt-14">
        <AnimatedInView className="rounded-[1.8rem] border border-rose/25 bg-rose/10 p-6 sm:p-8">
          <h2 className="font-serif text-4xl">Need Help Choosing the Right Service?</h2>
          <p className="mt-2 text-sm text-plum/80">
            Contact our team with your nail goals and we will recommend a tailored service path.
          </p>
          <CTAButtons className="mt-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap" />
        </AnimatedInView>
      </section>
    </>
  );
}
