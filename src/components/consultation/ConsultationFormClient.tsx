"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { CheckCircle2, AlertCircle, Send, ShieldCheck, Lock } from "lucide-react";
import { TreatmentCategory, Location } from "@/lib/db/types";
import { trackFunnelEvent } from "@/lib/analytics/tracker";

interface ConsultationFormClientProps {
  categories: TreatmentCategory[];
  locations: Location[];
}

export default function ConsultationFormClient({
  categories,
  locations,
}: ConsultationFormClientProps) {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [preferredContactMethod, setPreferredContactMethod] = useState<"email" | "phone" | "text">("email");
  const [serviceInterest, setServiceInterest] = useState(categories[0]?.name || "Neuromodulators & Dermal Sculpting");
  const [locationPreference, setLocationPreference] = useState(locations[0]?.name || "Beverly Hills Flagship");
  const [preferredTimeWindow, setPreferredTimeWindow] = useState("afternoon");
  const [privacyConsent, setPrivacyConsent] = useState(false);
  const [marketingConsent, setMarketingConsent] = useState(false);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const hasTrackedStart = useRef(false);

  useEffect(() => {
    trackFunnelEvent("consultation_views");
  }, []);

  const handleStartInteraction = () => {
    if (!hasTrackedStart.current) {
      hasTrackedStart.current = true;
      trackFunnelEvent("consultation_starts");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    if (!privacyConsent) {
      setErrorMessage("Please acknowledge the Patient Privacy Notice to submit.");
      return;
    }

    setIsSubmitting(true);

    try {
      const res = await fetch("/api/consultation", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fullName,
          email,
          phone,
          preferredContactMethod,
          serviceInterest,
          locationPreference,
          preferredTimeWindow,
          privacyConsent,
          marketingConsent,
        }),
      });

      const data = await res.json();
      if (data.success) {
        setResult(data);
        trackFunnelEvent("consultation_submits");
      } else {
        setErrorMessage(data.message || "Failed to submit request.");
      }
    } catch (err) {
      setErrorMessage("An unexpected network error occurred.");
    } finally {
      setIsSubmitting(false);
    }
  };


  if (result) {
    return (
      <div className="bg-white border border-stone p-8 sm:p-12 rounded-3xl shadow-sm text-center max-w-xl mx-auto space-y-6 animate-in fade-in">
        <div className="w-16 h-16 bg-sage rounded-full flex items-center justify-center mx-auto text-forest">
          <CheckCircle2 className="w-8 h-8" />
        </div>

        <div>
          <span className="text-xs font-mono uppercase bg-champagne-light text-forest px-3.5 py-1 rounded-full font-semibold">
            Inquiry Ref: {result.referenceNumber}
          </span>
          <h2 className="font-serif-luxury text-3xl text-forest font-medium mt-3">
            Consultation Request Received
          </h2>
          <p className="text-xs sm:text-sm text-charcoal-muted mt-2 leading-relaxed">
            {result.message}
          </p>
        </div>

        <div className="p-4 bg-ivory rounded-xl border border-stone/50 text-left text-xs space-y-1.5">
          <p>
            <strong className="text-forest">Service Interest:</strong> {serviceInterest}
          </p>
          <p>
            <strong className="text-forest">Location:</strong> {locationPreference}
          </p>
          <p>
            <strong className="text-forest">Preferred Contact:</strong> {preferredContactMethod.toUpperCase()} ({preferredTimeWindow})
          </p>
          <p>
            <strong className="text-forest">Dispatch Status:</strong> {result.notificationStatus}
          </p>
        </div>

        <div className="pt-2">
          <Link
            href="/treatments"
            className="inline-block px-6 py-2.5 bg-forest text-ivory text-xs font-semibold rounded-full uppercase tracking-wider hover:bg-forest-dark transition-colors shadow-sm"
          >
            Explore Treatment Catalogue
          </Link>
        </div>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white border border-stone p-6 sm:p-10 rounded-3xl shadow-sm space-y-6 max-w-2xl mx-auto"
    >
      <div>
        <span className="text-[10px] uppercase font-bold tracking-widest text-champagne-dark">
          Confidential Inquiry
        </span>
        <h2 className="font-serif-luxury text-2xl sm:text-3xl font-medium text-forest mt-1">
          Request a Clinical Consultation
        </h2>
        <p className="text-xs text-charcoal-muted mt-1 leading-relaxed">
          Connect with our clinical coordination team. We will review your goals and schedule an unhurried assessment.
        </p>
      </div>

      {errorMessage && (
        <div className="p-4 bg-red-50 border border-red-200 text-red-800 rounded-xl text-xs flex items-center gap-2">
          <AlertCircle className="w-4 h-4 shrink-0 text-red-600" />
          <span>{errorMessage}</span>
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="consultation-fullname" className="block text-xs font-semibold text-forest uppercase tracking-wider mb-1">
            Full Name *
          </label>
          <input
            id="consultation-fullname"
            type="text"
            required
            value={fullName}
            onFocus={handleStartInteraction}
            onChange={(e) => setFullName(e.target.value)}
            placeholder="e.g. Eleanor Vance"
            className="w-full px-3.5 py-2.5 bg-ivory border border-stone rounded-xl text-xs sm:text-sm text-charcoal focus:bg-white focus:outline-none focus:ring-1 focus:ring-forest"
          />
        </div>

        <div>
          <label htmlFor="consultation-email" className="block text-xs font-semibold text-forest uppercase tracking-wider mb-1">
            Email Address *
          </label>
          <input
            id="consultation-email"
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="eleanor@example.com"
            className="w-full px-3.5 py-2.5 bg-ivory border border-stone rounded-xl text-xs sm:text-sm text-charcoal focus:bg-white focus:outline-none focus:ring-1 focus:ring-forest"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="consultation-phone" className="block text-xs font-semibold text-forest uppercase tracking-wider mb-1">
            Telephone Number *
          </label>
          <input
            id="consultation-phone"
            type="tel"
            required
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="(310) 555-0188"
            className="w-full px-3.5 py-2.5 bg-ivory border border-stone rounded-xl text-xs sm:text-sm text-charcoal focus:bg-white focus:outline-none focus:ring-1 focus:ring-forest"
          />
        </div>

        <div>
          <label htmlFor="consultation-contact-method" className="block text-xs font-semibold text-forest uppercase tracking-wider mb-1">
            Preferred Contact Method *
          </label>
          <select
            id="consultation-contact-method"
            value={preferredContactMethod}
            onChange={(e) => setPreferredContactMethod(e.target.value as any)}
            className="w-full px-3.5 py-2.5 bg-ivory border border-stone rounded-xl text-xs sm:text-sm text-charcoal focus:bg-white focus:outline-none focus:ring-1 focus:ring-forest cursor-pointer"
          >
            <option value="email">Email</option>
            <option value="phone">Direct Telephone Call</option>
            <option value="text">SMS Text Message</option>
          </select>
        </div>
      </div>


      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-semibold text-forest uppercase tracking-wider mb-1">
            Area of Interest *
          </label>
          <select
            value={serviceInterest}
            onChange={(e) => setServiceInterest(e.target.value)}
            className="w-full px-3.5 py-2.5 bg-ivory border border-stone rounded-xl text-xs sm:text-sm text-charcoal focus:bg-white focus:outline-none focus:ring-1 focus:ring-forest cursor-pointer"
          >
            {categories.map((c) => (
              <option key={c.id} value={c.name}>
                {c.name}
              </option>
            ))}
            <option value="General Aesthetic Consultation">
              General Comprehensive Consultation
            </option>
          </select>
        </div>

        <div>
          <label className="block text-xs font-semibold text-forest uppercase tracking-wider mb-1">
            Preferred Sanctuary *
          </label>
          <select
            value={locationPreference}
            onChange={(e) => setLocationPreference(e.target.value)}
            className="w-full px-3.5 py-2.5 bg-ivory border border-stone rounded-xl text-xs sm:text-sm text-charcoal focus:bg-white focus:outline-none focus:ring-1 focus:ring-forest cursor-pointer"
          >
            {locations.map((l) => (
              <option key={l.id} value={l.name}>
                {l.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div>
        <label className="block text-xs font-semibold text-forest uppercase tracking-wider mb-1">
          Preferred Contact Window
        </label>
        <div className="grid grid-cols-4 gap-2">
          {["morning", "afternoon", "evening", "anytime"].map((time) => (
            <button
              key={time}
              type="button"
              onClick={() => setPreferredTimeWindow(time)}
              className={`py-2 px-2 rounded-lg text-xs font-mono uppercase text-center border transition-all ${
                preferredTimeWindow === time
                  ? "bg-forest text-ivory border-forest font-semibold"
                  : "bg-ivory border-stone text-charcoal hover:border-forest"
              }`}
            >
              {time}
            </button>
          ))}
        </div>
      </div>

      {/* Compliance Notice: Safe Marketing Forms */}
      <div className="p-3.5 bg-sage-light/60 rounded-xl border border-sage flex items-start gap-2.5 text-xs text-charcoal-muted">
        <Lock className="w-4 h-4 text-forest shrink-0 mt-0.5" />
        <span>
          <strong>Privacy Safeguard:</strong> This public form collects solely contact preferences to initiate an appointment. Please do not submit medical histories, medication lists, or private diagnostic health details.
        </span>
      </div>

      {/* Consents */}
      <div className="space-y-3 pt-2">
        <label className="flex items-start gap-2.5 text-xs text-charcoal leading-relaxed cursor-pointer">
          <input
            type="checkbox"
            required
            checked={privacyConsent}
            onChange={(e) => setPrivacyConsent(e.target.checked)}
            className="mt-0.5 h-4 w-4 accent-forest"
          />
          <span>
            I acknowledge that I have reviewed the{" "}
            <Link href="/patient-privacy" target="_blank" className="text-forest underline font-medium">
              Patient Privacy Notice
            </Link>{" "}
            and{" "}
            <Link href="/terms" target="_blank" className="text-forest underline font-medium">
              Terms of Use
            </Link>
            . *
          </span>
        </label>

        <label className="flex items-start gap-2.5 text-xs text-charcoal-muted leading-relaxed cursor-pointer">
          <input
            type="checkbox"
            checked={marketingConsent}
            onChange={(e) => setMarketingConsent(e.target.checked)}
            className="mt-0.5 h-4 w-4 accent-forest"
          />
          <span>
            (Optional) I would like to receive curated clinical journal releases and invitations to Bioflora exclusive seasonal events.
          </span>
        </label>
      </div>

      <div className="pt-2">
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full inline-flex items-center justify-center gap-2 bg-forest hover:bg-forest-dark text-ivory py-3.5 px-6 rounded-full text-xs font-semibold uppercase tracking-wider transition-all shadow-md disabled:opacity-50"
        >
          <Send className="w-4 h-4 text-champagne" />
          <span>{isSubmitting ? "Submitting Inquiry..." : "Submit Consultation Request"}</span>
        </button>
      </div>
    </form>
  );
}
