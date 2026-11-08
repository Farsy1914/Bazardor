"use client";

import Link from "next/link";
import { authClient } from "@/lib/auth-client"; // Adjust path to your authClient

export default function ProfilePage() {
  const { data: session, isPending } = authClient.useSession();

  if (isPending) {
    return (
      <div className="min-h-[75vh] flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-[#008a45] border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!session) {
    return (
      <div className="min-h-[75vh] flex flex-col items-center justify-center text-center px-4">
        <h2 className="text-xl font-bold text-gray-800">অ্যাকেস সংরক্ষিত</h2>
        <p className="text-xs text-gray-500 mt-1 mb-4">প্রোফাইল দেখতে প্রথমে লগইন করুন।</p>
        <Link
          href="/login"
          className="px-5 py-2.5 bg-[#008a45] text-white text-xs font-bold rounded-xl hover:bg-[#00753a] transition-colors"
        >
          লগইন করুন
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-[80vh] bg-[#f3f6f3] py-10 px-4">
      <div className="max-w-md mx-auto bg-white rounded-3xl p-6 border border-gray-100 shadow-2xs space-y-6">
        <h1 className="text-xl font-black text-gray-900 border-b border-gray-100 pb-4">আমার প্রোফাইল</h1>

        {/* User Info */}
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 bg-[#008a45]/10 text-[#008a45] font-black text-2xl rounded-2xl flex items-center justify-center border border-[#008a45]/20">
            {session.user.name ? session.user.name.charAt(0).toUpperCase() : "U"}
          </div>
          <div>
            <h2 className="font-bold text-gray-900 text-base">{session.user.name}</h2>
            <p className="text-xs text-gray-400 mt-0.5">{session.user.email}</p>
          </div>
        </div>

        {/* Challenge C3: Update Information Button */}
        <div className="pt-2">
          <Link
            href="/profile/update"
            className="w-full inline-block text-center bg-[#008a45] hover:bg-[#00753a] text-white font-bold text-xs py-3 rounded-xl transition-colors shadow-2xs"
          >
            Update Information
          </Link>
        </div>
      </div>
    </div>
  );
}