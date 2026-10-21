"use client";

import { useState, useEffect } from "react";
import { Cookie, Shield, Check, X, Settings2 } from "lucide-react";
import Link from "next/link";

interface CookiePreferences {
  essential: boolean;
  analytics: boolean;
  marketing: boolean;
  timestamp: string;
}

export default function CookieConsent() {
  const [isOpen, setIsOpen] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [preferences, setPreferences] = useState<CookiePreferences>({
    essential: true,
    analytics: false,
    marketing: false,
    timestamp: "",
  });

  useEffect(() => {
    const saved = localStorage.getItem("bioflora_cookie_consent");
    if (saved) {
      try {
        setPreferences(JSON.parse(saved));
      } catch (e) {
        console.error(e);
      }
    } else {
      // Delay prompt slightly for a smooth page load
      const timer = setTimeout(() => setIsOpen(true), 1200);
      return () => clearTimeout(timer);
    }

    // Listen for custom trigger to reopen modal (e.g., from footer)
    const handleReopen = () => {
      setShowModal(true);
      setIsOpen(true);
    };

    window.addEventListener("bioflora-open-cookies", handleReopen);
    return () => window.removeEventListener("bioflora-open-cookies", handleReopen);
  }, []);

  const saveConsent = (prefs: CookiePreferences) => {
    const updated = { ...prefs, timestamp: new Date().toISOString() };
    setPreferences(updated);
    localStorage.setItem("bioflora_cookie_consent", JSON.stringify(updated));
    setIsOpen(false);
    setShowModal(false);
  };

  const acceptAll = () => {
    saveConsent({
      essential: true,
      analytics: true,
      marketing: true,
      timestamp: "",
    });
  };

  const rejectNonEssential = () => {
    saveConsent({
      essential: true,
      analytics: false,
      marketing: false,
      timestamp: "",
    });
  };

  if (!isOpen && !showModal) return null;

  return (
    <>
      {/* Mini Banner at bottom */}
      {!showModal && (
        <aside
          role="region"
          aria-label="Cookie consent options"
          className="fixed bottom-20 lg:bottom-4 left-4 right-4 md:left-6 md:right-auto md:max-w-md z-50 bg-white border border-stone shadow-2xl p-5 rounded-lg text-charcoal animate-in fade-in slide-in-from-bottom-5 duration-300"
        >
          <div className="flex items-start gap-3">
            <div className="p-2 bg-sage rounded-md text-forest mt-0.5">
              <Cookie className="w-5 h-5" />
            </div>
            <div className="flex-1">
              <h3 className="font-serif-luxury font-medium text-lg text-forest">
                Privacy & Cookie Preferences
              </h3>
              <p className="text-xs text-charcoal-muted mt-1 leading-relaxed">
                We use essential cookies to maintain security and enable booking journeys. We also invite you to consent to privacy-conscious analytics. Learn more in our{" "}
                <Link href="/cookies" className="underline text-forest font-medium hover:text-champagne-dark">
                  Cookie Policy
                </Link>.
              </p>

              <div className="flex flex-wrap items-center gap-2 mt-4">
                <button
                  onClick={acceptAll}
                  className="px-3 py-1.5 bg-forest hover:bg-forest-dark text-ivory text-xs font-medium rounded transition-colors shadow-sm"
                >
                  Accept All
                </button>
                <button
                  onClick={rejectNonEssential}
                  className="px-3 py-1.5 bg-sage hover:bg-sage-dark text-charcoal text-xs font-medium rounded transition-colors"
                >
                  Reject Optional
                </button>
                <button
                  onClick={() => setShowModal(true)}
                  className="px-2 py-1.5 text-charcoal-muted hover:text-charcoal text-xs font-medium underline flex items-center gap-1"
                >
                  <Settings2 className="w-3.5 h-3.5" />
                  Customize
                </button>
              </div>
            </div>
          </div>
        </aside>
      )}

      {/* Detailed Modal */}
      {showModal && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="cookie-modal-title"
          className="fixed inset-0 z-50 flex items-center justify-center bg-charcoal/60 backdrop-blur-sm p-4 animate-in fade-in"
        >
          <div className="bg-white border border-stone max-w-lg w-full rounded-xl shadow-2xl p-6 overflow-y-auto max-h-[90vh]">
            <div className="flex items-center justify-between border-b border-stone/60 pb-3">
              <div className="flex items-center gap-2">
                <Shield className="w-5 h-5 text-forest" />
                <h2 id="cookie-modal-title" className="font-serif-luxury text-xl font-semibold text-forest">
                  Privacy Settings
                </h2>
              </div>
              <button
                onClick={() => setShowModal(false)}
                className="text-charcoal-muted hover:text-charcoal p-1"
                aria-label="Close cookie settings"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <p className="text-xs text-charcoal-muted mt-3 leading-relaxed">
              Tailor which categories of cookies you permit. We strictly refrain from passing protected health information (PHI) or personal medical details to advertising or third-party pixels.
            </p>

            <div className="space-y-4 mt-5">
              {/* Essential */}
              <div className="p-3 bg-ivory rounded-lg border border-stone/50 flex items-start justify-between">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-medium text-sm text-forest">Essential Cookies</span>
                    <span className="text-[10px] bg-forest/10 text-forest px-1.5 py-0.5 rounded font-mono uppercase">
                      Required
                    </span>
                  </div>
                  <p className="text-xs text-charcoal-muted mt-1">
                    Necessary for core application security, session authorization, and booking request handling.
                  </p>
                </div>
                <input
                  type="checkbox"
                  checked={true}
                  disabled={true}
                  className="mt-1 h-4 w-4 accent-forest cursor-not-allowed opacity-75"
                />
              </div>

              {/* Analytics */}
              <div className="p-3 bg-ivory rounded-lg border border-stone/50 flex items-start justify-between">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-medium text-sm text-forest">Analytics & Performance</span>
                  </div>
                  <p className="text-xs text-charcoal-muted mt-1">
                    Aggregated, pseudonymized telemetry measuring page load speed and high-level route engagement without storing personal identification.
                  </p>
                </div>
                <input
                  type="checkbox"
                  id="consent-analytics"
                  checked={preferences.analytics}
                  onChange={(e) =>
                    setPreferences({ ...preferences, analytics: e.target.checked })
                  }
                  className="mt-1 h-4 w-4 accent-forest cursor-pointer"
                />
              </div>

              {/* Marketing */}
              <div className="p-3 bg-ivory rounded-lg border border-stone/50 flex items-start justify-between">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-medium text-sm text-forest">Personalization & Media</span>
                  </div>
                  <p className="text-xs text-charcoal-muted mt-1">
                    Used to remember your location preferences across sessions and render interactive maps smoothly.
                  </p>
                </div>
                <input
                  type="checkbox"
                  id="consent-marketing"
                  checked={preferences.marketing}
                  onChange={(e) =>
                    setPreferences({ ...preferences, marketing: e.target.checked })
                  }
                  className="mt-1 h-4 w-4 accent-forest cursor-pointer"
                />
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-end gap-2 mt-6 pt-4 border-t border-stone/60">
              <button
                onClick={rejectNonEssential}
                className="w-full sm:w-auto px-4 py-2 border border-stone text-charcoal text-xs font-medium rounded hover:bg-sage-light transition-colors"
              >
                Reject Non-Essential
              </button>
              <button
                onClick={() => saveConsent(preferences)}
                className="w-full sm:w-auto px-5 py-2 bg-forest hover:bg-forest-dark text-ivory text-xs font-medium rounded transition-colors shadow-sm"
              >
                Save My Preferences
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
