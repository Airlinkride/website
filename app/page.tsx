import type { Metadata } from "next";
import Hero from "@/components/Hero";
import ServiceAreas from "@/components/ServiceAreas";

export const metadata: Metadata = {
  alternates: {
    canonical: "https://www.airlinkride.com",
  },
};

export default function Home() {
  return (
    <>
      <Hero />
      <ServiceAreas />
    </>
  );
}