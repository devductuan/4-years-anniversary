import { NextRequest, NextResponse } from "next/server";

const ANNIVERSARIES_AUTH_COOKIE = "anniversaries_auth";
const ANNIVERSARIES_AUTH_VALUE = "1";

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const isAnniversariesRoute = pathname.startsWith("/anniversaries");
  const isAdminRoute = pathname.startsWith("/admin");
  const isUnlockRoute = pathname.startsWith("/anniversaries/unlock") || pathname.startsWith("/admin/unlock");

  // Protect private routes but allow their unlock pages.
  if ((isAnniversariesRoute || isAdminRoute) && !isUnlockRoute) {
    const auth = request.cookies.get(ANNIVERSARIES_AUTH_COOKIE)?.value;
    if (auth !== ANNIVERSARIES_AUTH_VALUE) {
      const unlockPath = isAdminRoute ? "/admin/unlock" : "/anniversaries/unlock";
      const unlockUrl = new URL(unlockPath, request.url);
      unlockUrl.searchParams.set("from", pathname);
      return NextResponse.redirect(unlockUrl);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/anniversaries", "/anniversaries/:path*", "/admin", "/admin/:path*"],
};
