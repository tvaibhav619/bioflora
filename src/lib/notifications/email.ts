import { getSettings } from "@/lib/db/store";

export interface NotificationPayload {
  referenceNumber: string;
  recipientEmail: string;
  recipientName: string;
  serviceInterest: string;
  locationPreference: string;
  preferredTimeWindow?: string;
  isDemonstration: boolean;
}

export interface NotificationResult {
  delivered: boolean;
  deliveryStatus: "delivered" | "simulated" | "failed";
  providerUsed: string;
  messageId?: string;
  logMessage: string;
}

export async function sendConsultationNotification(
  payload: NotificationPayload
): Promise<NotificationResult> {
  const settings = await getSettings();

  // Demonstration mode: Always simulate safely and log without failing the submission
  if (settings.operating_mode === "demonstration" || !settings.email_provider_configured) {
    const logMsg = `[DEMO NOTIFICATION] Ref: ${payload.referenceNumber} | To: ${payload.recipientEmail} (${payload.recipientName}) | Service: ${payload.serviceInterest} | Loc: ${payload.locationPreference} | Status: Simulated sandbox acknowledgement generated.`;
    console.log(logMsg);

    return {
      delivered: true,
      deliveryStatus: "simulated",
      providerUsed: "Mock/Sandbox Email Dispatcher",
      messageId: `sim-${Date.now()}`,
      logMessage: logMsg,
    };
  }

  // Production mode: Connect to Resend or SendGrid when API key is configured
  const apiKey = process.env.RESEND_API_KEY || process.env.SENDGRID_API_KEY;

  if (!apiKey) {
    console.warn(`[NOTIFICATION WARNING] Production email attempted for ${payload.referenceNumber} but RESEND_API_KEY is not set. Marking status as failed without losing customer enquiry.`);
    return {
      delivered: false,
      deliveryStatus: "failed",
      providerUsed: "Unconfigured Provider",
      logMessage: "Production email provider API key is missing. Enquiry securely persisted in database.",
    };
  }

  try {
    // If Resend API key is present:
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: `Bioflora Concierge <${process.env.EMAIL_FROM || "concierge@bioflora-medspa.example.com"}>`,
        to: [payload.recipientEmail],
        subject: `Bioflora Consultation Request Acknowledgement [${payload.referenceNumber}]`,
        html: `
          <div style="font-family: serif; color: #183B32; max-width: 600px; margin: 0 auto; padding: 24px; border: 1px solid #DAD2C5;">
            <h1 style="color: #183B32; font-size: 24px;">BIOFLORA Medical Spa</h1>
            <p>Dear ${payload.recipientName},</p>
            <p>We have received your consultation inquiry regarding <strong>${payload.serviceInterest}</strong> at our <strong>${payload.locationPreference}</strong> location.</p>
            <p>Your confidential reference code is: <strong>${payload.referenceNumber}</strong>.</p>
            <p>A member of our clinical coordination team will reach out to you during your preferred contact window.</p>
            <hr style="border: 0; border-top: 1px solid #DAD2C5; margin: 24px 0;" />
            <p style="font-size: 12px; color: #555C50;">Bioflora Medical Spa &bull; Clinical Excellence &bull; Natural Beauty</p>
          </div>
        `,
      }),
    });

    if (!res.ok) {
      throw new Error(`Email provider responded with status ${res.status}`);
    }

    const data = await res.json();
    return {
      delivered: true,
      deliveryStatus: "delivered",
      providerUsed: "Resend",
      messageId: data.id,
      logMessage: `Email successfully delivered via Resend. ID: ${data.id}`,
    };
  } catch (error) {
    console.error(`[EMAIL DISPATCH FAILURE] Failed to send email for ref ${payload.referenceNumber}:`, error);
    return {
      delivered: false,
      deliveryStatus: "failed",
      providerUsed: "Resend",
      logMessage: `Delivery failed: ${(error as Error).message}. Enquiry saved in database.`,
    };
  }
}
