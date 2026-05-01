import { supabase } from '../supabase/client'

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
  const { data, error } = await supabase
    .from('referral_codes')
    .select('id, code, owner_id, is_active, users!owner_id(phone)')
    .eq('code', code)
    .single()
    
  if (error || !data) return null;
  
  // @ts-ignore
  return { ...data, owner_phone: data.users?.phone }
}

// ─── User queries ──────────────────────────────────────────────────────────────

export async function findUserByPhone(phone: string): Promise<DBUser | null> {
  const { data, error } = await supabase.from('users').select('*').eq('phone', phone).single()
  if (error) return null;
  return data;
}

export async function createUser(params: {
  name: string
  phone: string
  email: string | null
  password_hash: string
  trial_started_at: Date
  trial_ends_at: Date
}): Promise<DBUser> {
  const { password_hash: _, ...rest } = params
  const { data, error } = await supabase
    .from('users')
    .insert({ ...rest, role: 'restaurant_owner' })
    .select()
    .single()
  if (error) throw error
  return data
}

// ─── Referral record queries ───────────────────────────────────────────────────

export async function createReferral(params: {
  referrer_id: string
  referee_id: string
  code_id: string
  status: 'trial'
  signup_way: 'referrer_filled' | 'self_filled'
}): Promise<DBReferral> {
  const { data, error } = await supabase.from('referrals').insert(params).select().single()
  if (error) throw error
  return data
}

// ─── Referrer registration ─────────────────────────────────────────────────────

export async function createReferrer(_params: {
  name: string
  phone: string
  email: string | null
  restaurant_name: string
  password_hash: string
}): Promise<DBUser> {
  const { password_hash: _, ...rest } = _params
  const { data, error } = await supabase
    .from('users')
    .insert({ ...rest, role: 'referrer' })
    .select()
    .single()
  if (error) throw error
  return data
}

export async function createReferralCode(params: {
  owner_id: string
  code: string
}): Promise<DBReferralCode> {
  const { data, error } = await supabase
    .from('referral_codes')
    .insert({ ...params, is_active: true })
    .select()
    .single()
  if (error) throw error
  return data
}

// ─── Post-trial commission (call from payment webhook) ────────────────────────

export async function applyTrialConversionRewards(params: {
  referral_id: string
  plan_price: number
}): Promise<void> {
  const commission_amount = params.plan_price * 0.2

  // Step 1 — create commission record
  const { error: commissionError } = await supabase.from('commissions').insert({
    referral_id: params.referral_id,
    amount: commission_amount,
    status: 'pending',
  })
  if (commissionError) throw commissionError;

  // Step 2 — update referral status to 'active'
  const { error: referralError } = await supabase.from('referrals')
    .update({ status: 'active' })
    .eq('id', params.referral_id)
    
  if (referralError) throw referralError;

  // Note: the 20% discount for referee is applied at checkout, not here.
}
