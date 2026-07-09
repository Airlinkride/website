import ContactClient from "./ContactClient";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact AirLink Ride | Toronto Airport Limo Service",
  description:
    "Contact AirLink Ride for 24/7 Toronto airport limo service, Pearson Airport transfers, luxury airport transportation, and chauffeur service across Ontario.",
  alternates: {
    canonical: "https://www.airlinkride.com/contact",
  },
};

export default function ContactPage() {
  return <ContactClient />;
}