import SmallNavForPolicies from '@/components/navigation/SmallNavForPolicies'
import GeneralForAllPolicies from '@/components/policies-small-component/GeneralForAllPolicies'
import Header from '@/components/policies-small-component/Header'
import InitialIntro from '@/components/policies-small-component/InitialIntro'
import { Metadata } from 'next'
import { usePathname } from 'next/navigation'
import React from 'react'

export const metadata: Metadata = {
  title: "Privacy Policy — Orderlay Restaurant Software",
  description:
    "Read Orderlay's privacy policy to understand how we collect, use, and protect your personal data.",
  alternates: { canonical: "/privacy-policy" },
};

export default function page() {

  return (
    <div className=' w-full'>

      <Header subHeader='Know us Better' mainHeader='Privacy Policy' />

      <SmallNavForPolicies />

      <InitialIntro text='Welcome to Orderlay. We are committed to protecting your
       privacy and ensuring that your personal information is handled in a safe and responsible manner.
        This Privacy Policy outlines how we collect,
       use, and protect your personal data when you use our mobile application and services.' />

      <GeneralForAllPolicies
        type={'list'}
        title={`1.  Information We Collect`}
        lists={[
          {
            title: `Personal Information`,
            paragraph: 'When you create an account, we may collect your name, email address, phone number, and payment information.'
          }, {
            title: `Restaurant Information`,
            paragraph: ` If you are a restaurant owner or manager, we collect information about your restaurant, including its name, location, contact details, and menu items.`
          },
          {
            title: `Usage Data`,
            paragraph: `We collect information about how you interact with our app, including your order history, preferences, and feedback.`
          }, {
            title: `Device Information`,
            paragraph: `We collect information about the device you use to access our app, including IP address, device ID, operating system, and browser type.`
          }
        ]}
      />

      <GeneralForAllPolicies
        type={'list'}

        title={`2.  How We Use Your Information`}
        lists={[
          {
            title: `To Provide and Improve Our Services`,
            paragraph: `We use your information to process orders,
             manage restaurant profiles, and improve the functionality of our app.`
          },
          {
            title: `Communication`,
            paragraph: `We use your information to process orders, manage restaurant profiles, and improve the functionality of our app.`
          },
          {
            title: `Personalization`,
            paragraph: `We use your preferences and order history to personalize your experience with our app.`
          },
          {
            title: `Analytics`,
            paragraph: `We analyze usage data to understand user behavior and improve our services.`
          },

        ]}
      />

      <GeneralForAllPolicies
        type={'paragraph'}
        title={`3.  Sharing Your Information`}
        paragraph={[`We take reasonable measures to protect your personal information from unauthorized access, loss, or misuse. However, no data transmission over the internet or storage system can be guaranteed to be 100% secure.`]}
      />
      <GeneralForAllPolicies
        type={'paragraph'}
        title={`4.  Data Security`}
        paragraph={[`We take reasonable measures to protect your personal information from unauthorized access, loss, or misuse. However, no data transmission over the internet or storage system can be guaranteed to be 100% secure.`]}
      />
      <GeneralForAllPolicies
        type={'list'}
        title={`5.  Your Rights`}
        initialTitle={`You have the right to:`}
        lists={[
          {
            title: `Access and Update`,
            paragraph: `Review and update your personal information in your account settings.`
          },
          {
            title: `Delete`,
            paragraph: `Request the deletion of your personal data, subject to legal and operational limitations.`
          },
        ]}
      />

      <GeneralForAllPolicies
        type={'paragraph'}
        title={`6.  Changes to This Privacy Policy`}
        paragraph={[`We may update this Privacy Policy from time to time. We will 
          notify you of any significant changes 
          by posting the new policy on our app and updating the effective date.`]}
      />
      <GeneralForAllPolicies
        type={'paragraph'}
        title={`7.  How to contact the appropriate authority?`}
        paragraph={[`Should you wish to report a complaint or if you feel that Our Company has not addressed your concern in 
          a satisfactory manner, you may contact the Information Commissioner's Office.
          `,
          `Email us at: hello@orderlay.com`,
          `Or write to us at: 11-17 York Street, Sydney NSW 2000`,
          `Call us at: +61423514564`
        ]}
      />

    </div>
  )
}
