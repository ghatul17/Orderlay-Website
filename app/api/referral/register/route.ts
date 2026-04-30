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

  try {
    // Block duplicate phone
    const existing = await findUserByPhone(normalize(phone))
    if (existing) {
      return err(409, 'PHONE_TAKEN', 'This phone number is already registered')
    }

    // Create referrer user record
    const user = await createReferrer({
      name,
      phone: normalize(phone),
      email: email || null,
      restaurant_name,
      password_hash: `hashed_placeholder`, // TODO: bcrypt hash a generated password
    })

    // Generate unique referral code and persist it
    const code = generateReferralCode(name)
    await createReferralCode({ owner_id: user.id, code })

    return NextResponse.json({ success: true, referral_code: code }, { status: 201 })
  } catch (e) {
    if (e instanceof ReferralError) return err(e.httpStatus, e.code, e.message)
    console.error('[referral/register]', e)
    return err(500, 'SERVER_ERROR', 'Something went wrong. Please try again.')
  }
}

function normalize(phone: string) {
  return phone.replace(/\s+/g, '').replace(/-/g, '')
}

function err(status: number, code: string, message: string) {
  return NextResponse.json({ success: false, code, message }, { status })
}
