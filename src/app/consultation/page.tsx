import { getCategories, getLocations } from "@/lib/db/store";
import ConsultationFormClient from "@/components/consultation/ConsultationFormClient";
import Link from "next/link";
import { Phone, Mail, Clock, MapPin } from "lucide-react";

export const metadata = {
  title: "Request a Consultation | Bioflora Medical Spa",
  description:
    "Request an individualized clinical consultation at Bioflora. Our medical coordination team will reach out during your preferred window.",
};

export default async function ConsultationPage() {
  const [categories, locations] = await Promise.all([
    getCategories(),
    getLocations(),
  ]);

  return (
    <div className="py-8 sm:py-12 bg-ivory min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="text-center max-w-xl mx-auto space-y-3">
          <span className="text-xs font-semibold uppercase tracking-widest text-champagne-dark">
            Direct Concierge
          </span>
          <h1 className="font-serif-luxury text-3xl sm:text-4xl text-forest font-normal">
            Request an Individual Consultation
          </h1>
          <p className="text-xs sm:text-sm text-charcoal-muted leading-relaxed">
            Every clinical roadmap begins with a personal conversation. Tell us your interests below or reach out directly to our clinics.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          <div className="lg:col-span-8">
            <ConsultationFormClient categories={categories} locations={locations} />
          </div>

          {/* Direct Sanctuary Contact Cards */}
          <div className="lg:col-span-4 space-y-6">
            <div className="bg-white border border-stone p-6 rounded-2xl shadow-sm space-y-4">
              <h3 className="font-serif-luxury text-xl font-medium text-forest">
                Direct Clinic Concierge
              </h3>

              <div className="space-y-4 text-xs text-charcoal-muted">
                <div>
                  <h4 className="font-semibold text-forest text-sm">
                    Beverly Hills Flagship
                  </h4>
                  <p className="mt-1">420 N Camden Dr, Suite 300, Beverly Hills, CA</p>
                  <a
                    href="tel:3105550192"
                    className="text-forest font-semibold hover:underline block mt-1"
                  >
                    (310) 555-0192
                  </a>
                </div>

                <div className="pt-3 border-t border-stone/30">
                  <h4 className="font-semibold text-forest text-sm">
                    Tribeca Atelier
                  </h4>
                  <p className="mt-1">174 Franklin St, Penthouse, New York, NY</p>
                  <a
                    href="tel:2125550144"
                    className="text-forest font-semibold hover:underline block mt-1"
                  >
                    (212) 555-0144
                  </a>
                </div>
              </div>
            </div>

            <div className="bg-sage-light/60 border border-sage p-6 rounded-2xl space-y-3 text-xs text-charcoal-muted">
              <h4 className="font-semibold text-forest font-serif-luxury text-base">
                Prefer Online Self-Booking?
              </h4>
              <p className="leading-relaxed">
                If you already know the specific service and time slot you desire, use our direct online reservation engine.
              </p>
              <Link
                href="/booking"
                className="inline-block mt-2 font-semibold text-forest underline hover:text-champagne-dark"
              >
                Launch Online Booking Wizard &rarr;
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
