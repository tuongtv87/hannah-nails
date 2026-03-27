import { business } from "@/content/site";

export function MapEmbed() {
  return (
    <div className="overflow-hidden rounded-3xl border border-white/70 shadow-card">
      <iframe
        title="Map to Hannah Nails in Wodonga"
        src={business.mapEmbed}
        width="100%"
        height="100%"
        style={{ border: 0, minHeight: "360px" }}
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        allowFullScreen
      />
    </div>
  );
}
