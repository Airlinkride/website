"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { CheckCircle2, CalendarDays, Clock3, MapPin, CarFront, Mail, Phone } from "lucide-react";

type BookingSummary = {
  name: string;
  pickup: string;
  drop: string;
  date: string;
  time: string;
  vehicle: string;
  customTrip: boolean;
};

export default function ThankYouPage() {
  const [booking, setBooking] = useState<BookingSummary | null>(null);
  useEffect(() => {
    try {
      const saved = sessionStorage.getItem("airlinkride-last-booking");
      if (saved) setBooking(JSON.parse(saved) as BookingSummary);
    } catch {
      // The confirmation page remains usable without browser storage.
    }
  }, []);

  const details = booking ? [
    { icon: MapPin, label: "Pickup", value: booking.pickup },
    { icon: MapPin, label: "Drop-off", value: booking.drop },
    { icon: CalendarDays, label: "Travel date", value: booking.date },
    { icon: Clock3, label: "Pickup time", value: booking.time },
    { icon: CarFront, label: "Vehicle", value: booking.vehicle },
  ] : [];

  return (
    <main className="min-h-screen bg-zinc-950 px-4 py-16 text-white sm:py-24">
      <div className="mx-auto max-w-2xl">
        <div className="rounded-3xl border border-zinc-800 bg-zinc-900 p-6 shadow-2xl sm:p-10">
          <div className="flex justify-center"><div className="rounded-full bg-lime-400/10 p-5"><CheckCircle2 className="h-14 w-14 text-lime-400" aria-hidden="true" /></div></div>
          <div className="mt-6 text-center">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-lime-400">AirLinkRide</p>
            <h1 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">Thank you{booking?.name ? `, ${booking.name}` : ""}!</h1>
            <p className="mt-3 text-xl font-semibold">{booking?.customTrip ? "Quote Request Received" : "Booking Request Received"}</p>
            <p className="mx-auto mt-3 max-w-lg text-zinc-300">We've received your request. Our team will review your trip details and follow up by email. Your ride is not confirmed until our team confirms it.</p>
          </div>
          {booking && <div className="mt-9 rounded-2xl border border-zinc-700 bg-zinc-950/60 p-5 sm:p-6">
            <h2 className="mb-5 text-lg font-semibold">Your trip summary</h2>
            <dl className="space-y-4">{details.map(({icon: Icon, label, value}) => <div key={label} className="flex items-start gap-3"><Icon className="mt-0.5 h-5 w-5 shrink-0 text-lime-400" aria-hidden="true"/><div><dt className="text-sm text-zinc-400">{label}</dt><dd className="break-words font-medium">{value}</dd></div></div>)}</dl>
          </div>}
          <div className="mt-8 text-center"><h2 className="text-lg font-semibold">Need to make a change?</h2><p className="mt-2 text-sm text-zinc-300">Our customer support team is available 24/7.</p>
            <div className="mt-4 flex flex-wrap justify-center gap-x-6 gap-y-3 text-sm"><a className="inline-flex items-center gap-2 text-lime-400 hover:underline" href="tel:+14375228001"><Phone className="h-4 w-4"/>+1 437-522-8001</a><a className="inline-flex items-center gap-2 text-lime-400 hover:underline" href="mailto:info@airlinkride.com"><Mail className="h-4 w-4"/>info@airlinkride.com</a></div>
          </div>
          <div className="mt-9 flex flex-col gap-3 sm:flex-row"><Link href="/" className="flex-1 rounded-xl bg-lime-400 px-5 py-3 text-center font-bold text-black transition hover:bg-lime-300">Return to Home</Link><Link href="/booking" className="flex-1 rounded-xl border border-zinc-600 px-5 py-3 text-center font-semibold transition hover:bg-zinc-800">Make Another Booking</Link></div>
        </div>
      </div>
    </main>
  );
}
