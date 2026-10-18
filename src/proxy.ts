import { NextRequest, NextResponse } from "next/server";

const ANNIVERSARIES_AUTH_COOKIE = "anniversaries_auth";
const ANNIVERSARIES_AUTH_VALUE = "1";

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const isMeRoute = pathname === "/me" || pathname.startsWith("/me/");
  const isUnlockRoute = pathname === "/me/unlock";

  // Protect private routes but allow their unlock pages.
  if (isMeRoute && !isUnlockRoute) {
    const auth = request.cookies.get(ANNIVERSARIES_AUTH_COOKIE)?.value;
    if (auth !== ANNIVERSARIES_AUTH_VALUE) {
      const unlockUrl = new URL("/me/unlock", request.url);
      unlockUrl.searchParams.set("from", pathname);
      return NextResponse.redirect(unlockUrl);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/me", "/me/:path*"],
};
