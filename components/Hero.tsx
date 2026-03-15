"use client";

import { motion } from "framer-motion";
import Link from "next/link";

export default function Hero() {
  return (
    <section
      className="relative h-[85vh] flex items-center justify-center text-center bg-cover bg-center"
      style={{ backgroundImage: "url('/toronto-airport-limo-interior.jpg')" }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/70"></div>

      <motion.div
        className="relative z-10 max-w-3xl px-6"
        initial={{ opacity: 0, y: 60 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        {/* H1 (SEO Keyword) */}
        <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
          Toronto Airport Limo Service
          <span className="text-lime-400 block mt-2">
            Reliable Rides to Pearson Airport (YYZ)
          </span>
        </h1>

        {/* Description */}
        <p className="text-gray-300 text-lg mb-10">
          Professional airport limousine service across Toronto and the GTA.
          Enjoy luxury vehicles, experienced chauffeurs, and flat-rate airport
          transportation available 24/7.
        </p>

        {/* Buttons */}
        <div className="flex flex-col md:flex-row gap-4 justify-center">
          <Link href="/booking">
            <button className="bg-lime-400 text-black px-8 py-4 rounded-lg text-lg font-semibold hover:bg-lime-300 transition">
              Book Your Ride
            </button>
          </Link>

          <Link href="/rates">
            <button className="border border-white px-8 py-4 rounded-lg text-lg hover:bg-white hover:text-black transition">
              View Rates
            </button>
          </Link>

          <Link href="/contact">
            <button className="border border-lime-400 text-lime-400 px-8 py-4 rounded-lg text-lg hover:bg-lime-400 hover:text-black transition">
              Contact Us
            </button>
          </Link>
        </div>
      </motion.div>
    </section>
  );
}
