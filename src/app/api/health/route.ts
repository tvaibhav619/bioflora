import { NextResponse } from "next/server";
import { getSettings, getTreatments } from "@/lib/db/store";
import { getActiveBookingAdapter } from "@/lib/booking";

export async function GET() {
  const startTime = Date.now();
  try {
    const settings = await getSettings();
    const treatments = await getTreatments();
    const { adapter, mode } = await getActiveBookingAdapter();
    const pingResult = await adapter.ping();

    const responseTime = Date.now() - startTime;

    return NextResponse.json(
      {
        status: "healthy",
        timestamp: new Date().toISOString(),
        version: "1.0.0",
        environment: process.env.NODE_ENV || "development",
        latencyMs: responseTime,
        system: {
          operatingMode: settings.operating_mode,
          bookingProvider: settings.booking_provider,
          bookingAdapterStatus: pingResult.ok ? "connected" : "degraded",
          bookingAdapterMessage: pingResult.message,
        },
        database: {
          status: "connected",
          treatmentCount: treatments.length,
          storageType: "hybrid-json-supabase-ready",
        },
        security: {
          phiCollectionDisabled: true,
          rateLimitingActive: true,
          auditLogging: true,
        },
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      {
        status: "unhealthy",
        timestamp: new Date().toISOString(),
        error: (error as Error).message,
      },
      { status: 503 }
    );
  }
}
