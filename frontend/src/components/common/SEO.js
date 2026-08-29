import React from "react";
import { Helmet } from "react-helmet-async";
import { COMPANY, ADDRESS_LINES } from "@/lib/site";

const SITE_URL = "https://www.maxekindia.com";
const OG_IMAGE = `${SITE_URL}/assets/logos/maxek-logo-dark.png`;

export const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": `${SITE_URL}/#organization`,
  name: COMPANY.legalName,
  alternateName: "MAXEK",
  url: SITE_URL,
  logo: OG_IMAGE,
  description: COMPANY.summary,
  email: COMPANY.businessEmail,
  telephone: COMPANY.phone,
  address: {
    "@type": "PostalAddress",
    streetAddress: `${COMPANY.address.line1}, ${COMPANY.address.line2}, ${COMPANY.address.line3}`,
    addressLocality: COMPANY.address.city,
    addressRegion: COMPANY.address.state,
    postalCode: COMPANY.address.postalCode,
    addressCountry: "IN",
  },
  sameAs: COMPANY.social.map((s) => s.href),
};

export const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "@id": `${SITE_URL}/#localbusiness`,
  name: COMPANY.legalName,
  image: OG_IMAGE,
  url: SITE_URL,
  telephone: COMPANY.phone,
  email: COMPANY.businessEmail,
  priceRange: "$$$",
  address: organizationSchema.address,
  geo: {
    "@type": "GeoCoordinates",
    latitude: COMPANY.geo.lat,
    longitude: COMPANY.geo.lng,
  },
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
      opens: "09:00",
      closes: "18:00",
    },
  ],
  description: ADDRESS_LINES.join(", "),
};

export const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": `${SITE_URL}/#website`,
  url: SITE_URL,
  name: `${COMPANY.legalName} | ${COMPANY.tagline}`,
  publisher: { "@id": `${SITE_URL}/#organization` },
};

export const breadcrumbSchema = (trail) => ({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: trail.map((item, i) => ({
    "@type": "ListItem",
    position: i + 1,
    name: item.label,
    item: `${SITE_URL}${item.to}`,
  })),
});

export const faqSchema = (faqs) => ({
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: { "@type": "Answer", text: f.a },
  })),
});

export const serviceSchema = ({ name, description, path, items }) => ({
  "@context": "https://schema.org",
  "@type": "Service",
  name,
  description,
  url: `${SITE_URL}${path}`,
  provider: { "@id": `${SITE_URL}/#organization` },
  areaServed: { "@type": "Country", name: "India" },
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name,
    itemListElement: (items || []).map((i) => ({
      "@type": "Offer",
      itemOffered: { "@type": "Service", name: i },
    })),
  },
});

export const articleSchema = (article) => ({
  "@context": "https://schema.org",
  "@type": "Article",
  headline: article.title,
  description: article.excerpt,
  image: article.image,
  datePublished: article.published_on,
  author: { "@type": "Organization", name: article.author || "MAXEK" },
  publisher: { "@id": `${SITE_URL}/#organization` },
  mainEntityOfPage: `${SITE_URL}/knowledge-center/${article.slug}`,
});

export const jobPostingSchema = (job) => ({
  "@context": "https://schema.org",
  "@type": "JobPosting",
  title: job.title,
  description: job.summary,
  datePosted: job.posted_on,
  employmentType: job.employment_type,
  hiringOrganization: {
    "@type": "Organization",
    name: COMPANY.legalName,
    sameAs: SITE_URL,
    logo: OG_IMAGE,
  },
  jobLocation: {
    "@type": "Place",
    address: {
      "@type": "PostalAddress",
      addressLocality: job.location,
      addressCountry: "IN",
    },
  },
  experienceRequirements: job.experience,
});

export const videoSchema = {
  "@context": "https://schema.org",
  "@type": "VideoObject",
  name: "MAXEK India — Integrated Engineering Group",
  description:
    "Engineering Tomorrow. Building Sustainable Growth. An introduction to MAXEK India Private Limited.",
  thumbnailUrl: [OG_IMAGE],
  contentUrl: `${SITE_URL}/assets/video/maxek-hero.mp4`,
  uploadDate: "2025-01-01",
};

export const imageObjectSchema = (projects) => ({
  "@context": "https://schema.org",
  "@type": "ItemList",
  itemListElement: projects.map((p, i) => ({
    "@type": "ListItem",
    position: i + 1,
    item: {
      "@type": "ImageObject",
      contentUrl: p.image?.startsWith("http") ? p.image : `${SITE_URL}${p.image}`,
      name: p.title,
      description: p.summary,
    },
  })),
});

export const personSchema = (people) => ({
  "@context": "https://schema.org",
  "@type": "ItemList",
  itemListElement: people.map((p, i) => ({
    "@type": "ListItem",
    position: i + 1,
    item: {
      "@type": "Person",
      jobTitle: p.role,
      description: p.focus,
      worksFor: { "@id": `${SITE_URL}/#organization` },
    },
  })),
});

/**
 * Per-page SEO head: title, description, canonical, Open Graph,
 * Twitter Cards and JSON-LD structured data.
 */
export default function SEO({
  title,
  description,
  path = "/",
  image = OG_IMAGE,
  type = "website",
  keywords,
  schemas = [],
  noindex = false,
}) {
  const url = `${SITE_URL}${path}`;
  const allSchemas = [websiteSchema, organizationSchema, ...schemas];

  return (
    <Helmet prioritizeSeoTags>
      <title>{title}</title>
      <meta name="description" content={description} />
      {keywords ? <meta name="keywords" content={keywords} /> : null}
      <link rel="canonical" href={url} />
      {noindex ? <meta name="robots" content="noindex,follow" /> : (
        <meta name="robots" content="index,follow,max-image-preview:large" />
      )}

      <meta property="og:type" content={type} />
      <meta property="og:site_name" content={COMPANY.legalName} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={url} />
      <meta property="og:image" content={image} />
      <meta property="og:locale" content="en_IN" />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />

      <script type="application/ld+json">{JSON.stringify(allSchemas)}</script>
    </Helmet>
  );
}
