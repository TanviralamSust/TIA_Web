import { Resend } from 'resend'

export async function sendNotificationEmail({
  subject,
  lines,
}: {
  subject: string
  lines: Array<{ label: string; value: string }>
}) {
  const apiKey = process.env.RESEND_API_KEY
  const to = process.env.NOTIFICATION_EMAIL_TO
  const from = process.env.NOTIFICATION_EMAIL_FROM

  if (!apiKey || !to || !from) {
    // Not configured yet - submission is still safely stored in Payload admin.
    return
  }

  const html = `
    <h2>${subject}</h2>
    <table cellpadding="6" style="border-collapse: collapse;">
      ${lines
        .map(
          ({ label, value }) => `
        <tr>
          <td style="font-weight:bold; vertical-align:top;">${label}</td>
          <td>${value.replace(/\n/g, '<br />')}</td>
        </tr>
      `,
        )
        .join('')}
    </table>
  `

  try {
    const resend = new Resend(apiKey)
    await resend.emails.send({ from, to, subject, html })
  } catch (error) {
    console.error('Failed to send notification email:', error)
  }
}
