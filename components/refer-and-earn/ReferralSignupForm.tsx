'use client'

import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { referralSignupSchema, ReferralSignupInput } from '@/lib/referral/validation'

interface Props {
  /** Way 1: referrer is logged-in and submits on behalf of a new restaurant */
  mode: 'referrer_filled' | 'self_filled'
  /** Pre-filled referral code (Way 1 from session, Way 2 from URL) */
  referralCode: string
}

export default function ReferralSignupForm({ mode, referralCode }: Props) {
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [errorMsg, setErrorMsg] = useState('')

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ReferralSignupInput>({
    resolver: zodResolver(referralSignupSchema),
    defaultValues: { referral_code: referralCode },
  })

  const onSubmit = async (data: ReferralSignupInput) => {
    setStatus('loading')
    setErrorMsg('')
    try {
      const res = await fetch('/api/referral/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-signup-way': mode,
        },
        body: JSON.stringify(data),
      })
      const json = await res.json()
      if (!res.ok) {
        setErrorMsg(json.message ?? 'Something went wrong.')
        setStatus('error')
        return
      }
      setStatus('success')
      reset()
    } catch {
      setErrorMsg('Network error. Please try again.')
      setStatus('error')
    }
  }

  if (status === 'success') {
    return (
      <div className="flex flex-col items-center justify-center gap-4 py-10 text-center">
        <div className="w-14 h-14 rounded-full bg-orange-50 flex items-center justify-center">
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#F97316" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="20 6 9 17 4 12" />
          </svg>
        </div>
        <p className="font-semibold font-jakarta text-gray-900 text-lg">
          {mode === 'referrer_filled'
            ? "Added! They'll get a WhatsApp to log in."
            : 'Account created! Your 7-day trial has started.'}
        </p>
        <p className="text-sm text-gray-500 font-jakarta">Commission will be applied once they subscribe to a plan.</p>
        <button
          onClick={() => setStatus('idle')}
          className="mt-2 text-sm text-primary underline underline-offset-2 font-jakarta"
        >
          Refer another restaurant
        </button>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
      <Field label="Restaurant Name" error={errors.restaurant_name?.message}>
        <input
          {...register('restaurant_name')}
          placeholder="e.g. The Spice Garden"
          className={inputCls(!!errors.restaurant_name)}
        />
      </Field>

      <Field label="Owner Name" error={errors.owner_name?.message}>
        <input
          {...register('owner_name')}
          placeholder="e.g. Ramesh Kumar"
          className={inputCls(!!errors.owner_name)}
        />
      </Field>

      <Field label="Owner Phone" error={errors.owner_phone?.message}>
        <input
          {...register('owner_phone')}
          placeholder="+91 98765 43210"
          className={inputCls(!!errors.owner_phone)}
        />
      </Field>

      <Field label="Owner Email (optional)" error={errors.owner_email?.message}>
        <input
          {...register('owner_email')}
          type="email"
          placeholder="owner@restaurant.com"
          className={inputCls(!!errors.owner_email)}
        />
      </Field>

      {/* Referral code: locked in both ways — source of truth is URL param or session */}
      <Field label="Referral Code" error={errors.referral_code?.message}>
        <input
          {...register('referral_code')}
          readOnly
          className="w-full h-11 px-4 rounded-xl border border-gray-200 bg-gray-50 text-gray-400 text-sm font-jakarta cursor-not-allowed"
        />
      </Field>

      {status === 'error' && (
        <p className="text-sm text-red-500 font-jakarta bg-red-50 rounded-lg px-4 py-2.5">
          {errorMsg}
        </p>
      )}

      <button
        type="submit"
        disabled={status === 'loading'}
        className="w-full h-11 bg-primary text-white rounded-xl font-semibold text-sm font-jakarta hover:opacity-90 transition-opacity disabled:opacity-60 disabled:cursor-not-allowed"
      >
        {status === 'loading'
          ? 'Adding…'
          : mode === 'referrer_filled'
          ? 'Add Restaurant & Notify via WhatsApp'
          : 'Claim 20% Off & Start Free Trial'}
      </button>
    </form>
  )
}

function Field({
  label,
  error,
  children,
}: {
  label: string
  error?: string
  children: React.ReactNode
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-sm font-medium text-gray-700 font-jakarta">{label}</label>
      {children}
      {error && <p className="text-xs text-red-500 font-jakarta">{error}</p>}
    </div>
  )
}

function inputCls(hasError: boolean) {
  return `w-full h-11 px-4 rounded-xl border text-sm font-jakarta text-gray-900 placeholder:text-gray-400 outline-none focus:ring-2 focus:ring-primary/20 transition-all ${
    hasError ? 'border-red-400 bg-red-50' : 'border-gray-200 bg-white focus:border-primary'
  }`
}
