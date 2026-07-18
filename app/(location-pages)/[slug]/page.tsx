import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getLocationBySlug, locations } from "../../../data/locations";

type LocationPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export function generateStaticParams() {
  return locations.map((location) => ({
    slug: location.slug,
  }));
}

export async function generateMetadata({
  params,
}: LocationPageProps): Promise<Metadata> {
  const { slug } = await params;
  const location = getLocationBySlug(slug);

  if (!location) {
    return {
      title: "Airport Limo Service | AirLink Ride",
    };
  }

  return {
    title: `${location.name} Airport Limo Service | Pearson Airport Transfers`,
    description: `${location.description} Sedan rates start at $${location.sedan} and SUV rates start at $${location.suv}. Available 24/7.`,
    alternates: {
      canonical: `https://www.airlinkride.com/${location.slug}`,
    },
    openGraph: {
      title: `${location.name} Airport Limo Service`,
      description: location.description,
      url: `https://www.airlinkride.com/${location.slug}`,
      type: "website",
    },
  };
}

export default async function LocationPage({ params }: LocationPageProps) {
  const { slug } = await params;
  const location = getLocationBySlug(slug);

  if (!location) {
    notFound();
  }

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: `How much is an airport limo from ${location.name} to Pearson Airport?`,
        acceptedAnswer: {
          "@type": "Answer",
          text: `Sedan rides from ${location.name} start at $${location.sedan}, and SUV rides start at $${location.suv}. Additional airport fees may apply.`,
        },
      },
      {
        "@type": "Question",
        name: `Do you provide 24/7 airport limo service in ${location.name}?`,
        acceptedAnswer: {
          "@type": "Answer",
          text: `Yes. AirLink Ride provides 24/7 airport transportation between ${location.name} and Toronto Pearson Airport.`,
        },
      },
      {
        "@type": "Question",
        name: `How long is the trip from ${location.name} to Pearson Airport?`,
        acceptedAnswer: {
          "@type": "Answer",
          text: `The typical travel time is ${location.travelTime}, depending on traffic and weather conditions.`,
        },
      },
      {
        "@type": "Question",
        name: "Do you monitor flight arrival times?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes. AirLink Ride monitors flight arrival times to help accommodate delays and early arrivals.",
        },
      },
    ],
  };

  return (
    <main className="min-h-screen bg-black text-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(faqSchema),
        }}
      />

      <section className="max-w-5xl mx-auto px-6 py-20">
        <p className="mb-4 font-semibold text-lime-400">
          Pearson Airport Transportation
        </p>

        <h1 className="text-4xl md:text-5xl font-bold mb-8">
          {location.name} Airport Limo Service
        </h1>

        <p className="text-lg leading-8 text-gray-300 mb-8">
          {location.description} AirLink Ride provides professional chauffeurs,
          comfortable vehicles, flight monitoring, and convenient door-to-door
          service for business and leisure travellers.
        </p>

        <section className="mb-12">
          <h2 className="mb-4 text-3xl font-bold text-lime-400">
            Airport Transfers from {location.name}
          </h2>

          <p className="text-lg leading-8 text-gray-300">
            {location.localDetails}
          </p>
        </section>

        <section className="grid gap-6 md:grid-cols-3 mb-14">
          <div className="rounded-xl bg-gray-900 p-6">
            <h2 className="text-xl font-bold text-lime-400 mb-2">Sedan Rate</h2>
            <p className="text-3xl font-bold">${location.sedan}</p>
          </div>

          <div className="rounded-xl bg-gray-900 p-6">
            <h2 className="text-xl font-bold text-lime-400 mb-2">SUV Rate</h2>
            <p className="text-3xl font-bold">${location.suv}</p>
          </div>

          <div className="rounded-xl bg-gray-900 p-6">
            <h2 className="text-xl font-bold text-lime-400 mb-2">
              Travel Time
            </h2>
            <p className="text-gray-300">{location.travelTime}</p>
          </div>
        </section>

        <section className="mb-14">
          <h2 className="text-3xl font-bold text-lime-400 mb-6">
            Why Choose AirLink Ride?
          </h2>

          <ul className="list-disc pl-6 space-y-3 text-gray-300">
            <li>24/7 airport transportation</li>
            <li>Professional and experienced chauffeurs</li>
            <li>Flight monitoring for airport pickups</li>
            <li>Flat-rate sedan and SUV pricing</li>
            <li>Door-to-door service</li>
            <li>Clean and comfortable vehicles</li>
          </ul>
        </section>

        <section className="mb-14">
          <h2 className="text-3xl font-bold text-lime-400 mb-6">
            Frequently Asked Questions
          </h2>

          <div className="space-y-7 text-gray-300">
            <div>
              <h3 className="text-xl font-semibold text-white mb-2">
                How much is an airport limo from {location.name} to Pearson
                Airport?
              </h3>
              <p>
                Sedan rides start at ${location.sedan}, and SUV rides start at $
                {location.suv}. Additional Pearson Airport pickup fees may
                apply.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-white mb-2">
                Do you provide 24/7 service in {location.name}?
              </h3>
              <p>
                Yes. AirLink Ride provides airport transportation 24 hours a
                day, including early-morning and late-night trips.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-white mb-2">
                How long does the trip take?
              </h3>
              <p>
                The typical journey from {location.name} to Pearson Airport is{" "}
                {location.travelTime}. Travel time may vary due to traffic,
                weather, and road conditions.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-white mb-2">
                Do you monitor flights?
              </h3>
              <p>
                Yes. We monitor scheduled flight arrival times to help adjust
                airport pickups for delays or early arrivals.
              </p>
            </div>
          </div>
        </section>

        <div className="flex flex-wrap gap-4">
          <Link
            href={`/booking?pickup=${encodeURIComponent(
              location.name,
            )}&drop=Pearson Airport`}
            className="rounded-lg bg-lime-400 px-6 py-3 font-semibold text-black hover:bg-lime-300"
          >
            Book Your Ride
          </Link>

          <Link
            href="/rates"
            className="rounded-lg border border-lime-400 px-6 py-3 font-semibold text-lime-400 hover:bg-lime-400 hover:text-black"
          >
            View All Rates
          </Link>
        </div>
      </section>
    </main>
  );
}
