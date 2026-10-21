"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, CheckCircle2, Send } from "lucide-react";

export default function AccessibilityFeedbackPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [device, setDevice] = useState("");
  const [issue, setIssue] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!issue.trim()) return;
    setSubmitted(true);
  };

  return (
    <div className="py-8 sm:py-12 bg-ivory min-h-screen">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <Link
          href="/accessibility"
          className="inline-flex items-center gap-1.5 text-xs text-charcoal-muted hover:text-forest transition-colors font-medium"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Accessibility Statement</span>
        </Link>

        <div className="space-y-3">
          <span className="text-xs font-semibold uppercase tracking-widest text-champagne-dark">
            Inclusivity Support
          </span>
          <h1 className="font-serif-luxury text-4xl sm:text-5xl font-normal text-forest">
            Accessibility Feedback Form
          </h1>
          <p className="text-xs sm:text-sm text-charcoal-muted leading-relaxed">
            We welcome constructive feedback regarding screen reader operation, keyboard navigation, color contrast, or any barrier encountered while exploring Bioflora.
          </p>
        </div>

        {submitted ? (
          <div className="bg-white border border-stone p-8 sm:p-12 rounded-3xl shadow-sm text-center space-y-4 animate-in fade-in">
            <div className="w-16 h-16 bg-sage rounded-full flex items-center justify-center mx-auto text-forest">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h2 className="font-serif-luxury text-3xl text-forest font-medium">
              Thank You for Your Feedback
            </h2>
            <p className="text-xs sm:text-sm text-charcoal-muted max-w-md mx-auto leading-relaxed">
              Your report has been dispatched to our engineering and accessibility team. If you requested contact, a member of our accessibility committee will reach out within 2 business days.
            </p>
            <div className="pt-4">
              <Link
                href="/"
                className="px-6 py-2.5 bg-forest text-ivory rounded-full text-xs font-semibold uppercase tracking-wider hover:bg-forest-dark transition-colors shadow-sm"
              >
                Return to Homepage
              </Link>
            </div>
          </div>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="bg-white border border-stone p-6 sm:p-10 rounded-3xl shadow-sm space-y-5"
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-forest uppercase tracking-wider mb-1">
                  Your Name (Optional)
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Jordan Smith"
                  className="w-full px-3.5 py-2.5 bg-ivory border border-stone rounded-xl text-xs sm:text-sm text-charcoal focus:bg-white focus:outline-none focus:ring-1 focus:ring-forest"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-forest uppercase tracking-wider mb-1">
                  Email Address (Optional)
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="jordan@example.com"
                  className="w-full px-3.5 py-2.5 bg-ivory border border-stone rounded-xl text-xs sm:text-sm text-charcoal focus:bg-white focus:outline-none focus:ring-1 focus:ring-forest"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-forest uppercase tracking-wider mb-1">
                Assistive Technology or Device Used (Optional)
              </label>
              <input
                type="text"
                value={device}
                onChange={(e) => setDevice(e.target.value)}
                placeholder="e.g. NVDA on Firefox, VoiceOver on iOS, Keyboard-only navigation"
                className="w-full px-3.5 py-2.5 bg-ivory border border-stone rounded-xl text-xs sm:text-sm text-charcoal focus:bg-white focus:outline-none focus:ring-1 focus:ring-forest"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-forest uppercase tracking-wider mb-1">
                Description of Barrier or Improvement *
              </label>
              <textarea
                required
                rows={5}
                value={issue}
                onChange={(e) => setIssue(e.target.value)}
                placeholder="Please describe the page URL, button, form, or element where you encountered an obstacle..."
                className="w-full px-3.5 py-2.5 bg-ivory border border-stone rounded-xl text-xs sm:text-sm text-charcoal focus:bg-white focus:outline-none focus:ring-1 focus:ring-forest"
              />
            </div>

            <div className="pt-2">
              <button
                type="submit"
                className="inline-flex items-center gap-2 px-8 py-3.5 bg-forest hover:bg-forest-dark text-ivory rounded-full text-xs font-semibold uppercase tracking-wider transition-all shadow-md"
              >
                <Send className="w-4 h-4 text-champagne" />
                <span>Submit Accessibility Report</span>
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
