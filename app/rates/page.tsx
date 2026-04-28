"use client";

import { motion } from "framer-motion";
import Link from "next/link";

export default function Rates() {
  const rateCategories = [
    {
      title: "Category A",
      rates: [
        { location: "Acton", sedan: 110, suv: 130 },
        { location: "Airport Hotel Area", sedan: 60, suv: 85 },
        { location: "Ajax", sedan: 100, suv: 110 },
        { location: "Alliston", sedan: 140, suv: 160 },
        { location: "Ancaster", sedan: 125, suv: 145 },
        { location: "Angus", sedan: 180, suv: 200 },
        { location: "Ashburn", sedan: 130, suv: 150 },
        { location: "Aurora", sedan: 100, suv: 110 },
      ],
    },

    {
      title: "Category B",
      rates: [
        { location: "Barrie", sedan: 170, suv: 185 },
        { location: "Belleville", sedan: 360, suv: 400 },
        { location: "Beaches Area", sedan: 90, suv: 110 },
        { location: "Beamsville", sedan: 175, suv: 190 },
        { location: "Bolton", sedan: 80, suv: 100 },
        { location: "Bowmanville", sedan: 155, suv: 175 },
        { location: "Bracebridge", sedan: 330, suv: 370 },
        { location: "Bradford", sedan: 120, suv: 140 },
        { location: "Brampton", sedan: 80, suv: 100 },
        { location: "Brantford", sedan: 180, suv: 190 },
        { location: "Brighton", sedan: 330, suv: 350 },
        { location: "Brockville", sedan: 650, suv: 710 },
        { location: "Brooklin", sedan: 130, suv: 140 },
        { location: "Buffalo Airport", sedan: 340, suv: 380 },
        { location: "Burlington", sedan: 90, suv: 110 },
        { location: "Buttonville", sedan: 80, suv: 100 },
      ],
    },

    {
      title: "Category C",
      rates: [
        { location: "Caledon", sedan: 90, suv: 100 },
        { location: "Cambridge", sedan: 150, suv: 170 },
        { location: "Campbellville", sedan: 100, suv: 120 },
        { location: "Campbellford", sedan: 310, suv: 350 },
        { location: "Chatham-Kent", sedan: 535, suv: 575 },
        { location: "Claremont", sedan: 110, suv: 130 },
        { location: "Clarington", sedan: 190, suv: 210 },
        { location: "Cobourg", sedan: 220, suv: 230 },
        { location: "Collingwood", sedan: 255, suv: 280 },
        { location: "Concord", sedan: 60, suv: 80 },
        { location: "Courtice", sedan: 150, suv: 170 },
      ],
    },

    {
      title: "Category D",
      rates: [
        { location: "Davisville", sedan: 70, suv: 90 },
        { location: "Detroit", sedan: 700, suv: 750 },
        { location: "Downtown Toronto", sedan: 80, suv: 99 },
        { location: "Dundas", sedan: 120, suv: 130 },
      ],
    },

    {
      title: "Category E",
      rates: [
        { location: "East York", sedan: 85, suv: 105 },
        { location: "Etobicoke", sedan: 50, suv: 70 },
        { location: "Fort Erie", sedan: 280, suv: 300 },
        { location: "Ennismore", sedan: 310, suv: 330 },
        { location: "Elmira", sedan: 200, suv: 220 },
      ],
    },

    {
      title: "Category G",
      rates: [
        { location: "Georgetown", sedan: 80, suv: 99 },
        { location: "Georgina", sedan: 200, suv: 220 },
        { location: "Goodwood", sedan: 123, suv: 137 },
        { location: "Gravenhurst", sedan: 300, suv: 340 },
        { location: "Grimsby", sedan: 150, suv: 160 },
        { location: "Guelph", sedan: 139, suv: 159 },
      ],
    },

    {
      title: "Category H",
      rates: [
        { location: "Hamilton", sedan: 120, suv: 130},
        { location: "Hamilton MTN", sedan: 140, suv: 150},
        { location: "Hayden", sedan: 197, suv: 219 },
        { location: "Huntsville", sedan: 425, suv: 465 },
      ],
    },

    {
      title: "Category I",
      rates: [
        { location: "Ingersoll", sedan: 259, suv: 280},
        { location: "Innisfil", sedan: 160, suv: 180 },
      ],
    },

    {
      title: "Category K",
      
        rates: [
        { location: "Keswick", sedan: 160, suv: 170 },
        { location: "Kilbride", sedan: 109, suv: 120 },
        { location: "King City", sedan: 80, suv: 99 },
        { location: "Kingston", sedan: 499, suv: 539 },
        { location: "Kitchener", sedan: 170, suv: 190 },
      { location: "Kawartha lakes", sedan: 270, suv: 300 },

      ],
    },

    {
      title: "Category L",
      rates: [
        { location: "Leaside Area", sedan: 81, suv: 100 },
        { location: "London", sedan: 340, suv: 350 },
        { location: "Loyalist", sedan: 520, suv: 560 },
        { location: "Linsday", sedan: 270, suv: 300 },
      ],
    },

    {
      title: "Category M",
      rates: [
        { location: "Maple", sedan: 70, suv: 90 },
        { location: "Markham", sedan: 90, suv: 110 },
        { location: "Milton", sedan: 80, suv: 100 },
        { location: "Mississauga", sedan: 60, suv: 80 },
        { location: "Moore Park", sedan: 79, suv: 99 },
        { location: "Midtown", sedan: 60, suv: 80 },
        { location: "Midland", sedan: 260, suv: 300 },
        { location: "Montreal", sedan: 1000, suv: 1100 },
      ],
    },

    {
      title: "Category N",
      rates: [
        { location: "Napanee", sedan: 450, suv: 500 },
        { location: "Newmarket", sedan: 100, suv: 120 },
        { location: "Newcastle", sedan: 180, suv: 200 },
        { location: "Niagara Falls ON", sedan: 230, suv: 260 },
        { location: "North York", sedan: 60, suv: 80 },
      ],
    },

    {
      title: "Category O",
      rates: [
        { location: "Oakville", sedan: 70, suv: 80 },
        { location: "Orangeville", sedan: 110, suv: 130 },
        { location: "Orillia", sedan: 240, suv: 270 },
        { location: "Orono", sedan: 183, suv: 200 },
        { location: "Oshawa", sedan: 120, suv: 130 },
        { location: "North Oshawa", sedan: 130, suv: 140},
        { location: "Ottawa", sedan: 850, suv: 900 },
        { location: "Owen Sound", sedan: 340, suv: 380 },
      ],
    },

    {
      title: "Category P",
      rates: [
        { location: "Parry Sound", sedan: 399, suv: 440 },
        { location: "Peterborough", sedan: 260, suv: 280 },
        { location: "Pickering", sedan: 99, suv: 120 },
        { location: "Pickering North", sedan: 115, suv: 130},
        { location: "Picton", sedan: 430, suv: 470 },
        { location: "Port Colborne", sedan: 260, suv: 280 },
        { location: "Port Dover", sedan: 255, suv: 280 },
        { location: "Port Hope", sedan: 219, suv: 239 },
      { location: "Port Perry", sedan: 170, suv: 190 },
      { location: "Prince Edward County", sedan: 440, suv: 485 },

      ],
    },

    {
      title: "Category R",
      rates: [
        { location: "Richmond Hill", sedan: 79, suv: 99 },
        { location: "Rockport", sedan: 545, suv: 585 },
        { location: "Rosedale", sedan: 70, suv: 90 },
      ],
    },

    {
      title: "Category S",
      rates: [
        { location: "Schomberg", sedan: 90, suv: 100 },
        { location: "St Catharines", sedan: 190, suv: 210 },
        { location: "Stoney Creek", sedan: 130, suv: 140 },
        { location: "Stouffville", sedan: 110, suv: 130 },
        { location: "Stratford", sedan: 245, suv: 265 },
        { location: "Scarborough", sedan: 80, suv: 90 },
        { location: "Simcoe", sedan: 290, suv: 320 },
      ]   
    },

    {
      title: "Category T",
      rates: [
        { location: "Thornhill", sedan: 70, suv: 80 },
        { location: "The Danforth Area", sedan: 84, suv: 104 },
        { location: "Tillsonburg", sedan: 280, suv: 300 },
        { location: "Trenton", sedan: 340, suv: 370 },
      ],
    },

    {
      title: "Category U",
      rates: [
        { location: "Unionville", sedan: 80, suv: 99 },
        { location: "Uxbridge", sedan: 140, suv: 160 },
      ],
    },

    {
      title: "Category V",
      rates: [
        { location: "Vaughan", sedan: 70, suv: 90 },
        { location: "Victoria", sedan: 80, suv: 100 },
      ],
    },

    {
      title: "Category W",
      rates: [
        { location: "Wasaga Beach", sedan: 265, suv: 295 },
        { location: "Wainfleet", sedan: 240, suv: 270 },
        { location: "Waterdown", sedan: 110, suv: 130 },
        { location: "Waterloo", sedan: 170, suv: 190 },
        { location: "Waterford", sedan: 210, suv: 230 },
        { location: "Whitby", sedan: 120, suv: 140 },
        { location: "Whitby North", sedan: 130, suv: 150},
        { location: "Windsor", sedan: 670, suv: 720 },
        { location: "Woodbridge", sedan: 60, suv: 80 },
        { location: "Woodstock", sedan: 230, suv: 250 },
        { location: "Woodbine Garden", sedan: 82, suv: 99 },
        { location: "Woodbine Heights", sedan: 82, suv: 99 },
      ],
    },
  ];

  return (
    <main className="min-h-screen bg-black text-white">
      <section
        className="h-[50vh] flex items-center justify-center text-center bg-cover bg-center"
        style={{ backgroundImage: "url('/toronto-airport-limo-rates.jpg')" }}
      >
        <div className="bg-black/60 p-10 rounded-lg">
          <h1 className="text-5xl font-bold mb-4">Airport Ride Rates</h1>
          <p className="text-gray-300">
            Flat rate pricing from Toronto Pearson Airport
            A $17 pre-arrangement fee applies to all Pearson Airport arrivals
          </p>

          <Link href="/booking?custom=true">
            <button className="mt-8 bg-lime-400 text-black px-6 py-3 rounded-lg font-semibold hover:bg-lime-300 transition shadow-lg">
              Request Custom Quote
            </button>
          </Link>
        </div>
      </section>

      <section className="py-20 px-4 md:px-6 max-w-7xl mx-auto">
        {rateCategories.map((cat, i) => (
          <div key={i} className="mb-16">
            <motion.h2
              className="text-3xl font-bold mb-6 text-lime-400 border-b border-gray-800 pb-2"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
            >
              {cat.title}
            </motion.h2>

            <div className="w-full overflow-x-auto">
              <table className="w-full table-fixed border border-gray-800 text-sm md:text-base">
                <thead className="bg-gray-900 text-lime-400 sticky top-0 z-10">
                  <tr>
                    <th className="w-[40%] text-left p-3 border-r border-gray-800">
                      Location
                    </th>
                    <th className="w-[20%] text-center p-3 border-r border-gray-800">
                      Sedan
                    </th>
                    <th className="w-[20%] text-center p-3 border-r border-gray-800">
                      SUV
                    </th>
                    <th className="w-[20%] text-center p-3">
                      Book
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {cat.rates.map((r, index) => (
                    <tr
                      key={index}
                      className="border-t border-gray-800 hover:bg-gray-900 transition"
                    >
                      <td className="p-3 border-r border-gray-800">
                        {r.location}
                      </td>

                      <td className="text-center p-3 text-lime-400 font-semibold border-r border-gray-800">
                        ${r.sedan}
                      </td>

                      <td className="text-center p-3 text-lime-400 font-semibold border-r border-gray-800">
                        ${r.suv}
                      </td>

                      <td className="text-center p-3">
                        <Link
                          href={`/booking?pickup=${encodeURIComponent(
                            r.location
                          )}&drop=Pearson Airport`}
                        >
                          <button className="bg-lime-400 text-black px-3 py-1.5 text-sm rounded hover:bg-lime-300 transition">
                            Book
                          </button>
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ))}
      </section>
    </main>
  );
}
