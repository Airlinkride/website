export const runtime = "nodejs";

import nodemailer from "nodemailer";

function formatTimeToAMPM(time: string) {
  if (!time) return "Not provided";

  const [hourString, minuteString] = time.split(":");
  const hour = Number(hourString);
  const minute = minuteString || "00";

  if (Number.isNaN(hour)) return time;

  const ampm = hour >= 12 ? "PM" : "AM";
  const hour12 = hour % 12 || 12;

  return `${hour12}:${minute} ${ampm}`;
}

export async function POST(req: Request) {
  try {
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

    const formattedDate = new Date(date).toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });

    const formattedTime = formatTimeToAMPM(time);

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    await transporter.sendMail({
      from: `"AirLinkRide" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: "✈️ Your AirLinkRide Booking Confirmation",
      html: `
        <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; margin: 0; padding: 0;">
          <div style="max-width: 600px; margin: 0 auto; background-color: #f9f9f9; border-radius: 10px; overflow: hidden;">
            <div style="background: linear-gradient(135deg, #84cc16 0%, #65a30d 100%); padding: 30px 20px; text-align: center;">
              <h1 style="color: white; margin: 0; font-size: 32px;">AirLinkRide</h1>
              <p style="color: white; margin: 10px 0 0;">Premium Airport Transportation</p>
            </div>

            <div style="padding: 30px; background-color: white;">
              <h2 style="color: #84cc16;">Thank You for Choosing AirLinkRide! 🚗</h2>
              <p>Dear <strong style="color: #84cc16;">${name}</strong>,</p>
              <p>Your ride request has been successfully received.</p>

              <div style="background-color: #f0f9f0; border-left: 4px solid #84cc16; padding: 20px; margin: 25px 0; border-radius: 5px;">
                <h3>📋 Booking Details</h3>

                <table style="width: 100%; border-collapse: collapse;">
                  <tr>
                    <td style="padding: 8px 0; color: #666;">📍 Pickup Location:</td>
                    <td style="padding: 8px 0; font-weight: bold;">${pickup}</td>
                  </tr>
                  <tr>
                    <td style="padding: 8px 0; color: #666;">🎯 Drop-off Location:</td>
                    <td style="padding: 8px 0; font-weight: bold;">${drop}</td>
                  </tr>
                  <tr>
                    <td style="padding: 8px 0; color: #666;">📅 Date:</td>
                    <td style="padding: 8px 0; font-weight: bold;">${formattedDate}</td>
                  </tr>
                  <tr>
                    <td style="padding: 8px 0; color: #666;">⏰ Time:</td>
                    <td style="padding: 8px 0; font-weight: bold;">${formattedTime}</td>
                  </tr>
                  <tr>
                    <td style="padding: 8px 0; color: #666;">👥 Passengers:</td>
                    <td style="padding: 8px 0; font-weight: bold;">${passengers}</td>
                  </tr>
                  <tr>
                    <td style="padding: 8px 0; color: #666;">🧳 Luggage:</td>
                    <td style="padding: 8px 0; font-weight: bold;">${luggage} pieces</td>
                  </tr>
                  <tr>
                    <td style="padding: 8px 0; color: #666;">✈️ Flight Number:</td>
                    <td style="padding: 8px 0; font-weight: bold;">${flightNumber || "Not provided"}</td>
                  </tr>
                  <tr>
                    <td style="padding: 8px 0; color: #666;">🚘 Vehicle Type:</td>
                    <td style="padding: 8px 0; font-weight: bold; color: #84cc16;">${vehicle}</td>
                  </tr>
                </table>
              </div>

              <div style="background-color: #f5f5f5; padding: 20px; border-radius: 5px;">
                <p>Our customer support team is available 24/7:</p>
                <p style="font-size: 18px; font-weight: bold; color: #84cc16;">+1 437-522-8001</p>
                <p>Email: info@airlinkride.com</p>
              </div>
            </div>
          </div>
        </body>
      `,
    });

    await transporter.sendMail({
      from: `"AirLinkRide Booking System" <${process.env.EMAIL_USER}>`,
      to: process.env.EMAIL_USER,
      subject: `🚀 New Booking: ${name} - ${vehicle} - ${date}`,
      html: `
        <body style="font-family: Arial, sans-serif; line-height: 1.6;">
          <div style="background: #333; color: white; padding: 20px; text-align: center;">
            <h2 style="margin:0;">✈️ New Booking Alert</h2>
          </div>

          <div style="padding: 20px;">
            <h3>Customer Information</h3>
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Phone:</strong> ${phone}</p>

            <h3>Trip Details</h3>
            <p><strong>Pickup:</strong> ${pickup}</p>
            <p><strong>Drop-off:</strong> ${drop}</p>
            <p><strong>Date:</strong> ${formattedDate}</p>
            <p><strong>Time:</strong> ${formattedTime}</p>
            <p><strong>Vehicle:</strong> ${vehicle}</p>
            <p><strong>Passengers:</strong> ${passengers}</p>
            <p><strong>Luggage:</strong> ${luggage}</p>
            <p><strong>Flight:</strong> ${flightNumber || "N/A"}</p>
          </div>
        </body>
      `,
    });

    return Response.json({ success: true });
  } catch (error) {
    console.error("Email Error:", error);

    return Response.json({ error: "Failed to send email" }, { status: 500 });
  }
}