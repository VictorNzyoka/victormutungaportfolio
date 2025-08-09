import { NextResponse } from "next/server"
import nodemailer from "nodemailer"

export async function POST(req: Request) {
  try {
    const { name, email, title, message } = await req.json()

    // Basic validation
    if (!name || !email || !title || !message) {
      return NextResponse.json({ ok: false, message: "All fields are required." }, { status: 400 })
    }

    if (!process.env.SMTP_USER || !process.env.SMTP_PASS) {
      return NextResponse.json(
        { ok: false, message: "Email service not configured. Missing SMTP_USER/SMTP_PASS." },
        { status: 500 },
      )
    }

    // Create transporter (Gmail + App Password)
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        user: process.env.SMTP_USER, // your Gmail address
        pass: process.env.SMTP_PASS, // your Gmail App Password
      },
    })

    // Send the email
    await transporter.sendMail({
      from: `"${name}" <${process.env.SMTP_USER}>`, // send from your domain for DMARC
      replyTo: `"${name}" <${email}>`, // replies go to the submitter
      to: "nzyoka18@gmail.com", // your email
      subject: title,
      text: message,
      html: `
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Message:</strong><br/>${message.replace(/\n/g, "<br/>")}</p>
      `,
    })

    return NextResponse.json({ ok: true, message: "Thanks! Your message has been sent." })
  } catch (error) {
    console.error("Email send error:", error)
    return NextResponse.json({ ok: false, message: "Failed to send email." }, { status: 500 })
  }
}
