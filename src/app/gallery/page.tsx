import type { Metadata } from "next";

import { AnimatedInView } from "@/components/ui/AnimatedInView";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { GalleryCard } from "@/components/ui/GalleryCard";
import { PageHero } from "@/components/ui/PageHero";
import { galleryItems } from "@/content/site";

export const metadata: Metadata = {
  title: "Gallery",
  description: "Browse premium nail salon imagery including manicure close-ups and in-salon moments."
};

export default function GalleryPage() {
  return (
    <>
      <PageHero
        label="Gallery"
        title="Manicure Portfolio & Salon Moments"
        description="A visual showcase of our refined nail work, client finishes, and editorial-inspired details."
        imageSrc="https://images.pexels.com/photos/3997988/pexels-photo-3997988.jpeg?auto=compress&cs=tinysrgb&w=1600"
        imageAlt="Elegant rose and nude manicure portfolio shot with premium lighting"
      />

      <section className="shell pt-14">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {galleryItems.map((item, idx) => (
            <AnimatedInView key={item.src} delay={idx * 0.03}>
              <GalleryCard item={item} />
            </AnimatedInView>
          ))}
        </div>
      </section>

      <section className="shell pt-14">
        <AnimatedInView className="rounded-[1.8rem] border border-gold/40 bg-gold/10 p-6 text-center sm:p-8">
          <h2 className="font-serif text-4xl">Love This Style?</h2>
          <p className="mx-auto mt-2 max-w-2xl text-sm text-plum/80">
            Share your inspiration through our contact form and we will guide you to the right nail artist and
            service.
          </p>
          <ButtonLink href="/contact" className="mt-6">
            Message Our Team
          </ButtonLink>
        </AnimatedInView>
      </section>
    </>
  );
}
