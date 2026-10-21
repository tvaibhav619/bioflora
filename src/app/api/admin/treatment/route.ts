import { NextRequest, NextResponse } from "next/server";
import { saveTreatment, getTreatmentBySlug, deleteTreatment } from "@/lib/db/store";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const updated = await saveTreatment(body);
    return NextResponse.json({ success: true, treatment: updated });
  } catch (error) {
    console.error("Failed to save treatment:", error);
    return NextResponse.json(
      { success: false, error: (error as Error).message },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const slug = searchParams.get("slug");
    if (!slug) {
      return NextResponse.json({ success: false, error: "Slug required" }, { status: 400 });
    }
    const success = await deleteTreatment(slug);
    return NextResponse.json({ success });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: (error as Error).message },
      { status: 500 }
    );
  }
}
