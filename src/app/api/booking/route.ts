import { NextRequest, NextResponse } from "next/server";
import { bookingSubmissionSchema } from "@/lib/validations/forms";
import { getActiveBookingAdapter } from "@/lib/booking";
import { checkRateLimit } from "@/lib/security/rate-limit";

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

    const { adapter, mode } = await getActiveBookingAdapter();
    const result = await adapter.createBooking({
      ...validated.data,
      isDemonstration: mode === "demonstration",
    });

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
