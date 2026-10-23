import { NextRequest, NextResponse } from "next/server";
import { recordFunnelEvent, getFunnelMetrics, ValidFunnelEvent } from "@/lib/db/store";
import { authenticateAdminRequest } from "@/lib/auth/admin-auth";
import { checkRateLimit } from "@/lib/security/rate-limit";

const ALLOWED_EVENTS = new Set<ValidFunnelEvent>([
  "consultation_views",
  "consultation_starts",
  "consultation_submits",
  "booking_views",
  "booking_step_1",
  "booking_step_2",
  "booking_step_3",
  "booking_step_4",
  "booking_step_5",
  "booking_step_6",
  "booking_confirmed",
]);

export async function POST(request: NextRequest) {
  try {
    const ip = request.headers.get("x-forwarded-for") || "anonymous";
    const rate = checkRateLimit(`funnel-${ip}`, 60, 60 * 1000);
    if (!rate.allowed) {
      return NextResponse.json({ success: false, error: "Rate limit reached" }, { status: 429 });
    }

    const { event } = await request.json();
    if (!event || !ALLOWED_EVENTS.has(event)) {
      return NextResponse.json(
        { success: false, error: "Invalid funnel event identifier" },
        { status: 400 }
      );
    }

    const updated = await recordFunnelEvent(event);
    return NextResponse.json({ success: true, event, metrics: updated });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: (error as Error).message },
      { status: 500 }
    );
  }
}

export async function GET() {
  const auth = await authenticateAdminRequest("content_editor");
  if ("response" in auth) {
    return auth.response;
  }

  const metrics = await getFunnelMetrics();

  // Calculated conversion performance metrics
  const consultationConversionRate =
    metrics.consultation_views > 0
      ? ((metrics.consultation_submits / metrics.consultation_views) * 100).toFixed(1)
      : "0.0";

  const consultationEngagementRate =
    metrics.consultation_views > 0
      ? ((metrics.consultation_starts / metrics.consultation_views) * 100).toFixed(1)
      : "0.0";

  const bookingCompletionRate =
    metrics.booking_views > 0
      ? ((metrics.booking_confirmed / metrics.booking_views) * 100).toFixed(1)
      : "0.0";

  return NextResponse.json({
    success: true,
    metrics,
    analytics: {
      consultationConversionRate: `${consultationConversionRate}%`,
      consultationEngagementRate: `${consultationEngagementRate}%`,
      bookingCompletionRate: `${bookingCompletionRate}%`,
    },
  });
}
