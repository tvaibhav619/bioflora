import { NextRequest, NextResponse } from "next/server";
import { updateConsultationStatus } from "@/lib/db/store";

export async function POST(request: NextRequest) {
  try {
    const { id, status } = await request.json();
    if (!id || !status) {
      return NextResponse.json({ success: false, error: "ID and status required" }, { status: 400 });
    }
    const updated = await updateConsultationStatus(id, status);
    return NextResponse.json({ success: true, request: updated });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: (error as Error).message },
      { status: 500 }
    );
  }
}
