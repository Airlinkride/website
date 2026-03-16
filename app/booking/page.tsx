import { Suspense } from "react";
import Booking from "./booking";

export default function BookingPage() {
  return (
    <Suspense fallback={<div className="text-white p-10">Loading...</div>}>
      <Booking />
    </Suspense>
  );
}