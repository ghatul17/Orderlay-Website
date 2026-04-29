

import type { Metadata } from "next";
import { FAQSchema } from "@/components/JsonLd";
import Download from "@/components/Download";
import { RestaurantFaqsList } from "@/constants/faqs";
import DashboardDemo from "@/components/main/DashboardDemo";
import WhySection from "@/components/main/WhySection";
import RoleWise from "@/components/main/RoleWise";
import FaqSection from "@/components/main/Faqs";
import ProductIntro from "@/components/main/ProductIntro";

export const metadata: Metadata = {
  title: "Restaurant Management Software",
  description:
    "Orderlay helps restaurants manage orders, tables, and staff effortlessly. QR-based ordering, real-time dashboards, and role-based access for every team member.",
  alternates: { canonical: "/" },
};

export default function Home() {
  return (
    <>
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

