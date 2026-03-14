import "../styles/globals.css";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { ReactNode } from "react";

export const metadata = {
  title: "Toronto Airport Limo Service | AirLink Ride",
  description:
    "Reliable Toronto airport limo service to Pearson Airport (YYZ). Luxury vehicles, professional chauffeurs, and flat-rate pricing across the GTA.",
};

interface RootLayoutProps {
  children: ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en">
      <body className="bg-black text-white flex flex-col min-h-screen">
        <Navbar />

        <main className="flex-grow">{children}</main>

        <Footer />
      </body>
    </html>
  );
}
