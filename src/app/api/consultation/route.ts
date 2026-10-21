import { NextRequest, NextResponse } from "next/server";
import { consultationRequestSchema } from "@/lib/validations/forms";
import { createConsultationRequest, getSettings } from "@/lib/db/store";
import { sendConsultationNotification } from "@/lib/notifications/email";
import { checkRateLimit } from "@/lib/security/rate-limit";

export async function POST(request: NextRequest) {
  try {
    const ip = request.headers.get("x-forwarded-for") || "client-ip";
    const rate = checkRateLimit(`consultation-${ip}`, 8, 60 * 1000);
    if (!rate.allowed) {
      return NextResponse.json(
        {
          success: false,
          message: "Too many submission attempts. Please wait a minute before trying again.",
        },
        { status: 429 }
      );
    }

    const body = await request.json();
    const validated = consultationRequestSchema.safeParse(body);

    if (!validated.success) {
      return NextResponse.json(
        {
          success: false,
          errors: validated.error.flatten().fieldErrors,
        },
        { status: 400 }
      );
    }

    const settings = await getSettings();
    const isDemo = settings.operating_mode === "demonstration";

    // 1. Persist to real database store
    const record = await createConsultationRequest({
      full_name: validated.data.fullName,
      email: validated.data.email,
      phone: validated.data.phone,
      preferred_contact_method: validated.data.preferredContactMethod,
      service_interest: validated.data.serviceInterest,
      location_preference: validated.data.locationPreference,
      preferred_time_window: validated.data.preferredTimeWindow,
      privacy_consent_acknowledged: true,
      marketing_consent: Boolean(validated.data.marketingConsent),
      status: "new",
      is_demonstration: isDemo,
      notification_delivery_status: isDemo ? "simulated" : "delivered",
    });

    // 2. Dispatch transactional notification (or simulated sandbox dispatch)
    const notification = await sendConsultationNotification({
      referenceNumber: record.reference_number,
      recipientEmail: validated.data.email,
      recipientName: validated.data.fullName,
      serviceInterest: validated.data.serviceInterest,
      locationPreference: validated.data.locationPreference,
      preferredTimeWindow: validated.data.preferredTimeWindow,
      isDemonstration: isDemo,
    });

    return NextResponse.json({
      success: true,
      referenceNumber: record.reference_number,
      isDemonstration: isDemo,
      notificationStatus: notification.deliveryStatus,
      message: isDemo
        ? "Your consultation inquiry has been securely recorded in demonstration sandbox mode. A simulated notification was generated."
        : "Your consultation request has been received. Our clinical coordinator will reach out during your preferred window.",
    });
  } catch (error) {
    console.error("Consultation request submission error:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Failed to submit consultation inquiry.",
        error: (error as Error).message,
      },
      { status: 500 }
    );
  }
}
