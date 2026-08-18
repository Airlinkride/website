import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { vehicles } from "@/data/vehicles";

export const metadata: Metadata = {
  title: "Luxury Airport Limo Fleet",
  description:
    "Explore the AirLink Ride luxury SUV fleet, including Cadillac Escalade, Chevrolet Suburban, Ford Expedition, Lincoln Navigator, and Toyota Grand Highlander.",
  alternates: {
    canonical: "https://www.airlinkride.com/vehicles",
  },
  openGraph: {
    title: "Luxury Airport Limo Fleet | AirLink Ride",
    description:
      "Explore our premium airport transportation fleet serving Toronto Pearson Airport and Ontario.",
    url: "https://www.airlinkride.com/vehicles",
    type: "website",
  },
};

export default function VehiclesPage() {
  return (
    <main className="min-h-screen bg-black text-white">
      {/* <section className="border-b border-gray-800 px-6 py-20 text-center">
        <div className="mx-auto max-w-4xl">
          <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-lime-400">
            AirLink Ride Fleet
          </p>

          <h1 className="text-4xl font-bold md:text-5xl">
            Luxury Airport Transportation Vehicles
          </h1>

          <p className="mx-auto mt-5 max-w-3xl leading-7 text-gray-300">
            Travel comfortably in one of our premium SUVs. Vehicle availability
            may vary, and a comparable luxury vehicle may be provided when
            necessary.
          </p>
        </div>
      </section> */}

      <section className="mx-auto max-w-7xl px-6 py-20">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {vehicles.map((vehicle) => (
            <article
              key={vehicle.id}
              className="overflow-hidden rounded-2xl border border-gray-800 bg-gray-950"
            >
              <div className="relative aspect-[16/10]">
                <Image
                  src={vehicle.image}
                  alt={`${vehicle.name} airport limo vehicle`}
                  fill
                  className="object-cover"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
              </div>

              <div className="p-6">
                <p className="text-sm font-semibold uppercase tracking-wider text-lime-400">
                  {vehicle.category}
                </p>

                <h2 className="mt-2 text-2xl font-bold">
                  {vehicle.name}
                </h2>

                <div className="mt-5 space-y-2 text-gray-300">
                  <p>{vehicle.passengers}</p>
                  <p>{vehicle.luggage}</p>
                </div>

                {/* <Link
                  href={`/booking?vehicle=${encodeURIComponent(vehicle.name)}`}
                  className="mt-6 inline-flex rounded-lg bg-lime-400 px-5 py-3 font-semibold text-black transition hover:bg-lime-300"
                >
                  Book This Vehicle
                </Link> */}
              </div>
            </article>
          ))}
        </div>

        <p className="mt-12 text-center text-sm leading-6 text-gray-400">
          Vehicle requests are subject to availability. AirLink Ride may provide
          a comparable vehicle within the selected class.
        </p>
      </section>
    </main>
  );
}