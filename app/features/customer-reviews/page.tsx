import type { Metadata } from "next";
import { Star } from "lucide-react";
import FeaturePageTemplate from "@/components/main/FeaturePageTemplate";
import ReviewImage from "@/components/svgs/Review";

export const metadata: Metadata = {
  title: "Restaurant Customer Reviews & Ratings | Orderlay",
  description:
    "Collect customer reviews and ratings after every dining experience. Use feedback to improve service and menu quality with Orderlay for restaurants in Nepal.",
  alternates: { canonical: "/features/customer-reviews" },
};

const allFeatures = [
  { label: "Sales Dashboard", href: "/features/sales-dashboard" },
  { label: "Table Management", href: "/features/table-management" },
  { label: "QR Menu", href: "/features/qr-menu" },
  { label: "Staff Management", href: "/features/staff-management" },
  { label: "Menu Management", href: "/features/menu-management" },
  { label: "Order Management", href: "/features/order-management" },
];

export default function CustomerReviewsPage() {
  return (
    <FeaturePageTemplate
      badge="Customer Reviews"
      accentColor="#EF4444"
      icon={<Star size={22} />}
      h1="Customer Reviews & Ratings for Your Restaurant"
      heroDescription="Give customers an easy way to share their dining experience. Orderlay helps restaurants collect feedback, track ratings, and use customer insights to improve service and menu quality."
      ImageComponent={ReviewImage}
      benefits={[
        { text: "Customers can rate their dining experience after each visit" },
        { text: "Collect written feedback on food quality, service, and ambiance" },
        { text: "See review trends over time to spot recurring issues" },
        { text: "Use feedback to improve menu items and staff performance" },
        { text: "Build trust with new customers by showing consistent ratings" },
        { text: "Respond to feedback and show customers you care" },
      ]}
      howItWorks={[
        { step: "1", title: "Customer completes their meal", description: "After the dining experience, the customer receives a prompt to leave feedback." },
        { step: "2", title: "They rate and review", description: "Customers select a star rating and optionally leave a written comment about their experience." },
        { step: "3", title: "Owner reviews and responds", description: "Restaurant owners and managers see all feedback in the dashboard and can take action." },
      ]}
      faqs={[
        { question: "How do customers leave a review?", answer: "Customers can leave reviews through the QR menu flow or a direct feedback link shared after their visit." },
        { question: "Can I respond to customer reviews?", answer: "Yes. Orderlay allows managers to read and respond to customer feedback directly." },
        { question: "Are reviews visible to the public?", answer: "Reviews are collected for your internal use. Visibility settings depend on your plan configuration." },
        { question: "Can I use reviews to improve specific menu items?", answer: "Yes. You can filter feedback by item or category to understand which dishes customers love or dislike." },
      ]}
      relatedFeatures={allFeatures}
    />
  );
}
