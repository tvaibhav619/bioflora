"use client";

import { useState } from "react";
import Link from "next/link";
import { Gift, ShieldCheck, CheckCircle2, Sparkles, CreditCard } from "lucide-react";

export default function GiftCardsPage() {
  const [denomination, setDenomination] = useState<number>(500);
  const [recipientName, setRecipientName] = useState("");
  const [recipientEmail, setRecipientEmail] = useState("");
  const [senderName, setSenderName] = useState("");
  const [personalMessage, setPersonalMessage] = useState("");
  const [purchasedCode, setPurchasedCode] = useState<string | null>(null);

  const denominations = [250, 500, 1000, 2500];

  const handleSimulatePurchase = (e: React.FormEvent) => {
    e.preventDefault();
    if (!recipientName || !recipientEmail || !senderName) return;

    // Generate cryptographic demo code
    const randomHex = Math.random().toString(36).substring(2, 6).toUpperCase();
    const code = `BIO-GIFT-${denomination}-${randomHex}`;
    setPurchasedCode(code);
  };

  return (
    <div className="py-8 sm:py-12 bg-ivory min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="text-center max-w-xl mx-auto space-y-3">
          <span className="text-xs font-semibold uppercase tracking-widest text-champagne-dark">
            The Gift of Restorative Care
          </span>
          <h1 className="font-serif-luxury text-4xl sm:text-5xl font-normal text-forest">
            Bioflora Gift Cards
          </h1>
          <p className="text-xs sm:text-sm text-charcoal-muted leading-relaxed">
            Bestow personalized aesthetic medicine, clinical hydra-facials, and quiet sanctuary relaxation upon someone cherished.
          </p>
        </div>

        {purchasedCode ? (
          <div className="bg-white border border-stone p-8 sm:p-12 rounded-3xl shadow-sm text-center space-y-6 animate-in fade-in">
            <div className="w-16 h-16 bg-sage rounded-full flex items-center justify-center mx-auto text-forest">
              <Gift className="w-8 h-8 text-forest" />
            </div>

            <div>
              <span className="text-[10px] font-mono uppercase bg-champagne-light text-forest px-3 py-1 rounded-full font-semibold">
                Demonstration Issuance
              </span>
              <h2 className="font-serif-luxury text-3xl text-forest font-medium mt-3">
                Digital Gift Certificate Generated
              </h2>
              <p className="text-xs text-charcoal-muted mt-1">
                Value: ${denomination} USD &bull; Recipient: {recipientName}
              </p>
            </div>

            {/* Gift Card Visual */}
            <div className="luxury-gradient text-ivory p-6 sm:p-8 rounded-2xl max-w-md mx-auto text-left shadow-xl border border-champagne/30 space-y-6">
              <div className="flex justify-between items-start">
                <span className="font-serif-luxury text-2xl tracking-[0.2em]">
                  BIOFLORA
                </span>
                <span className="font-serif-luxury text-xl text-champagne font-bold">
                  ${denomination}
                </span>
              </div>

              <div className="space-y-1 text-xs">
                <p className="text-ivory/60">Presented To:</p>
                <p className="font-semibold text-ivory text-sm">{recipientName}</p>
                {personalMessage && (
                  <p className="italic text-ivory/80 pt-1">&ldquo;{personalMessage}&rdquo;</p>
                )}
              </div>

              <div className="pt-4 border-t border-ivory/20 flex justify-between items-center text-[10px] font-mono text-champagne">
                <span>Code: {purchasedCode}</span>
                <span>Beverly Hills &bull; Tribeca</span>
              </div>
            </div>

            <div className="pt-4 flex justify-center gap-3">
              <button
                onClick={() => setPurchasedCode(null)}
                className="px-6 py-2.5 border border-forest text-forest rounded-full text-xs font-semibold uppercase tracking-wider hover:bg-forest hover:text-ivory transition-colors"
              >
                Issue Another
              </button>
              <Link
                href="/booking"
                className="px-6 py-2.5 bg-forest text-ivory rounded-full text-xs font-semibold uppercase tracking-wider hover:bg-forest-dark transition-colors shadow-sm"
              >
                Redeem In Booking
              </Link>
            </div>
          </div>
        ) : (
          <div className="bg-white border border-stone p-6 sm:p-10 rounded-3xl shadow-sm space-y-8">
            {/* Step 1: Denomination */}
            <div className="space-y-3">
              <label className="block text-xs font-semibold text-forest uppercase tracking-wider font-mono">
                1. Select Denomination (USD)
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {denominations.map((amount) => (
                  <button
                    key={amount}
                    type="button"
                    onClick={() => setDenomination(amount)}
                    className={`py-3 px-4 rounded-xl border text-center transition-all ${
                      denomination === amount
                        ? "bg-forest text-ivory border-forest font-semibold shadow-sm"
                        : "bg-ivory border-stone hover:border-forest text-charcoal"
                    }`}
                  >
                    <span className="font-serif-luxury text-xl block">${amount}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Step 2: Recipient Details */}
            <form onSubmit={handleSimulatePurchase} className="space-y-6 border-t border-stone/40 pt-6">
              <div className="space-y-1">
                <h3 className="font-serif-luxury text-xl text-forest font-medium">
                  2. Recipient &amp; Delivery Information
                </h3>
                <p className="text-xs text-charcoal-muted">
                  Digital gift certificates are delivered securely via encrypted email.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-forest uppercase tracking-wider mb-1">
                    Recipient Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={recipientName}
                    onChange={(e) => setRecipientName(e.target.value)}
                    placeholder="e.g. Marcus Vance"
                    className="w-full px-3.5 py-2.5 bg-ivory border border-stone rounded-xl text-xs sm:text-sm text-charcoal focus:bg-white focus:outline-none focus:ring-1 focus:ring-forest"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-forest uppercase tracking-wider mb-1">
                    Recipient Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    value={recipientEmail}
                    onChange={(e) => setRecipientEmail(e.target.value)}
                    placeholder="marcus@example.com"
                    className="w-full px-3.5 py-2.5 bg-ivory border border-stone rounded-xl text-xs sm:text-sm text-charcoal focus:bg-white focus:outline-none focus:ring-1 focus:ring-forest"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-forest uppercase tracking-wider mb-1">
                    Sender Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={senderName}
                    onChange={(e) => setSenderName(e.target.value)}
                    placeholder="Your Name"
                    className="w-full px-3.5 py-2.5 bg-ivory border border-stone rounded-xl text-xs sm:text-sm text-charcoal focus:bg-white focus:outline-none focus:ring-1 focus:ring-forest"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-forest uppercase tracking-wider mb-1">
                    Personal Note (Optional)
                  </label>
                  <input
                    type="text"
                    value={personalMessage}
                    onChange={(e) => setPersonalMessage(e.target.value)}
                    placeholder="Wishing you rest and radiant rejuvenation..."
                    className="w-full px-3.5 py-2.5 bg-ivory border border-stone rounded-xl text-xs sm:text-sm text-charcoal focus:bg-white focus:outline-none focus:ring-1 focus:ring-forest"
                  />
                </div>
              </div>

              <div className="p-4 bg-sage-light/60 rounded-xl border border-sage text-xs text-charcoal-muted leading-relaxed">
                <strong>Legal Terms:</strong> Bioflora Gift Certificates are non-refundable, hold no cash value, and do not expire in jurisdictions where prohibited by law. Redeemable toward all clinical aesthetic services and retail homecare products.
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full inline-flex items-center justify-center gap-2 py-3.5 bg-forest hover:bg-forest-dark text-ivory rounded-full text-xs font-semibold uppercase tracking-wider transition-all shadow-md"
                >
                  <CreditCard className="w-4 h-4 text-champagne" />
                  <span>Generate Certificate (${denomination} USD)</span>
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
