"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useSession, signOut } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

// API Response অনুযায়ী নিখুঁত Slug নাম দেওয়া হয়েছে
const categories = [
  { name: "চাল", icon: "🍚", slug: "rice" },
  { name: "ডাল", icon: "🫘", slug: "dal" },
  { name: "তেল", icon: "🛢️", slug: "oil" },
  { name: "সবজি", icon: "🥬", slug: "vegetables" },
  { name: "মাছ", icon: "🐟", slug: "fish" },
  { name: "মাংস", icon: "🍗", slug: "meat" },
  { name: "ডিম-দুধ", icon: "🥛", slug: "dairy" },
  { name: "মসলা", icon: "🌶️", slug: "spices" },
];

export default function Navbar() {
  const { data: session, isPending } = useSession();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const router = useRouter();

  const todayDate = "রবিবার, ৮ নভেম্বর, ২০২৬";

  const handleSignOut = async () => {
    try {
      await signOut();
      toast.success("সাইন আউট সফল হয়েছে!");
      setDropdownOpen(false);
      router.push("/");
      router.refresh();
    } catch (err) {
      toast.error("সাইন আউট করতে সমস্যা হয়েছে!");
    }
  };

  const initial = session?.user?.name ? session.user.name.charAt(0).toUpperCase() : "S";

  return (
    <header className="bg-white border-b border-gray-200/80 sticky top-0 z-50">
      {/* Top Main Nav */}
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2.5">
          <div className="w-10 h-10 bg-[#008a45] rounded-xl flex items-center justify-center p-2 shadow-xs">
            <Image
              src="/logo-icon.png"
              alt="বাজার দর"
              width={28}
              height={28}
              className="object-contain brightness-0 invert"
            />
          </div>
          <div>
            <h1 className="font-extrabold text-xl text-gray-900 leading-tight">বাজার দর</h1>
            <p className="text-[11px] text-gray-400 font-medium">{todayDate}</p>
          </div>
        </Link>

        {/* Auth / User Area */}
        <div className="flex items-center gap-3">
          {isPending ? (
            <div className="h-8 w-24 bg-gray-100 animate-pulse rounded-full"></div>
          ) : session?.user ? (
            <div className="relative">
              <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="flex items-center gap-2 px-2 py-1 rounded-full hover:bg-gray-50 transition-colors cursor-pointer"
              >
                <div className="w-8 h-8 rounded-full bg-[#008a45] text-white font-bold text-sm flex items-center justify-center">
                  {initial}
                </div>
                <span className="text-sm font-semibold text-gray-800">
                  {session.user.name}
                </span>
                <span className="text-[10px] text-gray-500">▼</span>
              </button>

              {dropdownOpen && (
                <div className="absolute right-0 mt-2 w-64 bg-white rounded-2xl shadow-xl border border-gray-100 p-4 z-50 space-y-3">
                  <div>
                    <p className="text-sm font-bold text-gray-700">{session.user.name}</p>
                    <p className="text-xs text-gray-400 truncate">{session.user.email}</p>
                  </div>

                  <hr className="border-gray-100" />

                  <Link
                    href="/profile"
                    onClick={() => setDropdownOpen(false)}
                    className="flex items-center gap-2 text-sm text-gray-800 font-semibold hover:text-[#008a45] transition-colors"
                  >
                    <span>👤</span> আমার প্রোফাইল
                  </Link>

                  <button
                    onClick={handleSignOut}
                    className="flex items-center gap-2 text-sm text-red-500 font-semibold hover:text-red-600 transition-colors cursor-pointer"
                  >
                    <span>↵</span> সাইন আউট
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className="flex items-center gap-3">
              <Link
                href="/signin"
                className="text-xs font-bold text-gray-700 hover:text-[#008a45] px-3 py-2 transition-colors"
              >
                সাইন ইন
              </Link>
              <Link
                href="/signup"
                className="text-xs font-bold bg-[#008a45] hover:bg-[#00753a] text-white px-4 py-2 rounded-xl transition-colors shadow-2xs"
              >
                সাইন আপ
              </Link>
            </div>
          )}
        </div>
      </div>

      {/* Category Pills */}
      <div className="border-t border-gray-100 bg-[#fbfdfb]">
        <div className="max-w-7xl mx-auto px-4 py-1.5 flex items-center gap-1.5 overflow-x-auto no-scrollbar text-xs font-semibold">
          {categories.map((cat) => (
            <Link
              key={cat.slug}
              href={`/category/${cat.slug}`}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-gray-700 hover:bg-emerald-50 hover:text-[#008a45] transition-all whitespace-nowrap"
            >
              <span>{cat.icon}</span>
              <span>{cat.name}</span>
            </Link>
          ))}
        </div>
      </div>
    </header>
  );
}