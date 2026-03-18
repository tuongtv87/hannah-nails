import type { Metadata } from "next";

import { AnimatedInView } from "@/components/ui/AnimatedInView";
import { CTAButtons } from "@/components/ui/CTAButtons";
import { PageHero } from "@/components/ui/PageHero";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { TestimonialCard } from "@/components/ui/TestimonialCard";
import { testimonials } from "@/content/site";

export const metadata: Metadata = {
  title: "Reviews",
  description: "Read client reviews for Lumiere Nail Atelier in Wodonga VIC."
};

export default function ReviewsPage() {
  return (
    <>
      <PageHero
        label="Reviews"
        title="Client Experiences That Speak for Themselves"
        description="Our work is built on trust, precision, and consistently beautiful outcomes."
        imageSrc="https://images.pexels.com/photos/7755662/pexels-photo-7755662.jpeg?auto=compress&cs=tinysrgb&w=1600"
        imageAlt="Client smiling after receiving premium manicure treatment"
      />

      <section className="shell pt-14">
        <SectionHeading
          title="What Our Clients Say"
          description="Real feedback from clients across Wodonga and surrounding areas."
        />
        <div className="mt-8 grid gap-4 md:grid-cols-2">
          {testimonials.map((testimonial, idx) => (
            <AnimatedInView key={`${testimonial.name}-${idx}`} delay={idx * 0.06}>
              <TestimonialCard testimonial={testimonial} />
            </AnimatedInView>
          ))}
        </div>
      </section>

      <section className="shell pt-14">
        <AnimatedInView className="rounded-[1.8rem] border border-rose/25 bg-rose/10 p-6 sm:p-8">
          <h2 className="font-serif text-4xl">Join Our Happy Clients</h2>
          <p className="mt-2 max-w-2xl text-sm leading-relaxed text-plum/80">
            Contact us to discuss your desired service and styling direction. We are here to make every visit
            feel polished and effortless.
          </p>
          <CTAButtons className="mt-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap" />
        </AnimatedInView>
      </section>
    </>
  );
}
