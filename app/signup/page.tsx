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
            <h1 className="text-2xl font-semibold font-jakarta text-gray-900 leading-snug">
              Create your account
            </h1>
            <p className="text-sm text-gray-500 font-jakarta mt-2 leading-relaxed">
              Start your free 7-day trial. No card required.
            </p>
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
