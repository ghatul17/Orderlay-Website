import type { Metadata } from 'next'
import Link from 'next/link'
import ReferralSignupForm from '@/components/refer-and-earn/ReferralSignupForm'
import CopyButton from '@/components/refer-and-earn/CopyButton'
import ReferrerRegisterForm from '@/components/refer-and-earn/ReferrerRegisterForm'

export const metadata: Metadata = {
  title: 'Refer & Earn — Orderlay',
  description:
    'Refer a restaurant to Orderlay and earn 20% commission when they subscribe. Share your unique link or add them directly from your dashboard.',
  alternates: { canonical: '/refer-and-earn' },
}

/**
 * To delete this entire feature: remove this file + /components/refer-and-earn/
 * + /lib/referral/ + /app/api/referral/ and the nav link in Nav.tsx
 */
export default async function ReferAndEarnPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>
}) {
  const params = await searchParams
  const refCode = typeof params?.ref === 'string' ? params.ref : ''
  const mode = refCode ? 'self_filled' : 'referrer_filled'
  const resolvedCode = refCode || ''
  const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000').replace(/\/$/, '')

  return (
    <main className="w-full bg-[#FAFAFA] min-h-screen">
      <div className="container py-12 md:py-16 lg:py-20 flex flex-col gap-4">

        {/* ── Row 1: Hero (left) + Get Your Code form (right) ─────────────── */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">

          {/* Hero — 2 cols */}
          <div className="lg:col-span-2 bg-white rounded-2xl border border-gray-200/80 shadow-sm p-8 md:p-10 flex flex-col justify-between gap-8">
            <div className="flex flex-col gap-4">
              <p className="text-primary font-semibold text-[13px] uppercase tracking-widest font-jakarta">
                Refer & Earn
              </p>
              <h1 className="text-[32px] sm:text-[36px] md:text-[44px] font-semibold leading-[1.1] tracking-[-0.5px] font-jakarta text-gray-900">
                Grow together,<br />
                <span className="text-primary">earn together.</span>
              </h1>
              <p className="text-gray-500 font-jakarta text-[15px] md:text-[16px] leading-[1.65] max-w-[460px]">
                Invite restaurants to Orderlay. Every referral that converts to a paid plan earns you
                <span className="font-semibold text-gray-800"> 20% commission</span> — automatically, every cycle.
              </p>
            </div>

            {/* Mini stats row */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {[
                { value: '20%', label: 'Your commission' },
                { value: '₹200/mo', label: 'Per referral' },
                { value: '7 days', label: 'Free trial' },
                { value: '20% off', label: 'Referee discount' },
              ].map((s) => (
                <div key={s.label} className="bg-gray-50 rounded-xl p-4 flex flex-col gap-1">
                  <p className="text-xl font-bold font-jakarta text-gray-900">{s.value}</p>
                  <p className="text-xs text-gray-400 font-jakarta">{s.label}</p>
                </div>
              ))}
            </div>

            {/* Share link strip */}
            <div className="flex items-center gap-3 bg-orange-50 rounded-xl px-5 py-4">
              <div className="flex-1 min-w-0">
                <p className="text-xs text-gray-500 font-jakarta mb-0.5">Your referral link</p>
                <p className="text-sm font-semibold font-jakarta text-gray-900 truncate">
                  {siteUrl}/signup?ref={resolvedCode}
                </p>
              </div>
              <CopyButton value={`${siteUrl}/signup?ref=${resolvedCode}`} />
            </div>
          </div>

          {/* Get Your Referral Code form — 1 col, always visible */}
          <div className="bg-white rounded-2xl border border-gray-200/80 shadow-sm p-7 flex flex-col gap-5">
            <div>
              <div className="inline-flex items-center gap-1.5 bg-orange-50 text-primary text-[11px] font-bold uppercase tracking-widest font-jakarta px-3 py-1.5 rounded-full mb-3">
                <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                </svg>
                New referrer
              </div>
              <h2 className="text-lg font-semibold font-jakarta text-gray-900">
                Get your referral code
              </h2>
              <p className="text-sm text-gray-500 font-jakarta mt-1 leading-relaxed">
                Register once — we generate your unique <span className="font-medium text-gray-700">OL-XXXXX</span> code instantly.
              </p>
            </div>

            <ReferrerRegisterForm />

            <div className="border-t border-gray-100 pt-4">
              <p className="text-xs text-gray-400 font-jakarta text-center">
                Already have a code?{' '}
                <Link href={`/signup?ref=${resolvedCode}`} className="text-primary underline underline-offset-2">
                  Use it to refer a restaurant →
                </Link>
              </p>
            </div>
          </div>
        </div>

        {/* ── Row 2: How it works + Refer a restaurant form ───────────────── */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">

          {/* How it works — 2 cols */}
          <div className="lg:col-span-2 bg-white rounded-xl border border-gray-200/80 shadow-sm p-7 flex flex-col gap-6">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-widest text-gray-400 mb-2">
                How it works
              </p>
              <h2 className="text-xl font-semibold font-jakarta text-gray-900">
                Two ways to refer a restaurant
              </h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <WayCard
                number="01"
                title="You fill the form"
                description="Add the restaurant directly from your dashboard. We'll WhatsApp them their login credentials instantly."
                steps={['Fill restaurant details', 'We send WhatsApp invite', 'They log in & start trial']}
              />
              <WayCard
                number="02"
                title="They sign up themselves"
                description="Share your referral link. They open it, fill their details, and the referral is attached automatically."
                steps={['Share your unique link', 'They fill their own details', 'Referral is auto-attached']}
                highlight
              />
            </div>
          </div>

          {/* Refer a restaurant form (Way 1) — 1 col */}
          <div className="bg-white rounded-xl border border-gray-200/80 shadow-sm p-7 flex flex-col gap-5">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-widest text-gray-400 mb-2">
                {mode === 'referrer_filled' ? 'Way 1 — Add a restaurant' : 'Way 2 — Create your account'}
              </p>
              <h2 className="text-lg font-semibold font-jakarta text-gray-900">
                {mode === 'referrer_filled' ? 'Refer a restaurant' : "You've been invited"}
              </h2>
              <p className="text-sm text-gray-500 font-jakarta mt-1">
                {mode === 'referrer_filled'
                  ? "Fill in their details and we'll notify them via WhatsApp."
                  : 'Fill in your details to claim your 7-day free trial.'}
              </p>
            </div>
            <ReferralSignupForm mode={mode} referralCode={resolvedCode} />
          </div>
        </div>

        {/* ── Row 3: Earnings breakdown + Conditions ──────────────────────── */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

          <div className="md:col-span-2 bg-white rounded-xl border border-gray-200/80 shadow-sm overflow-hidden flex flex-col md:flex-row">
            <div className="flex flex-col justify-center p-7 gap-3 flex-1">
              <p className="text-[11px] font-semibold uppercase tracking-widest text-gray-400">
                Earnings example
              </p>
              <h2 className="text-xl font-semibold font-jakarta text-gray-900">
                How much can you earn?
              </h2>
              <p className="text-sm text-gray-500 font-jakarta leading-relaxed">
                Refer 5 restaurants on the ₹1,000/mo plan and earn ₹1,000 every month — passively.
                On the yearly plan (₹10,000) that's ₹2,000 per referral per year.
              </p>
              <div className="grid grid-cols-3 gap-3 mt-2">
                {[
                  { refs: '1 referral', earn: '₹200/mo' },
                  { refs: '5 referrals', earn: '₹1,000/mo' },
                  { refs: '10 referrals', earn: '₹2,000/mo' },
                ].map((item) => (
                  <div key={item.refs} className="bg-gray-50 rounded-xl p-4 flex flex-col gap-1">
                    <p className="text-xs text-gray-400 font-jakarta">{item.refs}</p>
                    <p className="text-lg font-semibold font-jakarta text-gray-900">{item.earn}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="w-full md:w-48 shrink-0 bg-gradient-to-br from-orange-50 to-orange-100 flex items-center justify-center p-8">
              <EarningsIllustration />
            </div>
          </div>

          <div className="bg-white rounded-xl border border-gray-200/80 shadow-sm p-7 flex flex-col gap-4">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-widest text-gray-400 mb-2">
                Conditions
              </p>
              <h2 className="text-lg font-semibold font-jakarta text-gray-900">Good to know</h2>
            </div>
            <ul className="flex flex-col gap-3">
              {[
                'Commission created only when referee pays.',
                'Self-referrals are blocked automatically.',
                'Referral code must be active at signup.',
                'One referral per phone number.',
                '20% discount auto-applied for your referee.',
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-2.5">
                  <span className="mt-0.5 w-4 h-4 shrink-0 rounded-full bg-orange-50 flex items-center justify-center">
                    <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="#F97316" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  </span>
                  <p className="text-sm text-gray-600 font-jakarta leading-relaxed">{item}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* ── Row 4: CTA strip ─────────────────────────────────────────────── */}
        <div className="bg-primary rounded-xl p-7 md:p-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="flex flex-col gap-2">
            <h2 className="text-xl md:text-2xl font-semibold font-jakarta text-white leading-snug">
              Ready to start earning?
            </h2>
            <p className="text-orange-100 font-jakarta text-sm md:text-base leading-relaxed max-w-[480px]">
              Share your referral link or add a restaurant directly. Your commission is waiting.
            </p>
          </div>
          <a
            href={`https://wa.me/?text=Join%20Orderlay%20with%20my%20referral%20link%3A%20${encodeURIComponent(siteUrl)}%2Fsignup%3Fref%3D${resolvedCode}`}
            target="_blank"
            rel="noopener noreferrer"
            className="shrink-0 flex items-center gap-2 h-12 px-6 bg-white text-primary rounded-xl font-semibold text-sm font-jakarta hover:opacity-90 transition-opacity"
          >
            <WhatsAppShareIcon />
            Share via WhatsApp
          </a>
        </div>

      </div>
    </main>
  )
}

// ── Sub-components ────────────────────────────────────────────────────────────

function WayCard({
  number, title, description, steps, highlight,
}: {
  number: string; title: string; description: string; steps: string[]; highlight?: boolean
}) {
  return (
    <div className={`rounded-xl p-5 flex flex-col gap-3 ${highlight ? 'bg-orange-50 border border-orange-100' : 'bg-gray-50 border border-gray-100'}`}>
      <div className="flex items-center gap-2.5">
        <span className={`text-xs font-bold font-jakarta ${highlight ? 'text-primary' : 'text-gray-400'}`}>{number}</span>
        <h3 className="font-semibold font-jakarta text-gray-900 text-sm">{title}</h3>
      </div>
      <p className="text-xs text-gray-500 font-jakarta leading-relaxed">{description}</p>
      <ul className="flex flex-col gap-1.5 mt-1">
        {steps.map((s, i) => (
          <li key={i} className="flex items-center gap-2 text-xs text-gray-600 font-jakarta">
            <span className={`w-1.5 h-1.5 rounded-full shrink-0 ${highlight ? 'bg-primary' : 'bg-gray-300'}`} />
            {s}
          </li>
        ))}
      </ul>
    </div>
  )
}

function EarningsIllustration() {
  return (
    <svg width="80" height="80" viewBox="0 0 80 80" fill="none">
      <circle cx="40" cy="40" r="36" fill="white" fillOpacity="0.6" />
      <path d="M40 20 L40 60" stroke="#F97316" strokeWidth="3" strokeLinecap="round" />
      <path d="M52 28 L40 20 L28 28" stroke="#F97316" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M26 48 C26 40 34 36 40 36 C46 36 54 40 54 48" stroke="#F97316" strokeWidth="2.5" strokeLinecap="round" fill="none" strokeDasharray="4 3" />
      <circle cx="26" cy="50" r="6" fill="#FED7AA" stroke="#F97316" strokeWidth="2" />
      <circle cx="54" cy="50" r="6" fill="#FED7AA" stroke="#F97316" strokeWidth="2" />
      <circle cx="40" cy="36" r="6" fill="#F97316" />
    </svg>
  )
}

function WhatsAppShareIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
    </svg>
  )
}
