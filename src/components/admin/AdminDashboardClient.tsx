"use client";

import { useState } from "react";
import Link from "next/link";
import {
  SiteSettings,
  ConsultationRequest,
  SandboxBooking,
  Treatment,
  AuditLog,
} from "@/lib/db/types";
import {
  ShieldAlert,
  ShieldCheck,
  ToggleLeft,
  ToggleRight,
  Sparkles,
  Calendar,
  Clock,
  UserCheck,
  CheckCircle2,
  AlertTriangle,
  RefreshCw,
  Eye,
  FileText,
  Activity,
  Layers,
  Settings,
} from "lucide-react";

interface AdminDashboardClientProps {
  initialSettings: SiteSettings;
  initialRequests: ConsultationRequest[];
  initialBookings: SandboxBooking[];
  initialTreatments: Treatment[];
  initialAuditLogs: AuditLog[];
}

export default function AdminDashboardClient({
  initialSettings,
  initialRequests,
  initialBookings,
  initialTreatments,
  initialAuditLogs,
}: AdminDashboardClientProps) {
  const [activeTab, setActiveTab] = useState<
    "overview" | "requests" | "bookings" | "treatments" | "audit" | "checklist"
  >("overview");

  const [settings, setSettings] = useState(initialSettings);
  const [requests, setRequests] = useState(initialRequests);
  const [bookings, setBookings] = useState(initialBookings);
  const [treatments, setTreatments] = useState(initialTreatments);
  const [auditLogs, setAuditLogs] = useState(initialAuditLogs);
  const [isUpdating, setIsUpdating] = useState(false);
  const [actionMessage, setActionMessage] = useState<string | null>(null);

  const toggleOperatingMode = async () => {
    setIsUpdating(true);
    const newMode = settings.operating_mode === "demonstration" ? "production" : "demonstration";
    try {
      const res = await fetch("/api/admin/settings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ operating_mode: newMode }),
      });
      const data = await res.json();
      if (data.success) {
        setSettings(data.settings);
        setActionMessage(`Operating mode switched to ${newMode.toUpperCase()}`);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setIsUpdating(false);
    }
  };

  const toggleAnnouncement = async () => {
    setIsUpdating(true);
    try {
      const res = await fetch("/api/admin/settings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ announcement_active: !settings.announcement_active }),
      });
      const data = await res.json();
      if (data.success) {
        setSettings(data.settings);
        setActionMessage(
          `Announcement bar ${!settings.announcement_active ? "enabled" : "disabled"}`
        );
      }
    } catch (e) {
      console.error(e);
    } finally {
      setIsUpdating(false);
    }
  };

  const updateRequestStatus = async (id: string, newStatus: ConsultationRequest["status"]) => {
    try {
      const res = await fetch("/api/admin/consultation", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, status: newStatus }),
      });
      const data = await res.json();
      if (data.success) {
        setRequests((prev) =>
          prev.map((r) => (r.id === id ? { ...r, status: newStatus } : r))
        );
        setActionMessage(`Inquiry marked as ${newStatus.toUpperCase()}`);
      }
    } catch (e) {
      console.error(e);
    }
  };

  const toggleTreatmentStatus = async (treatment: Treatment) => {
    const nextStatus = treatment.status === "published" ? "draft" : "published";
    try {
      const res = await fetch("/api/admin/treatment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...treatment, status: nextStatus }),
      });
      const data = await res.json();
      if (data.success) {
        setTreatments((prev) =>
          prev.map((t) => (t.id === treatment.id ? { ...t, status: nextStatus } : t))
        );
        setActionMessage(`Treatment ${treatment.name} set to ${nextStatus.toUpperCase()}`);
      }
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="space-y-8">
      {/* Operating Mode Bar */}
      <div className="bg-white border border-stone p-6 rounded-2xl shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div
            className={`p-3 rounded-xl ${
              settings.operating_mode === "demonstration"
                ? "bg-amber-100 text-amber-900"
                : "bg-emerald-100 text-emerald-900"
            }`}
          >
            {settings.operating_mode === "demonstration" ? (
              <ShieldAlert className="w-6 h-6" />
            ) : (
              <ShieldCheck className="w-6 h-6" />
            )}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono uppercase font-bold text-champagne-dark tracking-wider">
                Active System Mode:
              </span>
              <span
                className={`text-xs uppercase font-bold px-2 py-0.5 rounded font-mono ${
                  settings.operating_mode === "demonstration"
                    ? "bg-amber-100 text-amber-900"
                    : "bg-emerald-100 text-emerald-900"
                }`}
              >
                {settings.operating_mode} Mode
              </span>
            </div>
            <p className="text-xs text-charcoal-muted mt-0.5 leading-relaxed">
              {settings.operating_mode === "demonstration"
                ? "Discreet portfolio demo banner is displayed. Bookings run in sandbox mode without affecting real patient schedules."
                : "Production mode active. Requires verified clinician credentials and live booking provider integration."}
            </p>
          </div>
        </div>

        <button
          onClick={toggleOperatingMode}
          disabled={isUpdating}
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-forest hover:bg-forest-dark text-ivory rounded-full text-xs font-semibold uppercase tracking-wider transition-colors disabled:opacity-50 shadow-sm shrink-0"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${isUpdating ? "animate-spin" : ""}`} />
          <span>
            Switch to {settings.operating_mode === "demonstration" ? "Production" : "Demonstration"}
          </span>
        </button>
      </div>

      {actionMessage && (
        <div className="p-3 bg-sage-light text-forest border border-sage rounded-xl text-xs flex items-center justify-between animate-in fade-in">
          <span>{actionMessage}</span>
          <button
            onClick={() => setActionMessage(null)}
            className="text-xs font-bold underline"
          >
            Dismiss
          </button>
        </div>
      )}

      {/* Navigation Tabs */}
      <div className="flex flex-wrap gap-2 border-b border-stone/50 pb-3 text-xs font-medium">
        <button
          onClick={() => setActiveTab("overview")}
          className={`px-4 py-2 rounded-xl transition-all ${
            activeTab === "overview"
              ? "bg-forest text-ivory font-semibold shadow-sm"
              : "bg-white border border-stone text-charcoal hover:bg-ivory"
          }`}
        >
          System Overview
        </button>

        <button
          onClick={() => setActiveTab("requests")}
          className={`px-4 py-2 rounded-xl transition-all flex items-center gap-1.5 ${
            activeTab === "requests"
              ? "bg-forest text-ivory font-semibold shadow-sm"
              : "bg-white border border-stone text-charcoal hover:bg-ivory"
          }`}
        >
          <span>Consultations</span>
          <span className="bg-champagne/20 text-champagne px-1.5 py-0.2 rounded text-[10px] font-mono">
            {requests.length}
          </span>
        </button>

        <button
          onClick={() => setActiveTab("bookings")}
          className={`px-4 py-2 rounded-xl transition-all flex items-center gap-1.5 ${
            activeTab === "bookings"
              ? "bg-forest text-ivory font-semibold shadow-sm"
              : "bg-white border border-stone text-charcoal hover:bg-ivory"
          }`}
        >
          <span>Sandbox Bookings</span>
          <span className="bg-champagne/20 text-champagne px-1.5 py-0.2 rounded text-[10px] font-mono">
            {bookings.length}
          </span>
        </button>

        <button
          onClick={() => setActiveTab("treatments")}
          className={`px-4 py-2 rounded-xl transition-all flex items-center gap-1.5 ${
            activeTab === "treatments"
              ? "bg-forest text-ivory font-semibold shadow-sm"
              : "bg-white border border-stone text-charcoal hover:bg-ivory"
          }`}
        >
          <span>Treatments ({treatments.length})</span>
        </button>

        <button
          onClick={() => setActiveTab("audit")}
          className={`px-4 py-2 rounded-xl transition-all ${
            activeTab === "audit"
              ? "bg-forest text-ivory font-semibold shadow-sm"
              : "bg-white border border-stone text-charcoal hover:bg-ivory"
          }`}
        >
          Audit Logs
        </button>

        <button
          onClick={() => setActiveTab("checklist")}
          className={`px-4 py-2 rounded-xl transition-all ${
            activeTab === "checklist"
              ? "bg-forest text-ivory font-semibold shadow-sm"
              : "bg-white border border-stone text-charcoal hover:bg-ivory"
          }`}
        >
          Production Launch Gates
        </button>
      </div>

      {/* TAB 1: OVERVIEW */}
      {activeTab === "overview" && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            <div className="bg-white border border-stone p-5 rounded-2xl shadow-sm">
              <span className="text-[11px] font-mono text-charcoal-muted uppercase">
                Consultation Enquiries
              </span>
              <span className="font-serif-luxury text-3xl font-semibold text-forest block mt-1">
                {requests.length}
              </span>
              <span className="text-[11px] text-champagne-dark mt-1 block">
                {requests.filter((r) => r.status === "new").length} New Awaiting Contact
              </span>
            </div>

            <div className="bg-white border border-stone p-5 rounded-2xl shadow-sm">
              <span className="text-[11px] font-mono text-charcoal-muted uppercase">
                Sandbox Bookings
              </span>
              <span className="font-serif-luxury text-3xl font-semibold text-forest block mt-1">
                {bookings.length}
              </span>
              <span className="text-[11px] text-charcoal-muted mt-1 block">
                Logged in test database
              </span>
            </div>

            <div className="bg-white border border-stone p-5 rounded-2xl shadow-sm">
              <span className="text-[11px] font-mono text-charcoal-muted uppercase">
                Catalogue Services
              </span>
              <span className="font-serif-luxury text-3xl font-semibold text-forest block mt-1">
                {treatments.filter((t) => t.status === "published").length}
              </span>
              <span className="text-[11px] text-charcoal-muted mt-1 block">
                {treatments.filter((t) => t.status !== "published").length} in draft / review
              </span>
            </div>

            <div className="bg-white border border-stone p-5 rounded-2xl shadow-sm">
              <span className="text-[11px] font-mono text-charcoal-muted uppercase">
                Email Dispatcher
              </span>
              <span className="font-serif-luxury text-xl font-semibold text-forest block mt-1">
                {settings.email_provider.toUpperCase()}
              </span>
              <span className="text-[11px] text-charcoal-muted mt-1 block">
                {settings.operating_mode === "demonstration" ? "Simulated Sandboxed" : "Configured"}
              </span>
            </div>
          </div>

          {/* Quick Settings Control */}
          <div className="bg-white border border-stone p-6 rounded-2xl shadow-sm space-y-4">
            <h3 className="font-serif-luxury text-xl font-medium text-forest">
              Homepage Announcement Banner
            </h3>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 bg-ivory rounded-xl border border-stone/50">
              <div className="space-y-1">
                <span className="font-semibold text-xs text-forest block">
                  Announcement Status: {settings.announcement_active ? "Visible" : "Hidden"}
                </span>
                <p className="text-xs text-charcoal-muted">&ldquo;{settings.announcement_text}&rdquo;</p>
              </div>

              <button
                onClick={toggleAnnouncement}
                className="px-4 py-2 border border-forest text-forest hover:bg-forest hover:text-ivory rounded-full text-xs font-semibold uppercase tracking-wider transition-colors shrink-0"
              >
                {settings.announcement_active ? "Disable Bar" : "Enable Bar"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: CONSULTATIONS */}
      {activeTab === "requests" && (
        <div className="bg-white border border-stone rounded-2xl overflow-hidden shadow-sm">
          <div className="p-6 border-b border-stone/40">
            <h3 className="font-serif-luxury text-xl font-medium text-forest">
              Patient Consultation Inquiries
            </h3>
            <p className="text-xs text-charcoal-muted mt-0.5">
              Marketing consultation inquiries persisted securely in database.
            </p>
          </div>

          {requests.length === 0 ? (
            <div className="p-12 text-center text-xs text-charcoal-muted">
              No consultation inquiries recorded yet. Submit a test inquiry via the public consultation form.
            </div>
          ) : (
            <div className="divide-y divide-stone/30">
              {requests.map((req) => (
                <div key={req.id} className="p-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div className="space-y-1.5 max-w-lg">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-mono font-bold text-forest">
                        {req.reference_number}
                      </span>
                      <span
                        className={`text-[10px] uppercase font-bold px-2 py-0.5 rounded font-mono ${
                          req.status === "new"
                            ? "bg-amber-100 text-amber-900"
                            : req.status === "contacted"
                            ? "bg-blue-100 text-blue-900"
                            : "bg-emerald-100 text-emerald-900"
                        }`}
                      >
                        {req.status}
                      </span>
                      {req.is_demonstration && (
                        <span className="text-[10px] bg-stone/40 text-charcoal-muted px-1.5 py-0.2 rounded font-mono">
                          Sandbox
                        </span>
                      )}
                    </div>

                    <h4 className="text-sm font-semibold text-charcoal">
                      {req.full_name} &bull; <span className="font-normal text-charcoal-muted">{req.email}</span> &bull; {req.phone}
                    </h4>

                    <p className="text-xs text-charcoal-muted">
                      Interest: <strong>{req.service_interest}</strong> &bull; Location: <strong>{req.location_preference}</strong> &bull; Preferred Time: <strong>{req.preferred_time_window}</strong>
                    </p>

                    <p className="text-[11px] text-charcoal-muted font-mono">
                      Received: {new Date(req.created_at).toLocaleString()} &bull; Dispatch: {req.notification_delivery_status}
                    </p>
                  </div>

                  <div className="flex items-center gap-2 self-start md:self-auto">
                    <select
                      value={req.status}
                      onChange={(e) => updateRequestStatus(req.id, e.target.value as any)}
                      className="px-3 py-1.5 bg-ivory border border-stone rounded-lg text-xs text-charcoal focus:outline-none cursor-pointer"
                    >
                      <option value="new">Mark New</option>
                      <option value="contacted">Mark Contacted</option>
                      <option value="scheduled">Mark Scheduled</option>
                      <option value="archived">Mark Archived</option>
                    </select>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* TAB 3: SANDBOX BOOKINGS */}
      {activeTab === "bookings" && (
        <div className="bg-white border border-stone rounded-2xl overflow-hidden shadow-sm">
          <div className="p-6 border-b border-stone/40">
            <h3 className="font-serif-luxury text-xl font-medium text-forest">
              Sandbox Appointment Bookings
            </h3>
            <p className="text-xs text-charcoal-muted mt-0.5">
              Demonstration reservations created through the online appointment wizard.
            </p>
          </div>

          {bookings.length === 0 ? (
            <div className="p-12 text-center text-xs text-charcoal-muted">
              No sandbox bookings recorded yet. Try creating a reservation in the public booking wizard.
            </div>
          ) : (
            <div className="divide-y divide-stone/30">
              {bookings.map((bkg) => (
                <div key={bkg.id} className="p-6 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono font-bold text-forest">
                      {bkg.reference_number}
                    </span>
                    <span className="text-[10px] font-mono bg-emerald-100 text-emerald-900 px-2 py-0.5 rounded font-bold uppercase">
                      {bkg.status}
                    </span>
                  </div>

                  <div className="text-xs text-charcoal">
                    <strong>Procedure:</strong> {bkg.treatment_name} &bull; <strong>Scheduled:</strong> {bkg.appointment_date} at {bkg.time_slot}
                  </div>

                  <div className="text-xs text-charcoal-muted">
                    <strong>Patient:</strong> {bkg.patient_name} ({bkg.patient_email}, {bkg.patient_phone})
                  </div>

                  <p className="text-[11px] text-charcoal-muted font-mono">
                    Logged: {new Date(bkg.created_at).toLocaleString()}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* TAB 4: TREATMENTS */}
      {activeTab === "treatments" && (
        <div className="bg-white border border-stone rounded-2xl overflow-hidden shadow-sm">
          <div className="p-6 border-b border-stone/40 flex items-center justify-between">
            <div>
              <h3 className="font-serif-luxury text-xl font-medium text-forest">
                Clinical Treatments Manager
              </h3>
              <p className="text-xs text-charcoal-muted mt-0.5">
                Manage publishing states, clinical reviewer signatures, and sample fees.
              </p>
            </div>
          </div>

          <div className="divide-y divide-stone/30">
            {treatments.map((t) => (
              <div key={t.id} className="p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="space-y-1 max-w-lg">
                  <div className="flex items-center gap-2">
                    <span
                      className={`text-[10px] uppercase font-bold px-2 py-0.5 rounded font-mono ${
                        t.status === "published"
                          ? "bg-emerald-100 text-emerald-900"
                          : "bg-stone/50 text-charcoal"
                      }`}
                    >
                      {t.status}
                    </span>
                    <span className="text-xs font-mono text-champagne-dark">
                      ${t.price_amount} ({t.price_type})
                    </span>
                  </div>

                  <h4 className="font-serif-luxury text-lg font-medium text-forest">
                    {t.name}
                  </h4>

                  <p className="text-xs text-charcoal-muted line-clamp-1">
                    {t.tagline}
                  </p>

                  <p className="text-[11px] text-charcoal-muted">
                    Reviewed by: <strong>{t.reviewed_by_clinician || "Pending Review"}</strong> ({t.last_clinical_review_date || "N/A"})
                  </p>
                </div>

                <div className="flex items-center gap-3">
                  <button
                    onClick={() => toggleTreatmentStatus(t)}
                    className="px-4 py-2 border border-stone hover:border-forest text-xs font-medium rounded-lg text-charcoal"
                  >
                    {t.status === "published" ? "Unpublish (Draft)" : "Publish to Site"}
                  </button>

                  <Link
                    href={`/treatments/${t.slug}`}
                    target="_blank"
                    className="p-2 text-charcoal-muted hover:text-forest"
                    title="Preview Live Page"
                  >
                    <Eye className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 5: AUDIT LOGS */}
      {activeTab === "audit" && (
        <div className="bg-white border border-stone rounded-2xl overflow-hidden shadow-sm">
          <div className="p-6 border-b border-stone/40">
            <h3 className="font-serif-luxury text-xl font-medium text-forest">
              System &amp; Administrative Audit Trail
            </h3>
            <p className="text-xs text-charcoal-muted mt-0.5">
              Immutable record of administrative actions, booking inquiries, and content publications.
            </p>
          </div>

          <div className="divide-y divide-stone/30">
            {auditLogs.slice(0, 30).map((log) => (
              <div key={log.id} className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs">
                <div className="space-y-0.5">
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-forest">{log.action}</span>
                    <span className="text-[10px] font-mono bg-ivory px-1.5 py-0.2 rounded border border-stone/40">
                      {log.entity_type}: {log.entity_id}
                    </span>
                  </div>
                  <p className="text-charcoal-muted">{log.details}</p>
                </div>

                <div className="text-right text-[11px] text-charcoal-muted font-mono shrink-0">
                  <span className="block">{log.actor}</span>
                  <span className="block opacity-70">
                    {new Date(log.timestamp).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 6: PRODUCTION LAUNCH GATES */}
      {activeTab === "checklist" && (
        <div className="bg-white border border-stone p-6 sm:p-10 rounded-2xl shadow-sm space-y-6">
          <div>
            <h3 className="font-serif-luxury text-2xl font-medium text-forest">
              Client Production Launch Gates
            </h3>
            <p className="text-xs text-charcoal-muted mt-1 leading-relaxed">
              Before taking Bioflora live for a paying commercial medical spa client, ensure all 16 production gates below are approved and verified.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            {[
              "Legal business identity, clinic address, and tax registration confirmed.",
              "Verified clinical licenses and board certification for all public clinicians.",
              "Live appointment booking provider adapter (Boulevard, Jane, Zenoti) connected.",
              "Transactional email provider (Resend / SendGrid) configured with verified domain.",
              "Stripe merchant account connected for appointment deposits and gift cards.",
              "Notice of Privacy Practices (HIPAA) formally reviewed by health law counsel.",
              "Cookie consent and privacy-conscious analytics verified without tracking pixels on booking flows.",
              "Signed patient consent and media releases obtained for all clinical imagery.",
              "WCAG 2.2 Level AA accessibility audit executed.",
              "Custom domain mapped with automated TLS/HTTPS certificate renewal.",
              "Database daily backup and point-in-time recovery protocol enabled.",
              "Sentry or equivalent real-time error telemetry configured.",
            ].map((gate, i) => (
              <div key={i} className="p-3 bg-ivory rounded-xl border border-stone/40 flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-forest shrink-0 mt-0.5" />
                <span className="text-charcoal-muted leading-relaxed">{gate}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
