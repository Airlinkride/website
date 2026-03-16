import { NextResponse } from "next/server"
import { Resend } from "resend"

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(req: Request) {

  try {

    const body = await req.json()

    const {
      name,
      email,
      phone,
      pickup,
      drop,
      date,
      time,
      passengers,
      luggage,
      flightNumber
    } = body

    /* EMAIL TO CUSTOMER */

    await resend.emails.send({
      from: "AirLinkRide <booking@airlinkride.com>",
      to: email,
      subject: "Your AirLinkRide Booking Confirmation",
      html: `
        <h2>Booking Confirmation</h2>

        <p>Hi ${name},</p>

        <p>Your ride request has been received.</p>

        <p><strong>Pickup:</strong> ${pickup}</p>
        <p><strong>Drop:</strong> ${drop}</p>
        <p><strong>Date:</strong> ${date}</p>
        <p><strong>Time:</strong> ${time}</p>
        <p><strong>Passengers:</strong> ${passengers}</p>
        <p><strong>Luggage:</strong> ${luggage}</p>
        <p><strong>Flight:</strong> ${flightNumber || "N/A"}</p>

        <br/>

        <p>Our team will contact you shortly.</p>

        <p><strong>AirLinkRide</strong></p>
        <p>+1 437-522-8001</p>
      `
    })


    /* EMAIL TO YOU */

    await resend.emails.send({
      from: "AirLinkRide <booking@airlinkride.com>",
      to: "info@airlinkride.com",
      subject: "New Ride Booking",
      html: `
        <h2>New Booking</h2>

        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone}</p>
        <p><strong>Pickup:</strong> ${pickup}</p>
        <p><strong>Drop:</strong> ${drop}</p>
        <p><strong>Date:</strong> ${date}</p>
        <p><strong>Time:</strong> ${time}</p>
        <p><strong>Passengers:</strong> ${passengers}</p>
        <p><strong>Luggage:</strong> ${luggage}</p>
        <p><strong>Flight:</strong> ${flightNumber || "N/A"}</p>
      `
    })

    return NextResponse.json({ success: true })

  } catch (error) {

    console.error(error)

    return NextResponse.json({ error: "Email failed" })
  }
}