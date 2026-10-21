"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Phone, Mail, MapPin, Clock, ShieldCheck, HeartHandshake } from "lucide-react";

export default function Footer() {
  const [currentYear, setCurrentYear] = useState<number>(2026);

  useEffect(() => {
    setCurrentYear(new Date().getFullYear());
  }, []);

  const openCookiePreferences = () => {
    if (typeof window !== "undefined") {
      window.dispatchEvent(new CustomEvent("bioflora-open-cookies"));
    }
  };

  return (
    <footer className="bg-forest-dark text-ivory/80 pt-10 pb-16 lg:pb-8 border-t border-champagne/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 pb-8 border-b border-ivory/10">
          {/* Col 1: Brand & Philosophy */}
          <div className="lg:col-span-2 space-y-4">
            <Link href="/" className="inline-block">
              <span className="font-serif-luxury text-3xl font-normal tracking-[0.25em] text-ivory">
                BIOFLORA
              </span>
              <span className="block text-[10px] uppercase tracking-[0.4em] text-champagne font-medium mt-0.5">
                Medical Spa &bull; Sanctuary
              </span>
            </Link>
            <p className="text-xs text-ivory/70 leading-relaxed max-w-sm">
              Clinician-guided aesthetic medicine, botanical facial wellness, and evidence-based skin rejuvenation. Where anatomical precision meets quiet, natural luxury.
            </p>
            <div className="flex items-center gap-2 pt-2 text-xs text-champagne">
              <ShieldCheck className="w-4 h-4 text-champagne" />
              <span>Doctor-Directed &bull; Licensed Medical Staff</span>
            </div>
          </div>

          {/* Col 2: Treatments */}
          <div className="space-y-3">
            <h4 className="font-serif-luxury text-sm font-semibold tracking-wider text-ivory uppercase">
              Treatments
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link
                  href="/treatments/category/injectables-neurotoxins"
                  className="hover:text-champagne transition-colors"
                >
                  Neuromodulators & Botox
                </Link>
              </li>
              <li>
                <Link
                  href="/treatments/category/skin-rejuvenation"
                  className="hover:text-champagne transition-colors"
                >
                  Morpheus8 RF Remodeling
                </Link>
              </li>
              <li>
                <Link
                  href="/treatments/category/laser-phototherapy"
                  className="hover:text-champagne transition-colors"
                >
                  Sciton BBL Photofacial
                </Link>
              </li>
              <li>
                <Link
                  href="/treatments/category/facials-hydration"
                  className="hover:text-champagne transition-colors"
                >
                  Botanical Hydrafacial
                </Link>
              </li>
              <li>
                <Link
                  href="/treatments/category/cellular-wellness"
                  className="hover:text-champagne transition-colors"
                >
                  NAD+ Cellular Longevity
                </Link>
              </li>
              <li>
                <Link
                  href="/treatments"
                  className="text-champagne hover:underline inline-block pt-1 font-medium"
                >
                  View Complete Catalogue &rarr;
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Navigation */}
          <div className="space-y-3">
            <h4 className="font-serif-luxury text-sm font-semibold tracking-wider text-ivory uppercase">
              Explore
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="/about" className="hover:text-champagne transition-colors">
                  Philosophy & Safety
                </Link>
              </li>
              <li>
                <Link href="/team" className="hover:text-champagne transition-colors">
                  Clinical Providers
                </Link>
              </li>
              <li>
                <Link href="/concerns" className="hover:text-champagne transition-colors">
                  Skin Concerns Guide
                </Link>
              </li>
              <li>
                <Link href="/pricing" className="hover:text-champagne transition-colors">
                  Service Pricing
                </Link>
              </li>
              <li>
                <Link href="/offers" className="hover:text-champagne transition-colors">
                  Seasonal Packages
                </Link>
              </li>
              <li>
                <Link href="/memberships" className="hover:text-champagne transition-colors">
                  The Flora Society
                </Link>
              </li>
              <li>
                <Link href="/journal" className="hover:text-champagne transition-colors">
                  Clinical Journal
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 4: Clinics */}
          <div className="space-y-3">
            <h4 className="font-serif-luxury text-sm font-semibold tracking-wider text-ivory uppercase">
              Sanctuaries
            </h4>
            <div className="space-y-3 text-xs">
              <div>
                <p className="font-medium text-ivory">Beverly Hills Flagship</p>
                <p className="text-ivory/60">420 N Camden Dr, Suite 300</p>
                <a href="tel:3105550192" className="text-champagne hover:underline text-[11px] block mt-0.5">
                  (310) 555-0192
                </a>
              </div>
              <div>
                <p className="font-medium text-ivory">Tribeca Atelier</p>
                <p className="text-ivory/60">174 Franklin St, Penthouse</p>
                <a href="tel:2125550144" className="text-champagne hover:underline text-[11px] block mt-0.5">
                  (212) 555-0144
                </a>
              </div>
              <div className="pt-2">
                <Link
                  href="/locations"
                  className="text-xs text-champagne hover:underline flex items-center gap-1 font-medium"
                >
                  <MapPin className="w-3.5 h-3.5" />
                  Hours, Maps & Valet
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Clinical Disclaimer Notice */}
        <div className="py-3.5 border-b border-ivory/10 text-[11px] text-ivory/60 leading-relaxed space-y-1.5">
          <p>
            <strong className="text-ivory/80">Clinical Medical Disclaimer:</strong> The content published on this website is for educational and informational purposes only. Bioflora is an illustrative portfolio demonstration website. All medical and aesthetic procedures require an in-person diagnostic assessment, medical clearance, and informed consent administered by a licensed healthcare provider. Results vary per individual anatomy.
          </p>
          <p>
            We do not collect protected health information (PHI) or private medical histories via public website marketing forms. For confidential patient communications, please use the clinic&apos;s designated secure patient portal.
          </p>
        </div>

        {/* Bottom Legal & Compliance Links */}
        <div className="pt-3.5 flex flex-col md:flex-row items-center justify-between gap-3 text-xs text-ivory/60">
          <p>&copy; {currentYear} BIOFLORA Medical Spa. All rights reserved.</p>

          <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-[11px]">
            <Link href="/privacy" className="hover:text-champagne transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms" className="hover:text-champagne transition-colors">
              Terms of Use
            </Link>
            <button
              onClick={openCookiePreferences}
              className="hover:text-champagne transition-colors underline focus:outline-none"
            >
              Cookie Preferences
            </button>
            <Link href="/accessibility" className="hover:text-champagne transition-colors">
              Accessibility Statement
            </Link>
            <Link href="/medical-disclaimer" className="hover:text-champagne transition-colors">
              Medical Disclaimer
            </Link>
            <Link href="/cancellation-policy" className="hover:text-champagne transition-colors">
              Cancellation & Deposits
            </Link>
            <Link href="/patient-privacy" className="hover:text-champagne transition-colors">
              Patient Privacy (HIPAA)
            </Link>
            <Link href="/admin" className="text-champagne/80 hover:text-champagne font-mono">
              [Admin]
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
