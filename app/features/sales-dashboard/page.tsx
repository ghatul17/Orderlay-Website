import type { Metadata } from "next";
import { BarChart3 } from "lucide-react";
import FeaturePageTemplate from "@/components/main/FeaturePageTemplate";
import Dashboard from "@/components/svgs/DashboardImage";

export const metadata: Metadata = {
  title: "Sales Dashboard & Reports | Orderlay",
  description:
    "Track daily sales, top-selling items, and restaurant performance with Orderlay's real-time sales dashboard and reports. Built for restaurants in Nepal.",
  alternates: { canonical: "/features/sales-dashboard" },
};

const allFeatures = [
  { label: "Table Management", href: "/features/table-management" },
  { label: "QR Menu", href: "/features/qr-menu" },
  { label: "Staff Management", href: "/features/staff-management" },
  { label: "Menu Management", href: "/features/menu-management" },
  { label: "Order Management", href: "/features/order-management" },
  { label: "Customer Reviews", href: "/features/customer-reviews" },
];

export default function SalesDashboardPage() {
  return (
    <FeaturePageTemplate
      badge="Sales Dashboard"
      accentColor="#F97316"
      icon={<BarChart3 size={22} />}
      h1="Real-Time Sales Dashboard & Reports for Your Restaurant"
      heroDescription="Know exactly what is selling, what is not, and how much your restaurant earns each day. Orderlay's sales dashboard gives owners and managers complete visibility into daily operations."
      ImageComponent={Dashboard}
      benefits={[
        { text: "View daily, weekly, and monthly sales at a glance" },
        { text: "Track item-wise performance and top-selling dishes" },
        { text: "Monitor payment method breakdown (cash, card, digital)" },
        { text: "Compare order volume across different time periods" },
        { text: "Check branch performance for multi-outlet restaurants" },
        { text: "Access reports from your phone anytime, anywhere" },
      ]}
      howItWorks={[
        { step: "1", title: "Orders flow in automatically", description: "Every dine-in, takeaway, and delivery order is recorded as it happens." },
        { step: "2", title: "Dashboard updates in real time", description: "Sales totals, item counts, and revenue figures update live throughout the day." },
        { step: "3", title: "Review reports anytime", description: "Open the Orderlay app on your phone to view today's summary, filter by date, or compare periods." },
      ]}
      faqs={[
        { question: "Can I view sales reports on my phone?", answer: "Yes. Orderlay is mobile-first. You can access the full sales dashboard from your phone without needing a computer." },
        { question: "Does the dashboard show item-wise sales?", answer: "Yes. You can see which menu items sold most, least, and which generated the most revenue." },
        { question: "Can I compare sales across multiple branches?", answer: "Yes. Multi-outlet owners can compare branch performance side by side from one dashboard." },
        { question: "How far back can I view sales history?", answer: "Orderlay stores your complete sales history so you can filter by any date range." },
      ]}
      relatedFeatures={allFeatures}
    />
  );
}
