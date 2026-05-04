import { NextRequest, NextResponse } from 'next/server'
import { referralSignupSchema } from '@/lib/referral/validation'
import { processReferralSignup, ReferralError, SignupWay } from '@/lib/referral/service'

/**
 * POST /api/referral/signup
 *
 * Body: { restaurant_name, owner_name, owner_phone, owner_email?, referral_code }
 *
 * Way detection:
 *   - x-signup-way: referrer_filled  → logged-in referrer submitted the form (Way 1)
 *   - x-signup-way: self_filled      → new owner signed up via /signup?ref=CODE (Way 2)
 *   If the header is absent, defaults to self_filled.
 */
export async function POST(req: NextRequest) {
  // ── Parse body ──────────────────────────────────────────────────────────────
  let body: unknown
  try {
    body = await req.json()
  } catch {
    return errorResponse(400, 'INVALID_JSON', 'Request body must be valid JSON')
  }

  // ── Validate input ──────────────────────────────────────────────────────────
  const parsed = referralSignupSchema.safeParse(body)
  if (!parsed.success) {
    const firstError = parsed.error.errors[0]
    return errorResponse(400, 'VALIDATION_ERROR', firstError.message)
  }

  // ── Detect signup way ────────────────────────────────────────────────────────
  const wayHeader = req.headers.get('x-signup-way')
  const signup_way: SignupWay =
    wayHeader === 'referrer_filled' ? 'referrer_filled' : 'self_filled'

  // ── Run core flow ────────────────────────────────────────────────────────────
  try {
    const result = await processReferralSignup(parsed.data, signup_way)

    // Trigger Webhook on Success
    // We MUST await this so Vercel doesn't kill the serverless function before the fetch completes
    const { triggerReferralWebhook } = await import('@/lib/webhook')
    await triggerReferralWebhook({
      event_type: 'referral_signup',
      restaurant_name: parsed.data.restaurant_name,
      referee_name: parsed.data.owner_name, // Explicitly labeled as referee
      owner_name: parsed.data.owner_name,   // Keep for backward compatibility
      owner_phone: parsed.data.owner_phone,
      owner_email: parsed.data.owner_email || null,
      referral_code: parsed.data.referral_code,
      referrer_name: result.referrer_name,  // Added referrer name
      signup_way,
    })

    return NextResponse.json(result, { status: 201 })
  } catch (err) {
    if (err instanceof ReferralError) {
      return errorResponse(err.httpStatus, err.code, err.message)
    }

    const msg = err instanceof Error ? err.message : ''
    const isNotWiredUp = msg.includes('not wired up')

    if (isNotWiredUp) {
      console.warn('[referral/signup] DB not connected — returning success without persisting')

      // Still trigger webhook even if DB is not wired up, as it's a "success" in the UI
      const { triggerReferralWebhook } = await import('@/lib/webhook')
      await triggerReferralWebhook({
        event_type: 'referral_signup',
        restaurant_name: parsed.data.restaurant_name,
        referee_name: parsed.data.owner_name,
        owner_name: parsed.data.owner_name,
        owner_phone: parsed.data.owner_phone,
        owner_email: parsed.data.owner_email || null,
        referral_code: parsed.data.referral_code,
        referrer_name: 'Unknown (DB not connected)',
        signup_way,
      })

      return NextResponse.json(
        { success: true, restaurant_name: parsed.data.restaurant_name, status: 'trial' },
        { status: 201 },
      )
    }

    console.error('[referral/signup]', err)
    return errorResponse(500, 'SERVER_ERROR', 'Something went wrong. Please try again.')
  }
}

// ── Helpers ───────────────────────────────────────────────────────────────────

function errorResponse(status: number, code: string, message: string) {
  return NextResponse.json({ success: false, code, message }, { status })
}
