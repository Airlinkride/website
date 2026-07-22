"use client";

import { useEffect, useState, type FormEvent } from "react";
import { motion } from "framer-motion";
import toast from "react-hot-toast";
import { useSearchParams } from "next/navigation";
import { vehicles } from "@/data/vehicles";

type AddressSuggestion = {
  placeId?: string;
  label: string;
};

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

  const [pickupSuggestions, setPickupSuggestions] = useState<
    AddressSuggestion[]
  >([]);
  const [dropSuggestions, setDropSuggestions] = useState<
    AddressSuggestion[]
  >([]);

  const [showPickupSuggestions, setShowPickupSuggestions] = useState(false);
  const [showDropSuggestions, setShowDropSuggestions] = useState(false);

  const [selectedPickup, setSelectedPickup] = useState(false);
  const [selectedDrop, setSelectedDrop] = useState(false);

  useEffect(() => {
    const pickup = searchParams.get("pickup");
    const drop = searchParams.get("drop");
    const custom = searchParams.get("custom");
    const selectedVehicle = searchParams.get("vehicle");

    setForm((prev) => ({
      ...prev,
      pickup: pickup || prev.pickup,
      drop: drop || prev.drop,
      vehicle: selectedVehicle || prev.vehicle,
    }));

    setCustomTrip(custom === "true");
  }, [searchParams]);

  async function fetchSuggestions(
    value: string,
    type: "pickup" | "drop",
  ) {
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
      const response = await fetch(
        `/api/address-autocomplete?q=${encodeURIComponent(query)}`,
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data?.error || "Autocomplete failed");
      }

      const results: AddressSuggestion[] = data.results || [];

      if (type === "pickup") {
        setPickupSuggestions(results);
        setShowPickupSuggestions(results.length > 0);
      } else {
        setDropSuggestions(results);
        setShowDropSuggestions(results.length > 0);
      }
    } catch (error) {
      console.error("Address autocomplete error:", error);

      if (type === "pickup") {
        setPickupSuggestions([]);
        setShowPickupSuggestions(false);
      } else {
        setDropSuggestions([]);
        setShowDropSuggestions(false);
      }
    }
  }

  useEffect(() => {
    if (selectedPickup) return;

    const query = form.pickup.trim();

    if (query.length < 4) {
      setPickupSuggestions([]);
      setShowPickupSuggestions(false);
      return;
    }

    const timer = setTimeout(() => {
      fetchSuggestions(query, "pickup");
    }, 500);

    return () => clearTimeout(timer);
  }, [form.pickup, selectedPickup]);

  useEffect(() => {
    if (selectedDrop) return;

    const query = form.drop.trim();

    if (query.length < 4) {
      setDropSuggestions([]);
      setShowDropSuggestions(false);
      return;
    }

    const timer = setTimeout(() => {
      fetchSuggestions(query, "drop");
    }, 500);

    return () => clearTimeout(timer);
  }, [form.drop, selectedDrop]);

  async function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!form.vehicle) {
      toast.error("Please select a vehicle.");
      return;
    }

    if (loading) return;

    setLoading(true);

    try {
      const response = await fetch("/api/book", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(
          result?.error || "Unable to submit your booking.",
        );
      }

      toast.success(
        "Booking received! A confirmation email will arrive shortly.",
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

      setCustomTrip(false);
      setSelectedPickup(false);
      setSelectedDrop(false);
      setPickupSuggestions([]);
      setDropSuggestions([]);
      setShowPickupSuggestions(false);
      setShowDropSuggestions(false);
    } catch (error) {
      console.error("Booking submission error:", error);

      toast.error(
        error instanceof Error
          ? error.message
          : "Unable to submit your booking. Please try again.",
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-black text-white">
      <section
        className="flex h-[40vh] items-center justify-center bg-cover bg-center text-center"
        style={{ backgroundImage: "url('/booking.jpg')" }}
      >
        <div className="rounded-lg bg-black/60 p-8">
          <h1 className="text-5xl font-bold">
            {customTrip
              ? "Request Custom Trip Quote"
              : "Book Your Ride"}
          </h1>

          <p className="mt-2 text-gray-300">
            Fast and reliable airport transportation
          </p>
        </div>
      </section>

      <section className="flex justify-center px-6 py-20">
        <motion.div
          className="w-full max-w-2xl rounded-xl bg-gray-900 p-6 shadow-lg md:p-10"
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          <h2 className="mb-8 text-center text-3xl font-bold text-lime-400">
            Ride Details
          </h2>

          <form onSubmit={submit} className="grid gap-5">
            <input
              className="w-full rounded p-3 text-black"
              placeholder="Full Name"
              required
              value={form.name}
              onChange={(e) =>
                setForm((prev) => ({
                  ...prev,
                  name: e.target.value,
                }))
              }
            />

            <input
              type="tel"
              className="w-full rounded p-3 text-black"
              placeholder="Phone Number"
              required
              value={form.phone}
              onChange={(e) =>
                setForm((prev) => ({
                  ...prev,
                  phone: e.target.value,
                }))
              }
            />

            <input
              type="email"
              className="w-full rounded p-3 text-black"
              placeholder="Email Address"
              required
              value={form.email}
              onChange={(e) =>
                setForm((prev) => ({
                  ...prev,
                  email: e.target.value,
                }))
              }
            />

            <div className="relative">
              <input
                className="w-full rounded p-3 text-black"
                placeholder="Pickup Location"
                required
                value={form.pickup}
                onChange={(e) => {
                  setSelectedPickup(false);

                  setForm((prev) => ({
                    ...prev,
                    pickup: e.target.value,
                  }));
                }}
                onFocus={() => {
                  if (pickupSuggestions.length > 0) {
                    setShowPickupSuggestions(true);
                  }
                }}
                onBlur={() => {
                  setTimeout(
                    () => setShowPickupSuggestions(false),
                    200,
                  );
                }}
              />

              {showPickupSuggestions &&
                pickupSuggestions.length > 0 && (
                  <div className="absolute z-50 mt-1 max-h-60 w-full overflow-y-auto rounded border bg-white text-black shadow-lg">
                    {pickupSuggestions.map((item, index) => (
                      <button
                        key={item.placeId || index}
                        type="button"
                        className="block w-full border-b px-4 py-3 text-left hover:bg-gray-100 last:border-b-0"
                        onMouseDown={(e) => {
                          e.preventDefault();

                          setSelectedPickup(true);

                          setForm((prev) => ({
                            ...prev,
                            pickup: item.label,
                          }));

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
                className="w-full rounded p-3 text-black"
                placeholder="Drop-off Location"
                required
                value={form.drop}
                onChange={(e) => {
                  setSelectedDrop(false);

                  setForm((prev) => ({
                    ...prev,
                    drop: e.target.value,
                  }));
                }}
                onFocus={() => {
                  if (dropSuggestions.length > 0) {
                    setShowDropSuggestions(true);
                  }
                }}
                onBlur={() => {
                  setTimeout(
                    () => setShowDropSuggestions(false),
                    200,
                  );
                }}
              />

              {showDropSuggestions &&
                dropSuggestions.length > 0 && (
                  <div className="absolute z-50 mt-1 max-h-60 w-full overflow-y-auto rounded border bg-white text-black shadow-lg">
                    {dropSuggestions.map((item, index) => (
                      <button
                        key={item.placeId || index}
                        type="button"
                        className="block w-full border-b px-4 py-3 text-left hover:bg-gray-100 last:border-b-0"
                        onMouseDown={(e) => {
                          e.preventDefault();

                          setSelectedDrop(true);

                          setForm((prev) => ({
                            ...prev,
                            drop: item.label,
                          }));

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

            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <label className="mb-1 block text-sm text-gray-300">
                  Pickup Date
                </label>

                <input
                  type="date"
                  className="w-full rounded p-3 text-black"
                  required
                  min={new Date().toISOString().split("T")[0]}
                  value={form.date}
                  onChange={(e) =>
                    setForm((prev) => ({
                      ...prev,
                      date: e.target.value,
                    }))
                  }
                />
              </div>

              <div>
                <label className="mb-1 block text-sm text-gray-300">
                  Pickup Time
                </label>

                <input
                  type="time"
                  className="w-full rounded p-3 text-black"
                  required
                  value={form.time}
                  onChange={(e) =>
                    setForm((prev) => ({
                      ...prev,
                      time: e.target.value,
                    }))
                  }
                />
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <input
                type="number"
                min="1"
                required
                className="rounded p-3 text-black"
                placeholder="Number of Passengers"
                value={form.passengers}
                onChange={(e) =>
                  setForm((prev) => ({
                    ...prev,
                    passengers: e.target.value,
                  }))
                }
              />

              <input
                type="number"
                min="0"
                required
                className="rounded p-3 text-black"
                placeholder="Number of Luggage Pieces"
                value={form.luggage}
                onChange={(e) =>
                  setForm((prev) => ({
                    ...prev,
                    luggage: e.target.value,
                  }))
                }
              />
            </div>

            <div>
              <label className="mb-3 block text-sm text-gray-300">
                Select Vehicle
              </label>

              <div className="grid gap-4 sm:grid-cols-2">
                {vehicles.map((vehicle) => {
                  const isSelected =
                    form.vehicle === vehicle.name;

                  return (
                    <button
                      key={vehicle.id}
                      type="button"
                      aria-pressed={isSelected}
                      onClick={() =>
                        setForm((prev) => ({
                          ...prev,
                          vehicle: vehicle.name,
                        }))
                      }
                      className={`rounded-xl border p-4 text-left transition ${
                        isSelected
                          ? "border-lime-400 bg-lime-400 text-black"
                          : "border-gray-700 bg-gray-800 hover:border-lime-400"
                      }`}
                    >
                      <span className="block font-semibold">
                        {vehicle.name}
                      </span>

                      <span
                        className={`mt-1 block text-sm ${
                          isSelected
                            ? "text-black/70"
                            : "text-gray-400"
                        }`}
                      >
                        {vehicle.category} · {vehicle.passengers}
                      </span>
                    </button>
                  );
                })}
              </div>

              {!form.vehicle && (
                <p className="mt-2 text-sm text-gray-400">
                  Please select your preferred vehicle.
                </p>
              )}

              <p className="mt-4 text-sm leading-6 text-gray-400">
                All listed vehicles use the applicable SUV rate.
                Your preferred model is subject to availability,
                and a comparable luxury SUV may be provided when
                necessary.
              </p>
            </div>

            <input
              className="w-full rounded p-3 text-black"
              placeholder="Flight Number (Optional)"
              value={form.flightNumber}
              onChange={(e) =>
                setForm((prev) => ({
                  ...prev,
                  flightNumber: e.target.value,
                }))
              }
            />

            <button
              type="submit"
              disabled={loading}
              className={`rounded-lg py-3 text-lg font-bold transition ${
                loading
                  ? "cursor-not-allowed bg-gray-500 text-white"
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