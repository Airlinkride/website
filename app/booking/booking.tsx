"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import toast, { Toaster } from "react-hot-toast";
import { useSearchParams } from "next/navigation";

export default function Booking() {
  const searchParams = useSearchParams();

  const [loading, setLoading] = useState(false);

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
    vehicle: "",
  });

  const [customTrip, setCustomTrip] = useState(false);

  const [pickupSuggestions, setPickupSuggestions] = useState<any[]>([]);
  const [dropSuggestions, setDropSuggestions] = useState<any[]>([]);
  const [showPickupSuggestions, setShowPickupSuggestions] = useState(false);
  const [showDropSuggestions, setShowDropSuggestions] = useState(false);

  const [prevPickupValue, setPrevPickupValue] = useState("");
  const [prevDropValue, setPrevDropValue] = useState("");

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
      setPrevPickupValue(pickup || "");
      setPrevDropValue(drop || "");
    }

    if (custom === "true") {
      setCustomTrip(true);
    }
  }, [searchParams]);

  function shouldFetchSuggestions(value: string, previousValue: string) {
    const trimmed = value.trim();
    const prevTrimmed = previousValue.trim();

    if (trimmed.length < 4) return false;

    const justTypedSpace =
      value.endsWith(" ") && !previousValue.endsWith(" ");

    if (justTypedSpace) return true;

    if (prevTrimmed.length < 4 && trimmed.length >= 4) return true;

    return false;
  }

  async function fetchSuggestions(value: string, type: "pickup" | "drop") {
    const query = value.trim();

    if (query.length < 4) {
      if (type === "pickup") {
        setPickupSuggestions([]);
        setShowPickupSuggestions(false);
      } else {
        setDropSuggestions([]);
        setShowDropSuggestions(false);
      }
      return;
    }

    try {
      const res = await fetch(
        `/api/address-autocomplete?q=${encodeURIComponent(query)}`
      );

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data?.error || "Autocomplete failed");
      }

      if (type === "pickup") {
        setPickupSuggestions(data.results || []);
        setShowPickupSuggestions((data.results || []).length > 0);
      } else {
        setDropSuggestions(data.results || []);
        setShowDropSuggestions((data.results || []).length > 0);
      }
    } catch (error) {
      if (type === "pickup") {
        setPickupSuggestions([]);
        setShowPickupSuggestions(false);
      } else {
        setDropSuggestions([]);
        setShowDropSuggestions(false);
      }
    }
  }

  async function submit(e: any) {
    e.preventDefault();

    if (loading) return;

    setLoading(true);

    const bookingData = { ...form };

    toast.success(
      "Booking received! A confirmation email will arrive shortly."
    );

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
      vehicle: "",
    });

    setPrevPickupValue("");
    setPrevDropValue("");
    setPickupSuggestions([]);
    setDropSuggestions([]);
    setShowPickupSuggestions(false);
    setShowDropSuggestions(false);

    fetch("/api/book", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(bookingData),
    })
      .catch(() => {
        toast.error("Unable to send confirmation email.");
      })
      .finally(() => {
        setLoading(false);
      });
  }

  return (
    <main className="min-h-screen bg-black text-white">
      <Toaster
        position="top-center"
        gutter={10}
        containerStyle={{ top: 20 }}
        toastOptions={{
          duration: 4500,
          style: {
            background: "#84cc16",
            color: "#000",
            fontWeight: "600",
            padding: "14px 20px",
            borderRadius: "8px",
            fontSize: "15px",
          },
        }}
      />

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

          <form onSubmit={submit} className="grid gap-5">
            <input
              className="w-full p-3 rounded text-black"
              placeholder="Full Name"
              required
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
            />

            <input
              type="tel"
              className="w-full p-3 rounded text-black"
              placeholder="Phone Number"
              required
              pattern="[0-9]{10,15}"
              value={form.phone}
              onChange={(e) => setForm({ ...form, phone: e.target.value })}
            />

            <input
              type="email"
              className="w-full p-3 rounded text-black"
              placeholder="Email Address"
              required
              value={form.email}
              pattern="^[^\s@]+@[^\s@]+\.[^\s@]+$"
              onChange={(e) => setForm({ ...form, email: e.target.value })}
            />

            <div className="relative">
              <input
                className="w-full p-3 rounded text-black"
                placeholder="Pickup Location"
                required
                value={form.pickup}
                onChange={(e) => {
                  const value = e.target.value;

                  setForm((prev) => ({ ...prev, pickup: value }));

                  if (value.trim().length < 4) {
                    setPickupSuggestions([]);
                    setShowPickupSuggestions(false);
                  } else if (shouldFetchSuggestions(value, prevPickupValue)) {
                    fetchSuggestions(value, "pickup");
                  }

                  setPrevPickupValue(value);
                }}
                onFocus={() => {
                  if (pickupSuggestions.length > 0) {
                    setShowPickupSuggestions(true);
                  }
                }}
                onBlur={() => {
                  setTimeout(() => setShowPickupSuggestions(false), 200);
                }}
              />

              {showPickupSuggestions && pickupSuggestions.length > 0 && (
                <div className="absolute z-50 mt-1 w-full rounded bg-white text-black shadow-lg border max-h-60 overflow-y-auto">
                  {pickupSuggestions.map((item, index) => (
                    <button
                      key={item.placeId || index}
                      type="button"
                      className="block w-full text-left px-4 py-3 hover:bg-gray-100 border-b last:border-b-0"
                      onClick={() => {
                        setForm((prev) => ({ ...prev, pickup: item.label }));
                        setPrevPickupValue(item.label);
                        setPickupSuggestions([]);
                        setShowPickupSuggestions(false);
                      }}
                    >
                      {item.label}
                    </button>
                  ))}
                </div>
              )}
            </div>

            <div className="relative">
              <input
                className="w-full p-3 rounded text-black"
                placeholder="Drop-off Location"
                required
                value={form.drop}
                onChange={(e) => {
                  const value = e.target.value;

                  setForm((prev) => ({ ...prev, drop: value }));

                  if (value.trim().length < 4) {
                    setDropSuggestions([]);
                    setShowDropSuggestions(false);
                  } else if (shouldFetchSuggestions(value, prevDropValue)) {
                    fetchSuggestions(value, "drop");
                  }

                  setPrevDropValue(value);
                }}
                onFocus={() => {
                  if (dropSuggestions.length > 0) {
                    setShowDropSuggestions(true);
                  }
                }}
                onBlur={() => {
                  setTimeout(() => setShowDropSuggestions(false), 200);
                }}
              />

              {showDropSuggestions && dropSuggestions.length > 0 && (
                <div className="absolute z-50 mt-1 w-full rounded bg-white text-black shadow-lg border max-h-60 overflow-y-auto">
                  {dropSuggestions.map((item, index) => (
                    <button
                      key={item.placeId || index}
                      type="button"
                      className="block w-full text-left px-4 py-3 hover:bg-gray-100 border-b last:border-b-0"
                      onClick={() => {
                        setForm((prev) => ({ ...prev, drop: item.label }));
                        setPrevDropValue(item.label);
                        setDropSuggestions([]);
                        setShowDropSuggestions(false);
                      }}
                    >
                      {item.label}
                    </button>
                  ))}
                </div>
              )}
            </div>

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

            <div>
              <label className="text-sm text-gray-300 block mb-2">
                Select Vehicle Type
              </label>

              <div className="grid grid-cols-2 gap-4">
                <button
                  type="button"
                  onClick={() => setForm({ ...form, vehicle: "Sedan" })}
                  className={`p-3 rounded border font-semibold transition ${
                    form.vehicle === "Sedan"
                      ? "bg-lime-400 text-black border-lime-400"
                      : "bg-gray-800 border-gray-700 hover:border-lime-400"
                  }`}
                >
                  Sedan
                </button>

                <button
                  type="button"
                  onClick={() => setForm({ ...form, vehicle: "SUV" })}
                  className={`p-3 rounded border font-semibold transition ${
                    form.vehicle === "SUV"
                      ? "bg-lime-400 text-black border-lime-400"
                      : "bg-gray-800 border-gray-700 hover:border-lime-400"
                  }`}
                >
                  SUV
                </button>
              </div>
            </div>

            <input
              className="w-full p-3 rounded text-black"
              placeholder="Flight Number (Optional)"
              value={form.flightNumber}
              onChange={(e) =>
                setForm({ ...form, flightNumber: e.target.value })
              }
            />

            <button
              disabled={loading}
              className={`py-3 rounded-lg font-bold text-lg transition ${
                loading
                  ? "bg-gray-500 cursor-not-allowed"
                  : "bg-lime-400 text-black hover:bg-lime-300"
              }`}
            >
              {loading
                ? "Submitting..."
                : customTrip
                  ? "Request Quote"
                  : "Confirm Booking"}
            </button>
          </form>
        </motion.div>
      </section>
    </main>
  );
}