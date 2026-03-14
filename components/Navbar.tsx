"use client";

import Link from "next/link";
import Image from "next/image";

export default function Navbar() {
  return (
    <nav className="bg-black text-white sticky top-0 z-50 shadow-md">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* LOGO */}
        <Link href="/" className="flex items-center gap-3">
          <Image
            src="/logo.png"
            alt="AirLinkRide Logo"
            width={45}
            height={45}
            priority
          />
          <span className="text-xl font-bold tracking-wide">AirLinkRide</span>
        </Link>

        {/* MENU */}
        <div className="hidden md:flex items-center gap-8 font-medium">
          <Link href="/" className="hover:text-lime-400 transition">
            Home
          </Link>

          <Link href="/about" className="hover:text-lime-400 transition">
            About
          </Link>

          <Link href="/rates" className="hover:text-lime-400 transition">
            Rates
          </Link>

          <Link href="/contact" className="hover:text-lime-400 transition">
            Contact
          </Link>

          <Link href="/booking">
            <button className="bg-lime-400 text-black px-5 py-2 rounded-lg font-semibold hover:bg-lime-300 transition">
              Book Ride
            </button>
          </Link>
        </div>
      </div>
    </nav>
  );
}
