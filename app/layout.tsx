import "../styles/globals.css";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { ReactNode } from "react";
import { Toaster } from "react-hot-toast";
import { GoogleTagManager } from "@next/third-parties/google";
import type { Metadata } from "next";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.airlinkride.com"),
  title: {
    default: "Toronto Airport Limo Service | AirLink Ride",
    template: "%s | AirLink Ride",
  },
  description:
    "Reliable Toronto airport limo service to Pearson Airport (YYZ). Luxury vehicles, professional chauffeurs, and flat-rate pricing across the GTA.",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Toronto Airport Limo Service | AirLink Ride",
    description:
      "Reliable Toronto airport limo service to Pearson Airport (YYZ). Luxury vehicles, professional chauffeurs, and flat-rate pricing across the GTA.",
    url: "https://www.airlinkride.com",
    siteName: "AirLink Ride",
    type: "website",
    locale: "en_CA",
  },
};

const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": "TaxiService",
  name: "AirLink Ride",
  url: "https://www.airlinkride.com",
  telephone: "+1-437-522-8001",
  email: "info@airlinkride.com",
  priceRange: "$$",
  areaServed: [
    "Toronto",
    "Mississauga",
    "Brampton",
    "Vaughan",
    "Markham",
    "Richmond Hill",
    "Oakville",
    "Burlington",
    "Greater Toronto Area",
  ],
  serviceType: "Toronto Airport Limo Service",
};

interface RootLayoutProps {
  children: ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en">
      <GoogleTagManager gtmId="GTM-TRK7GNQ8" />

      <body className="bg-black text-white flex flex-col min-h-screen">
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