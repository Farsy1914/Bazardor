"use client";

import { useState } from "react";
import Link from "next/link";
import { Product } from "@/types";
import { formatPrice, toBengaliNumber } from "@/lib/utils";

// Helper to reliably extract numerical price from Product object
function getProductPrice(p: Product): number {
  const rawPrice = p.price ?? (p as any).today ?? 0;
  if (typeof rawPrice === "number") return rawPrice;
  
  const bnToEnMap: Record<string, string> = {
    "০": "0", "১": "1", "২": "2", "৩": "3", "৪": "4",
    "৫": "5", "৬": "6", "৭": "7", "৮": "8", "৯": "9",
  };
  const strVal = String(rawPrice).replace(/[০-৯]/g, (match) => bnToEnMap[match] || match);
  const cleanNumber = strVal.replace(/[^0-9.]/g, "");
  return parseFloat(cleanNumber) || 0;
}

export default function AllProductsGrid({ initialProducts }: { initialProducts: Product[] }) {
  const [sortOption, setSortOption] = useState<"default" | "lowToHigh" | "highToLow">("default");

  // Client-side sorting on render
  const sortedProducts = [...initialProducts].sort((a, b) => {
    const priceA = getProductPrice(a);
    const priceB = getProductPrice(b);

    if (sortOption === "lowToHigh") {
      return priceA - priceB; // কম থেকে বেশি
    }
    if (sortOption === "highToLow") {
      return priceB - priceA; // বেশি থেকে কম
    }
    return 0; // ডিফল্ট
  });

  return (
    <section id="all-products" className="space-y-4 pt-4">
      {/* Section Header & Interactive Sort Dropdown */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg md:text-xl font-bold text-gray-900">সব পণ্য</h2>
          <p className="text-xs text-gray-400 mt-0.5">
            মোট {toBengaliNumber(sortedProducts.length)} টি পণ্য দেখানো হচ্ছে
          </p>
        </div>
        <div className="flex items-center gap-2 text-xs font-medium text-gray-500">
          <span>সাজান</span>
          <div className="relative">
            <select
              value={sortOption}
              onChange={(e) => setSortOption(e.target.value as any)}
              className="appearance-none bg-white border border-gray-200 rounded-lg pl-2.5 pr-7 py-1 text-xs text-gray-700 focus:outline-none shadow-2xs cursor-pointer font-bold"
            >
              <option value="default">ডিফল্ট</option>
              <option value="lowToHigh">দাম: কম থেকে বেশি</option>
              <option value="highToLow">দাম: বেশি থেকে কম</option>
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-400">
              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* Product List Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {sortedProducts.map((p) => (
          <Link
            key={p.id}
            href={`/product/${p.id}`}
            className="bg-white p-5 rounded-2xl border border-gray-200/70 hover:border-[#008a45] hover:shadow-md transition-all flex items-center justify-between group"
          >
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-gray-50 rounded-xl flex items-center justify-center text-2xl">
                {p.image || "🛍️"}
              </div>
              <div>
                <h3 className="font-bold text-gray-900 group-hover:text-[#008a45] transition-colors">
                  {p.name}
                </h3>
                <p className="text-xs text-gray-400">প্রতি {p.unit}</p>
                <p className="text-sm font-extrabold text-gray-900 mt-1">
                  {formatPrice(p.price)}
                </p>
              </div>
            </div>
            <span
              className={`text-xs font-bold px-2.5 py-1 rounded-lg ${
                p.trend === "up"
                  ? "bg-red-50 text-red-600"
                  : p.trend === "down"
                  ? "bg-emerald-50 text-[#008a45]"
                  : "bg-gray-100 text-gray-500"
              }`}
            >
              {p.trend === "up"
                ? `▲ ${toBengaliNumber(p.change)}%`
                : p.trend === "down"
                ? `▼ ${toBengaliNumber(p.change)}%`
                : "— ০.০%"}
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
}