export const runtime = "nodejs";

import nodemailer from "nodemailer";

export async function POST(req) {
  try {
    // Debug (you can remove later)
    console.log("ENV CHECK:", {
      user: process.env.NEXT_PUBLIC_EMAIL_USER,
      pass: process.env.NEXT_PUBLIC_EMAIL_PASS,
    });

    const body = await req.json();

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
      flightNumber,
      vehicle,
    } = body;

    // Create transporter
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.NEXT_PUBLIC_EMAIL_USER,
        pass: process.env.NEXT_PUBLIC_EMAIL_PASS,
      },
    });

    // ✅ EMAIL TO CUSTOMER
    await transporter.sendMail({
      from: `"AirLinkRide" <${process.env.NEXT_PUBLIC_EMAIL_USER}>`,
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
        <p><strong>Vehicle:</strong> ${vehicle}</p>

        <br/>

        <p>Our team will contact you shortly.</p>

        <p><strong>AirLinkRide</strong></p>
        <p>+1 437-522-8001</p>
      `,
    });

    // ✅ EMAIL TO YOU (ADMIN)
    await transporter.sendMail({
      from: `"AirLinkRide Booking" <${process.env.NEXT_PUBLIC_EMAIL_USER}>`,
      to: process.env.NEXT_PUBLIC_EMAIL_USER,
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
        <p><strong>Vehicle:</strong> ${vehicle}</p>
      `,
    });

    return Response.json({ success: true });
  } catch (error) {
    console.error("Email Error:", error);

    return Response.json(
      { error: "Failed to send email" },
      { status: 500 }
    );
  }
}