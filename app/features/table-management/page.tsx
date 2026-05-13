import type { Metadata } from "next";
import { LayoutGrid } from "lucide-react";
import FeaturePageTemplate from "@/components/main/FeaturePageTemplate";
import TableIcon from "@/components/svgs/TableManagement";

export const metadata: Metadata = {
  title: "Table Management for Restaurants | Orderlay",
  description:
    "Set up tables, manage seating, and improve in-house service with Orderlay's restaurant table management system. Built for cafes and restaurants in Nepal.",
  alternates: { canonical: "/features/table-management" },
};

const allFeatures = [
  { label: "Sales Dashboard", href: "/features/sales-dashboard" },
  { label: "QR Menu", href: "/features/qr-menu" },
  { label: "Staff Management", href: "/features/staff-management" },
  { label: "Menu Management", href: "/features/menu-management" },
  { label: "Order Management", href: "/features/order-management" },
  { label: "Customer Reviews", href: "/features/customer-reviews" },
];

export default function TableManagementPage() {
  return (
    <FeaturePageTemplate
      badge="Table Management"
      badgeHighlight="Live Status"
      highlight={{ number: "40%", label: "Better Turnover", sublabel: "with real-time table tracking" }}
      accentColor="#6366F1"
      icon={<LayoutGrid size={22} />}
      h1="Restaurant Table Management Made Simple"
      heroDescription="Set up your dining floor, manage table status, and keep service running smoothly. Orderlay helps restaurants track which tables are occupied, available, or need attention."
      ImageComponent={TableIcon}
      benefits={[
        { text: "Set up and name tables to match your physical layout" },
        { text: "See real-time table status — available, occupied, or reserved" },
        { text: "Assign orders directly to specific tables" },
        { text: "Reduce miscommunication between front-of-house and kitchen" },
        { text: "Improve table turnover and seating efficiency" },
        { text: "Works for cafes, QSRs, and full-service restaurants" },
      ]}
      howItWorks={[
        { step: "1", title: "Set up your tables", description: "Add your tables in the Orderlay app and name them to match your restaurant floor." },
        { step: "2", title: "Assign orders to tables", description: "When a customer sits down, staff open the table and start adding their order." },
        { step: "3", title: "Monitor and close", description: "Track table status live. Close the table when the bill is settled and it resets automatically." },
      ]}
      faqs={[
        { question: "Can I customize table names and numbers?", answer: "Yes. You can name each table anything you like — Table 1, Window Seat, VIP Room, etc." },
        { question: "Does table management work for outdoor seating?", answer: "Yes. You can set up any seating arrangement including indoor, outdoor, and rooftop sections." },
        { question: "Can staff see table status from their phone?", answer: "Yes. Any staff member with access can see live table status from the Orderlay app." },
        { question: "Does it work for cafes with counter service?", answer: "Yes. Orderlay supports both table-based service and counter/takeaway operations." },
      ]}
      relatedFeatures={allFeatures}
    />
  );
}
