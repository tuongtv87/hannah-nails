export type NavItem = {
  label: string;
  href: string;
};

export type ServiceItem = {
  name: string;
  price: string;
  duration: string;
  description: string;
};

export type ServiceGroup = {
  title: string;
  description: string;
  items: ServiceItem[];
};

export type GalleryItem = {
  src: string;
  alt: string;
  tag: string;
};

export type Testimonial = {
  name: string;
  role: string;
  quote: string;
  rating: number;
};

export type FaqItem = {
  question: string;
  answer: string;
};

export const business = {
  name: "Lumiere Nail Atelier",
  tagline: "Luxury Nails & Beauty in Wodonga",
  phone: "+61 3 5721 9488",
  mobile: "+61 412 880 614",
  email: "hello@lumierenailatelier.com.au",
  addressLine1: "29 Castleton Street",
  addressLine2: "Wodonga VIC 3690, Australia",
  fullAddress: "29 Castleton Street, Wodonga VIC 3690, Australia",
  instagram: "@lumiere.nailatelier",
  mapEmbed:
    "https://www.google.com/maps?q=29%20Castleton%20Street,%20Wodonga%20VIC%203690,%20Australia&output=embed"
};

export const navItems: NavItem[] = [
  { label: "Home", href: "/" },
  { label: "Services", href: "/services" },
  { label: "Gallery", href: "/gallery" },
  { label: "About", href: "/about" },
  { label: "Reviews", href: "/reviews" },
  { label: "FAQ", href: "/faq" },
  { label: "Contact", href: "/contact" },
  { label: "Offers", href: "/offers" }
];

export const openingHours = [
  { day: "Monday", hours: "9:00 AM - 6:00 PM" },
  { day: "Tuesday", hours: "9:00 AM - 6:00 PM" },
  { day: "Wednesday", hours: "9:00 AM - 7:00 PM" },
  { day: "Thursday", hours: "9:00 AM - 7:00 PM" },
  { day: "Friday", hours: "9:00 AM - 6:30 PM" },
  { day: "Saturday", hours: "9:00 AM - 4:00 PM" },
  { day: "Sunday", hours: "Closed" }
];

export const heroImage = {
  src: "https://images.pexels.com/photos/3997385/pexels-photo-3997385.jpeg?auto=compress&cs=tinysrgb&w=1600",
  alt: "Close-up of elegant rose-pink manicure with gold ring styling"
};

export const featuredServices: ServiceItem[] = [
  {
    name: "Signature Russian Manicure",
    price: "$95 AUD",
    duration: "75 min",
    description: "Detailed cuticle work and flawless shaping for a polished, long-wear finish."
  },
  {
    name: "Builder Gel Overlay",
    price: "$85 AUD",
    duration: "70 min",
    description: "Strengthening overlay ideal for natural nail growth with a glossy editorial look."
  },
  {
    name: "Luxury Spa Pedicure",
    price: "$99 AUD",
    duration: "80 min",
    description: "Exfoliation, mask, massage, and precision polish in your preferred nude or rose tones."
  },
  {
    name: "Soft Pink French Design",
    price: "$72 AUD",
    duration: "55 min",
    description: "Modern feminine French linework using premium gel shades with subtle shimmer."
  }
];

export const serviceGroups: ServiceGroup[] = [
  {
    title: "Manicure Atelier",
    description: "Precision-led manicures designed for elegant everyday wear and special events.",
    items: [
      {
        name: "Classic Luxe Manicure",
        duration: "45 min",
        price: "$58 AUD",
        description: "Nail shaping, cuticle detail, nourishing treatment, and high-shine polish."
      },
      {
        name: "Dry Russian Manicure",
        duration: "70 min",
        price: "$95 AUD",
        description: "Advanced e-file manicure for ultra-clean cuticles and editorial finish."
      },
      {
        name: "Gel Manicure",
        duration: "60 min",
        price: "$68 AUD",
        description: "Chip-resistant gel colour in blush, rose, nude, and seasonal shades."
      },
      {
        name: "Builder Gel BIAB",
        duration: "75 min",
        price: "$89 AUD",
        description: "Strength and structure overlay to support natural nail growth."
      }
    ]
  },
  {
    title: "Nail Art & Design",
    description: "Tailored detailing from minimal accents to full custom design sets.",
    items: [
      {
        name: "Minimalist Line Art",
        duration: "20 min add-on",
        price: "$25 AUD",
        description: "Clean, fine line accents and micro-details for modern luxury styling."
      },
      {
        name: "Soft Pink Chrome",
        duration: "25 min add-on",
        price: "$30 AUD",
        description: "Glazed, luminous chrome over rose and nude tones."
      },
      {
        name: "Bridal Nail Styling",
        duration: "90 min",
        price: "$125 AUD",
        description: "Trial-inspired custom set matched to your dress, palette, and event lighting."
      }
    ]
  },
  {
    title: "Pedicure Lounge",
    description: "Comfort-focused and polished pedicure services with premium products.",
    items: [
      {
        name: "Express Tidy Pedicure",
        duration: "35 min",
        price: "$49 AUD",
        description: "Refresh service for shape, cuticle care, and polish top-up."
      },
      {
        name: "Luxury Spa Pedicure",
        duration: "80 min",
        price: "$99 AUD",
        description: "Salt soak, scrub, mask wrap, massage, and premium polish application."
      },
      {
        name: "Gel Pedicure",
        duration: "60 min",
        price: "$75 AUD",
        description: "Long-wear gel colour with meticulous prep and high-gloss finish."
      }
    ]
  }
];

export const galleryItems: GalleryItem[] = [
  {
    src: "https://images.pexels.com/photos/704815/pexels-photo-704815.jpeg?auto=compress&cs=tinysrgb&w=1400",
    alt: "Nail technician applying precision gel polish on blush pink nails",
    tag: "In Studio"
  },
  {
    src: "https://images.pexels.com/photos/3997986/pexels-photo-3997986.jpeg?auto=compress&cs=tinysrgb&w=1400",
    alt: "Glossy nude manicure close-up with delicate ring styling",
    tag: "Manicure"
  },
  {
    src: "https://images.pexels.com/photos/3993449/pexels-photo-3993449.jpeg?auto=compress&cs=tinysrgb&w=1400",
    alt: "Happy client holding coffee with fresh pastel nail set",
    tag: "Lifestyle"
  },
  {
    src: "https://images.pexels.com/photos/3997391/pexels-photo-3997391.jpeg?auto=compress&cs=tinysrgb&w=1400",
    alt: "Nail art palette featuring rose and soft gold design ideas",
    tag: "Nail Art"
  },
  {
    src: "https://images.pexels.com/photos/853427/pexels-photo-853427.jpeg?auto=compress&cs=tinysrgb&w=1400",
    alt: "Salon interior with blush-toned decor and comfortable pedicure area",
    tag: "Salon"
  },
  {
    src: "https://images.pexels.com/photos/7755656/pexels-photo-7755656.jpeg?auto=compress&cs=tinysrgb&w=1400",
    alt: "Elegant French manicure with subtle gold foil highlights",
    tag: "Portfolio"
  },
  {
    src: "https://images.pexels.com/photos/3997394/pexels-photo-3997394.jpeg?auto=compress&cs=tinysrgb&w=1400",
    alt: "Technician shaping nails with professional e-file tools",
    tag: "Craft"
  },
  {
    src: "https://images.pexels.com/photos/3993444/pexels-photo-3993444.jpeg?auto=compress&cs=tinysrgb&w=1400",
    alt: "Rose pink almond nails photographed against a satin editorial backdrop",
    tag: "Signature"
  }
];

export const whyChooseUs = [
  {
    title: "Senior Nail Artists",
    description: "Our team is known in Wodonga for precision work, shape balance, and healthy nail outcomes."
  },
  {
    title: "Premium Product Suite",
    description: "We use professional-grade gels and spa formulas selected for shine, durability, and nail care."
  },
  {
    title: "Boutique Experience",
    description: "Private, calm, and polished environment designed for comfort from arrival to final top coat."
  },
  {
    title: "Hygiene First",
    description: "Single-use buffers and strict sterilisation standards are part of every appointment."
  }
];

export const testimonials: Testimonial[] = [
  {
    name: "Sophie M.",
    role: "Wodonga Local",
    rating: 5,
    quote:
      "I have tried salons across Albury-Wodonga and this is the first one that truly feels luxury. The finish lasted over three weeks and still looked flawless."
  },
  {
    name: "Emily T.",
    role: "Bride-to-be",
    rating: 5,
    quote:
      "My bridal nails were exactly what I imagined. Elegant, soft, and so detailed. The team listened carefully and made everything feel effortless."
  },
  {
    name: "Chloe R.",
    role: "Weekly Client",
    rating: 5,
    quote:
      "The salon atmosphere is beautiful and the nail artists are consistent every single visit. I always leave with compliments on my nails."
  },
  {
    name: "Mia L.",
    role: "First-time Guest",
    rating: 5,
    quote:
      "From the welcome to the final hand oil, the service was polished and professional. It is now my go-to spot in Wodonga."
  }
];

export const faqs: FaqItem[] = [
  {
    question: "Do you take walk-ins?",
    answer:
      "We welcome walk-ins when availability allows, but we recommend contacting us first so we can prepare the right artist and time for your service."
  },
  {
    question: "How long does a gel manicure last?",
    answer:
      "Most clients enjoy 2-3 weeks of wear depending on lifestyle and aftercare. We provide tailored maintenance advice at the end of each appointment."
  },
  {
    question: "Do you remove work from other salons?",
    answer:
      "Yes. Safe soak-off and careful removal are available as an add-on service to protect natural nails before a fresh set."
  },
  {
    question: "Can I request custom nail art?",
    answer:
      "Absolutely. Share your inspiration in advance and we will match you with an artist who specialises in your preferred style."
  },
  {
    question: "Is there parking near the salon?",
    answer:
      "Yes, there is convenient street parking available around Castleton Street and nearby local parking bays."
  },
  {
    question: "Do you offer online booking?",
    answer:
      "We currently accept enquiries via phone, message, and contact form only so we can provide a more personal service."
  }
];

export const instagramShots = [
  {
    src: "https://images.pexels.com/photos/3997989/pexels-photo-3997989.jpeg?auto=compress&cs=tinysrgb&w=900",
    alt: "Soft ombre pink nails styled with silk ribbon"
  },
  {
    src: "https://images.pexels.com/photos/3997390/pexels-photo-3997390.jpeg?auto=compress&cs=tinysrgb&w=900",
    alt: "Close-up of gold accent nail art on nude base"
  },
  {
    src: "https://images.pexels.com/photos/6621142/pexels-photo-6621142.jpeg?auto=compress&cs=tinysrgb&w=900",
    alt: "Client selfie showing glossy almond-shaped manicure"
  },
  {
    src: "https://images.pexels.com/photos/7755675/pexels-photo-7755675.jpeg?auto=compress&cs=tinysrgb&w=900",
    alt: "Professional nail desk with clean premium tools and rose decor"
  }
];

export const promoOffer = {
  title: "Soft Pink Glow Offer",
  subtitle: "15% off selected nail art this month",
  description:
    "Enjoy signature blush and rose nail art finishes at a limited-time reduced rate. Mention this offer when you call or message us.",
  validity: "Valid for March appointments only"
};

export const stats = [
  { label: "Google Rating", value: "4.9/5" },
  { label: "Returning Clients", value: "82%" },
  { label: "Average Service Time", value: "60 min" },
  { label: "Years in Beauty", value: "9+" }
];

export const aboutStory =
  "Lumiere Nail Atelier was created for clients who want a refined salon experience without compromise. Located in Wodonga, our studio blends modern beauty trends with timeless technique, delivering polished nails that look elegant in daily life, events, and professional settings.";
