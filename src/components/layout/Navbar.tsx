"use client";

import Link from "next/link";
import { ShoppingBag, User } from "lucide-react";

export default function Navbar() {
  return (
    <header className="border-b bg-white sticky top-0 z-50 shadow-sm">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 font-bold text-xl text-emerald-700">
          <ShoppingBag className="w-6 h-6" />
          <span>বাজার দর</span>
        </Link>

        <nav className="flex items-center gap-4">
          <Link
            href="/signin"
            className="text-sm font-medium text-gray-600 hover:text-emerald-600 transition-colors"
          >
            সাইন ইন
          </Link>
          <Link
            href="/signup"
            className="text-sm font-medium bg-emerald-600 text-white px-3 py-1.5 rounded-md hover:bg-emerald-700 transition-colors"
          >
            সাইন আপ
          </Link>
          <Link
            href="/profile"
            className="p-1.5 rounded-full hover:bg-gray-100 text-gray-600 transition-colors"
            title="প্রোফাইল"
          >
            <User className="w-5 h-5" />
          </Link>
        </nav>
      </div>
    </header>
  );
}