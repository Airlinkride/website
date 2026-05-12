"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import Link from "next/link";
import { ChevronDown } from "lucide-react";

export default function Hero() {
  const scrollToPayment = () => {
    const section = document.getElementById("payment-section");
    section?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      {/* HERO */}
      <section
        className="relative min-h-screen flex items-center justify-center text-center bg-cover bg-center overflow-hidden"
        style={{
          backgroundImage: "url('/toronto-airport-limo-interior.jpg')",
        }}
      >
        {/* DARK OVERLAY */}
        <div className="absolute inset-0 bg-black/75"></div>

        {/* HERO CONTENT */}
        <motion.div
          className="relative z-10 w-full max-w-5xl px-5 sm:px-6 md:px-10 pt-28 md:pt-20 pb-28"
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          {/* TITLE */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold leading-tight">
            Toronto Airport Limo Service

            <span className="text-lime-400 block mt-4">
              Reliable Rides to
            </span>

            <span className="text-lime-400 block">
              Pearson Airport (YYZ)
            </span>
          </h1>

          {/* DESCRIPTION */}
          <p className="text-gray-300 text-base sm:text-lg mt-8 max-w-3xl mx-auto leading-relaxed">
            Professional airport limousine service across Toronto and the GTA.
            Enjoy luxury vehicles, experienced chauffeurs, and flat-rate airport
            transportation available 24/7.
          </p>

          {/* BUTTONS */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mt-10">
            <Link href="/booking">
              <button className="w-[240px] sm:w-auto bg-lime-400 text-black px-8 py-4 rounded-xl text-lg font-semibold hover:bg-lime-300 transition shadow-lg">
                Book Your Ride
              </button>
            </Link>

            <Link href="/rates">
              <button className="w-[240px] sm:w-auto border border-white px-8 py-4 rounded-xl text-lg hover:bg-white hover:text-black transition">
                View Rates
              </button>
            </Link>

            <Link href="/contact">
              <button className="w-[240px] sm:w-auto border border-lime-400 text-lime-400 px-8 py-4 rounded-xl text-lg hover:bg-lime-400 hover:text-black transition">
                Contact Us
              </button>
            </Link>
          </div>
        </motion.div>

        {/* DESKTOP SCROLL INDICATOR */}
        <motion.button
          onClick={scrollToPayment}
          className="hidden md:flex absolute bottom-10 right-8 z-20 flex-col items-center text-white group"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 1 }}
        >
          <span className="text-sm text-gray-300 mb-2 group-hover:text-lime-400 transition">
            Explore More
          </span>

          {/* Mouse */}
          <motion.div
            className="w-7 h-11 border-2 border-lime-400 rounded-full flex justify-center p-1 shadow-lg shadow-lime-400/30"
            animate={{ y: [0, 8, 0] }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            <motion.div
              className="w-1.5 h-1.5 bg-lime-400 rounded-full"
              animate={{
                y: [0, 18, 0],
                opacity: [1, 0.3, 1],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          </motion.div>

          <motion.div
            animate={{ y: [0, 5, 0] }}
            transition={{
              duration: 1.3,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            <ChevronDown className="mt-2 text-lime-400 w-6 h-6" />
          </motion.div>
        </motion.button>

        {/* MOBILE SCROLL INDICATOR */}
        <motion.button
          onClick={scrollToPayment}
          className="md:hidden absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center text-white"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 1 }}
        >
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{
              duration: 1.2,
              repeat: Infinity,
            }}
          >
            <ChevronDown className="text-lime-400 w-8 h-8" />
          </motion.div>

          <span className="text-xs text-gray-400 mt-1">
            Scroll
          </span>
        </motion.button>
      </section>

      {/* PAYMENT SECTION */}
      <section
        id="payment-section"
        className="relative bg-black py-20 md:py-24 px-5 sm:px-6 overflow-hidden"
      >
        {/* BACKGROUND GLOW */}
        <div className="absolute inset-0 bg-gradient-to-br from-lime-400/10 via-black to-black"></div>

        <div className="relative max-w-7xl mx-auto grid lg:grid-cols-2 gap-14 items-center">
          {/* LEFT CONTENT */}
          <motion.div
            initial={{ opacity: 0, x: -60 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center lg:text-left"
          >
            <p className="text-lime-400 font-semibold tracking-wide mb-3 text-sm sm:text-base">
              WIRELESS PAYMENT AVAILABLE
            </p>

            <h2 className="text-4xl sm:text-5xl font-bold text-white mb-6 leading-tight">
              Tap, Pay, and Enjoy Your Ride
            </h2>

            <p className="text-gray-300 text-base sm:text-lg mb-8 leading-relaxed max-w-xl mx-auto lg:mx-0">
              AirLink Ride accepts secure wireless payments in all vehicles.
              Travel comfortably with professional chauffeurs, flat rates, and
              no hidden fees.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Link href="/booking">
                <button className="w-full sm:w-auto bg-lime-400 text-black px-7 py-3 rounded-full font-bold hover:bg-lime-300 transition shadow-lg">
                  Book Your Ride
                </button>
              </Link>

              <a href="tel:+14375228001">
                <button className="w-full sm:w-auto border border-lime-400 text-lime-400 px-7 py-3 rounded-full font-bold hover:bg-lime-400 hover:text-black transition">
                  Call 437-522-8001
                </button>
              </a>
            </div>
          </motion.div>

          {/* RIGHT IMAGE */}
          <motion.div
            className="relative"
            initial={{ opacity: 0, scale: 0.9, y: 40 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.9 }}
            viewport={{ once: true }}
          >
            {/* GLOW */}
            <div className="absolute -inset-4 bg-lime-400/20 blur-3xl rounded-full"></div>

            {/* IMAGE CARD */}
            <div className="relative rounded-3xl overflow-hidden border border-lime-400/30 shadow-2xl shadow-lime-400/10">
              <Image
                src="/payment.jpg"
                alt="AirLink Ride wireless payment available"
                width={1200}
                height={700}
                className="w-full h-auto object-cover hover:scale-105 transition duration-700"
                priority
              />
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
}