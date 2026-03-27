"use client";

import { FormEvent, useState } from "react";
import { SendHorizontal } from "lucide-react";

export function ContactForm() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitted(true);
  };

  return (
    <section className="glass-card p-6 sm:p-7">
      <h2 className="font-serif text-3xl">Book Your Appointment</h2>
      <p className="mt-2 text-sm text-plum/75">
        Tell us your preferred service, date, and design mood. We will confirm the best option for you.
      </p>

      <form onSubmit={handleSubmit} className="mt-6 space-y-4" aria-label="Contact form">
        <div>
          <label htmlFor="name" className="mb-1 block text-sm font-medium text-plum/85">
            Full Name
          </label>
          <input
            id="name"
            name="name"
            required
            className="w-full rounded-xl border border-rose/30 bg-white px-4 py-3 text-sm text-plum outline-none ring-rose/30 transition focus:ring-2"
          />
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label htmlFor="email" className="mb-1 block text-sm font-medium text-plum/85">
              Email Address
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              className="w-full rounded-xl border border-rose/30 bg-white px-4 py-3 text-sm text-plum outline-none ring-rose/30 transition focus:ring-2"
            />
          </div>
          <div>
            <label htmlFor="phone" className="mb-1 block text-sm font-medium text-plum/85">
              Phone Number
            </label>
            <input
              id="phone"
              name="phone"
              type="tel"
              required
              className="w-full rounded-xl border border-rose/30 bg-white px-4 py-3 text-sm text-plum outline-none ring-rose/30 transition focus:ring-2"
            />
          </div>
        </div>

        <div>
          <label htmlFor="service" className="mb-1 block text-sm font-medium text-plum/85">
            Service of Interest
          </label>
          <select
            id="service"
            name="service"
            className="w-full rounded-xl border border-rose/30 bg-white px-4 py-3 text-sm text-plum outline-none ring-rose/30 transition focus:ring-2"
            defaultValue=""
            required
          >
            <option value="" disabled>
              Select one
            </option>
            <option value="russian-manicure">Russian Manicure</option>
            <option value="gel-manicure">Gel Manicure</option>
            <option value="builder-gel">BIAB Overlay</option>
            <option value="nail-art">Minimal Nail Art</option>
            <option value="pedicure">Luxury Spa Pedicure</option>
          </select>
        </div>

        <div>
          <label htmlFor="message" className="mb-1 block text-sm font-medium text-plum/85">
            Message
          </label>
          <textarea
            id="message"
            name="message"
            rows={5}
            required
            className="w-full rounded-xl border border-rose/30 bg-white px-4 py-3 text-sm text-plum outline-none ring-rose/30 transition focus:ring-2"
            placeholder="Share your preferred date, time, and any inspo you like..."
          />
        </div>

        <button
          type="submit"
          className="inline-flex items-center gap-2 rounded-full bg-plum px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#3d1e2d]"
        >
          <SendHorizontal size={16} />
          Send Booking Request
        </button>

        {submitted ? (
          <p className="rounded-xl border border-gold/45 bg-gold/15 px-4 py-3 text-sm text-plum" role="status">
            Thank you. Your booking request has been received. We will contact you shortly to confirm.
          </p>
        ) : null}
      </form>
    </section>
  );
}
