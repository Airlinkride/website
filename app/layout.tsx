import "../styles/globals.css";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { ReactNode } from "react";
import { Toaster } from "react-hot-toast";
import { GoogleTagManager } from "@next/third-parties/google";
import type { Metadata } from "next";
import { locations } from "@/data/locations";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.airlinkride.com"),

  title: {
    default: "Toronto Airport Limo Service | AirLink Ride",
    template: "%s | AirLink Ride",
  },

  description:
    "Reliable Toronto airport limo service to Pearson Airport (YYZ). Luxury vehicles, professional chauffeurs, and flat-rate pricing across Toronto, the GTA, and Ontario.",

  openGraph: {
    title: "Toronto Airport Limo Service | AirLink Ride",
    description:
      "Reliable Toronto airport limo service to Pearson Airport (YYZ). Luxury vehicles, professional chauffeurs, and flat-rate pricing across Toronto, the GTA, and Ontario.",
    url: "https://www.airlinkride.com",
    siteName: "AirLink Ride",
    type: "website",
    locale: "en_CA",
  },
};

const serviceAreas = [
  "Toronto",
  "Brampton",
  "Vaughan",
  "Markham",
  "Richmond Hill",
  "Oakville",
  "Burlington",
  "Greater Toronto Area",
  ...locations.map((location) => location.name),
];

const uniqueServiceAreas = Array.from(new Set(serviceAreas));

const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": "TaxiService",
  name: "AirLink Ride",
  url: "https://www.airlinkride.com",
  telephone: "+1-437-522-8001",
  email: "info@airlinkride.com",
  priceRange: "$$",
  areaServed: uniqueServiceAreas,
  serviceType: "Airport Limo Service",
};

interface RootLayoutProps {
  children: ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en">
      <GoogleTagManager gtmId="GTM-TRK7GNQ8" />

      <body className="flex min-h-screen flex-col bg-black text-white">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(localBusinessSchema),
          }}
        />

        <Navbar />

        <Toaster position="top-right" />

        <main className="flex-grow">{children}</main>

        <Footer />
      </body>
    </html>
  );
}