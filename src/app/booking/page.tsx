import { getTreatments, getLocations, getProviders } from "@/lib/db/store";
import BookingWizardClient from "@/components/booking/BookingWizardClient";
import Link from "next/link";
import { ShieldCheck, Phone } from "lucide-react";

export const metadata = {
  title: "Book an Appointment | Bioflora Medical Spa",
  description:
    "Schedule your doctor-guided aesthetic consultation or treatment at Bioflora's Beverly Hills or Tribeca clinics.",
};

export default async function BookingPage({
  searchParams,
}: {
  searchParams: Promise<{ treatment?: string; location?: string; provider?: string }>;
}) {
  const params = await searchParams;
  const [treatments, locations, providers] = await Promise.all([
    getTreatments(),
    getLocations(),
    getProviders(),
  ]);

  return (
    <div className="py-8 sm:py-12 bg-ivory min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <div className="text-center max-w-xl mx-auto space-y-3">
          <span className="text-xs font-semibold uppercase tracking-widest text-champagne-dark">
            Direct Scheduling
          </span>
          <h1 className="font-serif-luxury text-3xl sm:text-4xl text-forest font-normal">
            Reserve Your Visit
          </h1>
          <p className="text-xs sm:text-sm text-charcoal-muted leading-relaxed">
            Select your preferred treatment, sanctuary suite, and clinical provider below. For immediate concierge assistance, call{" "}
            <a href="tel:8005550198" className="text-forest underline font-semibold">
              (800) 555-0198
            </a>.
          </p>
        </div>

        {/* Wizard */}
        <BookingWizardClient
          treatments={treatments}
          locations={locations}
          providers={providers}
          initialTreatmentSlug={params.treatment}
          initialLocationSlug={params.location}
          initialProviderSlug={params.provider}
        />
      </div>
    </div>
  );
}
