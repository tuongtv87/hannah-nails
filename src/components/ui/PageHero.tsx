import Image from "next/image";

import { AnimatedInView } from "@/components/ui/AnimatedInView";
import { SectionHeading } from "@/components/ui/SectionHeading";

type PageHeroProps = {
  title: string;
  description: string;
  imageSrc: string;
  imageAlt: string;
  label?: string;
};

export function PageHero({ title, description, imageSrc, imageAlt, label }: PageHeroProps) {
  return (
    <section className="shell pt-12">
      <div className="grid items-center gap-8 rounded-[2rem] border border-white/70 bg-rose-mist p-6 shadow-soft md:grid-cols-[1.1fr_0.9fr] md:p-10">
        <AnimatedInView>
          <SectionHeading label={label} title={title} description={description} />
        </AnimatedInView>
        <AnimatedInView delay={0.1} className="relative h-72 overflow-hidden rounded-3xl sm:h-80">
          <Image
            src={imageSrc}
            alt={imageAlt}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 45vw"
            priority
          />
        </AnimatedInView>
      </div>
    </section>
  );
}
