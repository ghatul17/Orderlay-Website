import type { Metadata } from "next";
import { ClipboardList } from "lucide-react";
import FeaturePageTemplate from "@/components/main/FeaturePageTemplate";
import OrderImage from "@/components/svgs/OrderImage";

export const metadata: Metadata = {
  title: "Restaurant Order Management System | Orderlay",
  description:
    "Manage dine-in, takeaway, and delivery orders from one place. Track order status in real time with Orderlay's restaurant order management system in Nepal.",
  alternates: { canonical: "/features/order-management" },
};

const allFeatures = [
  { label: "Sales Dashboard", href: "/features/sales-dashboard" },
  { label: "Table Management", href: "/features/table-management" },
  { label: "QR Menu", href: "/features/qr-menu" },
  { label: "Staff Management", href: "/features/staff-management" },
  { label: "Menu Management", href: "/features/menu-management" },
  { label: "Customer Reviews", href: "/features/customer-reviews" },
];

export default function OrderManagementPage() {
  return (
    <FeaturePageTemplate
      badge="Order Management"
      accentColor="#0EA5E9"
      icon={<ClipboardList size={22} />}
      h1="Real-Time Order Management for Restaurants"
      heroDescription="Handle every dine-in, takeaway, and delivery order from one simple screen. Staff can place, update, and track orders in real time — no missed orders, no confusion."
      ImageComponent={OrderImage}
      benefits={[
        { text: "Take dine-in, takeaway, and delivery orders from one place" },
        { text: "See order status: pending, preparing, completed, or cancelled" },
        { text: "Customize orders with special instructions and modifications" },
        { text: "Send orders directly to the kitchen instantly" },
        { text: "Reduce miscommunication between counter and kitchen staff" },
        { text: "Track all orders from the day with timestamps and staff details" },
      ]}
      howItWorks={[
        { step: "1", title: "Staff takes the order", description: "Waiter or cashier opens a table or new order, adds items, and confirms." },
        { step: "2", title: "Order goes to kitchen", description: "A kitchen ticket is generated automatically and sent to the kitchen team." },
        { step: "3", title: "Status updates in real time", description: "Kitchen marks order as preparing or ready. Counter and floor staff see updates instantly." },
      ]}
      faqs={[
        { question: "Can I handle delivery and takeaway orders separately from dine-in?", answer: "Yes. Orderlay lets you tag each order by type — dine-in, takeaway, or delivery — so staff can manage them separately." },
        { question: "Can customers track their order status?", answer: "Staff can update order status and inform customers. Self-tracking features may vary by plan." },
        { question: "What happens if an item is out of stock mid-service?", answer: "You can mark items as unavailable instantly and they will no longer appear in the ordering flow." },
        { question: "Can orders be modified after they are placed?", answer: "Yes. Staff with the right permissions can edit or cancel orders before they are completed." },
      ]}
      relatedFeatures={allFeatures}
    />
  );
}
