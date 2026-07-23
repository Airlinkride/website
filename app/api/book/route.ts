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

function escapeHtml(value: unknown) {
  return String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
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

    if (
      !name ||
      !email ||
      !phone ||
      !pickup ||
      !drop ||
      !date ||
      !time ||
      !passengers ||
      luggage === undefined ||
      luggage === null ||
      luggage === "" ||
      !vehicle
    ) {
      return Response.json(
        { error: "Please complete all required booking fields." },
        { status: 400 },
      );
    }

    if (vehicle !== "Sedan" && vehicle !== "SUV") {
      return Response.json(
        { error: "Please select a valid vehicle type." },
        { status: 400 },
      );
    }

    const parsedDate = new Date(`${date}T12:00:00`);

    if (Number.isNaN(parsedDate.getTime())) {
      return Response.json(
        { error: "Please provide a valid pickup date." },
        { status: 400 },
      );
    }

    const formattedDate = parsedDate.toLocaleDateString("en-CA", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });

    const formattedTime = formatTimeToAMPM(time);

    const safeName = escapeHtml(name);
    const safeEmail = escapeHtml(email);
    const safePhone = escapeHtml(phone);
    const safePickup = escapeHtml(pickup);
    const safeDrop = escapeHtml(drop);
    const safePassengers = escapeHtml(passengers);
    const safeLuggage = escapeHtml(luggage);
    const safeFlightNumber = escapeHtml(
      flightNumber || "Not provided",
    );
    const safeVehicle = escapeHtml(vehicle);
    const safeFormattedDate = escapeHtml(formattedDate);
    const safeFormattedTime = escapeHtml(formattedTime);

    const emailUser = process.env.EMAIL_USER;
    const emailPass = process.env.EMAIL_PASS;

    if (!emailUser || !emailPass) {
      console.error("Missing EMAIL_USER or EMAIL_PASS.");

      return Response.json(
        { error: "Booking email service is not configured." },
        { status: 500 },
      );
    }

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: emailUser,
        pass: emailPass,
      },
    });

    await transporter.verify();

    await transporter.sendMail({
      from: `"AirLinkRide" <${emailUser}>`,
      to: email,
      replyTo: emailUser,
      subject: "Your AirLinkRide Booking Confirmation",
      html: `
        <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; margin: 0; padding: 0;">
          <div style="max-width: 600px; margin: 0 auto; background-color: #f9f9f9; border-radius: 10px; overflow: hidden;">
            <div style="background: linear-gradient(135deg, #84cc16 0%, #65a30d 100%); padding: 30px 20px; text-align: center;">
              <h1 style="color: white; margin: 0; font-size: 32px;">
                AirLinkRide
              </h1>

              <p style="color: white; margin: 10px 0 0;">
                Premium Airport Transportation
              </p>
            </div>

            <div style="padding: 30px; background-color: white;">
              <h2 style="color: #84cc16;">
                Thank You for Choosing AirLinkRide!
              </h2>

              <p>
                Dear
                <strong style="color: #84cc16;">
                  ${safeName}
                </strong>,
              </p>

              <p>Your ride request has been successfully received.</p>

              <div style="background-color: #f0f9f0; border-left: 4px solid #84cc16; padding: 20px; margin: 25px 0; border-radius: 5px;">
                <h3>Booking Details</h3>

                <table style="width: 100%; border-collapse: collapse;">
                  <tr>
                    <td style="padding: 8px 0; color: #666;">
                      Pickup Location:
                    </td>

                    <td style="padding: 8px 0; font-weight: bold;">
                      ${safePickup}
                    </td>
                  </tr>

                  <tr>
                    <td style="padding: 8px 0; color: #666;">
                      Drop-off Location:
                    </td>

                    <td style="padding: 8px 0; font-weight: bold;">
                      ${safeDrop}
                    </td>
                  </tr>

                  <tr>
                    <td style="padding: 8px 0; color: #666;">
                      Date:
                    </td>

                    <td style="padding: 8px 0; font-weight: bold;">
                      ${safeFormattedDate}
                    </td>
                  </tr>

                  <tr>
                    <td style="padding: 8px 0; color: #666;">
                      Time:
                    </td>

                    <td style="padding: 8px 0; font-weight: bold;">
                      ${safeFormattedTime}
                    </td>
                  </tr>

                  <tr>
                    <td style="padding: 8px 0; color: #666;">
                      Vehicle Type:
                    </td>

                    <td style="padding: 8px 0; font-weight: bold; color: #84cc16;">
                      ${safeVehicle}
                    </td>
                  </tr>

                  <tr>
                    <td style="padding: 8px 0; color: #666;">
                      Passengers:
                    </td>

                    <td style="padding: 8px 0; font-weight: bold;">
                      ${safePassengers}
                    </td>
                  </tr>

                  <tr>
                    <td style="padding: 8px 0; color: #666;">
                      Luggage:
                    </td>

                    <td style="padding: 8px 0; font-weight: bold;">
                      ${safeLuggage} pieces
                    </td>
                  </tr>

                  <tr>
                    <td style="padding: 8px 0; color: #666;">
                      Flight Number:
                    </td>

                    <td style="padding: 8px 0; font-weight: bold;">
                      ${safeFlightNumber}
                    </td>
                  </tr>
                </table>
              </div>

              <div style="background-color: #f5f5f5; padding: 20px; border-radius: 5px;">
                <p>Our customer support team is available 24/7:</p>

                <p style="font-size: 18px; font-weight: bold; color: #84cc16;">
                  +1 437-522-8001
                </p>

                <p>Email: info@airlinkride.com</p>
              </div>
            </div>
          </div>
        </body>
      `,
    });

    await transporter.sendMail({
      from: `"AirLinkRide Booking System" <${emailUser}>`,
      to: emailUser,
      replyTo: email,
      subject: `New Booking: ${name} - ${vehicle} - ${date}`,
      html: `
        <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
          <div style="background: #333; color: white; padding: 20px; text-align: center;">
            <h2 style="margin: 0;">
              New Booking Alert
            </h2>
          </div>

          <div style="padding: 20px;">
            <h3>Customer Information</h3>

            <p>
              <strong>Name:</strong>
              ${safeName}
            </p>

            <p>
              <strong>Email:</strong>
              ${safeEmail}
            </p>

            <p>
              <strong>Phone:</strong>
              ${safePhone}
            </p>

            <h3>Trip Details</h3>

            <p>
              <strong>Pickup:</strong>
              ${safePickup}
            </p>

            <p>
              <strong>Drop-off:</strong>
              ${safeDrop}
            </p>

            <p>
              <strong>Date:</strong>
              ${safeFormattedDate}
            </p>

            <p>
              <strong>Time:</strong>
              ${safeFormattedTime}
            </p>

            <p>
              <strong>Vehicle Type:</strong>
              ${safeVehicle}
            </p>

            <p>
              <strong>Passengers:</strong>
              ${safePassengers}
            </p>

            <p>
              <strong>Luggage:</strong>
              ${safeLuggage} pieces
            </p>

            <p>
              <strong>Flight:</strong>
              ${
                flightNumber
                  ? safeFlightNumber
                  : "Not provided"
              }
            </p>
          </div>
        </body>
      `,
    });

    return Response.json({ success: true });
  } catch (error) {
    console.error("Email Error:", error);

    return Response.json(
      { error: "Failed to send booking confirmation email." },
      { status: 500 },
    );
  }
}