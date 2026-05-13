import type { Metadata } from "next";
import { QrCode } from "lucide-react";
import FeaturePageTemplate from "@/components/main/FeaturePageTemplate";
import QrImage from "@/components/svgs/QrImage";

export const metadata: Metadata = {
  title: "QR Menu & Digital Menu for Restaurants | Orderlay",
  description:
    "Let customers scan, view, and order from a digital QR menu. Update items and prices instantly without printing. Built for restaurants and cafes in Nepal.",
  alternates: { canonical: "/features/qr-menu" },
};

const allFeatures = [
  { label: "Sales Dashboard", href: "/features/sales-dashboard" },
  { label: "Table Management", href: "/features/table-management" },
  { label: "Staff Management", href: "/features/staff-management" },
  { label: "Menu Management", href: "/features/menu-management" },
  { label: "Order Management", href: "/features/order-management" },
  { label: "Customer Reviews", href: "/features/customer-reviews" },
];

export default function QrMenuPage() {
  return (
    <FeaturePageTemplate
      badge="QR Menu"
      badgeHighlight="No App Needed"
      highlight={{ number: "0₹", label: "Printing Cost", sublabel: "update menus instantly" }}
      accentColor="#8B5CF6"
      icon={<QrCode size={22} />}
      h1="QR Menu & Digital Menu for Your Restaurant"
      heroDescription="Let customers scan a QR code at their table, browse your full menu, and place orders directly from their phone. No paper menus, no printing costs, no delays."
      ImageComponent={QrImage}
      benefits={[
        { text: "Generate a QR code for each table in seconds" },
        { text: "Customers scan and view your full menu instantly" },
        { text: "Update menu items, prices, and availability without reprinting" },
        { text: "Mark items as sold out and they disappear from the customer view" },
        { text: "Add photos and descriptions to improve ordering decisions" },
        { text: "Reduce wait time and improve customer experience" },
      ]}
      howItWorks={[
        { step: "1", title: "Set up your digital menu", description: "Add your categories, items, prices, and photos in the Orderlay dashboard." },
        { step: "2", title: "Generate and print QR codes", description: "Orderlay generates unique QR codes for each table. Print and place them on the table." },
        { step: "3", title: "Customers scan and order", description: "Guests scan the code with their phone camera, browse the menu, and orders appear in your system." },
      ]}
      faqs={[
        { question: "Do customers need to download an app to use the QR menu?", answer: "No. Customers simply scan the QR code with their phone camera and the menu opens in their browser." },
        { question: "Can I update the menu without changing the QR code?", answer: "Yes. The QR code stays the same. Any changes you make to the menu appear instantly." },
        { question: "Can I add photos to menu items?", answer: "Yes. You can add photos and descriptions to each menu item to help customers choose." },
        { question: "Does the QR menu work for takeaway and delivery too?", answer: "Yes. You can share the digital menu link for online ordering or takeaway as well." },
      ]}
      relatedFeatures={allFeatures}
    />
  );
}
