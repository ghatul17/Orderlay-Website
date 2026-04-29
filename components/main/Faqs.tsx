"use client"
import React, { useState } from 'react'

export interface faq {
  question: string;
  answer: string;
}
export interface FaqProps {
  faqsList: faq[]
}

function FaqSection({ faqsList }: FaqProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  const toggle = (index: number) => {
    setOpenIndex(prev => prev === index ? null : index)
  }

  return (
    <section id="community" className="w-full py-8 md:py-16 bg-[#FBFBFB]">
      <div className="container">

        {/* Heading */}
        <div className="flex flex-col items-center justify-center gap-3 mb-12 lg:mb-16">
          <h2 className="font-jakarta text-[28px] md:text-[32px] lg:text-[36px] text-[#1F2937] font-semibold leading-[1.2] tracking-[-0.4px] text-center">
            FAQ
          </h2>
          <p className="text-[#557087] text-center font-normal font-jakarta text-[16px] leading-[1.6] max-w-[600px]">
            Orderlay simplifies food ordering. Scan, order, enjoy. Fast, easy, seamless experience.
          </p>
        </div>

        {/* Accordion */}
        <div className="flex flex-col gap-3 max-w-[800px] mx-auto">
          {faqsList?.map((faq, index) => (
            <div key={index} className="rounded-xl border border-[#E9EAE9] bg-white overflow-hidden">
              <button
                type="button"
                onClick={() => toggle(index)}
                className="w-full flex items-center justify-between p-6 text-left hover:bg-gray-50 transition-colors duration-200 cursor-pointer"
              >
                <span className="text-[#1F2937] font-jakarta text-[16px] md:text-[18px] font-semibold leading-[1.4] pr-4">
                  {faq.question}
                </span>
                <span className="shrink-0 text-[#272D27]">
                  {openIndex === index ? (
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
                      <line x1="5" y1="12" x2="19" y2="12" />
                    </svg>
                  ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
                      <line x1="12" y1="5" x2="12" y2="19" />
                      <line x1="5" y1="12" x2="19" y2="12" />
                    </svg>
                  )}
                </span>
              </button>
              {openIndex === index && (
                <div className="px-6 pb-6">
                  <p className="text-[#374151] font-jakarta text-[16px] font-normal leading-[1.6]">
                    {faq.answer}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}

export default FaqSection
