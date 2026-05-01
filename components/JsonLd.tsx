import { SITE_URL, SUPPORT_EMAIL } from "@/constants/site";

export function SoftwareApplicationSchema() {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "SoftwareApplication",
          name: "Orderlay",
          applicationCategory: "BusinessApplication",
          operatingSystem: "iOS, Android, Web",
          description:
            "Restaurant management software with QR-based ordering, table management, staff roles, and real-time sales dashboards.",
          offers: {
            "@type": "Offer",
            price: "0",
            priceCurrency: "USD",
          },
          url: SITE_URL,
        }),
      }}
    />
  );
}

export function OrganizationSchema() {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Organization",
          name: "Orderlay",
          url: SITE_URL,
          logo: `${SITE_URL}/asset/logo.svg`,
          address: {
            "@type": "PostalAddress",
            addressCountry: "NP",
            addressLocality: "Kathmandu",
          },
          areaServed: {
            "@type": "Country",
            name: "Nepal",
          },
          sameAs: [
            "https://www.facebook.com/profile.php?id=61557919740911",
            "https://www.instagram.com/orderlay.app/",
            "https://www.tiktok.com/@orderlay",
          ],
          contactPoint: {
            "@type": "ContactPoint",
            telephone: "+977-9801753818",
            email: SUPPORT_EMAIL,
            contactType: "customer support",
            url: `${SITE_URL}/contact-us`,
          },
        }),
      }}
    />
  );
}

export function FAQSchema({
  faqs,
}: {
  faqs: { question: string; answer: string }[];
}) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: faqs.map((f) => ({
            "@type": "Question",
            name: f.question,
            acceptedAnswer: {
              "@type": "Answer",
              text: f.answer,
            },
          })),
        }),
      }}
    />
  );
}

export function BreadcrumbSchema({
  items,
}: {
  items: { name: string; item: string }[];
}) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: items.map((breadcrumb, index) => ({
            "@type": "ListItem",
            position: index + 1,
            name: breadcrumb.name,
            item: `${SITE_URL}${breadcrumb.item}`,
          })),
        }),
      }}
    />
  );
}
