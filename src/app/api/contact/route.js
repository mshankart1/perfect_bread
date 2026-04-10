import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT) || 587,
  secure: Number(process.env.SMTP_PORT) === 465,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

export async function POST(request) {
  try {
    const { name, phone, email, message } = await request.json();

    if (!name || !email || !message) {
      return Response.json(
        { error: 'Name, email and message are required.' },
        { status: 400 },
      );
    }

    await transporter.sendMail({
      from: `"Perfect Bread Website" <${process.env.SMTP_USER}>`,
      to: process.env.CONTACT_EMAIL || 'info@perfectbread.com',
      replyTo: email,
      subject: `New Contact Form: ${name}`,
      html: `
        <h2>New message from the website contact form</h2>
        <table style="border-collapse:collapse">
          <tr><td style="padding:8px;font-weight:bold">Name</td><td style="padding:8px">${name}</td></tr>
          <tr><td style="padding:8px;font-weight:bold">Phone</td><td style="padding:8px">${phone || '—'}</td></tr>
          <tr><td style="padding:8px;font-weight:bold">Email</td><td style="padding:8px">${email}</td></tr>
          <tr><td style="padding:8px;font-weight:bold">Message</td><td style="padding:8px">${message}</td></tr>
        </table>
      `,
    });

    return Response.json({ ok: true });
  } catch (err) {
    console.error('Mail error:', err);
    return Response.json({ error: 'Failed to send email.' }, { status: 500 });
  }
}
