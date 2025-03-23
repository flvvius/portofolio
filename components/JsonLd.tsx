import Script from "next/script";

export default function JsonLd() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Flavius Cojocaru",
    url: "https://flavius.pro",
    image: "https://flavius.pro/main.png",
    sameAs: [
      "https://twitter.com/flaviuscj1",
      "https://www.linkedin.com/in/flavius-cojocaru-20834a246/",
      "https://github.com/flvvius",
      "https://www.instagram.com/flaviuscj/",
    ],
    jobTitle: "Full-Stack Web Developer",
    worksFor: {
      "@type": "Organization",
      name: "Self-employed",
    },
    description:
      "building stuff that matters | coding idealist, thirst for knowledge and working on becoming better, romania based, wanting to shape my future",
    knowsAbout: [
      "Web Development",
      "React",
      "Next.js",
      "TypeScript",
      "JavaScript",
      "Tailwind CSS",
      "Node.js",
      "UI/UX Design",
    ],
    offers: {
      "@type": "Offer",
      description: "Full-stack web development services",
      availability: "https://schema.org/InStock",
    },
  };

  return (
    <Script
      id="json-ld"
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      strategy="afterInteractive"
    />
  );
}
