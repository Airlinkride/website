export const runtime = "nodejs";

import nodemailer from "nodemailer";

export async function POST(req) {
  try {
    console.log("ENV CHECK:", {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS ? "✓ Set" : "✗ Missing",
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

    const formattedDate = new Date(date).toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });

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
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Booking Confirmation</title>
        </head>
        <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; margin: 0; padding: 0;">
          <div style="max-width: 600px; margin: 0 auto; background-color: #f9f9f9; border-radius: 10px; overflow: hidden; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
            
            <!-- Header with Branding -->
            <div style="background: linear-gradient(135deg, #84cc16 0%, #65a30d 100%); padding: 30px 20px; text-align: center;">
              <h1 style="color: white; margin: 0; font-size: 32px; font-weight: bold;">AirLinkRide</h1>
              <p style="color: white; margin: 10px 0 0; opacity: 0.9; font-size: 16px;">Premium Airport Transportation</p>
            </div>
            
            <!-- Main Content -->
            <div style="padding: 30px; background-color: white;">
              <h2 style="color: #84cc16; margin-top: 0; font-size: 24px;">Thank You for Choosing AirLinkRide! 🚗</h2>
              
              <p style="font-size: 16px;">Dear <strong style="color: #84cc16;">${name}</strong>,</p>
              
              <p style="font-size: 16px;">Your ride request has been successfully received. We're excited to serve you with our premium transportation service. Our team is already working on assigning the perfect vehicle for your journey.</p>
              
              <!-- Booking Details Box -->
              <div style="background-color: #f0f9f0; border-left: 4px solid #84cc16; padding: 20px; margin: 25px 0; border-radius: 5px;">
                <h3 style="color: #333; margin-top: 0; margin-bottom: 15px; font-size: 18px;">📋 Booking Details</h3>
                
                <table style="width: 100%; border-collapse: collapse;">
                  <tr>
                    <td style="padding: 8px 0; color: #666; width: 40%;">📍 Pickup Location:</td>
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
                    <td style="padding: 8px 0; font-weight: bold;">${time}</td>
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
              
              <!-- Important Information -->
              <div style="margin: 25px 0;">
                <h3 style="color: #333; font-size: 18px;">⭐ What's Next?</h3>
                <ul style="list-style-type: none; padding: 0;">
                  <li style="margin-bottom: 10px; padding-left: 25px; position: relative;">✓ Your driver will be assigned shortly</li>
                  <li style="margin-bottom: 10px; padding-left: 25px; position: relative;">✓ Our dispatch team will monitor your flight status</li>
                  <li style="margin-bottom: 10px; padding-left: 25px; position: relative;">✓ Free waiting time: 60 minutes for airport pickups</li>
                </ul>
              </div>
              
              <!-- Contact Information -->
              <div style="background-color: #f5f5f5; padding: 20px; border-radius: 5px; margin: 25px 0;">
                <p style="margin: 5px 0;">Our customer support team is available 24/7:</p>
                <p style="margin: 10px 0; font-size: 18px; font-weight: bold; color: #84cc16;">+1 437-522-8001</p>
                <p style="margin: 5px 0;">Email: info@airlinkride.com</p>
              </div>
            </div>
            
            <!-- Signature/Footer -->
            <div style="background-color: #333; color: white; padding: 30px 20px; text-align: center;">
              <!-- Professional Signature -->
              <div style="margin-bottom: 20px;">
                <p style="font-size: 18px; margin: 0; color: #84cc16; font-weight: bold;">Safe Travels!</p>
                <p style="margin: 5px 0 15px; font-size: 14px; color: #ccc;">The AirLinkRide Team</p>
              </div>
              
              <!-- Business Details -->
              <div style="font-size: 12px; color: #999; line-height: 1.6;">
                <p style="margin: 5px 0;">AirLinkRide • Premium Airport Transportation</p>
                <p style="margin: 5px 0;">© ${new Date().getFullYear()} AirLinkRide. All rights reserved.</p>
                <p style="margin: 10px 0 0; font-style: italic;">This email was sent to ${email} regarding your booking with AirLinkRide.</p>
              </div>
            </div>
          </div>
        </body>
        </html>
      `,
    });

    // ✅ EMAIL TO ADMIN - Clean notification
    await transporter.sendMail({
      from: `"AirLinkRide Booking System" <${process.env.EMAIL_USER}>`,
      to: process.env.EMAIL_USER,
      subject: `🚀 New Booking: ${name} - ${vehicle} - ${date}`,
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; }
            .header { background: #333; color: white; padding: 20px; text-align: center; }
            .content { padding: 20px; }
            .detail-box { background: #f5f5f5; padding: 15px; border-radius: 5px; margin: 15px 0; }
            .label { color: #666; font-weight: normal; }
            .value { color: #84cc16; font-weight: bold; margin-left: 10px; }
          </style>
        </head>
        <body>
          <div class="header">
            <h2 style="margin:0;">✈️ New Booking Alert</h2>
          </div>
          
          <div class="content">
            <div class="detail-box">
              <h3 style="margin-top:0; color:#333;">Customer Information</h3>
              <p><span class="label">Name:</span> <span class="value">${name}</span></p>
              <p><span class="label">Email:</span> <span class="value">${email}</span></p>
              <p><span class="label">Phone:</span> <span class="value">${phone}</span></p>
            </div>
            
            <div class="detail-box">
              <h3 style="margin-top:0; color:#333;">Trip Details</h3>
              <p><span class="label">Pickup:</span> <span class="value">${pickup}</span></p>
              <p><span class="label">Drop-off:</span> <span class="value">${drop}</span></p>
              <p><span class="label">Date:</span> <span class="value">${formattedDate}</span></p>
              <p><span class="label">Time:</span> <span class="value">${time}</span></p>
              <p><span class="label">Vehicle:</span> <span class="value">${vehicle}</span></p>
              <p><span class="label">Passengers:</span> <span class="value">${passengers}</span></p>
              <p><span class="label">Luggage:</span> <span class="value">${luggage}</span></p>
              <p><span class="label">Flight:</span> <span class="value">${flightNumber || "N/A"}</span></p>
            </div>
            
            <p style="color:#84cc16; font-weight:bold; margin-top:20px;">
              ⏰ Action required: Assign driver and confirm booking
            </p>
          </div>
        </body>
        </html>
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