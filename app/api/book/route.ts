import { google } from "googleapis"
import twilio from "twilio"

export async function POST(req: Request) {

  const data = await req.json()

  const bookingId = "ALR-" + Math.floor(1000 + Math.random() * 9000)

  // Google Sheets
  const auth = new google.auth.GoogleAuth({
    credentials: JSON.parse(process.env.GOOGLE_CREDENTIALS!),
    scopes: ["https://www.googleapis.com/auth/spreadsheets"]
  })

  const sheets = google.sheets({ version: "v4", auth })

  await sheets.spreadsheets.values.append({
    spreadsheetId: process.env.SHEET_ID,
    range: "Sheet1!A:H",
    valueInputOption: "USER_ENTERED",
    requestBody: {
      values: [[
        bookingId,
        data.name,
        data.phone,
        data.pickup,
        data.drop,
        data.date,
        data.time,
        "Pending"
      ]]
    }
  })

  // Twilio SMS
  const client = twilio(
    process.env.TWILIO_SID,
    process.env.TWILIO_TOKEN
  )

  const trackingLink =
    `https://airlinkride.com/track/${bookingId}`

  await client.messages.create({
    body:
      `AirLinkRide Booking Confirmed\n\nReference: ${bookingId}\nTrack ride:\n${trackingLink}`,
    from: process.env.TWILIO_PHONE,
    to: data.phone
  })

  return Response.json({
    success: true,
    bookingId
  })
}