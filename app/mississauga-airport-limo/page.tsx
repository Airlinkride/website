import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Mississauga Airport Limo Service | Pearson Airport Transfers",
  description:
    "Flat-rate airport limo service from Mississauga to Toronto Pearson Airport. Professional chauffeurs, luxury vehicles, and 24/7 airport transportation.",
  alternates: {
    canonical: "https://www.airlinkride.com/mississauga-airport-limo",
  },
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "How much is an airport limo from Mississauga to Pearson Airport?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Sedan rides from Mississauga to Pearson Airport start at $50, and SUV rides start at $60.",
      },
    },
    {
      "@type": "Question",
      name: "Do you provide 24/7 airport limo service in Mississauga?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes, AirLink Ride provides airport transportation 24 hours a day, including early-morning and late-night airport transfers.",
      },
    },
    {
      "@type": "Question",
      name: "Do you track flights for Pearson Airport pickups?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes, we track flight arrivals to help adjust for delays or early arrivals.",
      },
    },
  ],
};

export default function MississaugaAirportLimoPage() {
  return (
    <main className="min-h-screen bg-black text-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(faqSchema),
        }}
      />

      <section className="max-w-5xl mx-auto px-6 py-20">
        <h1 className="text-5xl font-bold mb-8">
          Mississauga Airport Limo Service
        </h1>

        <p className="text-gray-300 mb-6">
          AirLink Ride provides reliable airport limo service from Mississauga to
          Toronto Pearson Airport (YYZ). Our professional chauffeurs offer
          punctual pickups, luxury vehicles, and flat-rate pricing.
        </p>

        <h2 className="text-3xl font-bold text-lime-400 mb-4">
          Flat Rate Pricing
        </h2>

        <p className="mb-8">
          Sedan rides from Mississauga start at $50 and SUV rides start at $60.
        </p>

        <h2 className="text-3xl font-bold text-lime-400 mb-4">
          Why Choose AirLink Ride
        </h2>

        <ul className="list-disc pl-6 space-y-3 text-gray-300">
          <li>24/7 airport transportation</li>
          <li>Professional licensed chauffeurs</li>
          <li>Flight tracking included</li>
          <li>Flat-rate pricing</li>
          <li>Luxury sedan and SUV options</li>
        </ul>

        <section className="mt-12">
          <h2 className="text-3xl font-bold text-lime-400 mb-6">
            Frequently Asked Questions
          </h2>

          <div className="space-y-6 text-gray-300">
            <div>
              <h3 className="text-xl font-semibold text-white mb-2">
                How much is an airport limo from Mississauga to Pearson Airport?
              </h3>
              <p>
                Sedan rides from Mississauga to Pearson Airport start at $50,
                and SUV rides start at $60.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-white mb-2">
                Do you provide 24/7 airport limo service in Mississauga?
              </h3>
              <p>
                Yes, AirLink Ride provides airport transportation 24 hours a
                day, including early-morning and late-night airport transfers.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-white mb-2">
                Do you track flights for Pearson Airport pickups?
              </h3>
              <p>
                Yes, we track flight arrivals to help adjust for delays or early
                arrivals.
              </p>
            </div>
          </div>
        </section>

        <Link href="/booking">
          <button className="mt-10 bg-lime-400 text-black px-6 py-3 rounded-lg font-semibold">
            Book Your Ride
          </button>
        </Link>
      </section>
    </main>
  );
}