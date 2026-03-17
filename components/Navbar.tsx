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
    <nav className="bg-black text-white sticky top-0 z-50 border-b border-gray-900">

      <div
        ref={menuRef}
        className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between"
      >

        {/* LOGO */}
        <Link href="/" className="flex items-center gap-3 group">
          <Image
            src="/logo.png"
            alt="AirLinkRide Logo"
            width={60}
            height={60}
            priority
            className="group-hover:scale-105 transition"
          />

          <span className="text-xl font-semibold tracking-wide">
            AirLinkRide
          </span>
        </Link>

        {/* DESKTOP MENU */}
        <div className="hidden md:flex items-center gap-8 text-sm font-medium">

          <Link
            href="/"
            className="hover:text-lime-400 transition"
          >
            Home
          </Link>

          <Link
            href="/about-us"
            className="hover:text-lime-400 transition"
          >
            About
          </Link>

          <Link
            href="/rates"
            className="hover:text-lime-400 transition"
          >
            Rates
          </Link>

          <Link
            href="/contact"
            className="hover:text-lime-400 transition"
          >
            Contact
          </Link>

          {/* BOOK BUTTON */}
          <Link href="/booking">
            <button className="bg-lime-400 text-black px-6 py-2 rounded-full font-semibold hover:bg-lime-300 transition shadow-md">
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
      <div
        className={`md:hidden overflow-hidden transition-all duration-300 ${
          menuOpen ? "max-h-96" : "max-h-0"
        }`}
      >

        <div className="flex flex-col gap-6 px-6 py-6 bg-black border-t border-gray-900 text-center">

          <Link href="/" onClick={() => setMenuOpen(false)}>
            Home
          </Link>

          <Link href="/about-us" onClick={() => setMenuOpen(false)}>
            About
          </Link>

          <Link href="/rates" onClick={() => setMenuOpen(false)}>
            Rates
          </Link>

          <Link href="/contact" onClick={() => setMenuOpen(false)}>
            Contact
          </Link>

          <Link href="/booking" onClick={() => setMenuOpen(false)}>
            <button className="bg-lime-400 text-black px-6 py-3 rounded-full font-semibold w-full hover:bg-lime-300 transition">
              Book Ride
            </button>
          </Link>

        </div>

      </div>
    </nav>
  );
}