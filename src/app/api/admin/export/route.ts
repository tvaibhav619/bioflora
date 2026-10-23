import { NextRequest, NextResponse } from "next/server";
import { getConsultationRequests, getSandboxBookings } from "@/lib/db/store";
import { authenticateAdminRequest } from "@/lib/auth/admin-auth";

export async function GET(request: NextRequest) {
  const auth = await authenticateAdminRequest(["admin", "owner"]);
  if ("response" in auth) {
    return auth.response;
  }

  const { searchParams } = new URL(request.url);
  const type = searchParams.get("type") || "consultations";

  if (type === "bookings") {
    const bookings = await getSandboxBookings();
    const headers = "Reference,Treatment,Sanctuary,Practitioner,Date,Time,PatientName,PatientEmail,PatientPhone,Status\n";
    const rows = bookings
      .map(
        (b) =>
          `"${b.reference_number}","${b.treatment_name}","${b.location_slug}","${b.provider_slug}","${b.appointment_date}","${b.time_slot}","${b.patient_name}","${b.patient_email}","${b.patient_phone}","${b.status}"`
      )
      .join("\n");

    return new NextResponse(headers + rows, {
      headers: {
        "Content-Type": "text/csv",
        "Content-Disposition": `attachment; filename="bioflora-bookings-${new Date().toISOString().split("T")[0]}.csv"`,
      },
    });
  }

  const requests = await getConsultationRequests();
  const headers = "Reference,FullName,Email,Phone,ServiceInterest,Location,ContactMethod,TimeWindow,PrivacyConsent,Status,CreatedAt\n";
  const rows = requests
    .map(
      (r) =>
        `"${r.reference_number}","${r.full_name}","${r.email}","${r.phone}","${r.service_interest}","${r.location_preference}","${r.preferred_contact_method}","${r.preferred_time_window}","${r.privacy_consent_acknowledged}","${r.status}","${r.created_at}"`
    )
    .join("\n");

  return new NextResponse(headers + rows, {
    headers: {
      "Content-Type": "text/csv",
      "Content-Disposition": `attachment; filename="bioflora-consultations-${new Date().toISOString().split("T")[0]}.csv"`,
    },
  });
}
