import { Clock3 } from "lucide-react";

import type { ServiceItem } from "@/content/site";

type ServiceCardProps = {
  service: ServiceItem;
};

export function ServiceCard({ service }: ServiceCardProps) {
  return (
    <article className="glass-card h-full p-5 sm:p-6">
      <div className="mb-3 flex items-start justify-between gap-3">
        <h3 className="font-serif text-2xl leading-tight">{service.name}</h3>
        <p className="rounded-full border border-gold/45 bg-gold/15 px-3 py-1 text-sm font-semibold text-plum">
          {service.price}
        </p>
      </div>
      <p className="mb-4 text-sm leading-relaxed text-plum/80">{service.description}</p>
      <p className="inline-flex items-center gap-2 rounded-full bg-rose/15 px-3 py-1 text-xs font-semibold uppercase tracking-[0.12em] text-plum/85">
        <Clock3 size={14} />
        {service.duration}
      </p>
    </article>
  );
}
