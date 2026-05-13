import type { Metadata } from "next";
import Link from "next/link";
import FeatureBentoGrid from "@/components/main/FeatureBentoGrid";
import FaqSection from "@/components/main/Faqs";
import { FAQSchema } from "@/components/JsonLd";

export const metadata: Metadata = {
  title: "Restaurant Management System in Nepal | Orderlay",
  description:
    "Run your restaurant from your phone with Orderlay, a mobile-first restaurant management system in Nepal for POS billing, QR menus, inventory, staff, orders, and reports.",
  alternates: {
    canonical: "/features/restaurant-management-system-nepal",
  },
  openGraph: {
    title: "Restaurant Management System in Nepal | Orderlay",
    description:
      "Run your restaurant from your phone with Orderlay, a mobile-first restaurant management system in Nepal for POS billing, QR menus, inventory, staff, orders, and reports.",
    url: "/features/restaurant-management-system-nepal",
  },
};

const featureFaqs = [
  {
    question: "What is a restaurant management system?",
    answer:
      "A restaurant management system is software that helps restaurants manage billing, orders, menus, inventory, staff, reports, and customer workflows from one platform.",
  },
  {
    question: "Is Orderlay suitable for restaurants in Nepal?",
    answer:
      "Yes. Orderlay is designed as a restaurant management system in Nepal for local restaurants, cafes, cloud kitchens, and fast-food businesses.",
  },
  {
    question: "Does Orderlay work as a POS system?",
    answer:
      "Yes. Orderlay includes POS billing features for faster and more accurate restaurant billing during peak hours.",
  },
  {
    question: "Can I use Orderlay without expensive hardware?",
    answer:
      "Yes. Orderlay is mobile-first and can be used from a phone, making it easier for restaurants that do not want costly POS machines.",
  },
  {
    question: "Does Orderlay support QR menus?",
    answer:
      "Yes. Orderlay supports QR menus and digital menu management so restaurants can update items and prices instantly.",
  },
  {
    question: "Can Orderlay help with inventory?",
    answer:
      "Yes. Orderlay helps track stock, ingredient usage, wastage, and inventory visibility so you know where costs are going.",
  },
  {
    question: "Does Orderlay support multiple restaurant outlets?",
    answer:
      "Yes. Orderlay supports multi-outlet management so owners can compare branch performance and monitor stock from one dashboard.",
  },
];

function HeroSection() {
  return (
    <section className="w-full">
      <div className="container pt-12 md:pt-16 lg:pt-24 pb-8 lg:pb-12">
        <div className="w-full max-w-[820px] mx-auto text-center">
          <span className="inline-block bg-[#F97316]/10 text-[#F97316] text-[12px] font-semibold font-jakarta px-3 py-1 rounded-full mb-5">
            Restaurant Management System in Nepal
          </span>
          <h1 className="mb-5 text-[34px] sm:text-[40px] md:text-[46px] lg:text-[52px] font-semibold leading-[1.15] tracking-[-0.5px] font-jakarta text-[#1F2937]">
            Restaurant Management System{" "}
            <span className="text-[#F97316]">Built for Modern Food Businesses</span>
          </h1>
          <p className="text-[#557087] font-jakarta text-[16px] md:text-[17px] font-normal leading-[1.65] mb-8 max-w-[640px] mx-auto">
            Run your entire restaurant from your phone with Orderlay — a mobile-first restaurant
            management system in Nepal designed for cafes, fast-food outlets, cloud kitchens, QSRs,
            and multi-outlet restaurants.
          </p>
          <div className="flex flex-col xs:flex-row items-center justify-center gap-3">
            <Link
              href="https://wa.me/9779851044071?text=Hi%20I%20want%20to%20start%20a%20free%20trial"
              className="w-full xs:w-auto px-7 py-3.5 bg-[#F97316] text-white font-jakarta font-semibold text-[15px] rounded-xl hover:bg-[#ea6a0a] transition-colors duration-200"
            >
              Start Free Trial
            </Link>
            <Link
              href="https://wa.me/9779851044071?text=Hi%20I%20want%20to%20book%20a%20free%20demo"
              className="w-full xs:w-auto px-7 py-3.5 border border-[#E9EAE9] bg-white text-[#1F2937] font-jakarta font-semibold text-[15px] rounded-xl hover:bg-gray-50 transition-colors duration-200"
            >
              Book a Free Demo
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

function WhyOrderlaySection() {
  const benefits = [
    "Take orders faster",
    "Reduce billing mistakes",
    "Improve kitchen coordination",
    "Track inventory and wastage",
    "View real-time sales reports",
    "Manage staff access",
    "Update digital menus instantly",
    "Handle dine-in, takeaway, and delivery orders",
    "Manage multiple outlets from one dashboard",
  ];

  return (
    <section className="w-full py-8 md:py-16 bg-white">
      <div className="container">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          <div>
            <span className="inline-block bg-[#F97316]/10 text-[#F97316] text-[12px] font-semibold font-jakarta px-3 py-1 rounded-full mb-5">
              Why Orderlay
            </span>
            <h2 className="font-jakarta text-[26px] md:text-[32px] lg:text-[36px] text-[#1F2937] font-semibold leading-[1.25] tracking-[-0.3px] mb-4">
              Is Orderlay the Best POS System for Restaurant Operations?
            </h2>
            <p className="text-[#557087] font-jakarta text-[15px] leading-[1.7] mb-4">
              The best POS system for restaurant teams is not always the most expensive one. It is
              the system your staff can use quickly, your kitchen can understand clearly, and your
              owner can check anytime.
            </p>
            <p className="text-[#557087] font-jakarta text-[15px] leading-[1.7] mb-8">
              Orderlay is designed to be simple enough for small restaurants and powerful enough for
              growing food businesses — an affordable, mobile-first middle path built for real
              operations.
            </p>
            <div className="flex flex-col xs:flex-row gap-3">
              <Link
                href="https://wa.me/9779851044071?text=Hi%20I%20want%20to%20start%20a%20free%20trial"
                className="px-6 py-3 bg-[#F97316] text-white font-jakarta font-semibold text-[14px] rounded-xl hover:bg-[#ea6a0a] transition-colors duration-200 text-center"
              >
                Start Your 7-Day Free Trial
              </Link>
              <Link
                href="https://wa.me/9779851044071"
                className="px-6 py-3 border border-[#E9EAE9] text-[#1F2937] font-jakarta font-semibold text-[14px] rounded-xl hover:bg-gray-50 transition-colors duration-200 text-center"
              >
                Talk to Us on WhatsApp
              </Link>
            </div>
          </div>

          <div className="bg-[#FAFAFA] border border-[#E9EAE9] rounded-2xl p-7">
            <p className="text-[#1F2937] font-jakarta font-semibold text-[15px] mb-5">
              With Orderlay, You Can:
            </p>
            <ul className="flex flex-col gap-3">
              {benefits.map((b) => (
                <li key={b} className="flex items-start gap-3">
                  <span className="mt-0.5 w-5 h-5 rounded-full bg-[#F97316]/10 flex items-center justify-center shrink-0">
                    <svg
                      width="10"
                      height="10"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="#F97316"
                      strokeWidth="3"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  </span>
                  <span className="text-[#374151] font-jakarta text-[14px] leading-[1.55]">{b}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

function BusinessTypesSection() {
  const types = [
    { label: "Cafes", desc: "QR menus and faster table service" },
    { label: "Fast-Food Outlets", desc: "Quick billing and order tracking" },
    { label: "Cloud Kitchens", desc: "Centralized order management" },
    { label: "Full-Service Restaurants", desc: "Kitchen coordination and inventory control" },
    { label: "Multi-Outlet Businesses", desc: "Branch-level reporting and stock monitoring" },
    { label: "New Restaurants", desc: "Affordable software from day one" },
  ];

  return (
    <section className="w-full py-8 md:py-16 bg-[#FAFAFA]">
      <div className="container">
        <div className="flex flex-col md:items-center gap-3 mb-10">
          <h2 className="font-jakarta text-[26px] md:text-[32px] text-[#1F2937] font-semibold leading-[1.25] text-left md:text-center">
            Built for Different Types of Food Businesses
          </h2>
          <p className="text-[#557087] font-jakarta text-[15px] leading-[1.6] max-w-[520px] text-left md:text-center">
            Orderlay supports different restaurant software needs in one platform.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {types.map((t) => (
            <div
              key={t.label}
              className="bg-white border border-[#E9EAE9] rounded-xl p-5 hover:shadow-md hover:-translate-y-[2px] transition-all duration-200"
            >
              <div className="w-2 h-2 rounded-full bg-[#F97316] mb-3" />
              <p className="text-[#1F2937] font-jakarta font-semibold text-[15px] mb-1">{t.label}</p>
              <p className="text-[#557087] font-jakarta text-[13px] leading-[1.55]">{t.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function FinalCTASection() {
  return (
    <section className="w-full py-12 md:py-20 bg-[#1F2937]">
      <div className="container text-center">
        <h2 className="font-jakarta text-[26px] md:text-[34px] lg:text-[40px] text-white font-semibold leading-[1.25] tracking-[-0.3px] mb-4">
          Ready to run your restaurant from your phone?
        </h2>
        <p className="text-[#9CA3AF] font-jakarta text-[15px] md:text-[16px] leading-[1.65] max-w-[540px] mx-auto mb-8">
          Start with Orderlay and manage POS billing, orders, QR menus, inventory, staff, and
          reports from one simple platform.
        </p>
        <div className="flex flex-col xs:flex-row items-center justify-center gap-3">
          <Link
            href="https://wa.me/9779851044071?text=Hi%20I%20want%20to%20start%20a%20free%20trial"
            className="w-full xs:w-auto px-7 py-3.5 bg-[#F97316] text-white font-jakarta font-semibold text-[15px] rounded-xl hover:bg-[#ea6a0a] transition-colors duration-200"
          >
            Start Free Trial
          </Link>
          <Link
            href="https://wa.me/9779851044071?text=Hi%20I%20want%20to%20book%20a%20free%20demo"
            className="w-full xs:w-auto px-7 py-3.5 border border-white/20 text-white font-jakarta font-semibold text-[15px] rounded-xl hover:bg-white/10 transition-colors duration-200"
          >
            Book a Free Demo
          </Link>
          <Link
            href="https://wa.me/9779851044071?text=Hi%20I%20want%20to%20create%20a%20free%20QR%20menu"
            className="w-full xs:w-auto px-7 py-3.5 border border-white/20 text-white font-jakarta font-semibold text-[15px] rounded-xl hover:bg-white/10 transition-colors duration-200"
          >
            Create Free QR Menu
          </Link>
        </div>
      </div>
    </section>
  );
}

export default function FeaturesPage() {
  return (
    <>
      <FAQSchema faqs={featureFaqs} />
      <HeroSection />
      <FeatureBentoGrid />
      <WhyOrderlaySection />
      <BusinessTypesSection />
      <FaqSection faqsList={featureFaqs} />
      <FinalCTASection />
    </>
  );
}
