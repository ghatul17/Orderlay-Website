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
          url: "https://orderlay.com",
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
          url: "https://orderlay.com",
          logo: "https://orderlay.com/asset/logo.svg",
          sameAs: [
            "https://www.facebook.com/profile.php?id=61557919740911",
            "https://www.instagram.com/orderlay.app/",
            "https://www.tiktok.com/@orderlay",
          ],
          contactPoint: {
            "@type": "ContactPoint",
            telephone: "+977-9801753818",
            email: "hello@orderlay.app",
            contactType: "customer support",
            url: "https://orderlay.com/contact-us",
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
