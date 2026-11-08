import { createAuthClient } from "better-auth/react";

export const authClient = createAuthClient({
  // baseURL তুলে নেওয়া হয়েছে যাতে এটি ব্রাউজারের বর্তমান Domain (Local or Vercel) অটোমেটিক ধরে নেয়
  baseURL: process.env.NEXT_PUBLIC_BETTER_AUTH_URL || typeof window !== "undefined" ? window.location.origin : "",
});

export const { signUp, signIn, signOut, useSession } = authClient;