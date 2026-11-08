"use client";

import { use, useEffect, useState } from "react";
import Link from "next/link";
import { fetchFromAPI, type Product, toBengaliNumber, getUnitBn } from "@/lib/utils";

interface MarketItem {
  market: string;
  division: string;
  min: number;
  max: number;
}

export default function ProductDetailPage({ params }: { params: Promise<{ id: string }> }) {
  // Next.js params promise unwrapping
  const resolvedParams = use(params);
  const productId = resolvedParams.id;

  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchFromAPI("/products")
      .then((data: Product[]) => {
        const found = data.find(
          (p) => String(p.id) === productId || p.slug === productId
        );
        setProduct(found || null);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [productId]);

  if (loading) {
    return (
      <div className="min-h-[80vh] bg-[#f3f6f3] py-10 px-4">
        <div className="max-w-5xl mx-auto space-y-6">
          <div className="h-6 w-32 bg-gray-200 animate-pulse rounded-md"></div>
          <div className="h-40 bg-white rounded-3xl animate-pulse"></div>
          <div className="h-32 bg-white rounded-3xl animate-pulse"></div>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-[75vh] bg-[#f3f6f3] flex flex-col items-center justify-center text-center px-4">
        <h2 className="text-2xl font-black text-gray-800 mb-2">পণ্যটি পাওয়া যায়নি</h2>
        <p className="text-xs text-gray-500 mb-6">আপনি যে পণ্যের বিবরণ দেখতে চাচ্ছেন তা খুঁজে পাওয়া যায়নি।</p>
        <Link href="/" className="px-5 py-2.5 bg-[#008a45] text-white font-bold text-xs rounded-xl hover:bg-[#00753a] transition-colors">
          হোম পেজে ফিরে যান
        </Link>
      </div>
    );
  }

  // Fallback markets list
  const defaultMarkets: MarketItem[] = [
    { market: "বাজারহাট", division: "খুলনা", min: 65, max: 74 },
    { market: "ডাবলগেট বাজার", division: "খুলনা", min: 68, max: 75 },
    { market: "মাঠ বাজার", division: "ময়মনসিংহ", min: 76, max: 84 },
    { market: "সদর বাজার", division: "রাজশাহী", min: 77, max: 85 },
    { market: "বাসারহাট বাজার", division: "রাজশাহী", min: 78, max: 87 },
    { market: "চৌর বাজার", division: "ময়মনসিংহ", min: 77, max: 89 },
    { market: "আমতলী বাজার", division: "চট্টগ্রাম", min: 79, max: 89 },
    { market: "গ্রীন মার্কেট, মিরপুর", division: "ঢাকা", min: 82, max: 91 },
    { market: "কারওয়ান বাজার", division: "ঢাকা", min: 84, max: 95 },
  ];

  const displayMarkets: MarketItem[] =
    product.markets && product.markets.length > 0 ? product.markets : defaultMarkets;

  const minPrice = Math.min(...displayMarkets.map((item) => item.min));
  const maxPrice = Math.max(...displayMarkets.map((item) => item.max));

  const totalPriceSum = displayMarkets.reduce((sum, item) => sum + (item.min + item.max) / 2, 0);
  const avgPrice = Math.round(totalPriceSum / displayMarkets.length);

  return (
    <div className="min-h-[85vh] bg-[#f3f6f3] py-8 px-4">
      <div className="max-w-5xl mx-auto space-y-6">
        {/* Breadcrumb Nav */}
        <nav className="text-xs text-gray-500 flex items-center gap-2">
          <Link href="/" className="hover:text-[#008a45] transition-colors">হোম</Link>
          <span>›</span>
          <Link href={`/category/${product.category}`} className="hover:text-[#008a45] transition-colors capitalize">
            {product.categoryNameBn || product.category}
          </Link>
          <span>›</span>
          <span className="text-gray-900 font-semibold">{product.nameBn}</span>
        </nav>

        {/* Top Header Card */}
        <div className="bg-white rounded-3xl p-6 border border-gray-100 shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div className="flex items-center gap-5">
            <div className="w-20 h-20 bg-gray-50 rounded-2xl flex items-center justify-center text-4xl shadow-2xs border border-gray-100/50">
              {product.image}
            </div>
            <div>
              <h1 className="text-3xl font-black text-gray-900">{product.nameBn}</h1>
              <p className="text-xs text-gray-400 mt-1 font-medium">
                {getUnitBn(product.unit)} • {product.categoryNameBn || product.category}
              </p>
              <p className="text-xs text-gray-500 mt-2">
                গতকালের তুলনায় আজ দাম{" "}
                <span className={product.change.dir === "up" ? "text-red-500 font-bold" : product.change.dir === "down" ? "text-emerald-600 font-bold" : "text-gray-500 font-bold"}>
                  {product.change.dir === "up" ? "বেড়েছে" : product.change.dir === "down" ? "কমেছে" : "পরিবর্তিত হয়নি"}{" "}
                  {toBengaliNumber(Math.abs(product.change.pct).toFixed(1))}%
                </span>
              </p>
            </div>
          </div>

          {/* Price Badge */}
          <div className="bg-[#f2f7f4] rounded-2xl p-4 text-center min-w-[140px] border border-emerald-50">
            <p className="text-[11px] text-gray-500 font-medium">আজকের দাম</p>
            <p className="text-3xl font-black text-gray-900 mt-1">
              {toBengaliNumber(product.today)}
            </p>
            <p className="text-[11px] text-gray-400 mt-0.5">টাকা / {product.unit}</p>
            <span className={`text-[11px] font-bold mt-1 inline-block ${
              product.change.dir === "up" ? "text-red-500" : product.change.dir === "down" ? "text-emerald-600" : "text-gray-400"
            }`}>
              {product.change.dir === "up" ? "▲" : product.change.dir === "down" ? "▼" : "-"} {toBengaliNumber(Math.abs(product.change.pct).toFixed(1))}%
            </span>
          </div>
        </div>

        {/* Price Summary Section */}
        <div className="space-y-4">
          <h2 className="text-base font-bold text-gray-900">দামের সারসংক্ষেপ</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-xs">
              <p className="text-xs text-gray-400 font-medium">সর্বনিম্ন দাম</p>
              <p className="text-2xl font-black text-emerald-600 mt-1">
                {toBengaliNumber(minPrice)} <span className="text-sm font-bold">টাকা</span>
              </p>
              <p className="text-[11px] text-gray-400 mt-1">সবচেয়ে কম দামের বাজার</p>
            </div>

            <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-xs">
              <p className="text-xs text-gray-400 font-medium">সর্বাধিক দাম</p>
              <p className="text-2xl font-black text-red-500 mt-1">
                {toBengaliNumber(maxPrice)} <span className="text-sm font-bold">টাকা</span>
              </p>
              <p className="text-[11px] text-gray-400 mt-1">সবচেয়ে বেশি দামের বাজার</p>
            </div>

            <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-xs">
              <p className="text-xs text-gray-400 font-medium">গড় দাম</p>
              <p className="text-2xl font-black text-emerald-600 mt-1">
                {toBengaliNumber(avgPrice)} <span className="text-sm font-bold">টাকা</span>
              </p>
              <p className="text-[11px] text-gray-400 mt-1">প্রতি কেজি-এর হিসাবে</p>
            </div>
          </div>
        </div>

        {/* Market-wise Price Table */}
        <div className="bg-white rounded-3xl p-6 border border-gray-100 shadow-xs space-y-4">
          <h2 className="text-base font-bold text-gray-900">বাজারভিত্তিক আজকের দাম</h2>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-gray-100 text-gray-400 font-semibold">
                  <th className="py-3 px-4">বাজার</th>
                  <th className="py-3 px-4">বিভাগ</th>
                  <th className="py-3 px-4">সর্বনিম্ন</th>
                  <th className="py-3 px-4">সর্বাধিক</th>
                  <th className="py-3 px-4">গড়</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50 text-gray-700 font-medium">
                {displayMarkets.map((m, index) => (
                  <tr key={index} className="hover:bg-emerald-50/30 transition-colors">
                    <td className="py-3.5 px-4 font-bold text-gray-900">{m.market}</td>
                    <td className="py-3.5 px-4 text-gray-500">{m.division}</td>
                    <td className="py-3.5 px-4 font-bold">{toBengaliNumber(m.min)} টাকা</td>
                    <td className="py-3.5 px-4 font-bold text-gray-800">{toBengaliNumber(m.max)} টাকা</td>
                    <td className="py-3.5 px-4 font-black text-gray-900">
                      {toBengaliNumber(((m.min + m.max) / 2).toFixed(2))} টাকা
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Bottom Link */}
        <div className="pt-2">
          <Link
            href={`/category/${product.category}`}
            className="text-xs font-bold text-[#008a45] hover:underline flex items-center gap-1"
          >
            <span>{product.image}</span> সব {product.categoryNameBn || product.category}
          </Link>
        </div>
      </div>
    </div>
  );
}