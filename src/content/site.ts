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

export type HeroPanel = {
  src: string;
  alt: string;
};

export type CategoryPreview = {
  title: string;
  count: string;
  description: string;
  href: string;
};

export type TeamMember = {
  name: string;
  role: string;
  quote: string;
  image: string;
  alt: string;
};

export const business = {
  name: "Hannah Nails",
  tagline: "Minimal, polished nails in Wodonga",
  phone: "+61 3 5721 9488",
  mobile: "+61 412 880 614",
  email: "hello@hannahnails.com.au",
  addressLine1: "29 Castleton Street",
  addressLine2: "Wodonga VIC 3690, Australia",
  fullAddress: "29 Castleton Street, Wodonga VIC 3690, Australia",
  instagram: "@hannahnails.wodonga",
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
  { day: "Monday", hours: "10:00 AM - 6:00 PM" },
  { day: "Tuesday", hours: "10:00 AM - 6:00 PM" },
  { day: "Wednesday", hours: "10:00 AM - 7:00 PM" },
  { day: "Thursday", hours: "10:00 AM - 7:00 PM" },
  { day: "Friday", hours: "10:00 AM - 6:00 PM" },
  { day: "Saturday", hours: "9:00 AM - 4:00 PM" },
  { day: "Sunday", hours: "Closed" }
];

export const heroImage = {
  src: "https://images.pexels.com/photos/3997385/pexels-photo-3997385.jpeg?auto=compress&cs=tinysrgb&w=1600",
  alt: "Close-up of glossy lavender manicure with gold jewellery styling"
};

export const heroPanels: HeroPanel[] = [
  {
    src: "https://images.pexels.com/photos/3997385/pexels-photo-3997385.jpeg?auto=compress&cs=tinysrgb&w=1400",
    alt: "Glossy lilac manicure photographed in soft studio lighting"
  },
  {
    src: "https://images.pexels.com/photos/7755656/pexels-photo-7755656.jpeg?auto=compress&cs=tinysrgb&w=1200",
    alt: "Minimal nail art set with almond shape and soft shimmer finish"
  },
  {
    src: "https://images.pexels.com/photos/3997394/pexels-photo-3997394.jpeg?auto=compress&cs=tinysrgb&w=1200",
    alt: "Nail artist refining detailed manicure work at a clean studio desk"
  }
];

export const servicePreviews: CategoryPreview[] = [
  {
    title: "Manicures",
    count: "8 services",
    description: "Clean prep, refined shaping, and soft high-gloss finishes for everyday wear.",
    href: "/services"
  },
  {
    title: "BIAB & Gel",
    count: "6 services",
    description: "Strength-focused overlays and long-wear colour designed for healthy nail growth.",
    href: "/services"
  },
  {
    title: "Pedicures",
    count: "4 services",
    description: "Polished pedicure services with spa touches and salon-grade products.",
    href: "/services"
  }
];

export const featuredServices: ServiceItem[] = [
  {
    name: "Classic Manicure",
    price: "$45 AUD",
    duration: "40 min",
    description: "Shape, cuticle tidy, hand care, and a glossy polish finish."
  },
  {
    name: "Russian Manicure",
    price: "$95 AUD",
    duration: "75 min",
    description: "Detailed dry manicure for crisp cuticles and clean, editorial results."
  },
  {
    name: "BIAB Overlay",
    price: "$88 AUD",
    duration: "70 min",
    description: "Builder gel support for natural nail growth with a smooth structured finish."
  },
  {
    name: "Nail Art Add-On",
    price: "$18+ AUD",
    duration: "15-25 min",
    description: "Minimal swirls, chrome touches, or custom detail layered over your chosen set."
  }
];

export const serviceGroups: ServiceGroup[] = [
  {
    title: "Manicures",
    description: "Simple, neat, wearable nails with careful prep and elevated detail.",
    items: [
      {
        name: "Classic Manicure",
        duration: "40 min",
        price: "$45 AUD",
        description: "Nail shaping, cuticle care, buffing, and regular polish."
      },
      {
        name: "Gel Manicure",
        duration: "55 min",
        price: "$65 AUD",
        description: "Long-wear gel colour in a clean, glossy finish."
      },
      {
        name: "French Manicure",
        duration: "60 min",
        price: "$72 AUD",
        description: "A modern French finish with a fine bright tip and balanced shape."
      },
      {
        name: "Russian Manicure",
        duration: "75 min",
        price: "$95 AUD",
        description: "Advanced dry manicure for precise prep and ultra-clean cuticles."
      }
    ]
  },
  {
    title: "BIAB & Extensions",
    description: "Strength, structure, and design-led options for longer-lasting results.",
    items: [
      {
        name: "BIAB Overlay",
        duration: "70 min",
        price: "$88 AUD",
        description: "Builder overlay that protects and strengthens natural nails."
      },
      {
        name: "BIAB Rebalance",
        duration: "75 min",
        price: "$92 AUD",
        description: "Maintenance appointment to refresh structure and regrowth."
      },
      {
        name: "Soft Gel Extensions",
        duration: "95 min",
        price: "$110 AUD",
        description: "Lightweight extensions with a refined finish and natural feel."
      },
      {
        name: "Detailed Nail Art",
        duration: "20 min add-on",
        price: "$18+ AUD",
        description: "Custom minimal art, chrome, pearls, or fine-line design."
      }
    ]
  },
  {
    title: "Pedicures",
    description: "Refined feet care with polish and spa-focused upgrades.",
    items: [
      {
        name: "Express Pedicure",
        duration: "35 min",
        price: "$48 AUD",
        description: "Quick tidy, shape, and polish for a polished refresh."
      },
      {
        name: "Gel Pedicure",
        duration: "55 min",
        price: "$72 AUD",
        description: "Long-wear gel colour with meticulous prep."
      },
      {
        name: "Luxury Spa Pedicure",
        duration: "75 min",
        price: "$95 AUD",
        description: "Exfoliation, massage, mask wrap, and polished finish."
      }
    ]
  }
];

export const galleryItems: GalleryItem[] = [
  {
    src: "https://images.pexels.com/photos/3997986/pexels-photo-3997986.jpeg?auto=compress&cs=tinysrgb&w=1400",
    alt: "Glossy nude and lavender manicure close-up with minimalist styling",
    tag: "Signature Set"
  },
  {
    src: "https://images.pexels.com/photos/704815/pexels-photo-704815.jpeg?auto=compress&cs=tinysrgb&w=1400",
    alt: "Nail artist applying gel polish during a manicure appointment",
    tag: "In Studio"
  },
  {
    src: "https://images.pexels.com/photos/3993444/pexels-photo-3993444.jpeg?auto=compress&cs=tinysrgb&w=1400",
    alt: "Editorial nail set photographed on satin fabric with soft purple tones",
    tag: "Editorial"
  },
  {
    src: "https://images.pexels.com/photos/7755658/pexels-photo-7755658.jpeg?auto=compress&cs=tinysrgb&w=1400",
    alt: "Clean manicure station with premium products and polished tools",
    tag: "Studio"
  },
  {
    src: "https://images.pexels.com/photos/3997391/pexels-photo-3997391.jpeg?auto=compress&cs=tinysrgb&w=1400",
    alt: "Palette of chic nail art inspiration with lilac, nude, and shimmer finishes",
    tag: "Design Menu"
  },
  {
    src: "https://images.pexels.com/photos/853427/pexels-photo-853427.jpeg?auto=compress&cs=tinysrgb&w=1400",
    alt: "Light-filled salon interior with elegant seating and beauty styling",
    tag: "Salon Space"
  },
  {
    src: "https://images.pexels.com/photos/7755675/pexels-photo-7755675.jpeg?auto=compress&cs=tinysrgb&w=1400",
    alt: "French manicure with subtle shimmer detail and almond shape",
    tag: "French Finish"
  },
  {
    src: "https://images.pexels.com/photos/6621461/pexels-photo-6621461.jpeg?auto=compress&cs=tinysrgb&w=1400",
    alt: "Client beauty portrait showing finished manicure in natural light",
    tag: "Client Glow"
  }
];

export const whyChooseUs = [
  {
    title: "Detail-First Prep",
    description: "Every appointment starts with clean prep and shaping that makes the final set look more expensive."
  },
  {
    title: "Simple, Elevated Design",
    description: "Our style leans polished and wearable, with just enough detail to feel special."
  },
  {
    title: "Healthy Nail Focus",
    description: "We choose products and service pacing that support long-term nail condition."
  }
];

export const testimonials: Testimonial[] = [
  {
    name: "Jasmine R.",
    role: "Regular Client",
    rating: 5,
    quote:
      "The salon feels calm and considered, and my nails always look clean, modern, and beautifully finished."
  },
  {
    name: "Alicia T.",
    role: "First Visit",
    rating: 5,
    quote:
      "I wanted something minimal but still special. Hannah understood the brief immediately and the result was exactly right."
  },
  {
    name: "Brooke M.",
    role: "BIAB Client",
    rating: 5,
    quote:
      "My natural nails have never looked stronger. The BIAB work is neat, refined, and lasts really well."
  },
  {
    name: "Erin C.",
    role: "Bride",
    rating: 5,
    quote:
      "My bridal nails were soft, elegant, and photographed beautifully. The whole experience felt thoughtful from start to finish."
  }
];

export const faqs: FaqItem[] = [
  {
    question: "How do I book an appointment?",
    answer:
      "You can book by phone, message, or enquiry form. We confirm appointment details personally so the service matches what you need."
  },
  {
    question: "Do you take walk-ins?",
    answer:
      "Walk-ins are welcome when time allows, but we recommend booking ahead for evenings, Saturdays, and detailed nail art."
  },
  {
    question: "What should I book if I want stronger natural nails?",
    answer:
      "BIAB overlay or BIAB rebalance is usually the best starting point. If you are unsure, send us a quick message and we will guide you."
  },
  {
    question: "Can I bring inspo photos?",
    answer:
      "Yes. We encourage it, especially for art requests. It helps us match your shape, colour story, and level of detail."
  },
  {
    question: "Do you remove work from another salon?",
    answer:
      "Yes. Safe removal can be added before your new service so we protect the natural nail as much as possible."
  },
  {
    question: "Is parking available nearby?",
    answer:
      "Yes. There is convenient local parking around Castleton Street and the surrounding Wodonga area."
  }
];

export const instagramShots = [
  {
    src: "https://images.pexels.com/photos/3997989/pexels-photo-3997989.jpeg?auto=compress&cs=tinysrgb&w=900",
    alt: "Soft ombre manicure photographed with ribbon styling"
  },
  {
    src: "https://images.pexels.com/photos/3997390/pexels-photo-3997390.jpeg?auto=compress&cs=tinysrgb&w=900",
    alt: "Minimal chrome nail accents over a pale nude base"
  },
  {
    src: "https://images.pexels.com/photos/7755637/pexels-photo-7755637.jpeg?auto=compress&cs=tinysrgb&w=900",
    alt: "Happy salon client showing off a fresh glossy manicure"
  },
  {
    src: "https://images.pexels.com/photos/7755539/pexels-photo-7755539.jpeg?auto=compress&cs=tinysrgb&w=900",
    alt: "Lavender-themed salon interior styling with feminine beauty details"
  }
];

export const promoOffer = {
  title: "Lavender Glow Offer",
  subtitle: "15% off selected BIAB and minimalist art combinations",
  description:
    "Perfect if you want a clean set with a little extra detail. Mention Lavender Glow when you enquire.",
  validity: "Available for a limited time"
};

export const stats = [
  { label: "Client Rating", value: "4.9/5" },
  { label: "Years in Nails", value: "8+" },
  { label: "Returning Clients", value: "90%" },
  { label: "Most Booked Service", value: "BIAB" }
];

export const founder = {
  name: "Hannah",
  role: "Founder & Nail Artist",
  quote:
    "I built Hannah Nails to feel calm, modern, and personal. The goal is simple: nails that still feel like you, only more polished."
};

export const teamMembers: TeamMember[] = [
  {
    name: "Hannah",
    role: "Founder & BIAB Specialist",
    quote: "Known for structured overlays, soft colour palettes, and detail-led prep.",
    image: "https://images.pexels.com/photos/7755427/pexels-photo-7755427.jpeg?auto=compress&cs=tinysrgb&w=900",
    alt: "Lead nail artist smiling in a bright beauty studio"
  },
  {
    name: "Isla",
    role: "Minimal Art Specialist",
    quote: "Fine lines, chrome accents, and understated sets that photograph beautifully.",
    image: "https://images.pexels.com/photos/6621469/pexels-photo-6621469.jpeg?auto=compress&cs=tinysrgb&w=900",
    alt: "Nail technician portrait with polished salon styling"
  },
  {
    name: "Mia",
    role: "Pedicure & Care Specialist",
    quote: "Comfort-focused appointments with careful finishing and clean polish work.",
    image: "https://images.pexels.com/photos/853430/pexels-photo-853430.jpeg?auto=compress&cs=tinysrgb&w=900",
    alt: "Beauty team member portrait in a soft neutral studio"
  }
];

export const aboutStory =
  "Hannah Nails brings a simple, elevated approach to nail care in Wodonga. Our studio blends clean preparation, soft design direction, and a relaxed client experience so every appointment feels polished without being overdone.";
