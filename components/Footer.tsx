import Link from "next/link";

const popularRoutes = [
  {
    name: "Mississauga",
    slug: "mississauga-airport-limo",
  },
  {
    name: "Hamilton",
    slug: "hamilton-airport-limo",
  },
  {
    name: "Kitchener",
    slug: "kitchener-airport-limo",
  },
  {
    name: "Waterloo",
    slug: "waterloo-airport-limo",
  },
  {
    name: "London",
    slug: "london-airport-limo",
  },
  {
    name: "Niagara Falls",
    slug: "niagara-falls-airport-limo",
  },
  {
    name: "Barrie",
    slug: "barrie-airport-limo",
  },
  {
    name: "Kingston",
    slug: "kingston-airport-limo",
  },
];

export default function Footer() {
  return (
    <footer className="mt-20 border-t border-gray-800 bg-black">
      <div className="mx-auto max-w-7xl px-6 py-12">
        <div className="text-center">
          <h2 className="text-xl font-bold text-white">
            Popular Airport Limo Routes
          </h2>

          <p className="mt-2 text-sm text-gray-400">
            Flat-rate airport transportation to Toronto Pearson Airport.
          </p>
        </div>

        <nav
          aria-label="Popular airport limo routes"
          className="mt-8 flex flex-wrap justify-center gap-x-6 gap-y-4"
        >
          {popularRoutes.map((route) => (
            <Link
              key={route.slug}
              href={`/${route.slug}`}
              className="text-sm text-gray-400 transition hover:text-lime-400"
            >
              {route.name}
            </Link>
          ))}
        </nav>

        <div className="mt-10 border-t border-gray-800 pt-6 text-center text-sm text-gray-400">
          <p>
            © {new Date().getFullYear()} AirLink Ride. All rights reserved.
          </p>

          <p className="mt-2">
            Toronto Airport Limo Service • Pearson Airport (YYZ)
          </p>
        </div>
      </div>
    </footer>
  );
}