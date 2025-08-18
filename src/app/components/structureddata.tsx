
// Add this component to src/app/components/StructuredData.tsx
export default function StructuredData() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "FIRE Calculator",
    "description": "Free Coast FIRE calculator and financial independence guides. Calculate your path to early retirement with expert FIRE strategies.",
    "url": process.env.NEXT_PUBLIC_SITE_URL || "https://yourfirejourney.com",
    "potentialAction": {
      "@type": "SearchAction",
      "target": {
        "@type": "EntryPoint",
        "urlTemplate": `${process.env.NEXT_PUBLIC_SITE_URL || "https://yourfirejourney.com"}/blog?search={search_term_string}`
      },
      "query-input": "required name=search_term_string"
    },
    "mainEntity": {
      "@type": "WebApplication",
      "name": "Coast FIRE Calculator",
      "description": "Calculate how much you need to save now to coast to financial independence",
      "url": `${process.env.NEXT_PUBLIC_SITE_URL || "https://yourfirejourney.com"}/calculator/coast-fire`,
      "applicationCategory": "FinanceApplication",
      "operatingSystem": "Any",
      "offers": {
        "@type": "Offer",
        "price": "0",
        "priceCurrency": "USD"
      }
    }
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  );
}
