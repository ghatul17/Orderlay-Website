import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Nav from "@/components/navigation/Nav";
import Footer from "@/components/Footer";
import { SoftwareApplicationSchema } from "@/components/JsonLd";
import { SITE_URL, SITE_NAME } from "@/constants/site";

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
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Orderlay — Restaurant Management Software",
    template: "%s — Orderlay",
  },
  description:
    "Orderlay helps restaurants manage orders, tables, and staff effortlessly. QR-based ordering, real-time dashboards, and role-based access for every team member.",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: SITE_URL,
    siteName: SITE_NAME,
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

import Script from "next/script";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        {/* Google Analytics */}
        <Script
          strategy="afterInteractive"
          src="https://www.googletagmanager.com/gtag/js?id=G-GK7Z21PPBJ"
        />
        <Script
          id="google-analytics"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-GK7Z21PPBJ');
            `,
          }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <SoftwareApplicationSchema />
        <Nav/>
        {children}
             {/* Footer */}
      <Footer />
      </body>
    </html>
  );
}
