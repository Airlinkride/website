import Link from "next/link";
import { locations } from "@/data/locations";

export default function ServiceAreas() {
  return (
    <section className="bg-[#090909] px-6 py-20 md:py-24">
      <div className="mx-auto max-w-7xl">
        <div className="mb-12 text-center">
          <p className="mb-3 font-semibold uppercase tracking-widest text-lime-400">
            Ontario Airport Transportation
          </p>

          <h2 className="text-4xl font-bold text-white md:text-5xl">
            Airport Limo Service Areas
          </h2>

          <p className="mx-auto mt-5 max-w-3xl leading-relaxed text-gray-400">
            AirLink Ride provides professional airport limousine service
            between Toronto Pearson International Airport and cities throughout
            Ontario. Select your location to view rates, estimated travel time,
            and booking information.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {locations.map((location) => (
            <Link
              key={location.slug}
              href={`/${location.slug}`}
              className="group rounded-2xl border border-gray-800 bg-black p-5 transition duration-300 hover:-translate-y-1 hover:border-lime-400 hover:bg-gray-950"
            >
              <h3 className="text-lg font-bold text-white transition group-hover:text-lime-400">
                {location.name}
              </h3>

              <p className="mt-2 text-sm text-gray-400">
                Pearson Airport Limo Service
              </p>

              <div className="mt-5 flex items-center justify-between">
                <span className="font-semibold text-lime-400">
                  From ${location.sedan}
                </span>

                <span className="text-sm text-gray-500 transition group-hover:text-white">
                  View details →
                </span>
              </div>
            </Link>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Link
            href="/rates"
            className="inline-flex rounded-full border border-lime-400 px-7 py-3 font-semibold text-lime-400 transition hover:bg-lime-400 hover:text-black"
          >
            View All Airport Rates
          </Link>
        </div>
      </div>
    </section>
  );
}