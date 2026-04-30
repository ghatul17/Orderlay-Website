/**
 * WhatsApp notification service — Way 1 only (referrer-filled signups).
 * Replace sendWhatsApp() with your actual provider (Twilio, Meta Cloud API, etc.)
 */

export interface WhatsAppCredentials {
  phone: string
  temp_password: string
}

export async function sendWhatsAppCredentials(creds: WhatsAppCredentials): Promise<void> {
  const message =
    `You have been added to Orderlay.\n` +
    `Login: orderlay.app/login\n` +
    `Phone: ${creds.phone}\n` +
    `Password: ${creds.temp_password}`

  // TODO: wire up real provider, e.g. Twilio:
  // await twilioClient.messages.create({
  //   from: 'whatsapp:+14155238886',
  //   to: `whatsapp:${creds.phone}`,
  //   body: message,
  // })

  // Development mock — logs to console
  if (process.env.NODE_ENV !== 'production') {
    console.log('[WhatsApp mock]', { to: creds.phone, body: message })
    return
  }

  throw new Error('sendWhatsAppCredentials: provider not configured')
}

// Generates a short temp password — replace with a secure token in production
export function generateTempPassword(): string {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZabcdefghjkmnpqrstuvwxyz23456789'
  return Array.from({ length: 8 }, () => chars[Math.floor(Math.random() * chars.length)]).join('')
}
