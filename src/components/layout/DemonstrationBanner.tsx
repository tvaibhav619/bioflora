"use client";

import { useState } from "react";
import { Info, X, ShieldAlert } from "lucide-react";
import Link from "next/link";

export default function DemonstrationBanner() {
  const [dismissed, setDismissed] = useState(false);

  if (dismissed) return null;

  return (
    <div
      role="region"
      aria-label="Portfolio Demonstration Notice"
      className="bg-forest-dark border-b border-champagne/30 text-ivory text-xs px-4 py-1.5 transition-all"
    >
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <span className="inline-flex items-center gap-1 bg-champagne/20 text-champagne px-2 py-0.5 rounded text-[10px] font-semibold tracking-wider uppercase border border-champagne/40">
            <ShieldAlert className="w-3 h-3 text-champagne" />
            Demonstration Mode
          </span>
          <p className="text-ivory/90 leading-tight">
            Bioflora is an illustrative portfolio project. Treatment details, sample prices, and staff profiles are for presentation.{" "}
            <Link
              href="/admin"
              className="text-champagne underline hover:text-champagne-light ml-1 font-medium"
            >
              Admin Portal
            </Link>
          </p>
        </div>

        <button
          onClick={() => setDismissed(true)}
          className="self-end sm:self-center text-ivory/60 hover:text-ivory transition-colors p-1"
          aria-label="Dismiss demonstration notice"
        >
          <X className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
}
