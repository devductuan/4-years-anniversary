import { NextRequest, NextResponse } from "next/server";

const ANNIVERSARIES_AUTH_COOKIE = "anniversaries_auth";
const ANNIVERSARIES_AUTH_VALUE = "1";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Protect /anniversaries but allow /anniversaries/unlock and static/api
  if (pathname.startsWith("/anniversaries") && !pathname.startsWith("/anniversaries/unlock")) {
    const auth = request.cookies.get(ANNIVERSARIES_AUTH_COOKIE)?.value;
    if (auth !== ANNIVERSARIES_AUTH_VALUE) {
      const unlockUrl = new URL("/anniversaries/unlock", request.url);
      unlockUrl.searchParams.set("from", pathname);
      return NextResponse.redirect(unlockUrl);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/anniversaries", "/anniversaries/:path*"],
};
