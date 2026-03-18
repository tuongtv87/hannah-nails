import Image from "next/image";

import type { GalleryItem } from "@/content/site";

type GalleryCardProps = {
  item: GalleryItem;
};

export function GalleryCard({ item }: GalleryCardProps) {
  return (
    <figure className="group relative h-64 overflow-hidden rounded-3xl border border-white/60 shadow-card sm:h-72">
      <Image
        src={item.src}
        alt={item.alt}
        fill
        className="object-cover transition duration-500 group-hover:scale-105"
        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
      />
      <figcaption className="absolute inset-x-4 bottom-4 rounded-full bg-white/85 px-4 py-2 text-xs font-semibold uppercase tracking-[0.14em] text-plum shadow">
        {item.tag}
      </figcaption>
    </figure>
  );
}
