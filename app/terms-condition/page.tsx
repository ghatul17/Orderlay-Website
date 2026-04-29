import SmallNavForPolicies from '@/components/navigation/SmallNavForPolicies'
import GeneralForAllPolicies from '@/components/policies-small-component/GeneralForAllPolicies'
import Header from '@/components/policies-small-component/Header'
import InitialIntro from '@/components/policies-small-component/InitialIntro'
import { Metadata } from 'next'
import { usePathname } from 'next/navigation'
import React from 'react'

export const metadata: Metadata = {
  title: "Terms and Conditions — Orderlay Restaurant Software",
  description:
    "Read the terms and conditions governing your use of the Orderlay restaurant management platform.",
  alternates: { canonical: "/terms-condition" },
};

export default function page() {

  return (
    <div className=' w-full'>

      <Header subHeader='Know us Better' mainHeader='Terms & Conditions' />

      <SmallNavForPolicies />

      <InitialIntro text='Welcome to Orderlay. We are committed to protecting 
      your privacy and ensuring that your personal information is handled in a
       safe and responsible manner. This Privacy Policy outlines how we collect, 
       use, and protect your personal data when you use our mobile application and services.' />

      <GeneralForAllPolicies
        type={'paragraph'}
        title={`1.  Acceptance of Terms`}
        paragraph={[
          `Please read all the Terms & Conditions and if you disagree with any part of
         these terms, please do not use the Orderlay app.`,
          `By downloading, installing, and using the Orderlay app, you agree to comply with and be
         bound by these Terms and Conditions. We reserve the right to update and modify our Terms 
         & Conditions at any time without prior notice. The revised Terms & Conditions will constitute
          a binding agreement. It is the user's responsibility to review these terms periodically.
         If you do not agree with any updates, you may discontinue using Orderlay.`
        ]}
      />

      <GeneralForAllPolicies
        type={'list'}
        paragraph={[`Once an account is deleted, all associated data will be permanently
         removed from our servers. 
        Deleting is irreversible, and data cannot be recovered once the account is deleted.`]}
        title={`2.  User Accounts`}
        lists={[
          {
            title: `Account Creation`,
            paragraph: `You must create an account to use certain features of our app. You agree to provide accurate and complete information and to update your information as necessary. You will not use fake names or impersonate anyone. Any violation of this policy may result in your immediate ban from Orderlay without prior notice or explanation.`
          },
          {
            title: `Account Security `,
            paragraph: `You are responsible for maintaining the confidentiality of your account credentials 
        and for all activities that occur under your account. We reserve the right to cancel a username
         or refuse registration at our discretion.`
          },
          {
            title: `Account Deletion by Users`,
            type: "double",
            subList: [{
              title: `Account `,
              paragraph: `You can delete your account anytime by accessing the "Settings'' 
          section of the Orderlay app. Upon deletion, all data associated with the account,
           including order history, reviews, and personal information,
           will be permanently removed from our servers. This action is irreversible.`
            },
            {
              title: `Restaurant Account `,
              paragraph: `Restaurant owners may delete their business
           account by accessing the "Settings" section of the Orderlay app. All data
            related to the business account, including menu details, business profile, 
            and transaction history, will be permanently deleted. This action is irreversible.`
            }
            ]

          }
        ]}
      />

      <GeneralForAllPolicies
        type={'list'}
        title={`3.  Use of the App`}
        lists={[
          {
            title: `License`,
            paragraph: `We grant you a limited, non-exclusive, non-transferable
             license to use the Orderlay app for personal and commercial purposes 
             in accordance with these terms. It is your responsibility to use the 
             products and services offered by us carefully.`
          },
          {
            title: `Restrictions`,
            paragraph: `You agree not to use the app for any unlawful purpose, to interfere
             with the operation of the app, or to access data not intended for you.
             Orderlay will not be held responsible for any such unforeseen circumstances.`
          }
        ]}
      />
         <GeneralForAllPolicies
        type={'list'}
        title={`4.  Orders and Payments`}
        lists={[
          {
            title: `Order Placement`,
            paragraph: `When you place an order through the app, you agree to provide accurate
             information and to comply with the restaurant's terms and policies.
`
          },
          {
            title: `Payments`,
            paragraph: `All payments are processed securely through our third-party payment provider.
             You agree to pay all charges incurred by your use of the app.`
          }
        ]}
      />
         <GeneralForAllPolicies
        type={'list'}
        title={`5.  Reviews and Feedback`}
        lists={[
          {
            title: `User Reviews`,
            paragraph: `You may leave reviews and feedback for restaurants
             and menu items. You agree to provide honest and accurate 
            feedback and not to post any content that is defamatory obscene, or otherwise inappropriate.`
          },
          {
            title: `License to Use Feedback`,
            paragraph: `By submitting feedback, you grant us a non-exclusive, royalty-free, perpetual,
             and worldwide license to use and display your feedback.`
          }
        ]}
      />
         <GeneralForAllPolicies
        type={'paragraph'}
        title={`6.  Privacy`}
        paragraph={[`Your use of the app is also governed by our Privacy Policy, 
          which is incorporated into these Terms and Conditions by reference.
          `]}
      />
  <GeneralForAllPolicies
 type={'list'}
 title={`7.  Intellectual Property
`}
 lists={[
   {
     title: `Ownership`,
     paragraph: `All content and materials in the app, including text, graphics, logos, and software,
      are the property of Orderlay or its licensors and are protected by intellectual property laws.`
   },
   {
     title: `License`,
     paragraph: `You may not reproduce, distribute, or create derivative works of any 
     content or materials without our prior written permission.`
   }
 ]}
/>
  <GeneralForAllPolicies
 type={'paragraph'}
 title={`8.  Limitation of Liability`}
 paragraph={[`To the fullest extent permitted by law, Orderlay shall not be liable for any indirect, incidental, special, or consequential damages arising out of or in connection with your use of the app.
`]}

/>
  <GeneralForAllPolicies
 type={'paragraph'}
 title={`9.  Indemnification`}
 paragraph={[`You agree to indemnify and hold Orderlay harmless from any claims, losses, damages, liabilities, and expenses arising out of your use of the app or your violation of these Terms and Conditions.

`]}

/>
  <GeneralForAllPolicies
 type={'paragraph'}
 title={`10.  Changes to These Terms`}
 paragraph={[`We may update these Terms and Conditions from time to time. We will notify you of any significant changes by posting the new terms on our app and updating the effective date.


`]}

/>
  <GeneralForAllPolicies
 type={'paragraph'}
 title={`11.  Governing Law`}
 paragraph={[`These Terms and Conditions are governed by the laws of Australia, without regard to its conflict of laws principles.



`]}

/>
  <GeneralForAllPolicies
 type={'paragraph'}
 title={`12.  Contact Us`}
 paragraph={[`If you have any questions or concerns about these Terms and Conditions, please contact us at  hello@orderlay.com.`]}

/>
    </div>
  )
}
