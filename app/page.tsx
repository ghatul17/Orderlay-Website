

import type { Metadata } from "next";
import { FAQSchema, OrganizationSchema } from "@/components/JsonLd";
import Download from "@/components/Download";
import { RestaurantFaqsList } from "@/constants/faqs";
import DashboardDemo from "@/components/main/DashboardDemo";
import WhySection from "@/components/main/WhySection";
import RoleWise from "@/components/main/RoleWise";
import FaqSection from "@/components/main/Faqs";
import ProductIntro from "@/components/main/ProductIntro";
import BlogSection from "@/components/main/BlogSection";

export const metadata: Metadata = {
  title: "Restaurant Management System in Nepal | Orderlay",
  description:
    "Nepal's easiest restaurant management system. QR ordering, KOT printing, table management & real-time sales reports. Used by restaurants across Nepal. Free to start.",
  alternates: { canonical: "/" },
};

export default function Home() {
  return (
    <>
      <OrganizationSchema />
      {/* Product intr0 */}
      <ProductIntro
        introHead1={"Restaurant Management"}
        introHead2="Made Effortless"
        introdescription="Improve your operations and delight your customers with the perfect tool for managing
            your restaurant efficiently."
        showDownLoad={true}

      />

      {/* dashboard demo */}
      <DashboardDemo />


      {/* why Orderlay works best for you. */}
      <WhySection />

      {/* download section */}
      <Download
        title={`Welcome to the Future of Restaurant Management!`}
        text="Orderlay is here to help you modernize your operations and provide an outstanding dining experience. Join the Orderlay family and watch your business shine!"
        image="/asset/download.svg"
        imageForSmall="/asset/download-top.png"
        bgColor="#FBFBFB"
      />


      {/* role wise feature section */}
      <RoleWise />


      {/* Blog section */}
      <BlogSection />

      {/* FAQS */}
      <FAQSchema faqs={RestaurantFaqsList} />
      <FaqSection
        faqsList={RestaurantFaqsList}
      />

      {/* download section */}
      <Download
        title={`Enroll Today and stay
Connected with Our App`}
        text={`Orderlay is here to help you modernize your operations and provide an outstanding dining experience. Join the Orderlay family and watch your business shine!`}
        type="bigImage"
        image="/asset/download-mobile.png"
        imageForSmall="/asset/phone-no-shadow.png"
        bgColor="#F3F4F6"
      />


    </>
  );
} 

