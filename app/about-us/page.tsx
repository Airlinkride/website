"use client"

import { motion } from "framer-motion"
import Link from "next/link"

export default function About() {
  return (
    <main className="min-h-screen bg-black text-white">

      {/* HERO */}
      <section
        className="h-[60vh] flex items-center justify-center text-center bg-cover bg-center"
        style={{ backgroundImage: "url('/pearson-airport-limo-service.jpg')" }}
      >
        <motion.div
          className="bg-black/60 p-10 rounded-lg"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-5xl font-bold mb-4">About AirLink Ride</h1>

          <p className="text-xl text-gray-300 max-w-xl">
            Premium Toronto airport limo service providing reliable
            transportation across Toronto and the Greater Toronto Area.
          </p>
        </motion.div>
      </section>


      {/* COMPANY SECTION */}
      <section className="py-20 px-6 max-w-6xl mx-auto">

        <motion.h2
          className="text-4xl font-bold mb-6 text-lime-400"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
        >
          Toronto Airport Limo Service
        </motion.h2>

        <p className="text-gray-300 mb-6">
          AirLink Ride provides premium airport limo service in Toronto,
          offering reliable and comfortable transportation to and from
          Toronto Pearson International Airport (YYZ). Our mission is to
          deliver a seamless travel experience for every passenger with
          luxury vehicles and professional chauffeurs.
        </p>

        <p className="text-gray-300 mb-6">
          Traveling to Pearson Airport can often be stressful due to
          traffic, parking, and unpredictable delays. Our experienced
          chauffeurs ensure punctual pickups and smooth drop-offs so
          you can travel with confidence anywhere across Toronto and
          the Greater Toronto Area.
        </p>

        <p className="text-gray-300 mb-6">
          Whether you're traveling for business, vacation, or arranging
          airport transportation for family or friends, AirLink Ride
          ensures a comfortable and reliable journey every time.
        </p>

        <ul className="text-gray-400 list-disc pl-6 space-y-2 mb-8">
          <li>Airport transfers to and from Toronto Pearson Airport (YYZ)</li>
          <li>Real-time flight tracking for delays or early arrivals</li>
          <li>Convenient door-to-door transportation</li>
          <li>Transparent flat-rate limo pricing</li>
          <li>Professional licensed chauffeurs</li>
        </ul>

        <Link href="/booking">
          <button className="bg-lime-400 text-black px-6 py-3 rounded-lg font-semibold hover:bg-lime-300 transition">
            Book Your Airport Limo
          </button>
        </Link>

      </section>


      {/* WHY CHOOSE US */}
      <section className="bg-gray-900 py-20 px-6">

        <div className="max-w-6xl mx-auto text-center">

          <motion.h2
            className="text-4xl font-bold text-lime-400 mb-12"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
          >
            Why Choose AirLink Ride
          </motion.h2>

          <div className="grid md:grid-cols-3 gap-10">

            <motion.div
              className="bg-black p-8 rounded-xl"
              whileHover={{ scale: 1.05 }}
            >
              <h3 className="text-xl font-bold mb-4">
                Professional Chauffeurs
              </h3>

              <p className="text-gray-400">
                Our licensed drivers are highly experienced with Toronto
                traffic and airport routes, ensuring safe and reliable
                transportation.
              </p>
            </motion.div>


            <motion.div
              className="bg-black p-8 rounded-xl"
              whileHover={{ scale: 1.05 }}
            >
              <h3 className="text-xl font-bold mb-4">
                Luxury Vehicles
              </h3>

              <p className="text-gray-400">
                Travel in comfort with our fleet of clean and modern
                luxury sedans and SUVs designed for relaxing airport
                transportation.
              </p>
            </motion.div>


            <motion.div
              className="bg-black p-8 rounded-xl"
              whileHover={{ scale: 1.05 }}
            >
              <h3 className="text-xl font-bold mb-4">
                24/7 Airport Service
              </h3>

              <p className="text-gray-400">
                Our Toronto limo service operates 24 hours a day,
                ensuring reliable airport transfers for early
                morning or late-night flights.
              </p>
            </motion.div>

          </div>

        </div>

      </section>


      {/* SERVICE AREAS */}
      <section className="py-20 px-6 max-w-6xl mx-auto text-center">

        <motion.h2
          className="text-4xl font-bold mb-8 text-lime-400"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
        >
          Toronto Airport Limo Service Areas
        </motion.h2>

        <p className="text-gray-300 max-w-3xl mx-auto mb-6">
          AirLink Ride proudly provides professional airport limo
          service throughout the Greater Toronto Area including
          Toronto, North York, Scarborough, Mississauga, Brampton,
          Vaughan, Markham, Richmond Hill, Oakville, and Burlington.
        </p>

        <p className="text-gray-400 max-w-3xl mx-auto">
          No matter where you are located in the GTA, our professional
          chauffeurs will pick you up and ensure a safe and comfortable
          ride to Toronto Pearson International Airport.
        </p>

      </section>

    </main>
  )
}