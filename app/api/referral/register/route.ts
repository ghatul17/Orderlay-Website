import { NextRequest, NextResponse } from 'next/server'
import { referrerRegisterSchema } from '@/lib/referral/validation'
import { findUserByPhone, createReferrer, createReferralCode } from '@/lib/referral/db'
import { generateReferralCode } from '@/lib/referral/generate-code'
import { ReferralError } from '@/lib/referral/service'

/**
 * POST /api/referral/register
 * Registers a new referrer and returns their unique referral code.
 *
 * Body: { name, phone, email?, restaurant_name }
 * Response: { success: true, referral_code: "OL-RAM4829" }
 *
 * DB_READY flag: when DB is not yet wired up, the code is still generated
 * and returned so the UI works. Remove the try/catch wrappers once connected.
 */
export async function POST(req: NextRequest) {
  let body: unknown
  try {
    body = await req.json()
  } catch {
    return err(400, 'INVALID_JSON', 'Request body must be valid JSON')
  }

  const parsed = referrerRegisterSchema.safeParse(body)
  if (!parsed.success) {
    return err(400, 'VALIDATION_ERROR', parsed.error.errors[0].message)
  }

  const { name, phone, email, restaurant_name } = parsed.data
  const normalizedPhone = normalize(phone)

  // Generate the code immediately — works even before DB is connected
  const code = generateReferralCode(name)

  // ── DB writes (skipped gracefully until DB is wired up) ─────────────────────
  try {
    const existing = await findUserByPhone(normalizedPhone)
    if (existing) {
      return err(409, 'PHONE_TAKEN', 'This phone number is already registered')
    }

    const user = await createReferrer({
      name,
      phone: normalizedPhone,
      email: email || null,
      restaurant_name,
      password_hash: 'hashed_placeholder', // TODO: bcrypt
    })

    await createReferralCode({ owner_id: user.id, code })
  } catch (e) {
    if (e instanceof ReferralError) return err(e.httpStatus, e.code, e.message)

    const msg = e instanceof Error ? e.message : ''
    const isNotWiredUp = msg.includes('not wired up')

    if (!isNotWiredUp) {
      console.error('[referral/register]', e)
      return err(500, 'SERVER_ERROR', 'Something went wrong. Please try again.')
    }
    // DB not connected yet — still return the code so the UI works
    console.warn('[referral/register] DB not connected — returning code without persisting')
  }

  // ── Trigger Webhook ────────────────────────────────────────────────────────
  // We MUST await this so Vercel doesn't kill the serverless function before the fetch completes
  const { triggerReferralWebhook } = await import('@/lib/webhook')
  await triggerReferralWebhook({
    event_type: 'referrer_registration',
    name,
    phone: normalizedPhone,
    email: email || null,
    restaurant_name,
    referral_code: code,
  })

  return NextResponse.json({ success: true, referral_code: code }, { status: 201 })
}

function normalize(phone: string) {
  return phone.replace(/\s+/g, '').replace(/-/g, '')
}

function err(status: number, code: string, message: string) {
  return NextResponse.json({ success: false, code, message }, { status })
}
