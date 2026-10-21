import { NextRequest, NextResponse } from "next/server";
import { DEMO_ADMIN_USERS, createSessionToken } from "@/lib/auth/admin-auth";
import { addAuditLog } from "@/lib/db/store";

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json();

    const user = DEMO_ADMIN_USERS[email];
    if (!user || user.passwordHash !== password) {
      return NextResponse.json(
        { success: false, message: "Invalid email or administrative password." },
        { status: 401 }
      );
    }

    const token = createSessionToken(user);
    const response = NextResponse.json({
      success: true,
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
        title: user.title,
      },
    });

    response.cookies.set({
      name: "bioflora_admin_session",
      value: token,
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 7, // 7 days
      path: "/",
    });

    await addAuditLog(user.name, "Admin Login", "session", user.id, `Role: ${user.role}`);

    return response;
  } catch (error) {
    return NextResponse.json(
      { success: false, message: (error as Error).message },
      { status: 500 }
    );
  }
}
