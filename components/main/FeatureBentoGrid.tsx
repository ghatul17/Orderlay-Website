"use client";
import React from "react";
import Link from "next/link";
import {
  ReceiptText,
  QrCode,
  ClipboardList,
  ChefHat,
  Package,
  Users,
  BarChart3,
  Store,
  Heart,
  Smartphone,
} from "lucide-react";

interface FeatureCardProps {
  icon: React.ReactNode;
  badge: string;
  title: string;
  description: string;
  cta?: { label: string; href: string };
  accent?: string;
  large?: boolean;
  visual?: React.ReactNode;
}

function FeatureCard({
  icon,
  badge,
  title,
  description,
  cta,
  accent = "#F97316",
  large,
  visual,
}: FeatureCardProps) {
  return (
    <div
      className={`group relative flex flex-col justify-between rounded-2xl border border-[#E9EAE9] bg-white p-6 overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-[2px] ${
        large ? "min-h-[280px]" : "min-h-[220px]"
      }`}
    >
      {/* top accent line */}
      <div
        className="absolute top-0 left-0 right-0 h-[3px] rounded-t-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{ background: accent }}
      />

      <div className="flex flex-col gap-4 flex-1">
        <div className="flex items-start justify-between">
          <div
            className="w-11 h-11 rounded-xl flex items-center justify-center shrink-0"
            style={{ background: `${accent}15` }}
          >
            <span style={{ color: accent }}>{icon}</span>
          </div>
          <span
            className="text-[11px] font-semibold font-jakarta px-2.5 py-1 rounded-full"
            style={{ background: `${accent}12`, color: accent }}
          >
            {badge}
          </span>
        </div>

        <div>
          <h3 className="text-[#1F2937] font-jakarta text-[17px] font-semibold leading-[1.35] mb-2">
            {title}
          </h3>
          <p className="text-[#557087] font-jakarta text-[14px] font-normal leading-[1.65]">
            {description}
          </p>
        </div>

        {visual && (
          <div className="mt-2 rounded-xl bg-[#F9FAFB] border border-[#E9EAE9] p-4 overflow-hidden">
            {visual}
          </div>
        )}
      </div>

      {cta && (
        <Link
          href={cta.href}
          className="mt-5 inline-flex items-center gap-1.5 text-[13px] font-semibold font-jakarta transition-colors duration-200"
          style={{ color: accent }}
        >
          {cta.label}
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M5 12h14M12 5l7 7-7 7" />
          </svg>
        </Link>
      )}
    </div>
  );
}

/* ── mini UI illustration components ── */
function BillingVisual() {
  return (
    <div className="flex flex-col gap-2">
      {[
        { label: "Butter Chicken", qty: "×2", price: "Rs. 640" },
        { label: "Momo (Veg)", qty: "×1", price: "Rs. 180" },
        { label: "Lassi", qty: "×3", price: "Rs. 270" },
      ].map((item) => (
        <div key={item.label} className="flex justify-between items-center">
          <span className="text-[12px] text-[#374151] font-jakarta">{item.label}</span>
          <div className="flex gap-4">
            <span className="text-[12px] text-[#9CA3AF] font-jakarta">{item.qty}</span>
            <span className="text-[12px] font-semibold text-[#1F2937] font-jakarta">{item.price}</span>
          </div>
        </div>
      ))}
      <div className="mt-1 pt-2 border-t border-[#E9EAE9] flex justify-between">
        <span className="text-[12px] font-bold text-[#1F2937] font-jakarta">Total</span>
        <span className="text-[13px] font-bold text-[#F97316] font-jakarta">Rs. 1,090</span>
      </div>
    </div>
  );
}

function QrVisual() {
  return (
    <div className="flex items-center gap-3">
      <div className="w-14 h-14 bg-[#1F2937] rounded-lg p-1.5 shrink-0">
        <div className="grid grid-cols-3 gap-0.5 h-full">
          {Array.from({ length: 9 }).map((_, i) => (
            <div
              key={i}
              className={`rounded-[1px] ${[0, 2, 6, 8, 4].includes(i) ? "bg-white" : "bg-[#1F2937]"}`}
            />
          ))}
        </div>
      </div>
      <div>
        <p className="text-[12px] font-semibold text-[#1F2937] font-jakarta">Scan & Order</p>
        <p className="text-[11px] text-[#557087] font-jakarta mt-0.5">Table 04 · Orderlay</p>
        <div className="mt-1.5 px-2 py-0.5 bg-[#F97316] rounded text-[10px] text-white font-semibold font-jakarta inline-block">
          View Menu
        </div>
      </div>
    </div>
  );
}

function DashboardVisual() {
  const bars = [60, 80, 45, 90, 70, 55, 85];
  const days = ["M", "T", "W", "T", "F", "S", "S"];
  return (
    <div>
      <div className="flex items-end gap-1.5 h-12">
        {bars.map((h, i) => (
          <div key={i} className="flex flex-col items-center gap-1 flex-1">
            <div
              className="w-full rounded-t-sm"
              style={{ height: `${h}%`, background: i === 3 ? "#F97316" : "#E9EAE9" }}
            />
            <span className="text-[9px] text-[#9CA3AF] font-jakarta">{days[i]}</span>
          </div>
        ))}
      </div>
      <div className="mt-2 flex gap-4">
        <div>
          <p className="text-[10px] text-[#9CA3AF] font-jakarta">Today</p>
          <p className="text-[13px] font-bold text-[#1F2937] font-jakarta">Rs. 24,500</p>
        </div>
        <div>
          <p className="text-[10px] text-[#9CA3AF] font-jakarta">Orders</p>
          <p className="text-[13px] font-bold text-[#1F2937] font-jakarta">138</p>
        </div>
      </div>
    </div>
  );
}

function KitchenVisual() {
  return (
    <div className="flex flex-col gap-1.5">
      {[
        { table: "T-02", item: "Chowmein ×2", status: "Preparing", color: "#F59E0B" },
        { table: "T-05", item: "Pizza ×1", status: "Ready", color: "#10B981" },
      ].map((o) => (
        <div key={o.table} className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-bold text-[#1F2937] font-jakarta bg-[#F3F4F6] px-1.5 py-0.5 rounded">
              {o.table}
            </span>
            <span className="text-[11px] text-[#374151] font-jakarta">{o.item}</span>
          </div>
          <span
            className="text-[10px] font-semibold font-jakarta px-2 py-0.5 rounded-full"
            style={{ background: `${o.color}18`, color: o.color }}
          >
            {o.status}
          </span>
        </div>
      ))}
    </div>
  );
}

export default function FeatureBentoGrid() {
  return (
    <section className="w-full py-8 md:py-16 bg-[#FAFAFA]">
      <div className="container">
        {/* Section heading */}
        <div className="flex flex-col md:items-center gap-3 mb-10 md:mb-14">
          <span className="inline-block bg-[#F97316]/10 text-[#F97316] text-[12px] font-semibold font-jakarta px-3 py-1 rounded-full w-fit">
            All Features
          </span>
          <h2 className="font-jakarta text-[28px] md:text-[34px] lg:text-[40px] text-[#1F2937] font-semibold leading-[1.2] tracking-[-0.4px] text-left md:text-center max-w-[700px]">
            One Platform for Orders, Billing, Inventory, Staff, and Reports
          </h2>
          <p className="text-[#557087] font-jakarta text-[16px] leading-[1.6] max-w-[560px] text-left md:text-center">
            Replace paper orders, manual billing, and spreadsheets with one simple platform built
            for Nepal&apos;s restaurants.
          </p>
        </div>

        {/* Bento grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 auto-rows-auto">

          {/* POS Billing — large, col-span-2 */}
          <div className="lg:col-span-2">
            <FeatureCard
              large
              icon={<ReceiptText size={20} />}
              badge="POS Billing"
              accent="#F97316"
              title="Fast, Accurate POS Billing"
              description="Create bills during rush hours without missed items, wrong discounts, or calculation errors. Built for dine-in restaurants, cafes, takeaway counters, fast-food outlets, and cloud kitchens."
              cta={{ label: "Try POS Billing Free", href: "https://wa.me/9779851044071" }}
              visual={<BillingVisual />}
            />
          </div>

          {/* QR Menu */}
          <div>
            <FeatureCard
              large
              icon={<QrCode size={20} />}
              badge="Digital Menu"
              accent="#8B5CF6"
              title="QR Menu & Digital Menu"
              description="Let customers scan, view, and order from a clean digital menu. Update items, prices, and availability instantly — no printing needed."
              cta={{ label: "Create Your QR Menu", href: "https://wa.me/9779851044071" }}
              visual={<QrVisual />}
            />
          </div>

          {/* Order Management */}
          <div>
            <FeatureCard
              icon={<ClipboardList size={20} />}
              badge="Orders"
              accent="#0EA5E9"
              title="Order Management"
              description="Track dine-in, takeaway, delivery, and online orders from one place. Staff can see pending, preparing, completed, and cancelled orders clearly."
            />
          </div>

          {/* Kitchen Order Management */}
          <div>
            <FeatureCard
              icon={<ChefHat size={20} />}
              badge="Kitchen"
              accent="#10B981"
              title="Kitchen Order Management"
              description="Send orders directly to kitchen via tickets or display. Kitchen teams see item names, quantities, table numbers, and order notes clearly."
              visual={<KitchenVisual />}
            />
          </div>

          {/* Inventory */}
          <div>
            <FeatureCard
              icon={<Package size={20} />}
              badge="Inventory"
              accent="#F59E0B"
              title="Inventory Management"
              description="Track ingredients, stock usage, wastage, and purchasing. Understand where stock is going and where food cost may be leaking."
            />
          </div>

          {/* Staff Management */}
          <div>
            <FeatureCard
              icon={<Users size={20} />}
              badge="Staff"
              accent="#EC4899"
              title="Staff Management"
              description="Control staff access, reduce dependency, and improve accountability. Manage who handles billing, orders, discounts, reports, and stock updates."
            />
          </div>

          {/* Sales Dashboard — large, col-span-2 */}
          <div className="lg:col-span-2">
            <FeatureCard
              large
              icon={<BarChart3 size={20} />}
              badge="Reports"
              accent="#F97316"
              title="Sales Dashboard & Reports"
              description="Know what is selling, what is not, and how much your restaurant earns each day. View daily sales, item-wise performance, payment methods, order volume, and branch performance."
              visual={<DashboardVisual />}
            />
          </div>

          {/* Multi-Outlet */}
          <div>
            <FeatureCard
              icon={<Store size={20} />}
              badge="Multi-Outlet"
              accent="#6366F1"
              title="Multi-Outlet Management"
              description="Compare outlet performance, monitor stock, and track sales from one dashboard. No need to be physically present at every branch."
            />
          </div>

          {/* Customer Data */}
          <div>
            <FeatureCard
              icon={<Heart size={20} />}
              badge="Loyalty"
              accent="#EF4444"
              title="Customer Data & Loyalty"
              description="Collect customer information and understand repeat customers. Use data for loyalty programs, offers, remarketing, and better service."
            />
          </div>

          {/* Mobile-First */}
          <div>
            <FeatureCard
              icon={<Smartphone size={20} />}
              badge="Mobile-First"
              accent="#14B8A6"
              title="Mobile-First Access"
              description="Run your restaurant from your phone. No expensive hardware or complex setup required — built for owners who want control on the go."
              cta={{ label: "Download the App", href: "https://play.google.com/store/apps/details?id=com.orderlayapp&pli=1" }}
            />
          </div>

        </div>
      </div>
    </section>
  );
}
