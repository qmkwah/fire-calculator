// src/lib/seo.ts
export interface SEOData {
  title: string;
  description: string;
  keywords?: string;
  author?: string;
  canonicalUrl?: string;
  ogImage?: string;
  publishDate?: string;
  modifiedDate?: string;
}

export function generateMetadata(seo: SEOData, baseUrl: string = process.env.NEXT_PUBLIC_SITE_URL || '') {
  return {
    title: seo.title,
    description: seo.description,
    keywords: seo.keywords,
    authors: seo.author ? [{ name: seo.author }] : undefined,
    publisher: 'FIRE Retirement Calculator',
    
    // Open Graph
    openGraph: {
      title: seo.title,
      description: seo.description,
      url: seo.canonicalUrl ? `${baseUrl}${seo.canonicalUrl}` : baseUrl,
      siteName: 'FIRE Retirement Calculator',
      images: seo.ogImage ? [
        {
          url: `${baseUrl}${seo.ogImage}`,
          width: 1200,
          height: 630,
          alt: seo.title,
        }
      ] : [
        {
          url: `${baseUrl}/og-default.jpg`,
          width: 1200,
          height: 630,
          alt: 'FIRE Retirement Calculator',
        }
      ],
      locale: 'en_US',
      type: 'article',
    },
    
    // Twitter Card
    twitter: {
      card: 'summary_large_image',
      title: seo.title,
      description: seo.description,
      creator: '@yourhandle', // Replace with your Twitter handle
      images: seo.ogImage ? [`${baseUrl}${seo.ogImage}`] : [`${baseUrl}/og-default.jpg`],
    },
    
    // Additional SEO
    alternates: {
      canonical: seo.canonicalUrl ? `${baseUrl}${seo.canonicalUrl}` : baseUrl,
    },
    
    // Structured Data
    other: {
      'article:published_time': seo.publishDate,
      'article:modified_time': seo.modifiedDate,
      'article:author': seo.author,
    }
  };
}

// Pre-defined SEO data for common pages
export const SEO_DATA = {
  homepage: {
    title: 'Free Coast FIRE Calculator - When Can You Stop Saving for Retirement?',
    description: 'Calculate your Coast FIRE number and discover when you can stop saving for retirement. Free calculator with email results and comprehensive FIRE guides.',
    keywords: 'coast fire calculator, fire calculator, financial independence, early retirement, fire number',
    canonicalUrl: '/'
  },
  
  calculator: {
    title: 'Coast FIRE Calculator - Calculate When to Stop Saving | Free Tool',
    description: 'Use our free Coast FIRE calculator to determine how much you need to save now to coast to financial independence. Get detailed results via email.',
    keywords: 'coast fire calculator, retirement calculator, financial independence calculator, fire planning',
    canonicalUrl: '/calculator/coast-fire'
  },
  
  blog: {
    title: 'FIRE Blog - Financial Independence & Early Retirement Guides',
    description: 'Learn about FIRE strategies, Coast FIRE, and early retirement planning with our comprehensive guides and tutorials.',
    keywords: 'fire blog, financial independence blog, early retirement, coast fire guide',
    canonicalUrl: '/blog'
  }
};