import { NextRequest, NextResponse } from "next/server";
import { getSettings, updateSettings } from "@/lib/db/store";

export async function GET() {
  const settings = await getSettings();
  return NextResponse.json(settings);
}

export async function POST(request: NextRequest) {
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
