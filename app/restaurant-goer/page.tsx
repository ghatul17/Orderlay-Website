import type { Metadata } from "next";
import { FAQSchema } from "@/components/JsonLd";
import Why from "@/components/Why";
import QrImage from "@/components/svgs/QrImage";
import Image from "next/image";
import Link from "next/link";
import TableIcon from "@/components/svgs/TableManagement";
import { RestaurantFaqsList, CustomerFaqsList } from '@/constants/faqs';

import Download from "@/components/Download";
import RoleWiseAd from "@/components/RoleWiseAd";
import Footer from "@/components/Footer";
import DashboardDemoItem from "@/components/DashboardDemoItem";
import DashboardDemo from "@/components/main/DashboardDemo";
import RoleWise from "@/components/main/RoleWise";
import FaqSection from "@/components/main/Faqs";
import ProductIntro from "@/components/main/ProductIntro";
import WhySection from "@/components/customer/WhySection";
import BrowseAndOrder from "@/components/svgs/BrowseAndOrder";

export const metadata: Metadata = {
  title: "QR Code Menu & Ordering App for Diners",
  description:
    "Scan, browse, and order from any restaurant with Orderlay. Hassle-free dining with no app download required. Find the best restaurants near you.",
  alternates: { canonical: "/restaurant-goer" },
};

export default function Home() {
  return (
    <>
      {/* Product intr0 */}
      <ProductIntro
        introHead1="Orderlay: Where Every Bite"
        introHead2="Starts with a Scan"
        introdescription={` Enjoy a hassle-free dining experience with just a few taps on your phone. Discover your flavor, order your way, and find the best restaurants—all in one .`}
        showDownLoad={true}
        heading1Color="text-gray-800"
        heading2Color="text-primary"
      />


      {/* why Orderlay works best for you. */}
      <WhySection

      />

      {/* download section */}
      <Download
        title={`Your Favorite Meals,Just a Tap Away!`}
        text="A world where ordering food is simple and enjoyable. Download Orderlay now to make every meal a pleasure!"
        image="/asset/download.svg"
        imageForSmall="/asset/download-top.png"
        bgColor="#FBFBFB"
      />


  
      {/* FAQS */}
      <FAQSchema faqs={CustomerFaqsList} />
      <FaqSection
        faqsList={CustomerFaqsList}
      />

      {/* download section */}
      <Download
        title={` It’s Now Easier to Order with Our Mobile Appp`}
        text={`Browse menus, customize your order, and place it with just a few taps, with Orderlay. Simply scan, order, and enjoy!`}
        type="bigImage"
        image="/asset/download-mobile.png"
        imageForSmall="/asset/phone-no-shadow.png"
        bgColor="#F3F4F6"
      />


    </>
  );
} 