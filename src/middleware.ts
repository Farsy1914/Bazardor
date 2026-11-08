import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // BetterAuth session cookie (বা আপনার প্রোটেক্টেড কুকি চেক)
  const sessionToken =
    request.cookies.get("better-auth.session_token") ||
    request.cookies.get("__Secure-better-auth.session_token");

  // Protected routes definitions (এখানে /product এবং /profile দুটোই রাখা হয়েছে)
  const protectedRoutes = ["/profile", "/product"];

  const isProtectedRoute = protectedRoutes.some((route) =>
    pathname.startsWith(route)
  );

  // সুরক্ষিত পেজে না যাওয়ার জন্য রিডাইরেক্ট লজিক (লগইন না থাকলে /signin-এ পাঠাবে)
  if (isProtectedRoute && !sessionToken) {
    const signInUrl = new URL("/signin", request.url);
    signInUrl.searchParams.set("callbackUrl", pathname);
    return NextResponse.redirect(signInUrl);
  }

  return NextResponse.next();
}

export const config = {
  // matcher-এ /product এবং /profile দুটো রুট এবং এদের সাব-রুটগুলো ট্র্যাক করার জন্য আপডেট করা হয়েছে
  matcher: ["/profile/:path*", "/product/:path*"],
};