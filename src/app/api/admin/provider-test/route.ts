import { NextRequest, NextResponse } from "next/server";
import { getSettings } from "@/lib/db/store";

export async function POST(request: NextRequest) {
  const { provider } = await request.json();
  const settings = await getSettings();

  if (provider === "sandbox" || settings.operating_mode === "demonstration") {
    return NextResponse.json({
      success: true,
      provider: "Sandbox Adapter Engine",
      latencyMs: 14,
      status: "healthy",
      message: "Sandbox provider is fully functional. Deterministic slot generation active.",
    });
  }

  // Simulate production provider diagnostic ping
  return NextResponse.json({
    success: false,
    provider: provider || settings.booking_provider,
    latencyMs: 42,
    status: "unconfigured",
    message: `Provider '${provider || settings.booking_provider}' API keys not yet populated in environment variables.`,
  });
}
