import { NextRequest, NextResponse } from "next/server";
import { bookingSubmissionSchema } from "@/lib/validations/forms";
import { getActiveBookingAdapter } from "@/lib/booking";
import { checkRateLimit } from "@/lib/security/rate-limit";
import { sendBookingNotification } from "@/lib/notifications/email";
import { getServerAuthoritativeMode, guardPaymentProcessing } from "@/lib/security/mode-isolation";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const serviceSlug = searchParams.get("service") || "botox-cosmetic";
    const locationSlug = searchParams.get("location") || "beverly-hills";
    const providerSlug = searchParams.get("provider") || "dr-elena-vance";
    const startDate = searchParams.get("date") || new Date().toISOString().split("T")[0];

    const { adapter, mode } = await getActiveBookingAdapter();
    const availability = await adapter.getAvailability(
      serviceSlug,
      locationSlug,
      providerSlug,
      startDate,
      7
    );

    return NextResponse.json({
      success: true,
      mode,
      availability,
    });
  } catch (error) {
    console.error("Failed to fetch booking availability:", error);
    return NextResponse.json(
      { success: false, error: "Failed to load availability" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const ip = request.headers.get("x-forwarded-for") || "client-ip";
    const rate = checkRateLimit(`booking-${ip}`, 10, 60 * 1000);
    if (!rate.allowed) {
      return NextResponse.json(
        {
          success: false,
          message: "Too many reservation attempts. Please wait a minute before trying again.",
        },
        { status: 429 }
      );
    }

    const body = await request.json();

    // Guard: Block live payment attempts in demonstration mode
    if (body.paymentMethodId || body.amountCents || body.livePayment) {
      const paymentGuard = await guardPaymentProcessing({
        amountCents: body.amountCents,
        paymentMethodId: body.paymentMethodId,
        isLiveRequested: true,
      });
      if (!paymentGuard.allowed) {
        return NextResponse.json(
          {
            success: false,
            message: paymentGuard.reason,
            error: "PAYMENT_PROHIBITED_IN_DEMO_MODE",
          },
          { status: 400 }
        );
      }
    }

    const validated = bookingSubmissionSchema.safeParse(body);

    if (!validated.success) {
      return NextResponse.json(
        {
          success: false,
          errors: validated.error.flatten().fieldErrors,
        },
        { status: 400 }
      );
    }

    // Authoritative server mode
    const serverPolicy = await getServerAuthoritativeMode();
    const { adapter, mode } = await getActiveBookingAdapter();

    const result = await adapter.createBooking({
      ...validated.data,
      isDemonstration: serverPolicy.isDemonstration,
    });

    if (!result.success && result.error === "DUPLICATE_BOOKING") {
      return NextResponse.json(result, { status: 409 });
    }

    if (result.success) {
      // Dispatch notification (simulated in demo mode, Resend in production)
      await sendBookingNotification({
        referenceNumber: result.referenceNumber,
        recipientEmail: validated.data.patientEmail,
        recipientName: validated.data.patientName,
        treatmentName: validated.data.treatmentName,
        locationName: validated.data.locationSlug,
        appointmentDate: validated.data.appointmentDate,
        timeSlot: validated.data.timeSlot,
        isDemonstration: serverPolicy.isDemonstration,
      });
    }

    return NextResponse.json(result);

  } catch (error) {
    console.error("Booking submission error:", error);
    return NextResponse.json(
      {
        success: false,
        message: "An internal server error occurred while processing the appointment reservation.",
        error: (error as Error).message,
      },
      { status: 500 }
    );
  }
}
