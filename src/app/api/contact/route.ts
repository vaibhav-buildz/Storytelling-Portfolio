import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

// In-memory store for rate limiting: Map<email, count>
// Note: In a serverless environment (like Vercel), this may reset across cold starts, but perfectly limits spam within hot lambda layers.
const submissionCounts = new Map<string, number>();

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { name, email, message } = body;

        // 1. Basic validation
        if (!name || !email || !message) {
            return NextResponse.json({ error: "All fields are required." }, { status: 400 });
        }

        // 2. Validate @gmail.com domain strictly
        const emailRegex = /^[^\s@]+@gmail\.com$/i;
        if (!emailRegex.test(email)) {
            return NextResponse.json({ error: "Invalid email. Only @gmail.com addresses are allowed." }, { status: 400 });
        }

        // 3. Anti-Spam Rate Limiting (max 2 messages per email address)
        const currentCount = submissionCounts.get(email.toLowerCase()) || 0;
        if (currentCount >= 2) {
            return NextResponse.json({ error: "Submission limit reached. You can only send 2 messages from this email." }, { status: 429 });
        }

        // Update rate limiter count BEFORE sending (to log the attempt even if auth fails)
        submissionCounts.set(email.toLowerCase(), currentCount + 1);

        // 4. Configure Nodemailer Transporter
        // Requires GMAIL_USER (your exact email vy9793693385@gmail.com) and GMAIL_APP_PASSWORD in production environment variables.
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.GMAIL_USER || 'vy9793693385@gmail.com', // Authenticated sender
                pass: process.env.GMAIL_APP_PASSWORD, // 16-character google app password
            },
        });

        // Setup the secure payload configuration
        const mailOptions = {
            from: process.env.GMAIL_USER || 'vy9793693385@gmail.com',
            to: 'vy9793693385@gmail.com', // Hardcoded destination
            replyTo: email, // Maps replies safely to the actual user
            subject: `New Portfolio Message from ${name}`,
            text: `You have received a new message from your portfolio contact form.\n\nName: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
            html: `
                <div style="font-family: sans-serif; padding: 20px; color: #121212;">
                    <h2 style="color: #00bfff;">New Portfolio Contact Submission</h2>
                    <p><strong>Sender Name:</strong> ${name}</p>
                    <p><strong>Sender Email:</strong> ${email}</p>
                    <hr style="border: none; border-top: 1px solid #ccc; margin: 20px 0;" />
                    <p><strong>Message Payload:</strong></p>
                    <p style="white-space: pre-wrap; background: #f9f9f9; padding: 15px; border-left: 4px solid #00ff88;">${message}</p>
                </div>
            `,
        };

        // 5. Send Email Securely
        await transporter.sendMail(mailOptions);

        return NextResponse.json({ success: true, message: "Message securely delivered!" }, { status: 200 });

    } catch (error: unknown) {
        console.error('Email Delivery Error:', error);

        // Provide a clearer error internally if Nodemailer throws an auth failure because GMAIL_APP_PASSWORD is not set
        if (typeof error === 'object' && error !== null && 'code' in error && (error as { code: string }).code === 'EAUTH') {
            return NextResponse.json({ error: "Server Configuration Error: Gmail App Password is not defined or is incorrect." }, { status: 500 });
        }

        return NextResponse.json({ error: "Failed to securely deliver message. Please try again later." }, { status: 500 });
    }
}
