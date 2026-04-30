import type { Metadata } from 'next'
import ReferralSignupForm from '@/components/refer-and-earn/ReferralSignupForm'
import CopyButton from '@/components/refer-and-earn/CopyButton'

export const metadata: Metadata = {
  title: 'Refer & Earn — Orderlay',
  description:
    'Refer a restaurant to Orderlay and earn 20% commission when they subscribe. Share your unique link or add them directly from your dashboard.',
  alternates: { canonical: '/refer-and-earn' },
}

/**
 * /refer-and-earn
 *
 * Way 1 (referrer logged in): form to add a restaurant on their behalf
 * Way 2 (?ref=CODE):          new restaurant self-signup with pre-filled code
 *
 * To delete this entire feature: remove this file + /components/refer-and-earn/
 * + /lib/referral/ + /app/api/referral/ and the nav link in Nav.tsx
 */
export default function ReferAndEarnPage({
  searchParams,
}: {
  searchParams: Record<string, string | string[] | undefined>
}) {
  const refCode = typeof searchParams?.ref === 'string' ? searchParams.ref : ''
  const mode = refCode ? 'self_filled' : 'referrer_filled'

  // Placeholder referral code for Way 1 (replace with session value when auth is wired up)
  const resolvedCode = refCode || 'YOUR-CODE'

  return (
    <main className="w-full bg-[#FAFAFA] min-h-screen">
      <div className="container py-12 md:py-16 lg:py-20">

        {/* ── Page header ─────────────────────────────────────────────────── */}
        <div className="max-w-[640px] mb-10">
          <p className="text-primary font-semibold text-[14px] uppercase tracking-widest font-jakarta mb-3">
            Refer & Earn
          </p>
          <h1 className="text-[32px] sm:text-[36px] md:text-[42px] font-semibold leading-[1.15] tracking-[-0.5px] font-jakarta text-gray-900">
            Grow together,<br />
            <span className="text-primary">earn together.</span>
          </h1>
          <p className="mt-4 text-gray-500 font-jakarta text-[16px] leading-[1.6] max-w-[520px]">
            Invite restaurants to Orderlay. Every referral that converts to a paid plan earns you
            20% commission — automatically, every cycle.
          </p>
        </div>

        {/* ── Row 1: Stats bento ──────────────────────────────────────────── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
          <StatCard
            icon={<CommissionIcon />}
            label="Your commission"
            value="20%"
            sub="of each plan payment"
            accent
          />
          <StatCard
            icon={<TrialIcon />}
            label="Free trial for referee"
            value="7 days"
            sub="no card required"
          />
          <StatCard
            icon={<DiscountIcon />}
            label="Discount for referee"
            value="20% off"
            sub="automatically applied"
          />
          <StatCard
            icon={<InstantIcon />}
            label="Commission timing"
            value="On payment"
            sub="not during trial"
          />
        </div>

        {/* ── Row 2: How it works (hero bento) + Form ─────────────────────── */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-4">

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

            {/* Share link strip */}
            <div className="flex items-center gap-3 bg-orange-50 rounded-xl px-5 py-4">
              <div className="flex-1 min-w-0">
                <p className="text-xs text-gray-500 font-jakarta mb-0.5">Your referral link</p>
                <p className="text-sm font-semibold font-jakarta text-gray-900 truncate">
                  orderlay.app/signup?ref={resolvedCode}
                </p>
              </div>
              <CopyButton value={`orderlay.app/signup?ref=${resolvedCode}`} />
            </div>
          </div>

          {/* Signup form — 1 col */}
          <div className="bg-white rounded-xl border border-gray-200/80 shadow-sm p-7 flex flex-col gap-5">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-widest text-gray-400 mb-2">
                {mode === 'referrer_filled' ? 'Way 1 — Add a restaurant' : 'Way 2 — Create your account'}
              </p>
              <h2 className="text-lg font-semibold font-jakarta text-gray-900">
                {mode === 'referrer_filled'
                  ? 'Refer a restaurant'
                  : "You've been invited"}
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

        {/* ── Row 3: Earnings breakdown (wide) + Conditions card ────────────── */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">

          {/* Earnings breakdown — 2 cols */}
          <div className="md:col-span-2 bg-white rounded-xl border border-gray-200/80 shadow-sm overflow-hidden flex flex-col md:flex-row">
            <div className="flex flex-col justify-center p-7 gap-3 flex-1">
              <p className="text-[11px] font-semibold uppercase tracking-widest text-gray-400">
                Earnings example
              </p>
              <h2 className="text-xl font-semibold font-jakarta text-gray-900">
                How much can you earn?
              </h2>
              <p className="text-sm text-gray-500 font-jakarta leading-relaxed">
                Refer 5 restaurants on the ₹1,499/mo plan and earn ₹1,499 every month — passively.
                The more you refer, the more you stack.
              </p>
              <div className="grid grid-cols-3 gap-3 mt-2">
                {[
                  { refs: '1 referral', earn: '₹300/mo' },
                  { refs: '5 referrals', earn: '₹1,499/mo' },
                  { refs: '10 referrals', earn: '₹2,998/mo' },
                ].map((item) => (
                  <div key={item.refs} className="bg-gray-50 rounded-xl p-4 flex flex-col gap-1">
                    <p className="text-xs text-gray-400 font-jakarta">{item.refs}</p>
                    <p className="text-lg font-semibold font-jakarta text-gray-900">{item.earn}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="w-full md:w-56 shrink-0 bg-gradient-to-br from-orange-50 to-orange-100 flex items-center justify-center p-8">
              <EarningsIllustration />
            </div>
          </div>

          {/* Conditions card — 1 col */}
          <div className="bg-white rounded-xl border border-gray-200/80 shadow-sm p-7 flex flex-col gap-4">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-widest text-gray-400 mb-2">
                Conditions
              </p>
              <h2 className="text-lg font-semibold font-jakarta text-gray-900">Good to know</h2>
            </div>
            <ul className="flex flex-col gap-3">
              {[
                'Commission is created only when your referee pays for a plan.',
                'Self-referrals are blocked automatically.',
                'Referral code must be active at signup time.',
                'One referral per phone number.',
                '20% discount applied automatically for your referee at checkout.',
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
            href={`https://wa.me/?text=Join%20Orderlay%20with%20my%20referral%20link%3A%20orderlay.app%2Fsignup%3Fref%3D${resolvedCode}`}
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

// ── Sub-components ─────────────────────────────────────────────────────────────

function StatCard({
  icon,
  label,
  value,
  sub,
  accent,
}: {
  icon: React.ReactNode
  label: string
  value: string
  sub: string
  accent?: boolean
}) {
  return (
    <div
      className={`rounded-xl border shadow-sm p-6 flex flex-col gap-3 ${
        accent
          ? 'bg-primary border-primary text-white'
          : 'bg-white border-gray-200/80 text-gray-900'
      }`}
    >
      <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${accent ? 'bg-white/15' : 'bg-orange-50'}`}>
        {icon}
      </div>
      <div>
        <p className={`text-[11px] font-semibold uppercase tracking-widest mb-1 ${accent ? 'text-orange-100' : 'text-gray-400'}`}>
          {label}
        </p>
        <p className={`text-2xl font-semibold font-jakarta ${accent ? 'text-white' : 'text-gray-900'}`}>
          {value}
        </p>
        <p className={`text-xs font-jakarta mt-0.5 ${accent ? 'text-orange-100' : 'text-gray-400'}`}>
          {sub}
        </p>
      </div>
    </div>
  )
}

function WayCard({
  number,
  title,
  description,
  steps,
  highlight,
}: {
  number: string
  title: string
  description: string
  steps: string[]
  highlight?: boolean
}) {
  return (
    <div
      className={`rounded-xl p-5 flex flex-col gap-3 ${
        highlight ? 'bg-orange-50 border border-orange-100' : 'bg-gray-50 border border-gray-100'
      }`}
    >
      <div className="flex items-center gap-2.5">
        <span className={`text-xs font-bold font-jakarta ${highlight ? 'text-primary' : 'text-gray-400'}`}>
          {number}
        </span>
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

// ── Icons (inline SVGs, no external deps) ────────────────────────────────────

function CommissionIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#F97316" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="12" y1="1" x2="12" y2="23" /><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
    </svg>
  )
}

function TrialIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#F97316" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" />
    </svg>
  )
}

function DiscountIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#F97316" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z" /><line x1="7" y1="7" x2="7.01" y2="7" />
    </svg>
  )
}

function InstantIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#F97316" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
    </svg>
  )
}

function EarningsIllustration() {
  return (
    <svg width="80" height="80" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
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
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
    </svg>
  )
}
