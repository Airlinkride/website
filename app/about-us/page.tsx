// app/about/page.tsx
import AboutClient from "./AboutClient";

export const metadata = {
  title: "About AirLink Ride | Toronto Airport Limo Service",
  description:
    "AirLink Ride provides premium Toronto airport limo service, Pearson Airport transfers, flat-rate rides, and chauffeur service across the GTA.",
  alternates: {
    canonical: "https://www.airlinkride.com/about-us",
  },
};

export default function AboutPage() {
  return <AboutClient />;
}