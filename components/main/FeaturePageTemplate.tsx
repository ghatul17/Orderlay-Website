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
  badgeHighlight?: string;
  h1: string;
  heroDescription: string;
  accentColor?: string;
  icon: React.ReactNode;
  benefits: Benefit[];
  howItWorks: { step: string; title: string; description: string }[];
  faqs: FAQ[];
  relatedFeatures: RelatedFeature[];
  ImageComponent: React.ComponentType<any>;
  highlight?: { number: string; label: string; sublabel?: string };
}

export default function FeaturePageTemplate({
  badge,
  badgeHighlight,
  h1,
  heroDescription,
  accentColor = "#F97316",
  icon,
  benefits,
  howItWorks,
  faqs,
  relatedFeatures,
  ImageComponent,
  highlight,
}: FeaturePageTemplateProps) {
  return (
    <>
      {/* ── Hero + Bento ── */}
      <section
        className="w-full"
        style={{
          background: "linear-gradient(135deg, #EEF2FF 0%, #FAF5FF 40%, #FFF7ED 100%)",
        }}
      >
        <div className="container pt-14 md:pt-20 lg:pt-24 pb-12 md:pb-16">

          {/* Badges */}
          <div className="flex items-center gap-2 mb-5 justify-center">
            <span className="inline-block bg-white/80 border border-[#E9EAE9] text-[#374151] text-[12px] font-semibold font-jakarta px-3 py-1 rounded-full">
              {badge}
            </span>
            {badgeHighlight && (
              <span
                className="inline-block text-white text-[12px] font-semibold font-jakarta px-3 py-1 rounded-full"
                style={{ background: accentColor }}
              >
                {badgeHighlight}
              </span>
            )}
          </div>

          {/* Heading */}
          <div className="text-center max-w-[720px] mx-auto mb-6">
            <h1 className="text-[36px] sm:text-[44px] md:text-[52px] font-bold leading-[1.1] tracking-[-0.5px] font-jakarta text-[#111827] mb-4">
              {h1}
            </h1>
            <p className="text-[#557087] font-jakarta text-[16px] md:text-[17px] leading-[1.7]">
              {heroDescription}
            </p>
          </div>

          {/* CTA */}
          <div className="flex justify-center mb-12">
            <Link
              href={WA_TRIAL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 border-2 border-[#F97316] text-[#F97316] hover:bg-[#F97316] hover:text-white font-jakarta font-semibold text-[14px] rounded-xl transition-all duration-200"
            >
              Start To Manage — Free
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </Link>
          </div>

          {/* Bento grid */}
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">

            {/* Main card — feature illustration */}
            <div className="md:col-span-3 bg-white/90 backdrop-blur-sm rounded-2xl border border-white/60 shadow-sm overflow-hidden p-6 flex flex-col gap-6 min-h-[320px]">
              {/* floating activity pill */}
              <div className="inline-flex items-center gap-2 bg-[#F9FAFB] border border-[#E9EAE9] rounded-full px-3 py-1.5 w-fit">
                <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                <span className="text-[11px] font-semibold font-jakarta text-[#374151]">Live tracking active</span>
              </div>
              <div className="flex-1 flex items-center justify-center">
                <ImageComponent />
              </div>
              <div>
                <p className="text-[#111827] font-jakarta font-bold text-[17px] mb-1">{howItWorks[0]?.title}</p>
                <p className="text-[#557087] font-jakarta text-[13px] leading-[1.6]">{howItWorks[0]?.description}</p>
              </div>
            </div>

            {/* Right column */}
            <div className="md:col-span-2 flex flex-col gap-4">

              {/* Stat card */}
              <div
                className="rounded-2xl border border-white/60 shadow-sm p-6 flex flex-col justify-between min-h-[150px]"
                style={{ background: `linear-gradient(135deg, ${accentColor}18 0%, ${accentColor}08 100%)` }}
              >
                <p className="text-[12px] font-semibold font-jakarta text-[#374151]">
                  {highlight?.label ?? "Optimized By"}
                </p>
                <div
                  className="text-[64px] font-black font-jakarta leading-none tracking-[-2px]"
                  style={{ color: accentColor, opacity: 0.9 }}
                >
                  {highlight?.number ?? "90%"}
                </div>
                {highlight?.sublabel && (
                  <p className="text-[12px] font-jakarta text-[#557087]">{highlight.sublabel}</p>
                )}
              </div>

              {/* Step 2 card */}
              <div className="bg-white/90 backdrop-blur-sm rounded-2xl border border-white/60 shadow-sm p-5 flex-1 flex flex-col justify-between">
                <div
                  className="w-8 h-8 rounded-xl flex items-center justify-center text-white font-bold text-[13px] font-jakarta mb-3"
                  style={{ background: accentColor }}
                >
                  2
                </div>
                <div>
                  <p className="text-[#111827] font-jakarta font-bold text-[15px] mb-1">{howItWorks[1]?.title}</p>
                  <p className="text-[#557087] font-jakarta text-[12px] leading-[1.6]">{howItWorks[1]?.description}</p>
                </div>
              </div>
            </div>

            {/* Bottom row */}
            {/* Benefits summary card */}
            <div className="md:col-span-2 bg-white/90 backdrop-blur-sm rounded-2xl border border-white/60 shadow-sm p-5">
              <div
                className="w-8 h-8 rounded-xl flex items-center justify-center text-white font-bold text-[13px] font-jakarta mb-3"
                style={{ background: accentColor }}
              >
                3
              </div>
              <p className="text-[#111827] font-jakarta font-bold text-[15px] mb-1">{howItWorks[2]?.title}</p>
              <p className="text-[#557087] font-jakarta text-[12px] leading-[1.6] mb-4">{howItWorks[2]?.description}</p>
              {/* mini benefit chips */}
              <div className="flex flex-wrap gap-2">
                {benefits.slice(0, 3).map((b) => (
                  <span key={b.text} className="text-[11px] font-jakarta font-medium text-[#374151] bg-[#F3F4F6] px-2.5 py-1 rounded-full">
                    {b.text.split(" ").slice(0, 4).join(" ")}…
                  </span>
                ))}
              </div>
            </div>

            {/* Benefits list card */}
            <div className="md:col-span-3 bg-white/90 backdrop-blur-sm rounded-2xl border border-white/60 shadow-sm p-5">
              <p className="text-[#111827] font-jakarta font-bold text-[15px] mb-4">What's included</p>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2.5">
                {benefits.map((b) => (
                  <li key={b.text} className="flex items-start gap-2">
                    <span
                      className="mt-[3px] w-4 h-4 rounded-full flex items-center justify-center shrink-0"
                      style={{ background: `${accentColor}18` }}
                    >
                      <svg width="8" height="8" viewBox="0 0 24 24" fill="none" stroke={accentColor} strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                    </span>
                    <span className="text-[#374151] font-jakarta text-[13px] leading-[1.5]">{b.text}</span>
                  </li>
                ))}
              </ul>
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
