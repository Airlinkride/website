import RatesClient from "./RatesClient";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Toronto Airport Limo Rates | Pearson Airport Flat Rates",
  description:
    "View AirLink Ride flat-rate airport limo prices from Toronto, Mississauga, Brampton, Vaughan, Markham, Oakville, Burlington, Niagara Falls and more.",
  alternates: {
    canonical: "https://www.airlinkride.com/rates",
  },
};

export default function RatesPage() {
  return <RatesClient />;
}