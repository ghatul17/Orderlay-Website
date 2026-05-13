import type { Metadata } from "next";
import { UtensilsCrossed } from "lucide-react";
import FeaturePageTemplate from "@/components/main/FeaturePageTemplate";
import MenuImage from "@/components/svgs/MenuImage";

export const metadata: Metadata = {
  title: "Restaurant Menu Management | Orderlay",
  description:
    "Create, update, and manage your restaurant menu digitally. Add categories, items, prices, and availability in real time with Orderlay's menu management system.",
  alternates: { canonical: "/features/menu-management" },
};

const allFeatures = [
  { label: "Sales Dashboard", href: "/features/sales-dashboard" },
  { label: "Table Management", href: "/features/table-management" },
  { label: "QR Menu", href: "/features/qr-menu" },
  { label: "Staff Management", href: "/features/staff-management" },
  { label: "Order Management", href: "/features/order-management" },
  { label: "Customer Reviews", href: "/features/customer-reviews" },
];

export default function MenuManagementPage() {
  return (
    <FeaturePageTemplate
      badge="Menu Management"
      accentColor="#F59E0B"
      icon={<UtensilsCrossed size={22} />}
      h1="Digital Menu Management for Restaurants"
      heroDescription="Create and manage your full restaurant menu from your phone. Add items, set prices, organize categories, and update availability instantly — no printing, no waiting."
      ImageComponent={MenuImage}
      benefits={[
        { text: "Create categories like starters, mains, beverages, and desserts" },
        { text: "Add item names, descriptions, prices, and photos" },
        { text: "Mark items as available or sold out in real time" },
        { text: "Update prices without disrupting ongoing service" },
        { text: "Organize your menu to match how staff and customers expect it" },
        { text: "Sync menu changes instantly to QR menus and POS billing" },
      ]}
      howItWorks={[
        { step: "1", title: "Build your menu structure", description: "Create categories and add all your items with names, prices, and descriptions." },
        { step: "2", title: "Publish to all channels", description: "Your menu appears across QR ordering, POS billing, and kitchen tickets automatically." },
        { step: "3", title: "Update anytime", description: "Change a price, add a daily special, or mark an item sold out — changes go live instantly." },
      ]}
      faqs={[
        { question: "Can I add photos to menu items?", answer: "Yes. You can upload photos for each item to help customers make better choices." },
        { question: "Can I create seasonal or special menus?", answer: "Yes. You can add, hide, or remove items at any time to run daily specials or seasonal menus." },
        { question: "Does a menu update affect the QR menu immediately?", answer: "Yes. Any change you make to the menu reflects instantly on the QR menu customers see." },
        { question: "Can I set different prices for dine-in and takeaway?", answer: "Reach out to our team for information about pricing variants for different order types." },
      ]}
      relatedFeatures={allFeatures}
    />
  );
}
