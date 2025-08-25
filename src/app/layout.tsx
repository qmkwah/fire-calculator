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
  return (
    <html lang="en">
      <head>
        {/* Google Tag Manager */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-5GRFHHCC');`,
          }}
        />
        {/* End Google Tag Manager */}
        
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
        {/* Google Tag Manager (noscript) */}
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-5GRFHHCC"
            height="0"
            width="0"
            style={{ display: 'none', visibility: 'hidden' }}
          />
        </noscript>
        {/* End Google Tag Manager (noscript) */}
        
        <Navigation />
        {children}
      </body>
    </html>
  );
}