"use client";

import { use, useEffect, useState } from "react";
import Link from "next/link";
import { fetchFromAPI, type Product, formatPrice, getUnitBn, toBengaliNumber } from "@/lib/utils";

const categoryTitleMap: Record<string, string> = {
  rice: "চাল",
  chal: "চাল",
  dal: "ডাল",
  oil: "তেল",
  vegetables: "সবজি",
  vegetable: "সবজি",
  fish: "মাছ",
  meat: "মাংস",
  dairy: "ডিম-দুধ",
  "egg-milk": "ডিম-দুধ",
  spices: "মসলা",
  spice: "মসলা",
};

function getTodayPriceNumber(product: any): number {
  if (!product) return 0;
  const val = product.today ?? product.price ?? product.todaysPrice ?? 0;
  if (typeof val === "number") return val;
  if (!val) return 0;

  const bnToEnMap: Record<string, string> = {
    "০": "0", "১": "1", "২": "2", "৩": "3", "৪": "4",
    "৫": "5", "৬": "6", "৭": "7", "৮": "8", "৯": "9",
  };

  const strVal = String(val).replace(/[০-৯]/g, (match) => bnToEnMap[match] || match);
  const cleanNumber = strVal.replace(/[^0-9.]/g, "");
  return parseFloat(cleanNumber) || 0;
}

export default function CategoryPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = use(params);
  const categorySlug = resolvedParams.slug.toLowerCase().trim();

  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [sortOption, setSortOption] = useState<"default" | "lowToHigh" | "highToLow">("default");

  useEffect(() => {
    setLoading(true);

    fetchFromAPI(`/products`)
      .then((res: any) => {
        // ১. রেসপন্স অ্যারে নাকি অবজেক্ট ফিল্টার করে আসল অ্যারে বের করা
        let rawList: any[] = [];
        if (Array.isArray(res)) {
          rawList = res;
        } else if (res && Array.isArray(res.data)) {
          rawList = res.data;
        } else if (res && Array.isArray(res.products)) {
          rawList = res.products;
        }

        console.log("Fetched raw products from API:", rawList);

        // ২. ফ্লেক্সিবল ক্যাটাগরি ফিল্টারিং
        const filtered = rawList.filter((p: any) => {
          // প্রোডাক্ট অবজেক্টের সম্ভাব্য সব ক্যাটাগরি ফিল্ড চেক করা
          const catVal = (
            p.category ||
            p.categorySlug ||
            p.category_name ||
            p.categoryName ||
            p.cat ||
            ""
          )
            .toString()
            .toLowerCase()
            .trim();

          const nameVal = (p.nameBn || p.name || p.title || "").toString().toLowerCase();

          // ক্যাটাগরি ম্যাপিং অনুযায়ী চেক
          if (categorySlug === "rice" || categorySlug === "chal") return catVal.includes("rice") || catVal.includes("chal") || nameVal.includes("চাল");
          if (categorySlug === "dal") return catVal.includes("dal") || catVal.includes("lentil") || nameVal.includes("ডাল");
          if (categorySlug === "oil") return catVal.includes("oil") || catVal.includes("তেল") || nameVal.includes("তেল");
          if (categorySlug === "vegetables" || categorySlug === "vegetable") return catVal.includes("veg") || catVal.includes("সবজি") || nameVal.includes("আলু") || nameVal.includes("পেঁয়াজ") || nameVal.includes("টমেটো");
          if (categorySlug === "fish") return catVal.includes("fish") || catVal.includes("মাছ") || nameVal.includes("মাছ") || nameVal.includes("ইলিশ") || nameVal.includes("রুই");
          if (categorySlug === "meat") return catVal.includes("meat") || catVal.includes("মাংস") || nameVal.includes("গরু") || nameVal.includes("মুরগী") || nameVal.includes("খাসি");
          if (categorySlug === "dairy" || categorySlug === "egg-milk") return catVal.includes("dair") || catVal.includes("egg") || catVal.includes("milk") || nameVal.includes("দুধ") || nameVal.includes("ডিম");
          if (categorySlug === "spices" || categorySlug === "spice") return catVal.includes("spi") || catVal.includes("মসলা") || nameVal.includes("মরিচ") || nameVal.includes("হলুদ") || nameVal.includes("রসুন");

          return catVal === categorySlug || catVal.includes(categorySlug);
        });

        setProducts(filtered);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Fetch Error:", err);
        setLoading(false);
      });
  }, [categorySlug]);

  const handleSortChange = (option: "default" | "lowToHigh" | "highToLow") => {
    setSortOption(option);

    if (option === "default") {
      setLoading(true);
      fetchFromAPI(`/products`).then((res: any) => {
        let rawList: any[] = Array.isArray(res) ? res : res?.data || res?.products || [];
        const filtered = rawList.filter((p: any) => {
          const catVal = (p.category || p.categorySlug || p.category_name || p.cat || "").toString().toLowerCase();
          const nameVal = (p.nameBn || p.name || "").toString().toLowerCase();

          if (categorySlug === "rice" || categorySlug === "chal") return catVal.includes("rice") || catVal.includes("chal") || nameVal.includes("চাল");
          if (categorySlug === "dal") return catVal.includes("dal") || catVal.includes("lentil") || nameVal.includes("ডাল");
          if (categorySlug === "oil") return catVal.includes("oil") || catVal.includes("তেল") || nameVal.includes("তেল");
          if (categorySlug === "vegetables" || categorySlug === "vegetable") return catVal.includes("veg") || catVal.includes("সবজি");
          if (categorySlug === "fish") return catVal.includes("fish") || catVal.includes("মাছ");
          if (categorySlug === "meat") return catVal.includes("meat") || catVal.includes("মাংস");
          if (categorySlug === "dairy" || categorySlug === "egg-milk") return catVal.includes("dair") || catVal.includes("egg") || catVal.includes("milk");
          if (categorySlug === "spices" || categorySlug === "spice") return catVal.includes("spi") || catVal.includes("মসলা");

          return catVal === categorySlug;
        });
        setProducts(filtered);
        setLoading(false);
      });
      return;
    }

    const sortedArray = [...products].sort((a, b) => {
      const priceA = getTodayPriceNumber(a);
      const priceB = getTodayPriceNumber(b);
      return option === "lowToHigh" ? priceA - priceB : priceB - priceA;
    });

    setProducts(sortedArray);
  };

  const categoryTitle = categoryTitleMap[categorySlug] || categorySlug;

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
        {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
          <div key={i} className="h-44 bg-white rounded-2xl animate-pulse border border-gray-100"></div>
        ))}
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-4">
        <h2 className="text-2xl font-black text-gray-800 mb-2">এই ক্যাটাগরিতে কোনো পণ্য পাওয়া যায়নি</h2>
        <p className="text-xs text-gray-500 mb-6">অন্য যেকোনো ক্যাটাগরি অথবা হোম পেজে ফিরে যান।</p>
        <Link
          href="/"
          className="px-5 py-2.5 bg-[#008a45] text-white font-bold text-xs rounded-xl hover:bg-[#00753a] transition-colors"
        >
          হোম পেজে ফিরে যান
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-[85vh] bg-[#f3f6f3] py-8 px-4">
      <div className="max-w-7xl mx-auto space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-black text-gray-900 capitalize">{categoryTitle}</h1>
            <p className="text-xs text-gray-500 mt-1">
              মোট {toBengaliNumber(products.length)} টি পণ্য পাওয়া গেছে
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-gray-700">সাজান:</span>
            <div className="relative">
              <select
                value={sortOption}
                onChange={(e) => handleSortChange(e.target.value as "default" | "lowToHigh" | "highToLow")}
                className="appearance-none bg-white border border-gray-200 rounded-xl pl-3 pr-8 py-2 text-xs font-bold text-gray-800 focus:outline-none focus:ring-2 focus:ring-emerald-500 shadow-2xs cursor-pointer"
              >
                <option value="default">ডিফল্ট</option>
                <option value="lowToHigh">দাম: কম থেকে বেশি</option>
                <option value="highToLow">দাম: বেশি থেকে কম</option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-500">
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
          {products.map((product) => (
            <Link
              key={product.id || product._id}
              href={`/product/${product.id || product._id}`}
              className="bg-white rounded-2xl p-4 border border-gray-100 shadow-2xs hover:shadow-md transition-all group flex flex-col justify-between"
            >
              <div>
                <div className="text-4xl mb-3 group-hover:scale-105 transition-transform">
                  {product.image || "📦"}
                </div>
                <h3 className="font-bold text-gray-900 text-sm group-hover:text-[#008a45] transition-colors">
                  {product.nameBn || product.name || product.title}
                </h3>
                <p className="text-[11px] text-gray-400 mt-0.5">{getUnitBn(product.unit)}</p>
              </div>

              <div className="mt-4 pt-3 border-t border-gray-50 flex items-center justify-between">
                <div>
                  <p className="text-[10px] text-gray-400">আজকের দাম</p>
                  <p className="text-sm font-black text-gray-900">
                    {formatPrice(product.today ?? product.price ?? 0)}
                  </p>
                </div>
                {product.change && (
                  <span
                    className={`text-[11px] font-bold px-2 py-0.5 rounded-md ${
                      (product.change.dir || product.trend) === "up"
                        ? "bg-red-50 text-red-600"
                        : (product.change.dir || product.trend) === "down"
                        ? "bg-emerald-50 text-emerald-600"
                        : "bg-gray-50 text-gray-500"
                    }`}
                  >
                    {(product.change.dir || product.trend) === "up" ? "▲" : (product.change.dir || product.trend) === "down" ? "▼" : "-"}{" "}
                    {toBengaliNumber(Math.abs(product.change.pct ?? product.change ?? 0).toFixed(1))}%
                  </span>
                )}
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}