import type { Metadata } from "next";
import Image from "next/image";
import { Award, Flower2, Heart, ShieldCheck } from "lucide-react";

import { AnimatedInView } from "@/components/ui/AnimatedInView";
import { PageHero } from "@/components/ui/PageHero";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { aboutStory, stats } from "@/content/site";

export const metadata: Metadata = {
  title: "About",
  description: "Learn about Lumiere Nail Atelier and our premium approach to nail artistry in Wodonga."
};

const values = [
  {
    title: "Artistry First",
    description: "Each set is designed to suit your style, skin tone, and lifestyle with elevated detail.",
    icon: Flower2
  },
  {
    title: "Client-Centred Service",
    description: "We listen carefully and tailor every appointment around your goals and comfort.",
    icon: Heart
  },
  {
    title: "Hygiene Standards",
    description: "Sterilised instruments and strict protocols are non-negotiable at every station.",
    icon: ShieldCheck
  },
  {
    title: "Consistent Excellence",
    description: "Our clients return for reliable quality, long wear, and premium finishes.",
    icon: Award
  }
];

export default function AboutPage() {
  return (
    <>
      <PageHero
        label="About"
        title="A Refined Nail Salon Experience in Wodonga"
        description={aboutStory}
        imageSrc="https://images.pexels.com/photos/7755658/pexels-photo-7755658.jpeg?auto=compress&cs=tinysrgb&w=1600"
        imageAlt="Salon nail technician preparing luxury manicure tools in a blush-themed studio"
      />

      <section className="shell pt-14">
        <div className="grid gap-8 lg:grid-cols-[1.05fr_0.95fr]">
          <AnimatedInView>
            <SectionHeading
              label="Our Philosophy"
              title="Elegant Results, Calm Environment, Genuine Care"
              description="We designed Lumiere Nail Atelier to feel polished yet welcoming. Every detail, from service flow to product selection, supports healthy nails and beautifully consistent results."
            />
            <div className="mt-6 grid grid-cols-2 gap-3">
              {stats.map((stat) => (
                <div key={stat.label} className="rounded-2xl border border-rose/25 bg-rose/10 px-4 py-4">
                  <p className="font-serif text-3xl text-plum">{stat.value}</p>
                  <p className="text-xs uppercase tracking-[0.13em] text-plum/70">{stat.label}</p>
                </div>
              ))}
            </div>
          </AnimatedInView>

          <AnimatedInView delay={0.08} className="relative h-80 overflow-hidden rounded-3xl border border-white/70 sm:h-[440px]">
            <Image
              src="https://images.pexels.com/photos/7755539/pexels-photo-7755539.jpeg?auto=compress&cs=tinysrgb&w=1600"
              alt="Happy nail salon client admiring fresh manicure in luxury studio"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 45vw"
            />
          </AnimatedInView>
        </div>
      </section>

      <section className="shell pt-14">
        <div className="grid gap-4 sm:grid-cols-2">
          {values.map((value, idx) => {
            const Icon = value.icon;
            return (
              <AnimatedInView key={value.title} delay={idx * 0.05}>
                <article className="glass-card h-full p-6">
                  <Icon size={22} className="text-rose" />
                  <h2 className="mt-4 font-serif text-3xl">{value.title}</h2>
                  <p className="mt-2 text-sm leading-relaxed text-plum/80">{value.description}</p>
                </article>
              </AnimatedInView>
            );
          })}
        </div>
      </section>
    </>
  );
}
