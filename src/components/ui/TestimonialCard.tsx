import { Star } from "lucide-react";

import type { Testimonial } from "@/content/site";

type TestimonialCardProps = {
  testimonial: Testimonial;
};

export function TestimonialCard({ testimonial }: TestimonialCardProps) {
  return (
    <article className="glass-card h-full p-6">
      <div className="mb-4 flex items-center gap-1 text-gold" aria-label={`${testimonial.rating} star review`}>
        {Array.from({ length: testimonial.rating }).map((_, idx) => (
          <Star key={idx} size={16} fill="currentColor" strokeWidth={0} />
        ))}
      </div>
      <p className="text-sm leading-relaxed text-plum/85">“{testimonial.quote}”</p>
      <div className="mt-5">
        <p className="font-semibold text-plum">{testimonial.name}</p>
        <p className="text-xs uppercase tracking-[0.14em] text-plum/65">{testimonial.role}</p>
      </div>
    </article>
  );
}
