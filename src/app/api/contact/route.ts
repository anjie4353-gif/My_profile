import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { z } from "zod";
import { parseJsonBody } from "@/lib/parse-json-body";

const contactSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  subject: z.string().min(3, "Subject must be at least 3 characters"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

export async function POST(request: NextRequest) {
  try {
    const parsedBody = await parseJsonBody<unknown>(request);
    if ("error" in parsedBody) return parsedBody.error;

    const parsed = contactSchema.safeParse(parsedBody.data);

    if (!parsed.success) {
      return NextResponse.json(
        { error: parsed.error.issues[0]?.message || "Invalid input" },
        { status: 400 }
      );
    }

    const { name, email, subject, message } = parsed.data;

    const smtpHost = process.env.SMTP_HOST;
    const smtpPort = process.env.SMTP_PORT;
    const smtpUser = process.env.SMTP_USER;
    const smtpPass = process.env.SMTP_PASS;
    const recipientEmail =
      process.env.CONTACT_EMAIL || "anjaneyulupallepagu@gmail.com";

    if (!smtpHost || !smtpPort || !smtpUser || !smtpPass) {
      return NextResponse.json(
        {
          error:
            "Email service is not configured. Please set SMTP environment variables.",
        },
        { status: 503 }
      );
    }

    const transporter = nodemailer.createTransport({
      host: smtpHost,
      port: parseInt(smtpPort, 10),
      secure: parseInt(smtpPort, 10) === 465,
      auth: {
        user: smtpUser,
        pass: smtpPass,
      },
    });

    await transporter.sendMail({
      from: `"Data Universe Contact" <${smtpUser}>`,
      to: recipientEmail,
      replyTo: email,
      subject: `[Data Universe] ${subject}`,
      text: [
        `Name: ${name}`,
        `Email: ${email}`,
        `Subject: ${subject}`,
        "",
        "Message:",
        message,
      ].join("\n"),
      html: `
        <div style="font-family: system-ui, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background: #030712; padding: 24px; border-radius: 4px;">
            <h2 style="color: #3B82F6; margin: 0 0 16px;">New Contact Message</h2>
            <p style="color: #94a3b8; margin: 0 0 8px;"><strong style="color: #fff;">From:</strong> ${name}</p>
            <p style="color: #94a3b8; margin: 0 0 8px;"><strong style="color: #fff;">Email:</strong> <a href="mailto:${email}" style="color: #06B6D4;">${email}</a></p>
            <p style="color: #94a3b8; margin: 0 0 16px;"><strong style="color: #fff;">Subject:</strong> ${subject}</p>
            <div style="background: rgba(255,255,255,0.05); padding: 16px; border-left: 3px solid #3B82F6; border-radius: 2px;">
              <p style="color: #e2e8f0; margin: 0; white-space: pre-wrap;">${message}</p>
            </div>
            <p style="color: #475569; font-size: 12px; margin-top: 24px;">Sent via The Data Universe contact form</p>
          </div>
        </div>
      `,
    });

    return NextResponse.json({ success: true, message: "Email sent successfully" });
  } catch (error) {
    console.error("Contact form error:", error);
    return NextResponse.json(
      { error: "Failed to send email. Please try again later." },
      { status: 500 }
    );
  }
}