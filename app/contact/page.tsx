"use client";

import { motion } from "framer-motion";
import { Phone, Mail, MapPin } from "lucide-react";

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

      <section className="py-20 px-6 max-w-6xl mx-auto grid md:grid-cols-2 gap-12">
        {/* LEFT SIDE — CONTACT FORM */}
        <motion.div
          className="bg-gray-900 p-10 rounded-xl shadow-lg"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
        >
          <h2 className="text-3xl font-bold mb-6 text-lime-400">
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

        {/* RIGHT SIDE — CONTACT DETAILS */}
        <div className="flex flex-col gap-8">
          {/* PHONE */}
          <motion.div
            className="bg-gray-900 p-8 rounded-xl shadow-lg flex items-start gap-4"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
          >
            <Phone className="text-lime-400 w-6 h-6 mt-1" />

            <div>
              <h3 className="text-xl font-bold mb-1 text-lime-400">Phone</h3>

              <a
                href="tel:+14375228001"
                className="text-gray-300 hover:text-lime-400 transition"
              >
                +1 437-522-8001
              </a>
            </div>
          </motion.div>

          {/* EMAIL */}
          <motion.div
            className="bg-gray-900 p-8 rounded-xl shadow-lg flex items-start gap-4"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
          >
            <Mail className="text-lime-400 w-6 h-6 mt-1" />

            <div>
              <h3 className="text-xl font-bold mb-1 text-lime-400">Email</h3>

              <a
                href="mailto:info@airlinkride.com"
                className="text-gray-300 hover:text-lime-400 transition"
              >
                info@airlinkride.com
              </a>
            </div>
          </motion.div>

          {/* SERVICE AREA */}
          <motion.div
            className="bg-gray-900 p-8 rounded-xl shadow-lg flex gap-4"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
          >
            <MapPin className="text-lime-400 w-8 h-8 mt-1 flex-shrink-0" />

            <div>
              <h3 className="text-xl font-bold mb-3 text-lime-400">
                Service Area
              </h3>

              <p className="text-gray-300 leading-relaxed">
                Serving Toronto, the Greater Toronto Area (GTA), and
                destinations across Ontario including Hamilton, Niagara Falls,
                London, Kingston, Ottawa, Windsor, and cross-border trips to
                Buffalo and Detroit.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* MAP PLACEHOLDER */}
      <section className="pb-20 px-6 max-w-6xl mx-auto text-center">
        <h2 className="text-3xl font-bold mb-6 text-lime-400">Our Location</h2>

        <div className="rounded-xl overflow-hidden shadow-lg">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2887.090450222081!2d-79.39328332434323!3d43.646286452878776!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x882b34d0bda40dd3%3A0x53a463d7788920fd!2s319%20King%20St%20W%2C%20Toronto%2C%20ON%20M5V%201J5!5e0!3m2!1sen!2sca!4v1777515377531!5m2!1sen!2sca"
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
