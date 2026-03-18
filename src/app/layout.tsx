import type { Metadata } from "next";
import { Cormorant_Garamond, Manrope } from "next/font/google";
import type { ReactNode } from "react";

import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { business } from "@/content/site";

import "./globals.css";

const headingFont = Cormorant_Garamond({
  subsets: ["latin"],
  variable: "--font-heading",
  weight: ["400", "500", "600", "700"]
});

const bodyFont = Manrope({
  subsets: ["latin"],
  variable: "--font-body",
  weight: ["400", "500", "600", "700"]
});

export const metadata: Metadata = {
  metadataBase: new URL("https://lumierenailatelier.com.au"),
  title: {
    default: `${business.name} | Premium Nail Salon in Wodonga`,
    template: `%s | ${business.name}`
  },
  description:
    "Luxury nail salon in Wodonga offering premium manicures, nail art, builder gel, and spa pedicures in an elegant boutique setting.",
  openGraph: {
    title: `${business.name} | Luxury Nails in Wodonga`,
    description:
      "Discover polished nail artistry, modern beauty services, and a premium client experience in Wodonga VIC.",
    type: "website",
    locale: "en_AU"
  }
};

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="en">
      <body className={`${headingFont.variable} ${bodyFont.variable} antialiased`}>
        <div className="relative overflow-x-clip">
          <div className="pointer-events-none absolute inset-x-0 top-[-120px] -z-10 h-[420px] bg-hero-glow" />
          <Header />
          <main className="font-[var(--font-body)]">{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
