import type { Metadata, Viewport } from "next";
import { Suspense } from "react";
import { Cormorant_Garamond, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import DemonstrationBanner from "@/components/layout/DemonstrationBanner";
import CookieConsent from "@/components/compliance/CookieConsent";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#183B32",
};

const serifFont = Cormorant_Garamond({
  variable: "--font-serif",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

const sansFont = Plus_Jakarta_Sans({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    template: "%s | BIOFLORA Medical Spa",
    default: "BIOFLORA — Luxury Medical Spa & Aesthetic Sanctuary",
  },
  description:
    "Discover clinician-guided aesthetic medicine, botanical facial wellness, and restorative skin rejuvenation at Bioflora's luxury clinics in Beverly Hills & Tribeca.",
  keywords: [
    "medical spa",
    "aesthetic medicine",
    "clinical skincare",
    "botox Beverly Hills",
    "laser skin rejuvenation",
    "hydrafacial Tribeca",
    "bioflora med spa",
  ],
  authors: [{ name: "Bioflora Clinical Team" }],
  openGraph: {
    title: "BIOFLORA — Luxury Medical Spa & Aesthetic Sanctuary",
    description:
      "Clinician-guided aesthetic treatments, transparent service information, and bespoke skin rejuvenation.",
    url: "https://bioflora-medspa.example.com",
    siteName: "BIOFLORA",
    locale: "en_US",
    type: "website",
  },
  icons: {
    icon: [
      { url: "/icon.svg", type: "image/svg+xml" },
    ],
    apple: [
      { url: "/icon.svg", type: "image/svg+xml" },
    ],
  },
  metadataBase: new URL("https://bioflora-medspa.example.com"),
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${serifFont.variable} ${sansFont.variable} h-full antialiased`}
    >
      <head>
        <link rel="preconnect" href="https://images.unsplash.com" />
        <link rel="dns-prefetch" href="https://images.unsplash.com" />
      </head>
      <body className="min-h-full flex flex-col bg-ivory text-charcoal font-sans selection:bg-champagne-light selection:text-forest overflow-x-hidden w-full pb-16 lg:pb-0">
        {/* Demonstration Mode Notice for Portfolio Showcase */}
        <DemonstrationBanner />
        
        {/* Site Global Header with Mega-Menu & Quick Booking CTA */}
        <Suspense fallback={<div className="h-16 bg-ivory border-b border-stone/40" />}>
          <Header />
        </Suspense>

        {/* Main Content Area */}
        <main id="main-content" className="flex-1 flex flex-col">
          {children}
        </main>

        {/* Global Footer */}
        <Footer />

        {/* WCAG & GDPR/CCPA Compliant Cookie Preference Manager */}
        <CookieConsent />
      </body>
    </html>
  );
}
