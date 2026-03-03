import { NextRequest, NextResponse } from "next/server";

const CORRECT_PASSWORD = "05032022";
const ANNIVERSARIES_AUTH_COOKIE = "anniversaries_auth";
const ANNIVERSARIES_AUTH_VALUE = "1";
const COOKIE_MAX_AGE = 60 * 60 * 24 * 30; // 30 days

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const password = typeof body?.password === "string" ? body.password.trim() : "";

    if (password !== CORRECT_PASSWORD) {
      return NextResponse.json({ success: false, error: "Invalid password" }, { status: 401 });
    }

    const res = NextResponse.json({ success: true });
    res.cookies.set(ANNIVERSARIES_AUTH_COOKIE, ANNIVERSARIES_AUTH_VALUE, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: COOKIE_MAX_AGE,
      path: "/",
    });

    return res;
  } catch {
    return NextResponse.json({ success: false, error: "Invalid request" }, { status: 400 });
  }
}
