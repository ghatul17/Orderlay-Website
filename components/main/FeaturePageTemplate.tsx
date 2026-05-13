import React from "react";
import Link from "next/link";
import FaqSection from "@/components/main/Faqs";

const WA_TRIAL = "https://api.whatsapp.com/send/?phone=9779801753818&text=Hi%2C+I%27d+like+to+start+a+free+trial+for+Orderlay+restaurant+management+software.&type=phone_number&app_absent=0";
const WA_DEMO  = "https://api.whatsapp.com/send/?phone=9779801753818&text=Hi%2C+I%27d+like+to+book+a+demo+for+Orderlay+restaurant+management+software.&type=phone_number&app_absent=0";

interface Benefit { text: string }
interface FAQ { question: string; answer: string }
interface RelatedFeature { label: string; href: string }

interface FeaturePageTemplateProps {
  badge: string;
  h1: string;
  heroDescription: string;
  accentColor?: string;
  icon: React.ReactNode;
  benefits: Benefit[];
  howItWorks: { step: string; title: string; description: string }[];
  faqs: FAQ[];
  relatedFeatures: RelatedFeature[];
  ImageComponent: React.ComponentType<any>;
}

export default function FeaturePageTemplate({
  badge,
  h1,
  heroDescription,
  accentColor = "#F97316",
  icon,
  benefits,
  howItWorks,
  faqs,
  relatedFeatures,
  ImageComponent,
}: FeaturePageTemplateProps) {
  return (
    <>
      {/* Hero */}
      <section className="w-full">
        <div className="container pt-12 md:pt-16 lg:pt-24 pb-8 lg:pb-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
            <div>
              <span
                className="inline-block text-[12px] font-semibold font-jakarta px-3 py-1 rounded-full mb-5"
                style={{ background: `${accentColor}15`, color: accentColor }}
              >
                {badge}
              </span>
              <h1 className="text-[32px] sm:text-[38px] md:text-[44px] font-semibold leading-[1.15] tracking-[-0.4px] font-jakarta text-[#1F2937] mb-5">
                {h1}
              </h1>
              <p className="text-[#557087] font-jakarta text-[16px] leading-[1.7] mb-8">
                {heroDescription}
              </p>
              <div className="flex flex-col xs:flex-row gap-3">
                <Link
                  href={WA_TRIAL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-3.5 bg-[#F97316] hover:bg-[#ea6a0a] text-white font-jakarta font-semibold text-[14px] rounded-xl transition-colors duration-200 text-center"
                >
                  Start Free Trial
                </Link>
                <Link
                  href={WA_DEMO}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-3.5 border border-[#E9EAE9] bg-white text-[#1F2937] font-jakarta font-semibold text-[14px] rounded-xl hover:border-[#F97316]/40 hover:text-[#F97316] transition-colors duration-200 text-center"
                >
                  Book a Free Demo
                </Link>
              </div>
            </div>
            <div className="w-full">
              <ImageComponent />
            </div>
          </div>
        </div>
      </section>

      {/* Benefits + How It Works */}
      <section className="w-full py-8 md:py-14 bg-[#FAFAFA]">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
            <div>
              <h2 className="font-jakarta text-[24px] md:text-[30px] text-[#1F2937] font-semibold leading-[1.3] mb-3">
                What You Get
              </h2>
              <p className="text-[#557087] font-jakarta text-[15px] leading-[1.65] mb-6">
                Every feature is built around how real restaurants in Nepal operate day-to-day.
              </p>
              <ul className="flex flex-col gap-3">
                {benefits.map((b) => (
                  <li key={b.text} className="flex items-start gap-3">
                    <span className="mt-0.5 w-5 h-5 rounded-full bg-[#F97316]/10 flex items-center justify-center shrink-0">
                      <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#F97316" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                    </span>
                    <span className="text-[#374151] font-jakarta text-[14px] leading-[1.6]">{b.text}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex flex-col gap-5">
              <h2 className="font-jakarta text-[24px] md:text-[30px] text-[#1F2937] font-semibold leading-[1.3]">
                How It Works
              </h2>
              {howItWorks.map((step, i) => (
                <div key={i} className="flex gap-4">
                  <div className="w-8 h-8 rounded-full bg-[#F97316] flex items-center justify-center shrink-0 text-white font-jakarta font-bold text-[13px]">
                    {i + 1}
                  </div>
                  <div>
                    <p className="text-[#1F2937] font-jakarta font-semibold text-[15px] mb-0.5">{step.title}</p>
                    <p className="text-[#557087] font-jakarta text-[13px] leading-[1.6]">{step.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <FaqSection faqsList={faqs} />

      {/* Related Features */}
      <section className="w-full py-8 md:py-12 bg-white">
        <div className="container">
          <h2 className="font-jakarta text-[22px] md:text-[26px] text-[#1F2937] font-semibold leading-[1.3] mb-6 text-center">
            Explore More Features
          </h2>
          <div className="flex flex-wrap justify-center gap-3">
            {relatedFeatures.map((f) => (
              <Link
                key={f.href}
                href={f.href}
                className="px-5 py-2.5 border border-[#E9EAE9] rounded-xl font-jakarta text-[14px] font-medium text-[#1F2937] hover:border-[#F97316]/40 hover:text-[#F97316] transition-colors duration-200"
              >
                {f.label}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="w-full py-12 md:py-16 bg-[#1F2937]">
        <div className="container text-center">
          <div
            className="w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-5"
            style={{ background: `${accentColor}25`, color: accentColor }}
          >
            {icon}
          </div>
          <h2 className="font-jakarta text-[24px] md:text-[32px] text-white font-semibold leading-[1.25] mb-4">
            Ready to get started?
          </h2>
          <p className="text-[#9CA3AF] font-jakarta text-[15px] leading-[1.65] max-w-[480px] mx-auto mb-8">
            Join hundreds of restaurants in Nepal already using Orderlay to simplify their operations.
          </p>
          <div className="flex flex-col xs:flex-row items-center justify-center gap-3">
            <Link
              href={WA_TRIAL}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full xs:w-auto px-7 py-3.5 bg-[#F97316] hover:bg-[#ea6a0a] text-white font-jakarta font-semibold text-[15px] rounded-xl transition-colors duration-200"
            >
              Start Free Trial
            </Link>
            <Link
              href={WA_DEMO}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full xs:w-auto px-7 py-3.5 border border-white/20 text-white font-jakarta font-semibold text-[15px] rounded-xl hover:bg-white/10 transition-colors duration-200"
            >
              Book a Free Demo
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
