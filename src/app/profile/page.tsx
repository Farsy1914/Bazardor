"use client";

import { useSession, signOut } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { User, Mail, Calendar, LogOut, ShieldAlert } from "lucide-react";
import Link from "next/link";

export default function ProfilePage() {
  const { data: session, isPending } = useSession();
  const router = useRouter();

  const handleSignOut = async () => {
    await signOut();
    router.push("/signin");
  };

  if (isPending) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-16 text-center space-y-4">
        <div className="w-12 h-12 border-4 border-emerald-600 border-t-transparent rounded-full animate-spin mx-auto"></div>
        <p className="text-gray-500 text-sm">প্রোফাইল লোড হচ্ছে...</p>
      </div>
    );
  }

  if (!session) {
    return (
      <div className="max-w-md mx-auto px-4 py-16 text-center space-y-4">
        <div className="bg-amber-50 border border-amber-200 text-amber-800 p-6 rounded-2xl space-y-3">
          <ShieldAlert className="w-10 h-10 text-amber-600 mx-auto" />
          <h2 className="text-lg font-bold">প্রোফাইল দেখতে সাইন ইন প্রয়োজন</h2>
          <p className="text-sm text-amber-700">
            এই পেজটি দেখতে অনুগ্রহ করে প্রথমে সাইন ইন করুন।
          </p>
          <Link
            href="/signin"
            className="inline-block bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-sm px-5 py-2 rounded-lg transition-colors mt-2"
          >
            সাইন ইন করুন
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto px-4 py-10 space-y-6">
      <div className="bg-white rounded-2xl border border-gray-200 p-6 md:p-8 shadow-sm space-y-6">
        <div className="flex items-center gap-4 border-b pb-6">
          <div className="w-16 h-16 bg-emerald-100 text-emerald-800 rounded-full flex items-center justify-center font-bold text-2xl border-2 border-emerald-500">
            {session.user?.name ? session.user.name[0].toUpperCase() : "U"}
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">{session.user?.name || "ইউজার"}</h1>
            <p className="text-sm text-gray-500">ব্যক্তিগত প্রোফাইল বিবরণী</p>
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl border border-gray-100">
            <User className="w-5 h-5 text-gray-400" />
            <div>
              <p className="text-xs text-gray-500">নাম</p>
              <p className="text-sm font-semibold text-gray-800">{session.user?.name}</p>
            </div>
          </div>

          <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl border border-gray-100">
            <Mail className="w-5 h-5 text-gray-400" />
            <div>
              <p className="text-xs text-gray-500">ইমেইল</p>
              <p className="text-sm font-semibold text-gray-800">{session.user?.email}</p>
            </div>
          </div>

          <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl border border-gray-100">
            <Calendar className="w-5 h-5 text-gray-400" />
            <div>
              <p className="text-xs text-gray-500">অ্যাকাউন্ট যোগদানের তারিখ</p>
              <p className="text-sm font-semibold text-gray-800">
                {new Date(session.user?.createdAt || Date.now()).toLocaleDateString("bn-BD")}
              </p>
            </div>
          </div>
        </div>

        <div className="pt-4 border-t">
          <button
            onClick={handleSignOut}
            className="w-full flex items-center justify-center gap-2 bg-red-50 hover:bg-red-100 text-red-600 font-semibold py-2.5 rounded-xl text-sm transition-colors border border-red-200"
          >
            <LogOut className="w-4 h-4" />
            <span>সাইন আউট করুন</span>
          </button>
        </div>
      </div>
    </div>
  );
}