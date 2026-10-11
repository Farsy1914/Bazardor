import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // BetterAuth session cookie (বা আপনার প্রোটেক্টেড কুকি চেক)
  const sessionToken =
    request.cookies.get("better-auth.session_token") ||
    request.cookies.get("__Secure-better-auth.session_token");

  // Protected routes definitions
  const protectedRoutes = ["/profile"];

  const isProtectedRoute = protectedRoutes.some((route) =>
    pathname.startsWith(route)
  );

  // সুরক্ষিত পেজে না যাওয়ার জন্য রিডাইরেক্ট লজিক
  if (isProtectedRoute && !sessionToken) {
    const signInUrl = new URL("/signin", request.url);
    signInUrl.searchParams.set("callbackUrl", pathname);
    return NextResponse.redirect(signInUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/profile/:path*"],
};