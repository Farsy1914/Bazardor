"use client";

import { useEffect, useState } from "react";
import { fetchApi } from "@/lib/api";
import { Product } from "@/types";
import { formatPrice, toBengaliNumber } from "@/lib/utils";

export default function PriceTicker() {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    async function loadData() {
      try {
        const data = await fetchApi<Product[]>("/products");
        setProducts(data);
      } catch (e) {
        console.error("Ticker fetch error:", e);
      }
    }
    loadData();
  }, []);

  if (products.length === 0) return null;

  // নিরবচ্ছিন্ন (seamless) স্ক্রোলের জন্য ৩ বার ডুপ্লিকেট করা হলো
  const tickerItems = [...products, ...products, ...products];

  return (
    // top-16 (বা top-[64px]) ব্যবহার করায় এটি নেভবারের নিচে আটকে থাকবে
    <div className="sticky top-16 z-40 bg-[#f8faf8] border-b border-gray-200/80 py-2 overflow-hidden select-none shadow-2xs">
      <div className="flex whitespace-nowrap animate-ticker-slow">
        {tickerItems.map((p, index) => (
          <div
            key={`${p.id}-${index}`}
            className="flex items-center gap-1.5 shrink-0 px-3 py-0.5 border-r border-gray-200/60 last:border-none text-xs font-semibold"
          >
            <span className="text-sm">{p.image || "📦"}</span>
            <span className="text-gray-900 font-bold">{p.name}</span>
            <span className="text-gray-600">{formatPrice(p.price)}/{p.unit}</span>
            {p.trend === "up" && (
              <span className="text-red-600 font-bold flex items-center gap-0.5">
                ▲ {toBengaliNumber(p.change)}%
              </span>
            )}
            {p.trend === "down" && (
              <span className="text-emerald-600 font-bold flex items-center gap-0.5">
                ▼ {toBengaliNumber(p.change)}%
              </span>
            )}
            {p.trend === "same" && (
              <span className="text-gray-400 font-bold">— ০.০%</span>
            )}
          </div>
        ))}
      </div>

      <style jsx>{`
        @keyframes tickerSmooth {
          0% {
            transform: translateX(0%);
          }
          100% {
            transform: translateX(-33.33%);
          }
        }
        .animate-ticker-slow {
          display: flex;
          width: max-content;
          animation: tickerSmooth 45s linear infinite;
        }
        .animate-ticker-slow:hover {
          animation-play-state: paused;
        }
      `}</style>
    </div>
  );
}