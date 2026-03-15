"use client";

import { motion } from "framer-motion";

export default function Contact() {
  return (
    <main className="min-h-screen bg-black text-white">
      {/* HERO */}
      <section
        className="h-[40vh] flex items-center justify-center text-center bg-cover bg-center"
        style={{ backgroundImage: "url('/contactus.jpg')" }}
      >
        <div className="bg-black/60 p-8 rounded-lg">
          <h1 className="text-5xl font-bold">Contact AirLinkRide</h1>
          <p className="text-gray-300 mt-2">
            Travel in comfort with professional chauffeurs, luxury vehicles, and
            punctual service across Toronto and the GTA.
          </p>
        </div>
      </section>

      {/* CONTACT INFO */}
      <section className="py-16 px-6 max-w-6xl mx-auto grid md:grid-cols-3 gap-8">
        <motion.div
          className="bg-gray-900 p-8 rounded-xl text-center"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
        >
          <h3 className="text-xl font-bold mb-3 text-lime-400">Phone</h3>
          <p className="text-gray-300">+1 437-522-8001</p>
        </motion.div>

        <motion.div
          className="bg-gray-900 p-8 rounded-xl text-center"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
        >
          <h3 className="text-xl font-bold mb-3 text-lime-400">Email</h3>
          <p className="text-gray-300">info@airlinkride.com</p>
        </motion.div>

        <motion.div
          className="bg-gray-900 p-8 rounded-xl text-center"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
        >
          <h3 className="text-xl font-bold mb-3 text-lime-400">Service Area</h3>
          <p className="text-gray-300">Toronto & Greater Toronto Area</p>
        </motion.div>
      </section>

      {/* CONTACT FORM */}
      <section className="pb-20 px-6 flex justify-center">
        <motion.div
          className="bg-gray-900 p-10 rounded-xl w-full max-w-2xl"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
        >
          <h2 className="text-3xl font-bold mb-6 text-lime-400 text-center">
            Send Us a Message
          </h2>

          <form className="grid gap-4">
            <input
              type="text"
              placeholder="Your Name"
              className="p-3 rounded text-black"
            />

            <input
              type="email"
              placeholder="Email Address"
              className="p-3 rounded text-black"
            />

            <input
              type="text"
              placeholder="Phone Number"
              className="p-3 rounded text-black"
            />

            <textarea
              placeholder="Your Message"
              rows={4}
              className="p-3 rounded text-black"
            />

            <button className="bg-lime-400 text-black py-3 rounded-lg font-bold hover:bg-lime-300 transition">
              Send Message
            </button>
          </form>
        </motion.div>
      </section>

      {/* MAP PLACEHOLDER */}
      <section className="pb-20 px-6 max-w-6xl mx-auto text-center">
        <h2 className="text-3xl font-bold mb-6 text-lime-400">Our Location</h2>

        <div className="rounded-xl overflow-hidden shadow-lg">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2885.32001732389!2d-79.61606842464477!3d43.683109950497105!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x12009d7e29d56021%3A0x618a3696f25b1356!2sPearson%20Airport%20Terminal%201%20Parking%2C%20Mississauga%2C%20ON!5e0!3m2!1sen!2sca!4v1773596952926!5m2!1sen!2sca"
            width="100%"
            height="450"
            style={{ border: 0 }}
            allowFullScreen={true}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
      </section>
    </main>
  );
}
