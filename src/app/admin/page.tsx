import {
  getSettings,
  getConsultationRequests,
  getSandboxBookings,
  getTreatments,
  getAuditLogs,
} from "@/lib/db/store";
import AdminDashboardClient from "@/components/admin/AdminDashboardClient";
import Link from "next/link";
import { ShieldCheck, ArrowLeft } from "lucide-react";

export const metadata = {
  title: "Administration Portal | Bioflora Medical Spa",
  description:
    "Bioflora secure administrative portal for managing consultation inquiries, treatments, system operating mode, and audit logs.",
};

export default async function AdminPage() {
  const [settings, requests, bookings, treatments, auditLogs] = await Promise.all([
    getSettings(),
    getConsultationRequests(),
    getSandboxBookings(),
    getTreatments({ includeUnpublished: true }),
    getAuditLogs(),
  ]);

  return (
    <div className="py-8 sm:py-12 bg-ivory min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-stone/50">
          <div>
            <Link
              href="/"
              className="inline-flex items-center gap-1.5 text-xs text-charcoal-muted hover:text-forest transition-colors mb-2 font-medium"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to Public Website</span>
            </Link>
            <div className="flex items-center gap-2">
              <span className="font-serif-luxury text-3xl font-medium text-forest">
                Bioflora Administration Portal
              </span>
              <span className="text-[10px] font-mono bg-forest text-ivory px-2 py-0.5 rounded font-bold uppercase">
                Staff Console
              </span>
            </div>
            <p className="text-xs text-charcoal-muted mt-1">
              Operations, appointment inquiries, treatment publishing, and mode governance.
            </p>
          </div>

          <div className="text-xs text-charcoal-muted font-mono bg-white p-3 rounded-xl border border-stone">
            <span>Session: Authorized Administrator</span>
          </div>
        </div>

        {/* Dashboard Client */}
        <AdminDashboardClient
          initialSettings={settings}
          initialRequests={requests}
          initialBookings={bookings}
          initialTreatments={treatments}
          initialAuditLogs={auditLogs}
        />
      </div>
    </div>
  );
}
