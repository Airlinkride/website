"use client";

import { motion } from "framer-motion";
import Link from "next/link";

export default function Rates() {
  const rates = [
    { from: "Toronto Downtown", to: "Pearson Airport", price: "$45" },
    { from: "Mississauga", to: "Pearson Airport", price: "$30" },
    { from: "Scarborough", to: "Pearson Airport", price: "$55" },
    { from: "North York", to: "Pearson Airport", price: "$50" },
    { from: "Markham", to: "Pearson Airport", price: "$60" },
    { from: "Brampton", to: "Pearson Airport", price: "$40" },
  ];

  return (
    <main className="min-h-screen bg-black text-white">
      
      {/* HERO */}
      <section
        className="h-[50vh] flex items-center justify-center text-center bg-cover bg-center"
        style={{ backgroundImage: "url('/toronto-airport-limo-rates.jpg')" }}
      >
        <div className="bg-black/60 p-10 rounded-lg">
          <h1 className="text-5xl font-bold mb-4">Airport Ride Rates</h1>
          <p className="text-gray-300">
            Affordable and transparent pricing across Toronto
          </p>
        </div>
      </section>

      {/* RATES GRID */}
      <section className="py-20 px-6 max-w-6xl mx-auto">

        <motion.h2
          className="text-4xl font-bold text-center mb-12 text-lime-400"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          Popular Routes
        </motion.h2>

        <div className="grid md:grid-cols-3 gap-8">

          {/* RATE CARDS */}
          {rates.map((rate, index) => (
            <motion.div
              key={index}
              className="bg-gray-900 p-8 rounded-xl text-center border border-gray-800 hover:border-lime-400 transition"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ scale: 1.05 }}
            >
              <h3 className="text-xl font-bold mb-2">{rate.from}</h3>

              <p className="text-gray-400 mb-4">→ {rate.to}</p>

              <p className="text-3xl font-bold text-lime-400">{rate.price}</p>

              <Link href={`/booking?pickup=${rate.from}&drop=${rate.to}`}>
                <button className="mt-6 bg-lime-400 text-black px-6 py-2 rounded hover:bg-lime-300 transition">
                  Book Ride
                </button>
              </Link>
            </motion.div>
          ))}

          {/* CUSTOM TRIP CARD */}
          <motion.div
            className="bg-gray-900 p-8 rounded-xl text-center border-2 border-lime-400 flex flex-col justify-center"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            whileHover={{ scale: 1.05 }}
          >
            <h3 className="text-2xl font-bold mb-4 text-lime-400">
              Custom Trip
            </h3>

            <p className="text-gray-400 mb-6">
              Need a ride outside our listed routes?  
              Tell us your pickup and destination and we will provide a custom quote.
            </p>

            <p className="text-lg font-semibold mb-6">
              Flexible Pricing
            </p>

            <Link href="/booking?custom=true">
              <button className="bg-lime-400 text-black px-6 py-3 rounded-lg font-semibold hover:bg-lime-300 transition">
                Request Quote
              </button>
            </Link>
          </motion.div>

        </div>

      </section>

      {/* FAQ */}
      <section className="py-20 px-6 bg-gray-900">
        <div className="max-w-5xl mx-auto">

          <motion.h2
            className="text-4xl font-bold text-center mb-12 text-lime-400"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
          >
            Frequently Asked Questions
          </motion.h2>

          <div className="grid md:grid-cols-2 gap-8">

            <motion.div
              className="bg-black p-6 rounded-xl border border-gray-800 hover:border-lime-400 transition"
              whileHover={{ scale: 1.03 }}
            >
              <h3 className="font-semibold text-lg mb-3">
                How much does a Toronto airport limo cost?
              </h3>
              <p className="text-gray-400">
                Pricing depends on pickup location and vehicle type. Most
                airport limo services offer flat-rate pricing rather than
                metered fares so you know your cost in advance.
              </p>
            </motion.div>

            <motion.div
              className="bg-black p-6 rounded-xl border border-gray-800 hover:border-lime-400 transition"
              whileHover={{ scale: 1.03 }}
            >
              <h3 className="font-semibold text-lg mb-3">
                Do you provide airport pickups from Pearson Airport?
              </h3>
              <p className="text-gray-400">
                Yes. Our chauffeurs provide pickups from both Terminal 1 and
                Terminal 3 at Toronto Pearson International Airport with
                real-time flight tracking.
              </p>
            </motion.div>

            <motion.div
              className="bg-black p-6 rounded-xl border border-gray-800 hover:border-lime-400 transition"
              whileHover={{ scale: 1.03 }}
            >
              <h3 className="font-semibold text-lg mb-3">
                Is your limo service available 24/7?
              </h3>
              <p className="text-gray-400">
                Yes. AirLink Ride operates 24 hours a day, 7 days a week.
              </p>
            </motion.div>

            <motion.div
              className="bg-black p-6 rounded-xl border border-gray-800 hover:border-lime-400 transition"
              whileHover={{ scale: 1.03 }}
            >
              <h3 className="font-semibold text-lg mb-3">
                Can I book a ride in advance?
              </h3>
              <p className="text-gray-400">
                Yes. We recommend booking your airport limo in advance.
              </p>
            </motion.div>

          </div>

        </div>
      </section>

    </main>
  );
}