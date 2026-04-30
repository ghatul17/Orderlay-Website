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
    return NextResponse.json(result, { status: 201 })
  } catch (err) {
    if (err instanceof ReferralError) {
      return errorResponse(err.httpStatus, err.code, err.message)
    }

    console.error('[referral/signup]', err)
    return errorResponse(500, 'SERVER_ERROR', 'Something went wrong. Please try again.')
  }
}

// ── Helpers ───────────────────────────────────────────────────────────────────

function errorResponse(status: number, code: string, message: string) {
  return NextResponse.json({ success: false, code, message }, { status })
}
