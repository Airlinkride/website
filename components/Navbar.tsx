"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useRef, useEffect } from "react";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  // Close menu when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        menuRef.current &&
        !menuRef.current.contains(event.target as Node)
      ) {
        setMenuOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <nav className="bg-black text-white sticky top-0 z-50 shadow-md">
      <div
        ref={menuRef}
        className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between"
      >
        {/* LOGO */}
        <Link href="/" className="flex items-center gap-3">
          <Image
            src="/logo.png"
            alt="AirLinkRide Logo"
            width={45}
            height={45}
            priority
          />
          <span className="text-xl font-bold tracking-wide">
            AirLinkRide
          </span>
        </Link>

        {/* DESKTOP MENU */}
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

        {/* MOBILE BUTTON */}
        <button
          className="md:hidden text-3xl"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? "✕" : "☰"}
        </button>
      </div>

      {/* MOBILE MENU */}
      {menuOpen && (
        <div
          ref={menuRef}
          className="md:hidden flex flex-col gap-6 px-6 pb-6 bg-black font-medium border-t border-gray-800"
        >
          <Link href="/" onClick={() => setMenuOpen(false)}>
            Home
          </Link>

          <Link href="/about" onClick={() => setMenuOpen(false)}>
            About
          </Link>

          <Link href="/rates" onClick={() => setMenuOpen(false)}>
            Rates
          </Link>

          <Link href="/contact" onClick={() => setMenuOpen(false)}>
            Contact
          </Link>

          <Link href="/booking" onClick={() => setMenuOpen(false)}>
            <button className="bg-lime-400 text-black px-5 py-2 rounded-lg font-semibold w-full">
              Book Ride
            </button>
          </Link>
        </div>
      )}
    </nav>
  );
}