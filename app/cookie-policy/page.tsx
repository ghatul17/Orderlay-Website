import SmallNavForPolicies from '@/components/navigation/SmallNavForPolicies'
import GeneralForAllPolicies from '@/components/policies-small-component/GeneralForAllPolicies'
import Header from '@/components/policies-small-component/Header'
import InitialIntro from '@/components/policies-small-component/InitialIntro'
import { Metadata } from 'next'
import { usePathname } from 'next/navigation'
import React from 'react'

export const metadata: Metadata = {
  title: "Cookie Policy — Orderlay Restaurant Software",
  description:
    "Learn how Orderlay uses cookies to improve your experience and keep our platform running smoothly.",
  alternates: { canonical: "/cookie-policy" },
};

export default function page() {

  return (
    <div className=' w-full'>

      <Header subHeader='Know us Better' mainHeader='Cookie Policy' />

      <SmallNavForPolicies />

      <InitialIntro text='Orderlay is committed to being transparent about how we collect and use data. This Cookies Policy explains 
      how cookies and similar technologies are used when you interact with our app and services.' />

      <GeneralForAllPolicies
        type={'paragraph'}
        title={`1.  What Are Cookies?`}
          paragraph={[`Cookies are small data files that are placed on your device when you access websites or apps. They are used to store information about your interactions, preferences, and usage patterns.`]}
      />

      <GeneralForAllPolicies
        type={'list'}

        title={`2.  How We Use Cookies`}
        initialTitle={`We use cookies and similar technologies to`}
        lists={[
          {
            title: `Enhance User Experience`,
            paragraph: `Remember your preferences and login details to provide a seamless experience.`
          },
          {
            title: `Analyze Usage`,
            paragraph: ` Track and analyze how you use the app to improve functionality and services.`
          },
          {
            title: `Personalize Content`,
            paragraph: ` Provide tailored recommendations, offers, and content based on your preferences and order history.`
          },
          {
            title: `Facilitate Transactions`,
            paragraph: `Ensure the smooth operation of features like order placement and secure payment processing.`
          },

        ]}
      />
      <GeneralForAllPolicies
        type={'list'}

        title={`3.  Types of Cookies We Use`}
        lists={[
          {
            title: `Essential Cookies`,
            paragraph: `These are necessary for the app to function properly and cannot be disabled.
             They help with core functionalities like account login and order processing.`
          },
          {
            title: `Performance Cookies`,
            paragraph: `These collect anonymous data about app usage, such as the most visited features, helping us improve performance.`
          },
          {
            title: `Functional Cookies`,
            paragraph: `These remember your preferences and settings to offer a personalized experience.`
          },
          {
            title: `Targeting and Advertising Cookies`,
            paragraph: `These are used to deliver relevant ads and promotions based on your interests and interactions.`
          },

        ]}
      />

      <GeneralForAllPolicies
        type={'paragraph'}
        title={`4.  Third-Party Cookies`}
        paragraph={[`We may allow third-party service providers, such as analytics and payment providers, to place cookies on your device to assist with performance monitoring and transaction processing.`]}
      />
      <GeneralForAllPolicies
        type={'paragraph'}
        title={`5.  Managing Cookies`}
        paragraph={[`You can manage or disable cookies through your device settings or app preferences. However, please note that disabling cookies may affect the functionality of the app and limit your ability to access certain features.`]}
      />
      <GeneralForAllPolicies
        type={'list'}
        title={` 6.  Data Collected Through Cookies`}
        initialTitle={`Cookies may collect data such as:`}
        lists={[
          {
            title: ``,
            paragraph: `Device information (IP address, browser type, operating system)`
          },
          {
            title: ``,
            paragraph: `Usage details (pages or features accessed, time spent, interactions)`
          },
          {
            title: ``,
            paragraph: `Preferences and settings`
          },
        ]}
      />

      <GeneralForAllPolicies
        type={'paragraph'}
        title={`7.  How to contact the appropriate authority?`}
        paragraph={[`We may update this Cookies Policy from time to time to reflect changes in technology, legal requirements, or our practices. We will notify you of any significant changes by posting the updated policy on our app and updating the effective date.`]}
      />
      <GeneralForAllPolicies
        type={'paragraph'}
        title={`8.  Contact Us`}
        paragraph={[`If you have questions or concerns about our use of cookies, please contact us at hello@orderlay.com .`
        ]}
      />

    </div>
  )
}
