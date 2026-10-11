import { serviceConfig } from "@/lib/service/config";
export function ServiceJsonLd() {
  const origin = serviceConfig.origin.replace(/\/$/, "");
  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Person",
        "@id": `${origin}/#person`,
        name: "Flavius Cojocaru",
        jobTitle: "Design engineer",
        url: origin,
        email: serviceConfig.email,
        address: {
          "@type": "PostalAddress",
          addressLocality: "Bucharest",
          addressCountry: "RO",
        },
        sameAs: [
          serviceConfig.github,
          serviceConfig.x,
          serviceConfig.linkedin,
        ].filter(Boolean),
      },
      {
        "@type": "ProfessionalService",
        "@id": `${origin}/#service`,
        name: "Flavius design engineering",
        url: origin,
        email: serviceConfig.email,
        founder: { "@id": `${origin}/#person` },
        description: "UI audits and design implementation for React apps.",
        areaServed: "Worldwide",
        hasOfferCatalog: {
          "@type": "OfferCatalog",
          name: "Design engineering services",
          itemListElement: [
            {
              "@type": "Offer",
              name: "Taste audit",
              price: "300",
              priceCurrency: "EUR",
              url: `${origin}/#pricing`,
              itemOffered: { "@type": "Service", name: "One-flow taste audit" },
            },
            {
              "@type": "Offer",
              name: "Polish sprint",
              priceSpecification: {
                "@type": "PriceSpecification",
                minPrice: "1500",
                priceCurrency: "EUR",
              },
              url: `${origin}/#pricing`,
              itemOffered: {
                "@type": "Service",
                name: "UI implementation sprint",
              },
            },
          ],
        },
      },
    ],
  };
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(schema).replace(/</g, "\\u003c"),
      }}
    />
  );
}
