'use client'

import { useState } from 'react'
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
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
        <div className="bg-white rounded-2xl shadow-xl w-full max-w-[360px] p-8 flex flex-col items-center text-center gap-5">

          <div className="w-16 h-16 rounded-full bg-orange-50 flex items-center justify-center">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#F97316" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="20 6 9 17 4 12" />
            </svg>
          </div>

          <div className="flex flex-col gap-2">
            <h2 className="text-xl font-semibold font-jakarta text-gray-900">
              {mode === 'referrer_filled' ? 'Restaurant added!' : "You're all set!"}
            </h2>
            <p className="text-sm text-gray-500 font-jakarta leading-relaxed">
              Our team will contact you very soon to get you started on Orderlay.
            </p>
          </div>

          <div className="w-full border-t border-gray-100" />

          <div className="flex flex-col gap-2 w-full">
            {[
              mode === 'referrer_filled'
                ? "They'll receive a WhatsApp with login details."
                : 'Your 7-day free trial has started.',
              '20% off automatically applied at checkout.',
              'No credit card required.',
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-2.5">
                <span className="w-4 h-4 rounded-full bg-orange-50 flex items-center justify-center shrink-0">
                  <svg width="8" height="8" viewBox="0 0 24 24" fill="none" stroke="#F97316" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                </span>
                <p className="text-xs text-gray-500 font-jakarta text-left">{item}</p>
              </div>
            ))}
          </div>

          <button
            onClick={() => setStatus('idle')}
            className="w-full h-11 bg-primary text-white rounded-xl font-semibold text-sm font-jakarta hover:opacity-90 transition-opacity"
          >
            {mode === 'referrer_filled' ? 'Refer another restaurant' : 'Done'}
          </button>
        </div>
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
          placeholder="e.g. OL-RAM4829"
          className="w-full h-11 px-4 rounded-xl border border-gray-200 bg-gray-50 text-gray-700 text-sm font-jakarta cursor-not-allowed placeholder:text-gray-400"
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
