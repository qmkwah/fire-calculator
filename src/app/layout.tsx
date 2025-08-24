import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { GoogleAnalytics } from '@next/third-parties/google';
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

export const metadata: Metadata = {
  title: 'FIRE Retirement Calculator - Free Coast FIRE Calculator',
  description: 'Calculate your path to financial independence and early retirement with our free Coast FIRE calculator. Get results via email and learn FIRE strategies.',
  keywords: 'fire calculator, coast fire, financial independence, early retirement, retirement calculator',
  authors: [{ name: 'FIRE Calculator Team' }],
  openGraph: {
    title: 'Free Coast FIRE Calculator - When Can You Stop Saving?',
    description: 'Calculate your Coast FIRE number and discover when you can stop saving for retirement. Free calculator with comprehensive FIRE guides.',
    url: process.env.NEXT_PUBLIC_SITE_URL,
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
  const gaId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID || process.env.NEXT_PUBLIC_GA_ID;
  
  return (
    <html lang="en">
      <head>
        {/* Structured Data for SEO */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'WebApplication',
              name: 'FIRE Retirement Calculator',
              description: 'Free Coast FIRE calculator to determine when you can stop saving for retirement',
              url: process.env.NEXT_PUBLIC_SITE_URL,
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
        
        {/* Google Analytics */}
        {gaId && <GoogleAnalytics gaId={gaId} />}
      </body>
    </html>
  );
}