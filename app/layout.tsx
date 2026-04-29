import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Nav from "@/components/navigation/Nav";
import Footer from "@/components/Footer";
import { OrganizationSchema, SoftwareApplicationSchema } from "@/components/JsonLd";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://orderlay.com"),
  title: {
    default: "Orderlay — Restaurant Management Software",
    template: "%s — Orderlay",
  },
  description:
    "Orderlay helps restaurants manage orders, tables, and staff effortlessly. QR-based ordering, real-time dashboards, and role-based access for every team member.",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://orderlay.com",
    siteName: "Orderlay",
    title: "Orderlay — Restaurant Management Software",
    description:
      "Orderlay helps restaurants manage orders, tables, and staff effortlessly. QR-based ordering, real-time dashboards, and role-based access for every team member.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Orderlay Restaurant Management Software",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Orderlay — Restaurant Management Software",
    description:
      "Orderlay helps restaurants manage orders, tables, and staff effortlessly.",
    images: ["/og-image.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <OrganizationSchema />
        <SoftwareApplicationSchema />
        <Nav/>
        {children}
             {/* Footer */}
      <Footer />
      </body>
    </html>
  );
}
