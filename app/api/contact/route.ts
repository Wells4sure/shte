import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(req: NextRequest) {
  const { name, email, subject, message } = await req.json()

  if (!name || !email || !subject || !message) {
    return NextResponse.json({ error: 'Missing required fields.' }, { status: 400 })
  }

  try {
    await resend.emails.send({
      from: 'SHTE Website <onboarding@resend.dev>',
      to: 'silverhousetech@gmail.com',
      replyTo: email,
      subject: `[Website Enquiry] ${subject}`,
      html: `
        <div style="font-family:sans-serif;max-width:600px;margin:auto;padding:32px;background:#f8fafc;border-radius:12px;">
          <h2 style="color:#0a1628;margin-bottom:4px;">New Enquiry from SHTE Website</h2>
          <p style="color:#94a3b8;margin-bottom:28px;font-size:14px;">Submitted via the contact form</p>

          <table style="width:100%;border-collapse:collapse;">
            <tr>
              <td style="padding:10px 0;border-bottom:1px solid #e2e8f0;color:#64748b;font-size:14px;width:120px;font-weight:600;">Name</td>
              <td style="padding:10px 0;border-bottom:1px solid #e2e8f0;color:#0f172a;font-size:14px;">${name}</td>
            </tr>
            <tr>
              <td style="padding:10px 0;border-bottom:1px solid #e2e8f0;color:#64748b;font-size:14px;font-weight:600;">Email</td>
              <td style="padding:10px 0;border-bottom:1px solid #e2e8f0;color:#0f172a;font-size:14px;"><a href="mailto:${email}" style="color:#2563eb;">${email}</a></td>
            </tr>
            <tr>
              <td style="padding:10px 0;border-bottom:1px solid #e2e8f0;color:#64748b;font-size:14px;font-weight:600;">Subject</td>
              <td style="padding:10px 0;border-bottom:1px solid #e2e8f0;color:#0f172a;font-size:14px;">${subject}</td>
            </tr>
          </table>

          <div style="margin-top:24px;">
            <p style="color:#64748b;font-size:14px;font-weight:600;margin-bottom:8px;">Message</p>
            <div style="background:#fff;border:1px solid #e2e8f0;border-radius:8px;padding:16px;color:#0f172a;font-size:15px;line-height:1.7;white-space:pre-wrap;">${message}</div>
          </div>

          <p style="margin-top:28px;font-size:12px;color:#94a3b8;">Reply directly to this email to respond to ${name}.</p>
        </div>
      `,
    })

    return NextResponse.json({ ok: true })
  } catch (err) {
    console.error('Resend error:', err)
    return NextResponse.json({ error: 'Failed to send email.' }, { status: 500 })
  }
}
