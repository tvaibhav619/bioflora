import { NextRequest, NextResponse } from "next/server";
import { getSettings, updateSettings } from "@/lib/db/store";
import { authenticateAdminRequest } from "@/lib/auth/admin-auth";

export async function GET() {
  const auth = await authenticateAdminRequest(["admin", "owner"]);
  if ("response" in auth) {
    return auth.response;
  }
  const settings = await getSettings();
  return NextResponse.json(settings);
}

export async function POST(request: NextRequest) {
  const auth = await authenticateAdminRequest(["admin", "owner"]);
  if ("response" in auth) {
    return auth.response;
  }

  try {
    const body = await request.json();
    const updated = await updateSettings(body);
    return NextResponse.json({ success: true, settings: updated });
  } catch (error) {
    console.error("Failed to update settings:", error);
    return NextResponse.json(
      { success: false, error: (error as Error).message },
      { status: 500 }
    );
  }
}
