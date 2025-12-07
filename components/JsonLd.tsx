import Script from "next/script";

const baseUrl = "https://flavius.pro";

// Person schema - who you are
const personSchema = {
  "@context": "https://schema.org",
  "@type": "Person",
  "@id": `${baseUrl}/#person`,
  name: "Flavius Cojocaru",
  url: baseUrl,
  image: {
    "@type": "ImageObject",
    url: `${baseUrl}/main.png`,
    width: 1200,
    height: 630,
  },
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
    "Full-stack web developer specializing in React, Next.js, and TypeScript. Building modern, performant web applications.",
  knowsAbout: [
    "Web Development",
    "React",
    "Next.js",
    "TypeScript",
    "JavaScript",
    "Tailwind CSS",
    "Node.js",
    "UI/UX Design",
    "Frontend Development",
    "Backend Development",
  ],
  alumniOf: {
    "@type": "Organization",
    name: "Self-taught Developer",
  },
  nationality: {
    "@type": "Country",
    name: "Romania",
  },
};

// WebSite schema - enables sitelinks search box in Google
const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": `${baseUrl}/#website`,
  url: baseUrl,
  name: "Flavius Cojocaru Portfolio",
  description:
    "Portfolio website of Flavius Cojocaru, a full-stack web developer from Romania",
  publisher: {
    "@id": `${baseUrl}/#person`,
  },
  inLanguage: "en-US",
};

// ProfilePage schema - for the main portfolio page
const profilePageSchema = {
  "@context": "https://schema.org",
  "@type": "ProfilePage",
  "@id": `${baseUrl}/#profilepage`,
  url: baseUrl,
  name: "Flavius Cojocaru | Full-Stack Web Developer",
  description:
    "Portfolio and blog of Flavius Cojocaru, featuring projects, testimonials, and thoughts on software development",
  mainEntity: {
    "@id": `${baseUrl}/#person`,
  },
  breadcrumb: {
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: baseUrl,
      },
    ],
  },
};

// Organization schema - for professional presence
const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": `${baseUrl}/#organization`,
  name: "Flavius Cojocaru",
  url: baseUrl,
  logo: {
    "@type": "ImageObject",
    url: `${baseUrl}/main.png`,
    width: 512,
    height: 512,
  },
  founder: {
    "@id": `${baseUrl}/#person`,
  },
  sameAs: [
    "https://twitter.com/flaviuscj1",
    "https://www.linkedin.com/in/flavius-cojocaru-20834a246/",
    "https://github.com/flvvius",
  ],
};

// Combined graph for all schemas
const combinedSchema = {
  "@context": "https://schema.org",
  "@graph": [
    personSchema,
    websiteSchema,
    profilePageSchema,
    organizationSchema,
  ],
};

export default function JsonLd() {
  return (
    <Script
      id="json-ld"
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(combinedSchema) }}
      strategy="afterInteractive"
    />
  );
}

// Export for use in blog pages
export function BlogPostJsonLd({
  title,
  description,
  date,
  slug,
}: {
  title: string;
  description: string;
  date: string;
  slug: string;
}) {
  const blogPostSchema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: title,
    description: description,
    author: {
      "@type": "Person",
      name: "Flavius Cojocaru",
      url: baseUrl,
    },
    datePublished: date,
    dateModified: date,
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${baseUrl}/blog/${slug}`,
    },
    publisher: {
      "@type": "Person",
      name: "Flavius Cojocaru",
      logo: {
        "@type": "ImageObject",
        url: `${baseUrl}/main.png`,
      },
    },
    image: `${baseUrl}/main.png`,
    url: `${baseUrl}/blog/${slug}`,
    inLanguage: "en-US",
    isPartOf: {
      "@type": "Blog",
      name: "Thoughts from the Trenches",
      url: `${baseUrl}/blog`,
    },
  };

  return (
    <Script
      id={`json-ld-blog-${slug}`}
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(blogPostSchema) }}
      strategy="afterInteractive"
    />
  );
}

// Blog listing page schema
export function BlogListJsonLd() {
  const blogSchema = {
    "@context": "https://schema.org",
    "@type": "Blog",
    name: "Thoughts from the Trenches",
    description:
      "Raw reflections on coding, learning, and the emotional rollercoaster of being a developer",
    url: `${baseUrl}/blog`,
    author: {
      "@type": "Person",
      name: "Flavius Cojocaru",
      url: baseUrl,
    },
    publisher: {
      "@type": "Person",
      name: "Flavius Cojocaru",
    },
    inLanguage: "en-US",
  };

  return (
    <Script
      id="json-ld-blog-list"
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(blogSchema) }}
      strategy="afterInteractive"
    />
  );
}
