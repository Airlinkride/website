export const runtime = "nodejs";

import nodemailer from "nodemailer";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const { name, email, phone, message } = body;

    if (!name || !email || !message) {
      return Response.json(
        { error: "Name, email, and message are required" },
        { status: 400 }
      );
    }

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    await transporter.sendMail({
      from: `"AirLinkRide Contact Form" <${process.env.EMAIL_USER}>`,
      to: process.env.EMAIL_USER,
      replyTo: email,
      subject: `New Contact Message from ${name}`,
      html: `
        <body style="font-family: Arial, sans-serif; line-height: 1.6;">
          <div style="background: #333; color: white; padding: 20px; text-align: center;">
            <h2 style="margin:0;">New Contact Form Message</h2>
          </div>

          <div style="padding: 20px;">
            <h3>Contact Information</h3>
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Phone:</strong> ${phone || "Not provided"}</p>

            <h3>Message</h3>
            <p>${message}</p>
          </div>
        </body>
      `,
    });

    return Response.json({ success: true });
  } catch (error) {
    console.error("Contact Email Error:", error);

    return Response.json(
      { error: "Failed to send contact email" },
      { status: 500 }
    );
  }
}