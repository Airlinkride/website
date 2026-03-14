"use client"

import { useState } from "react"
import { motion } from "framer-motion"

export default function Booking() {

  const [form, setForm] = useState({
    name: "",
    phone: "",
    pickup: "",
    drop: "",
    date: "",
    time: "",
    passengers: ""
  })

  const [success, setSuccess] = useState(false)

  function submit(e:any) {
    e.preventDefault()

    console.log(form)

    setSuccess(true)

    setTimeout(() => {
      setSuccess(false)
    }, 4000)
  }

  return (
    <main className="min-h-screen bg-black text-white">

      {/* HERO */}
      <section
        className="h-[40vh] flex items-center justify-center text-center bg-cover bg-center"
        style={{ backgroundImage: "url('/airport.jpg')" }}
      >
        <div className="bg-black/60 p-8 rounded-lg">
          <h1 className="text-5xl font-bold">Book Your Ride</h1>
          <p className="text-gray-300 mt-2">
            Fast and reliable airport transportation
          </p>
        </div>
      </section>

      {/* BOOKING FORM */}
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

          {success && (
            <div className="bg-green-500 text-black p-3 rounded mb-6 text-center font-semibold">
              Ride booked successfully! We will contact you shortly.
            </div>
          )}

          <form onSubmit={submit} className="grid gap-5">

            <input
              className="w-full p-3 rounded text-black"
              placeholder="Full Name"
              required
              onChange={(e)=>setForm({...form,name:e.target.value})}
            />

            <input
              className="w-full p-3 rounded text-black"
              placeholder="Phone Number"
              required
              onChange={(e)=>setForm({...form,phone:e.target.value})}
            />

            <input
              className="w-full p-3 rounded text-black"
              placeholder="Pickup Location"
              required
              onChange={(e)=>setForm({...form,pickup:e.target.value})}
            />

            <input
              className="w-full p-3 rounded text-black"
              placeholder="Drop-off Location"
              required
              onChange={(e)=>setForm({...form,drop:e.target.value})}
            />

            <div className="grid md:grid-cols-2 gap-4">

              <input
                type="date"
                className="p-3 rounded text-black"
                required
                onChange={(e)=>setForm({...form,date:e.target.value})}
              />

              <input
                type="time"
                className="p-3 rounded text-black"
                required
                onChange={(e)=>setForm({...form,time:e.target.value})}
              />

            </div>

            <input
              type="number"
              min="1"
              className="p-3 rounded text-black"
              placeholder="Number of Passengers"
              onChange={(e)=>setForm({...form,passengers:e.target.value})}
            />

            <button
              className="bg-lime-400 text-black py-3 rounded-lg font-bold text-lg hover:bg-lime-300 transition"
            >
              Confirm Booking
            </button>

          </form>

        </motion.div>

      </section>

    </main>
  )
}