"use client";

import Link from "next/link";
import { ArrowLeft, Cookie, Settings2 } from "lucide-react";

export default function CookiesPolicyPage() {
  const openPreferences = () => {
    if (typeof window !== "undefined") {
      window.dispatchEvent(new CustomEvent("bioflora-open-cookies"));
    }
  };

  return (
    <div className="py-8 sm:py-12 bg-ivory min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-xs text-charcoal-muted hover:text-forest transition-colors font-medium"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Return Home</span>
        </Link>

        <div className="space-y-3">
          <span className="text-xs font-semibold uppercase tracking-widest text-champagne-dark">
            Data Privacy
          </span>
          <h1 className="font-serif-luxury text-4xl sm:text-5xl font-normal text-forest">
            Cookie Policy
          </h1>
          <p className="text-xs text-charcoal-muted font-mono">
            Full Transparency on Local Storage &amp; Cookie Usage
          </p>
        </div>

        <div className="bg-white border border-stone p-8 sm:p-12 rounded-3xl shadow-sm text-xs sm:text-sm text-charcoal leading-relaxed space-y-6">
          <div className="p-4 bg-sage-light/60 rounded-xl border border-sage flex items-center justify-between">
            <div className="flex items-center gap-2 text-forest">
              <Cookie className="w-5 h-5 text-champagne-dark" />
              <span className="font-semibold text-xs">Manage Your Active Preferences</span>
            </div>
            <button
              onClick={openPreferences}
              className="px-4 py-1.5 bg-forest text-ivory text-xs font-semibold rounded-full hover:bg-forest-dark transition-colors"
            >
              Adjust Settings
            </button>
          </div>

          <section className="space-y-2">
            <h2 className="font-serif-luxury text-xl text-forest font-medium">
              1. What Are Cookies?
            </h2>
            <p>
              Cookies are small text files placed on your computer or mobile device by websites that you visit. They are widely used to make websites work efficiently, provide secure authentication, and supply reporting telemetry.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="font-serif-luxury text-xl text-forest font-medium">
              2. Categories of Cookies We Use
            </h2>
            <ul className="list-disc pl-5 space-y-2 text-charcoal-muted">
              <li>
                <strong>Essential / Strictly Necessary:</strong> Required for application security, session authorization, CSRF protection, and reservation data persistence. These cannot be disabled.
              </li>
              <li>
                <strong>Analytics &amp; Performance:</strong> Anonymous, aggregated statistics measuring page load times, layout shifts, and route interactions. Disabled by default until you grant consent.
              </li>
              <li>
                <strong>Personalization:</strong> Remembers your preferred location and sanctuary choices across return visits.
              </li>
            </ul>
          </section>

          <section className="space-y-2">
            <h2 className="font-serif-luxury text-xl text-forest font-medium">
              3. Absence of Invasive Advertising Trackers
            </h2>
            <p>
              We do not permit third-party advertising brokers or social network tracking pixels on our booking flows or health concern exploratory guides.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
