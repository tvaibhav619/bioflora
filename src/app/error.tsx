"use client";

import { useEffect } from "react";
import Link from "next/link";
import { AlertCircle, RefreshCw, Home } from "lucide-react";

export default function ErrorBoundary({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Telemetry log for unexpected runtime errors
    console.error("Application error boundary triggered:", error);
  }, [error]);

  return (
    <div className="min-h-[70vh] flex items-center justify-center bg-stone-light/40 py-20 px-6">
      <div className="max-w-lg w-full text-center p-8 bg-white/80 rounded-2xl border border-stone-200 shadow-sm backdrop-blur-sm">
        <div className="w-12 h-12 rounded-full bg-amber-50 border border-amber-200 text-amber-700 flex items-center justify-center mx-auto mb-5">
          <AlertCircle className="w-6 h-6" />
        </div>

        <h1 className="font-serif text-3xl text-forest font-light mb-3">
          Clinical System Interruption
        </h1>

        <p className="text-stone-600 text-sm leading-relaxed mb-6">
          We experienced an unexpected anomaly while presenting this page. Rest assured, your submitted information and appointment reservations remain secure.
        </p>

        {error.digest && (
          <p className="text-xs text-stone-400 font-mono mb-6 bg-stone-50 py-1.5 px-3 rounded border border-stone-200 inline-block">
            Digest: {error.digest}
          </p>
        )}

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <button
            onClick={() => reset()}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-md bg-forest text-stone-light text-sm font-medium hover:bg-forest/90 transition cursor-pointer"
          >
            <RefreshCw className="w-4 h-4" /> Try Again
          </button>

          <Link
            href="/"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-md border border-stone-300 text-stone-700 text-sm font-medium hover:bg-stone-50 transition"
          >
            <Home className="w-4 h-4" /> Return to Sanctuary
          </Link>
        </div>
      </div>
    </div>
  );
}
