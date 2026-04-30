import type { Metadata } from 'next'
import ReferralSignupForm from '@/components/refer-and-earn/ReferralSignupForm'

export const metadata: Metadata = {
  title: 'Sign Up — Orderlay',
  description: 'Create your Orderlay account and start your 7-day free trial.',
  alternates: { canonical: '/signup' },
}

export default async function SignupPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>
}) {
  const params = await searchParams
  const refCode = typeof params?.ref === 'string' ? params.ref : ''

  return (
    <main className="w-full min-h-screen bg-[#FAFAFA] flex items-center justify-center py-12 px-4">
      <div className="w-full max-w-[440px]">

        {/* Card */}
        <div className="bg-white rounded-2xl border border-gray-200/80 shadow-sm p-8">

          {/* Header */}
          <div className="mb-6">
            {refCode ? (
              <>
                <div className="inline-flex items-center gap-1.5 bg-orange-50 text-primary text-xs font-semibold font-jakarta px-3 py-1.5 rounded-full mb-4">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
                    <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
                  </svg>
                  Referral code applied
                </div>
                <h1 className="text-2xl font-semibold font-jakarta text-gray-900 leading-snug">
                  You've been invited to Orderlay
                </h1>
                <p className="text-sm text-gray-500 font-jakarta mt-2 leading-relaxed">
                  Start your free 7-day trial. No card required.
                </p>
              </>
            ) : (
              <>
                <h1 className="text-2xl font-semibold font-jakarta text-gray-900 leading-snug">
                  Create your account
                </h1>
                <p className="text-sm text-gray-500 font-jakarta mt-2 leading-relaxed">
                  Start your free 7-day trial. No card required.
                </p>
              </>
            )}
          </div>

          <ReferralSignupForm
            mode="self_filled"
            referralCode={refCode}
          />
        </div>


      </div>
    </main>
  )
}
