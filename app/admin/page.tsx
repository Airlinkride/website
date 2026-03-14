"use client"

import { useEffect, useState } from "react"

export default function AdminDashboard(){

  const [bookings,setBookings] = useState([])

  useEffect(()=>{

    fetch("/api/bookings")
    .then(res=>res.json())
    .then(data=>setBookings(data))

  },[])

  return(

    <div className="p-10">

      <h1 className="text-4xl font-bold mb-8">
        AirLinkRide Bookings
      </h1>

      <table className="w-full border">

        <thead className="bg-gray-200 text-black">

          <tr>
            <th className="p-3">Booking</th>
            <th>Name</th>
            <th>Phone</th>
            <th>Pickup</th>
            <th>Drop</th>
            <th>Date</th>
            <th>Status</th>
          </tr>

        </thead>

        <tbody>

          {bookings.map((b:any)=>(
            <tr key={b.id} className="border">

              <td className="p-2">{b.id}</td>
              <td>{b.name}</td>
              <td>{b.phone}</td>
              <td>{b.pickup}</td>
              <td>{b.drop}</td>
              <td>{b.date}</td>
              <td>{b.status}</td>

            </tr>
          ))}

        </tbody>

      </table>

    </div>
  )
}