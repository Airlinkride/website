"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import toast, { Toaster } from "react-hot-toast";
import { Phone, Mail, MapPin, Clock, ShieldCheck, Car } from "lucide-react";

export default function Contact() {
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (loading) return;
    setLoading(true);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      if (!res.ok) {
        throw new Error("Failed to send message");
      }

      toast.success("Message sent successfully!");

      setForm({
        name: "",
        email: "",
        phone: "",
        message: "",
      });
    } catch {
      toast.error("Unable to send message. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-black text-white overflow-hidden">
      <Toaster position="top-center" />

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

      <section className="relative py-20 px-6">
        <div className="absolute inset-0 bg-gradient-to-br from-lime-400/10 via-black to-black"></div>
        <div className="absolute top-20 right-10 w-72 h-72 bg-lime-400/10 blur-3xl rounded-full"></div>
        <div className="absolute bottom-20 left-10 w-72 h-72 bg-lime-400/10 blur-3xl rounded-full"></div>

        <div className="relative max-w-6xl mx-auto grid md:grid-cols-2 gap-12">
          {/* LEFT SIDE — CONTACT FORM */}
          <motion.div
            className="bg-gray-900/90 border border-lime-400/20 p-10 rounded-3xl shadow-2xl shadow-lime-400/10"
            initial={{ opacity: 0, x: -60 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            whileHover={{ y: -6 }}
          >
            <h2 className="text-3xl font-bold mb-6 text-lime-400">
              Send Us a Message
            </h2>

            <form onSubmit={submit} className="grid gap-4">
              <input
                type="text"
                placeholder="Your Name"
                required
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="p-4 rounded-xl text-black outline-none focus:ring-2 focus:ring-lime-400"
              />

              <input
                type="email"
                placeholder="Email Address"
                required
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className="p-4 rounded-xl text-black outline-none focus:ring-2 focus:ring-lime-400"
              />

              <input
                type="text"
                placeholder="Phone Number"
                value={form.phone}
                onChange={(e) => setForm({ ...form, phone: e.target.value })}
                className="p-4 rounded-xl text-black outline-none focus:ring-2 focus:ring-lime-400"
              />

              <textarea
                placeholder="Your Message"
                rows={4}
                required
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                className="p-4 rounded-xl text-black outline-none focus:ring-2 focus:ring-lime-400"
              />

              <button
                type="submit"
                disabled={loading}
                className={`text-black py-4 rounded-xl font-bold transition shadow-lg shadow-lime-400/20 ${
                  loading
                    ? "bg-gray-500 cursor-not-allowed"
                    : "bg-lime-400 hover:bg-lime-300"
                }`}
              >
                {loading ? "Sending..." : "Send Message"}
              </button>
            </form>
          </motion.div>

          {/* RIGHT SIDE — CONTACT DETAILS */}
          <div className="flex flex-col gap-8">
            {/* PHONE */}
            <motion.div
              className="group bg-gray-900/90 border border-gray-800 hover:border-lime-400/60 p-8 rounded-3xl shadow-lg hover:shadow-lime-400/10 flex items-start gap-4 transition"
              initial={{ opacity: 0, x: 60 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7 }}
              viewport={{ once: true }}
              whileHover={{ y: -6 }}
            >
              <div className="bg-lime-400/10 p-4 rounded-2xl group-hover:bg-lime-400 transition">
                <Phone className="text-lime-400 group-hover:text-black w-6 h-6" />
              </div>

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
              className="group bg-gray-900/90 border border-gray-800 hover:border-lime-400/60 p-8 rounded-3xl shadow-lg hover:shadow-lime-400/10 flex items-start gap-4 transition"
              initial={{ opacity: 0, x: 60 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, delay: 0.15 }}
              viewport={{ once: true }}
              whileHover={{ y: -6 }}
            >
              <div className="bg-lime-400/10 p-4 rounded-2xl group-hover:bg-lime-400 transition">
                <Mail className="text-lime-400 group-hover:text-black w-6 h-6" />
              </div>

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
              className="group bg-gray-900/90 border border-gray-800 hover:border-lime-400/60 p-8 rounded-3xl shadow-lg hover:shadow-lime-400/10 flex gap-4 transition"
              initial={{ opacity: 0, x: 60 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, delay: 0.3 }}
              viewport={{ once: true }}
              whileHover={{ y: -6 }}
            >
              <div className="bg-lime-400/10 p-4 rounded-2xl group-hover:bg-lime-400 transition h-fit">
                <MapPin className="text-lime-400 group-hover:text-black w-8 h-8 flex-shrink-0" />
              </div>

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

            {/* EXTRA VISUAL CARDS */}
            <motion.div
              className="grid sm:grid-cols-3 gap-4"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.45 }}
              viewport={{ once: true }}
            >
              {/* <div className="bg-black border border-lime-400/30 p-5 rounded-2xl text-center">
                <Clock className="text-lime-400 mx-auto mb-3" />
                <p className="font-bold">24/7 Service</p>
              </div>

              <div className="bg-black border border-lime-400/30 p-5 rounded-2xl text-center">
                <Car className="text-lime-400 mx-auto mb-3" />
                <p className="font-bold">Luxury Vehicles</p>
              </div>

              <div className="bg-black border border-lime-400/30 p-5 rounded-2xl text-center">
                <ShieldCheck className="text-lime-400 mx-auto mb-3" />
                <p className="font-bold">Punctual Service</p>
              </div> */}
            </motion.div>
          </div>
        </div>
      </section>

      {/* MAP PLACEHOLDER */}
      <section className="pb-20 px-6 max-w-6xl mx-auto text-center">
        <motion.h2
          className="text-3xl font-bold mb-6 text-lime-400"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          Our Location
        </motion.h2>

        <motion.div
          className="rounded-3xl overflow-hidden shadow-2xl border border-lime-400/20"
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2887.090450222081!2d-79.39328332434323!3d43.646286452878776!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x882b34d0bda40dd3%3A0x53a463d7788920fd!2s319%20King%20St%20W%2C%20Toronto%2C%20ON%20M5V%201J5!5e0!3m2!1sen!2sca!4v1777515377531!5m2!1sen!2sca"
            width="100%"
            height="450"
            style={{ border: 0 }}
            allowFullScreen={true}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </motion.div>
      </section>
    </main>
  );
}