import { ReferralSignupInput } from './validation'
import {
  findReferralCode,
  findUserByPhone,
  createUser,
  createReferral,
} from './db'
import { sendWhatsAppCredentials, generateTempPassword } from './whatsapp'

// Hashes the password before DB write — swap with bcrypt in production
async function hashPassword(plain: string): Promise<string> {
  // TODO: replace with bcrypt
  // return bcrypt.hash(plain, 12)
  return `hashed_${plain}`
}

export type SignupWay = 'referrer_filled' | 'self_filled'

export interface SignupResult {
  success: true
  restaurant_name: string
  status: 'trial'
  referrer_name?: string
  // Returned on Way 2 so the client can auto-login
  temp_token?: string
}

/**
 * Core referral signup service.
 * Executes steps in strict PRD order — do NOT reorder.
 *
 * @param input     Validated form data
 * @param signup_way  Detected by caller: 'referrer_filled' (Way 1) | 'self_filled' (Way 2)
 */
export async function processReferralSignup(
  input: ReferralSignupInput,
  signup_way: SignupWay,
): Promise<SignupResult> {
  // ── Step 1: Validate referral code ──────────────────────────────────────────
  const codeRecord = await findReferralCode(input.referral_code)

  if (!codeRecord) {
    throw new ReferralError('INVALID_CODE', 'Referral code does not exist', 400)
  }
  if (!codeRecord.is_active) {
    throw new ReferralError('INACTIVE_CODE', 'Referral code is no longer active', 400)
  }

  // ── Step 2: Identify referrer ────────────────────────────────────────────────
  // For Way 1 the referral code belongs to the logged-in user (already validated upstream).
  // For Way 2 the code owner is the referrer regardless.
  const referrer_id = codeRecord.owner_id
  const referrer_phone = codeRecord.owner_phone ?? null

  // ── Step 3: Self-referral check ──────────────────────────────────────────────
  if (referrer_phone && normalizePhone(input.owner_phone) === normalizePhone(referrer_phone)) {
    throw new ReferralError('SELF_REFERRAL', 'You cannot refer yourself', 409)
  }

  // ── Step 4: Duplicate phone check (with race-condition guard) ────────────────
  const existing = await findUserByPhone(normalizePhone(input.owner_phone))
  if (existing) {
    throw new ReferralError('PHONE_TAKEN', 'This phone number is already registered', 409)
  }

  // ── Step 5: Create new user ──────────────────────────────────────────────────
  const tempPassword = generateTempPassword()
  const passwordHash = await hashPassword(tempPassword)
  const now = new Date()
  const trialEndsAt = new Date(now)
  trialEndsAt.setDate(trialEndsAt.getDate() + 7)

  const newUser = await createUser({
    name: input.owner_name,
    phone: normalizePhone(input.owner_phone),
    email: input.owner_email || null,
    password_hash: passwordHash,
    trial_started_at: now,
    trial_ends_at: trialEndsAt,
  })

  // ── Step 6: Create referral record ──────────────────────────────────────────
  await createReferral({
    referrer_id,
    referee_id: newUser.id,
    code_id: codeRecord.id,
    status: 'trial',
    signup_way,
  })

  // ── Step 7: Trial is started automatically via trial_started_at above ────────

  // ── Step 8: Conditional — WhatsApp for Way 1, temp token for Way 2 ───────────
  if (signup_way === 'referrer_filled') {
    await sendWhatsAppCredentials({ phone: input.owner_phone, temp_password: tempPassword })
    return { 
      success: true, 
      restaurant_name: input.restaurant_name, 
      status: 'trial',
      referrer_name: codeRecord.owner_name,
    }
  }

  // Way 2: return a short-lived token so the client can auto-login
  const temp_token = Buffer.from(`${newUser.id}:${tempPassword}`).toString('base64')
  return { 
    success: true, 
    restaurant_name: input.restaurant_name, 
    status: 'trial', 
    temp_token,
    referrer_name: codeRecord.owner_name,
  }
}

// ── Helpers ───────────────────────────────────────────────────────────────────

function normalizePhone(phone: string): string {
  return phone.replace(/\s+/g, '').replace(/-/g, '')
}

export class ReferralError extends Error {
  constructor(
    public readonly code: string,
    message: string,
    public readonly httpStatus: 400 | 409,
  ) {
    super(message)
    this.name = 'ReferralError'
  }
}
