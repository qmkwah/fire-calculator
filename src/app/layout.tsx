import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

import Navigation from './components/Navigation';

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// Get site URL with correct fallback for production
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.yourfirejourney.com';

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: 'FIRE Retirement Calculator - Free Coast FIRE Calculator',
  description: 'Calculate your path to financial independence and early retirement with our free Coast FIRE calculator. Get results via email and learn FIRE strategies.',
  keywords: 'fire calculator, coast fire, financial independence, early retirement, retirement calculator',
  authors: [{ name: 'FIRE Calculator Team' }],
  openGraph: {
    title: 'Free Coast FIRE Calculator - When Can You Stop Saving?',
    description: 'Calculate your Coast FIRE number and discover when you can stop saving for retirement. Free calculator with comprehensive FIRE guides.',
    url: siteUrl,
    siteName: 'FIRE Retirement Calculator',
    images: [
      {
        url: '/og-default.jpg',
        width: 1200,
        height: 630,
        alt: 'FIRE Retirement Calculator',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Free Coast FIRE Calculator',
    description: 'Calculate when you can stop saving for retirement with our free Coast FIRE calculator.',
    images: ['/og-default.jpg'],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // This is processed at build time, not runtime
  const gaId = process.env.NEXT_PUBLIC_GA_ID || 'G-4QZD03LF48';
  
  // For debugging in production
  console.log('🔍 Site URL:', siteUrl);
  console.log('🔍 Environment:', process.env.NODE_ENV);

  return (
    <html lang="en">
      <head>
        {/* Production Google Analytics */}
        {gaId && (
          <>
            <script 
              async 
              src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
            />
            <script
              dangerouslySetInnerHTML={{
                __html: `
                  console.log('🚀 Initializing Google Analytics with ID: ${gaId}');
                  console.log('🌍 Site URL: ${siteUrl}');
                  window.dataLayer = window.dataLayer || [];
                  function gtag(){dataLayer.push(arguments);}
                  gtag('js', new Date());
                  gtag('config', '${gaId}', {
                    page_title: document.title,
                    page_location: window.location.href,
                    send_page_view: true
                  });
                  
                  // Debug info
                  setTimeout(() => {
                    if (typeof gtag === 'function') {
                      console.log('✅ Google Analytics loaded successfully');
                      gtag('event', 'page_view', {
                        event_category: 'debug',
                        event_label: 'production_test',
                        page_location: window.location.href
                      });
                    } else {
                      console.log('❌ Google Analytics failed to load');
                    }
                  }, 3000);
                `,
              }}
            />
          </>
        )}
        
        {/* Structured Data for SEO */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'WebApplication',
              name: 'FIRE Retirement Calculator',
              description: 'Free Coast FIRE calculator to determine when you can stop saving for retirement',
              url: siteUrl,
              applicationCategory: 'FinanceApplication',
              operatingSystem: 'Any',
              offers: {
                '@type': 'Offer',
                price: '0',
                priceCurrency: 'USD'
              },
              provider: {
                '@type': 'Organization',
                name: 'FIRE Calculator Team'
              }
            })
          }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Navigation />
        {children}
      </body>
    </html>
  );
}