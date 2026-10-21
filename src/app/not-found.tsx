import Link from "next/link";
import { ArrowLeft, Compass, Calendar, Phone } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-[75vh] flex items-center justify-center bg-stone-light/40 py-20 px-6">
      <div className="max-w-xl w-full text-center">
        <span className="inline-block px-3 py-1 rounded-full text-xs font-medium tracking-widest uppercase bg-sage/20 text-forest border border-sage/40 mb-6">
          Page Not Found • 404
        </span>

        <h1 className="font-serif text-4xl sm:text-5xl text-forest font-light leading-tight mb-4">
          A Moment of Pause
        </h1>

        <p className="text-stone-600 text-base leading-relaxed mb-8">
          The sanctuary page or treatment route you are seeking could not be found or may have been relocated. Allow us to guide you back to equilibrium.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
          <Link
            href="/"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-md bg-forest text-stone-light font-medium text-sm hover:bg-forest/90 transition shadow-sm"
          >
            <ArrowLeft className="w-4 h-4" /> Return to Welcome
          </Link>

          <Link
            href="/treatments"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-md border border-forest/20 text-forest font-medium text-sm hover:bg-forest/5 transition"
          >
            <Compass className="w-4 h-4" /> Explore Treatments
          </Link>
        </div>

        <div className="pt-8 border-t border-stone-200 grid grid-cols-1 sm:grid-cols-2 gap-4 text-left">
          <div className="p-4 rounded-lg bg-white/70 border border-stone-200/60">
            <h3 className="font-serif text-forest text-base font-medium flex items-center gap-2 mb-1">
              <Calendar className="w-4 h-4 text-champagne" /> Reserve Treatment
            </h3>
            <p className="text-xs text-stone-500 mb-2">
              Book your clinical consultation or aesthetic procedure online.
            </p>
            <Link
              href="/booking"
              className="text-xs font-semibold text-forest hover:text-champagne transition underline"
            >
              Open Booking Concierge →
            </Link>
          </div>

          <div className="p-4 rounded-lg bg-white/70 border border-stone-200/60">
            <h3 className="font-serif text-forest text-base font-medium flex items-center gap-2 mb-1">
              <Phone className="w-4 h-4 text-champagne" /> Direct Concierge
            </h3>
            <p className="text-xs text-stone-500 mb-2">
              Our clinical care coordinators are available Monday through Saturday.
            </p>
            <a
              href="tel:13105550198"
              className="text-xs font-semibold text-forest hover:text-champagne transition underline"
            >
              (310) 555-0198
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
