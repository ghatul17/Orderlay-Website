import type { Metadata } from "next";
import { Users } from "lucide-react";
import FeaturePageTemplate from "@/components/main/FeaturePageTemplate";
import StaffImage from "@/components/svgs/StaffImage";

export const metadata: Metadata = {
  title: "Restaurant Staff Management | Orderlay",
  description:
    "Control staff access, assign roles, and improve team accountability with Orderlay's restaurant staff management system for restaurants in Nepal.",
  alternates: { canonical: "/features/staff-management" },
};

const allFeatures = [
  { label: "Sales Dashboard", href: "/features/sales-dashboard" },
  { label: "Table Management", href: "/features/table-management" },
  { label: "QR Menu", href: "/features/qr-menu" },
  { label: "Menu Management", href: "/features/menu-management" },
  { label: "Order Management", href: "/features/order-management" },
  { label: "Customer Reviews", href: "/features/customer-reviews" },
];

export default function StaffManagementPage() {
  return (
    <FeaturePageTemplate
      badge="Staff Management"
      badgeHighlight="Role-Based"
      highlight={{ number: "100%", label: "Access Control", sublabel: "per role permissions" }}
      accentColor="#EC4899"
      icon={<Users size={22} />}
      h1="Restaurant Staff Management & Role-Based Access"
      heroDescription="Control who can do what in your restaurant. Orderlay lets you assign roles, limit access, and reduce dependency on any single staff member — so your operations stay consistent even when people change."
      ImageComponent={StaffImage}
      benefits={[
        { text: "Assign roles like manager, cashier, waiter, and kitchen staff" },
        { text: "Control who can apply discounts, view reports, or edit the menu" },
        { text: "Reduce unauthorized access and billing errors" },
        { text: "Track which staff member processed each order or bill" },
        { text: "Add or remove staff members without disrupting operations" },
        { text: "Improve team accountability and reduce dependency on owners" },
      ]}
      howItWorks={[
        { step: "1", title: "Add your team", description: "Add staff members to your Orderlay account and assign them a role." },
        { step: "2", title: "Set permissions per role", description: "Define what each role can access — billing, reports, discounts, stock, etc." },
        { step: "3", title: "Staff log in and work", description: "Each staff member logs in with their own credentials and sees only what they need." },
      ]}
      faqs={[
        { question: "Can I restrict staff from viewing sales reports?", answer: "Yes. You control which roles can access reports, discounts, menu editing, and other sensitive functions." },
        { question: "How many staff members can I add?", answer: "You can add as many staff members as your plan allows. Contact us for team size requirements." },
        { question: "Can a staff member work across multiple branches?", answer: "Yes. For multi-outlet restaurants, staff can be assigned to one or more branches." },
        { question: "Can I see which staff member processed a specific order?", answer: "Yes. Every order and bill in Orderlay is linked to the staff member who processed it." },
      ]}
      relatedFeatures={allFeatures}
    />
  );
}
