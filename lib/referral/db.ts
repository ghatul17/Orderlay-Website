/**
 * DB abstraction layer — wire up your Supabase/PostgreSQL client here.
 * Replace the TODO stubs with real queries. All function signatures are final.
 *
 * Assumed tables:
 *   users        (id, name, phone, email, role, trial_started_at, trial_ends_at, created_at)
 *   referral_codes (id, code, owner_id, is_active, created_at)
 *   referrals    (id, referrer_id, referee_id, code_id, status, signup_way, created_at)
 *   commissions  (id, referral_id, amount, status, created_at)
 */

// ─── Types ────────────────────────────────────────────────────────────────────

export interface DBUser {
  id: string
  name: string
  phone: string
  email: string | null
  role: string
  trial_started_at: string
  trial_ends_at: string
}

export interface DBReferralCode {
  id: string
  code: string
  owner_id: string
  is_active: boolean
  owner_phone?: string
}

export interface DBReferral {
  id: string
  referrer_id: string
  referee_id: string
  code_id: string
  status: 'trial' | 'active' | 'expired'
  signup_way: 'referrer_filled' | 'self_filled'
}

// ─── Referral code queries ─────────────────────────────────────────────────────

export async function findReferralCode(code: string): Promise<DBReferralCode | null> {
  // TODO: replace with your DB client
  // Example (Supabase):
  // const { data } = await supabase
  //   .from('referral_codes')
  //   .select('id, code, owner_id, is_active, users!owner_id(phone)')
  //   .eq('code', code)
  //   .single()
  // return data ? { ...data, owner_phone: data.users?.phone } : null
  throw new Error('findReferralCode: DB not wired up')
}

// ─── User queries ──────────────────────────────────────────────────────────────

export async function findUserByPhone(phone: string): Promise<DBUser | null> {
  // TODO:
  // const { data } = await supabase.from('users').select('*').eq('phone', phone).single()
  // return data ?? null
  throw new Error('findUserByPhone: DB not wired up')
}

export async function createUser(params: {
  name: string
  phone: string
  email: string | null
  password_hash: string
  trial_started_at: Date
  trial_ends_at: Date
}): Promise<DBUser> {
  // TODO:
  // const { data, error } = await supabase
  //   .from('users')
  //   .insert({ ...params, role: 'restaurant_owner' })
  //   .select()
  //   .single()
  // if (error) throw error
  // return data
  throw new Error('createUser: DB not wired up')
}

// ─── Referral record queries ───────────────────────────────────────────────────

export async function createReferral(params: {
  referrer_id: string
  referee_id: string
  code_id: string
  status: 'trial'
  signup_way: 'referrer_filled' | 'self_filled'
}): Promise<DBReferral> {
  // TODO:
  // const { data, error } = await supabase.from('referrals').insert(params).select().single()
  // if (error) throw error
  // return data
  throw new Error('createReferral: DB not wired up')
}

// ─── Post-trial commission (call from payment webhook) ────────────────────────

export async function applyTrialConversionRewards(params: {
  referral_id: string
  plan_price: number
}): Promise<void> {
  const commission_amount = params.plan_price * 0.2

  // TODO:
  // Step 1 — create commission record
  // await supabase.from('commissions').insert({
  //   referral_id: params.referral_id,
  //   amount: commission_amount,
  //   status: 'pending',
  // })
  //
  // Step 2 — update referral status to 'active'
  // await supabase.from('referrals')
  //   .update({ status: 'active' })
  //   .eq('id', params.referral_id)
  //
  // Note: the 20% discount for referee is applied at checkout, not here.
  throw new Error('applyTrialConversionRewards: DB not wired up')
}
