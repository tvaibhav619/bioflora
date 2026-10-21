"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Menu,
  X,
  ChevronDown,
  Phone,
  Sparkles,
  Calendar,
  MapPin,
  Clock,
  ArrowRight,
} from "lucide-react";

export default function Header() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [treatmentsDropdownOpen, setTreatmentsDropdownOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  // Close menus on route change
  useEffect(() => {
    setMobileMenuOpen(false);
    setTreatmentsDropdownOpen(false);
  }, [pathname]);

  // Handle scroll styling
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Handle ESC key for mobile menu
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && mobileMenuOpen) {
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [mobileMenuOpen]);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileMenuOpen]);

  const treatmentCategories = [
    {
      name: "Neuromodulators & Dermal Fillers",
      href: "/treatments/category/injectables-neurotoxins",
      description: "Botox, Sculptra, Restylane, anatomical micro-dosing",
    },
    {
      name: "Regenerative Skin Rejuvenation",
      href: "/treatments/category/skin-rejuvenation",
      description: "Morpheus8 RF microneedling, PRP neocollagenesis",
    },
    {
      name: "Precision Laser & Phototherapy",
      href: "/treatments/category/laser-phototherapy",
      description: "Sciton BBL HERO photofacial, fractional clearing",
    },
    {
      name: "Clinical Facials & Hydration",
      href: "/treatments/category/facials-hydration",
      description: "Signature Botanical Hydrafacial, medical peels",
    },
    {
      name: "Cellular Longevity & IV Nutrients",
      href: "/treatments/category/cellular-wellness",
      description: "NAD+ infusions, antioxidant cellular therapy",
    },
  ];

  return (
    <>
      <header
        className={`sticky top-0 z-40 w-full py-2.5 sm:py-3 transition-colors duration-200 ${
          isScrolled
            ? "bg-ivory/95 backdrop-blur-md shadow-sm border-b border-stone/60"
            : "bg-ivory border-b border-stone/40"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-2 lg:gap-4 xl:gap-6">
          {/* Logo */}
          <Link
            href="/"
            className="group flex flex-col items-start focus:outline-none shrink-0"
            aria-label="Bioflora Medical Spa Home"
          >
            <span className="font-serif-luxury text-xl sm:text-2xl font-normal tracking-[0.2em] text-forest group-hover:text-champagne-dark transition-colors whitespace-nowrap">
              BIOFLORA
            </span>
            <span className="text-[8px] sm:text-[9px] uppercase tracking-[0.35em] text-charcoal-muted -mt-0.5 font-medium whitespace-nowrap">
              Medical Spa &bull; Sanctuary
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav
            aria-label="Main Navigation"
            className="hidden lg:flex items-center justify-center gap-2.5 xl:gap-5 2xl:gap-6"
          >
            {/* Treatments Mega-Dropdown */}
            <div
              className="relative"
              onMouseEnter={() => setTreatmentsDropdownOpen(true)}
              onMouseLeave={() => setTreatmentsDropdownOpen(false)}
            >
              <button
                type="button"
                className={`flex items-center gap-1 text-[11px] xl:text-xs font-semibold uppercase tracking-wider transition-colors py-1.5 whitespace-nowrap ${
                  pathname.startsWith("/treatments")
                    ? "text-forest border-b-2 border-champagne"
                    : "text-charcoal hover:text-champagne-dark"
                }`}
                aria-expanded={treatmentsDropdownOpen}
                onClick={() => setTreatmentsDropdownOpen(!treatmentsDropdownOpen)}
              >
                <span>Treatments</span>
                <ChevronDown className="w-3.5 h-3.5 transition-transform duration-200 shrink-0" />
              </button>

              {/* Dropdown panel */}
              {treatmentsDropdownOpen && (
                <div className="absolute top-full -left-12 w-96 bg-white border border-stone shadow-xl rounded-lg p-5 z-50 animate-in fade-in slide-in-from-top-2 duration-200">
                  <div className="text-[10px] uppercase font-bold tracking-widest text-champagne-dark mb-3">
                    Treatment Categories
                  </div>
                  <div className="space-y-3">
                    {treatmentCategories.map((cat) => (
                      <Link
                        key={cat.href}
                        href={cat.href}
                        className="block p-2 rounded-md hover:bg-sage-light transition-colors group"
                      >
                        <div className="text-xs font-semibold text-forest group-hover:text-champagne-dark">
                          {cat.name}
                        </div>
                        <div className="text-[11px] text-charcoal-muted mt-0.5">
                          {cat.description}
                        </div>
                      </Link>
                    ))}
                  </div>

                  <div className="border-t border-stone/50 mt-4 pt-3 flex items-center justify-between">
                    <Link
                      href="/treatments"
                      className="text-xs font-medium text-forest hover:text-champagne-dark flex items-center gap-1"
                    >
                      Browse Complete Catalogue
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                    <Link
                      href="/concerns"
                      className="text-xs font-medium text-charcoal-muted hover:text-forest"
                    >
                      By Concern
                    </Link>
                  </div>
                </div>
              )}
            </div>

            <Link
              href="/concerns"
              className={`text-[11px] xl:text-xs font-semibold uppercase tracking-wider transition-colors py-1.5 whitespace-nowrap ${
                pathname === "/concerns"
                  ? "text-forest border-b-2 border-champagne"
                  : "text-charcoal hover:text-champagne-dark"
              }`}
            >
              Concerns
            </Link>

            <Link
              href="/about"
              className={`text-[11px] xl:text-xs font-semibold uppercase tracking-wider transition-colors py-1.5 whitespace-nowrap ${
                pathname === "/about"
                  ? "text-forest border-b-2 border-champagne"
                  : "text-charcoal hover:text-champagne-dark"
              }`}
            >
              About
            </Link>

            <Link
              href="/team"
              className={`text-[11px] xl:text-xs font-semibold uppercase tracking-wider transition-colors py-1.5 whitespace-nowrap ${
                pathname === "/team"
                  ? "text-forest border-b-2 border-champagne"
                  : "text-charcoal hover:text-champagne-dark"
              }`}
            >
              Team
            </Link>

            <Link
              href="/pricing"
              className={`text-[11px] xl:text-xs font-semibold uppercase tracking-wider transition-colors py-1.5 whitespace-nowrap ${
                pathname === "/pricing" || pathname === "/offers"
                  ? "text-forest border-b-2 border-champagne"
                  : "text-charcoal hover:text-champagne-dark"
              }`}
            >
              Pricing
            </Link>

            <Link
              href="/locations"
              className={`text-[11px] xl:text-xs font-semibold uppercase tracking-wider transition-colors py-1.5 whitespace-nowrap ${
                pathname.startsWith("/locations")
                  ? "text-forest border-b-2 border-champagne"
                  : "text-charcoal hover:text-champagne-dark"
              }`}
            >
              Locations
            </Link>

            <Link
              href="/journal"
              className={`text-[11px] xl:text-xs font-semibold uppercase tracking-wider transition-colors py-1.5 whitespace-nowrap ${
                pathname.startsWith("/journal")
                  ? "text-forest border-b-2 border-champagne"
                  : "text-charcoal hover:text-champagne-dark"
              }`}
            >
              Journal
            </Link>
          </nav>

          {/* Right Action Utilities */}
          <div className="hidden lg:flex items-center shrink-0 gap-2.5 xl:gap-4">
            <a
              href="tel:8005550198"
              className="hidden xl:flex items-center gap-1.5 text-xs font-medium text-charcoal hover:text-forest transition-colors whitespace-nowrap shrink-0"
              aria-label="Call clinic directly at (800) 555-0198"
            >
              <Phone className="w-3.5 h-3.5 text-champagne-dark shrink-0" />
              <span className="whitespace-nowrap">(800) 555-0198</span>
            </a>

            <Link
              href="/booking"
              className="inline-flex items-center gap-1.5 bg-forest hover:bg-forest-dark text-ivory px-4 py-2 rounded-full text-xs font-semibold uppercase tracking-wider transition-all duration-200 shadow-sm hover:shadow whitespace-nowrap shrink-0"
            >
              <Calendar className="w-3.5 h-3.5 text-champagne shrink-0" />
              <span className="whitespace-nowrap">Book Consultation</span>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            type="button"
            className="lg:hidden p-2 text-forest hover:text-champagne-dark focus:outline-none"
            aria-label={mobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}
            aria-expanded={mobileMenuOpen}
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </header>

      {/* Mobile Drawer Overlay */}
      {mobileMenuOpen && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 bg-charcoal/60 backdrop-blur-sm lg:hidden animate-in fade-in"
          onClick={() => setMobileMenuOpen(false)}
        >
          <div
            className="fixed inset-y-0 right-0 max-w-sm w-full bg-ivory shadow-2xl p-6 flex flex-col justify-between overflow-y-auto animate-in slide-in-from-right duration-300"
            onClick={(e) => e.stopPropagation()}
          >
            <div>
              {/* Drawer Top */}
              <div className="flex items-center justify-between pb-4 border-b border-stone">
                <span className="font-serif-luxury text-xl font-normal tracking-[0.2em] text-forest">
                  BIOFLORA
                </span>
                <button
                  type="button"
                  className="p-1 text-charcoal-muted hover:text-charcoal"
                  onClick={() => setMobileMenuOpen(false)}
                  aria-label="Close navigation"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              {/* Mobile Links */}
              <nav className="mt-6 space-y-4">
                <div>
                  <div className="text-[10px] uppercase font-bold tracking-widest text-champagne-dark mb-2">
                    Services
                  </div>
                  <Link
                    href="/treatments"
                    className="block text-base font-serif-luxury font-medium text-forest hover:text-champagne-dark py-1"
                  >
                    All Treatments
                  </Link>
                  <div className="pl-3 space-y-2 mt-2 border-l border-stone">
                    {treatmentCategories.map((cat) => (
                      <Link
                        key={cat.href}
                        href={cat.href}
                        className="block text-xs text-charcoal hover:text-forest"
                      >
                        {cat.name}
                      </Link>
                    ))}
                  </div>
                </div>

                <div className="pt-2 border-t border-stone/50 space-y-3">
                  <Link
                    href="/concerns"
                    className="block text-sm font-medium text-charcoal hover:text-forest"
                  >
                    Skin Concerns & Goals
                  </Link>
                  <Link
                    href="/about"
                    className="block text-sm font-medium text-charcoal hover:text-forest"
                  >
                    About Bioflora
                  </Link>
                  <Link
                    href="/team"
                    className="block text-sm font-medium text-charcoal hover:text-forest"
                  >
                    Meet the Team
                  </Link>
                  <Link
                    href="/pricing"
                    className="block text-sm font-medium text-charcoal hover:text-forest"
                  >
                    Pricing & Packages
                  </Link>
                  <Link
                    href="/memberships"
                    className="block text-sm font-medium text-charcoal hover:text-forest"
                  >
                    Memberships
                  </Link>
                  <Link
                    href="/locations"
                    className="block text-sm font-medium text-charcoal hover:text-forest"
                  >
                    Locations & Hours
                  </Link>
                  <Link
                    href="/journal"
                    className="block text-sm font-medium text-charcoal hover:text-forest"
                  >
                    Clinical Journal
                  </Link>
                  <Link
                    href="/consultation"
                    className="block text-sm font-medium text-charcoal hover:text-forest"
                  >
                    Request Consultation
                  </Link>
                </div>
              </nav>
            </div>

            {/* Bottom Actions */}
            <div className="pt-6 border-t border-stone mt-6 space-y-3">
              <a
                href="tel:8005550198"
                className="flex items-center justify-center gap-2 w-full py-2.5 border border-forest text-forest rounded-full text-xs font-semibold uppercase tracking-wider"
              >
                <Phone className="w-3.5 h-3.5" />
                Call (800) 555-0198
              </a>

              <Link
                href="/booking"
                className="flex items-center justify-center gap-2 w-full py-2.5 bg-forest text-ivory rounded-full text-xs font-semibold uppercase tracking-wider shadow"
              >
                <Calendar className="w-3.5 h-3.5 text-champagne" />
                Book Online
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* Restrained mobile bottom bar */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 z-30 bg-ivory/95 backdrop-blur-md border-t border-stone/80 p-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] shadow-lg">
        <div className="flex items-center gap-3 max-w-md mx-auto">
          <a
            href="tel:8005550198"
            className="flex-1 py-2.5 px-3 border border-stone bg-white rounded-lg text-center text-xs font-semibold text-charcoal flex items-center justify-center gap-1.5"
          >
            <Phone className="w-3.5 h-3.5 text-champagne-dark" />
            <span>Call Clinic</span>
          </a>
          <Link
            href="/booking"
            className="flex-1 py-2.5 px-3 bg-forest text-ivory rounded-lg text-center text-xs font-semibold uppercase tracking-wider flex items-center justify-center gap-1.5 shadow"
          >
            <Calendar className="w-3.5 h-3.5 text-champagne" />
            <span>Book Visit</span>
          </Link>
        </div>
      </div>
    </>
  );
}
