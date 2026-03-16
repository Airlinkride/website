"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useSearchParams } from "next/navigation";

export default function Booking() {
  const searchParams = useSearchParams();

  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    pickup: "",
    drop: "",
    date: "",
    time: "",
    passengers: "",
    luggage: "",
    flightNumber: "",
  });

  const [success, setSuccess] = useState(false);
  const [customTrip, setCustomTrip] = useState(false);

  useEffect(() => {
    const pickup = searchParams.get("pickup");
    const drop = searchParams.get("drop");
    const custom = searchParams.get("custom");

    if (pickup || drop) {
      setForm((prev) => ({
        ...prev,
        pickup: pickup || "",
        drop: drop || "",
      }));
    }

    if (custom === "true") {
      setCustomTrip(true);
    }
  }, [searchParams]);

  async function submit(e: any) {
  e.preventDefault();

  const res = await fetch("/api/book", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(form),
  });

  if (res.ok) {
    setSuccess(true);

    setForm({
      name: "",
      phone: "",
      email: "",
      pickup: "",
      drop: "",
      date: "",
      time: "",
      passengers: "",
      luggage: "",
      flightNumber: "",
    });

    setTimeout(() => {
      setSuccess(false);
    }, 4000);
  }
}

  return (
    <main className="min-h-screen bg-black text-white">
      <section
        className="h-[40vh] flex items-center justify-center text-center bg-cover bg-center"
        style={{ backgroundImage: "url('/booking.jpg')" }}
      >
        <div className="bg-black/60 p-8 rounded-lg">
          <h1 className="text-5xl font-bold">
            {customTrip ? "Request Custom Trip Quote" : "Book Your Ride"}
          </h1>

          <p className="text-gray-300 mt-2">
            Fast and reliable airport transportation
          </p>
        </div>
      </section>

      <section className="py-20 px-6 flex justify-center">
        <motion.div
          className="bg-gray-900 p-10 rounded-xl w-full max-w-2xl shadow-lg"
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          <h2 className="text-3xl font-bold mb-8 text-lime-400 text-center">
            Ride Details
          </h2>

          {customTrip && (
            <div className="bg-lime-400 text-black p-3 rounded mb-6 text-center font-semibold">
              Request a custom quote for your trip
            </div>
          )}

          {success && (
            <div className="bg-green-500 text-black p-3 rounded mb-6 text-center font-semibold">
              Ride request submitted! We will contact you shortly.
            </div>
          )}

          <form onSubmit={submit} className="grid gap-5">
            <input
              className="w-full p-3 rounded text-black"
              placeholder="Full Name"
              required
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
            />

            <input
              className="w-full p-3 rounded text-black"
              placeholder="Phone Number"
              required
              value={form.phone}
              onChange={(e) => setForm({ ...form, phone: e.target.value })}
            />

            <input
              type="email"
              className="w-full p-3 rounded text-black"
              placeholder="Email Address"
              required
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
            />

            <input
              className="w-full p-3 rounded text-black"
              placeholder="Pickup Location"
              required
              value={form.pickup}
              onChange={(e) => setForm({ ...form, pickup: e.target.value })}
            />

            <input
              className="w-full p-3 rounded text-black"
              placeholder="Drop-off Location"
              required
              value={form.drop}
              onChange={(e) => setForm({ ...form, drop: e.target.value })}
            />

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm text-gray-300 block mb-1">
                  Pickup Date
                </label>

                <input
                  type="date"
                  className="p-3 rounded text-black w-full"
                  required
                  min={new Date().toISOString().split("T")[0]}
                  value={form.date}
                  onChange={(e) => setForm({ ...form, date: e.target.value })}
                />
              </div>

              <div>
                <label className="text-sm text-gray-300 block mb-1">
                  Pickup Time
                </label>

                <input
                  type="time"
                  className="p-3 rounded text-black w-full"
                  required
                  value={form.time}
                  onChange={(e) => setForm({ ...form, time: e.target.value })}
                />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <input
                type="number"
                min="1"
                className="p-3 rounded text-black"
                placeholder="Number of Passengers"
                value={form.passengers}
                onChange={(e) =>
                  setForm({ ...form, passengers: e.target.value })
                }
              />

              <input
                type="number"
                min="0"
                className="p-3 rounded text-black"
                placeholder="Number of Luggages"
                value={form.luggage}
                onChange={(e) => setForm({ ...form, luggage: e.target.value })}
              />
            </div>

            <input
              className="w-full p-3 rounded text-black"
              placeholder="Flight Number (Optional)"
              value={form.flightNumber}
              onChange={(e) =>
                setForm({ ...form, flightNumber: e.target.value })
              }
            />

            <button className="bg-lime-400 text-black py-3 rounded-lg font-bold text-lg hover:bg-lime-300 transition">
              {customTrip ? "Request Quote" : "Confirm Booking"}
            </button>
          </form>
        </motion.div>
      </section>
    </main>
  );
}
