import Link from "next/link";
import { fetchApi } from "@/lib/api";
import { Product } from "@/types";
import { formatPrice, toBengaliNumber } from "@/lib/utils";
import { TrendingUp, TrendingDown, ArrowUpRight, ArrowDownRight } from "lucide-react";

async function getProducts() {
  try {
    const data = await fetchApi<Product[]>("/api/products");
    return data;
  } catch (error) {
    console.error("Failed to fetch products:", error);
    return [];
  }
}

export default async function HomePage() {
  const products = await getProducts();

  // দাম বেড়েছে এবং কমেছে এমন পণ্য আলাদা করা
  const priceUpProducts = products.filter((p) => p.trend === "up").slice(0, 6);
  const priceDownProducts = products.filter((p) => p.trend === "down").slice(0, 6);

  // আজকের তারিখ বাংলা ফরম্যাটে
  const today = new Date().toLocaleDateString("bn-BD", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 space-y-10">
      {/* Hero / Header Section */}
      <section className="bg-emerald-800 text-white rounded-2xl p-6 md:p-10 shadow-lg">
        <p className="text-emerald-200 text-sm font-medium mb-1">{today}</p>
        <h1 className="text-2xl md:text-4xl font-extrabold tracking-tight mb-3">
          আজকের বাজারের দাম এক নজরে
        </h1>
        <p className="text-emerald-100 text-sm md:text-base max-w-2xl leading-relaxed">
          চাল, ডাল, তেল, সবজি, মাছ, মাংস, ডিম ও মসলার দাম — বাজারভিত্তিক বিস্তারিত, গড়, সর্বনিম্ন-সর্বাধিক এবং দামের পরিবর্তন এক জায়গায়।
        </p>
      </section>

      {/* Price Highlights Section (তাঁজা বাজারের ঝুড়ি) */}
      <section className="space-y-6">
        <h2 className="text-xl font-bold text-gray-800 border-l-4 border-emerald-600 pl-3">
          তাজা বাজারের ঝুড়ি
        </h2>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Price Up Box */}
          <div className="bg-red-50/60 border border-red-100 rounded-xl p-5">
            <div className="flex items-center gap-2 text-red-600 font-bold mb-4">
              <TrendingUp className="w-5 h-5" />
              <span>আজ দাম বেড়েছে</span>
            </div>
            <div className="grid grid-cols-2 gap-3">
              {priceUpProducts.map((product) => (
                <Link
                  key={product.id}
                  href={`/product/${product.id}`}
                  className="bg-white p-3 rounded-lg border border-red-100 hover:shadow-md transition-shadow block"
                >
                  <p className="text-sm font-semibold text-gray-800 truncate">{product.name}</p>
                  <p className="text-xs text-gray-500 mb-1">প্রতি {product.unit}</p>
                  <div className="flex items-center justify-between mt-2">
                    <span className="text-sm font-bold text-gray-900">{formatPrice(product.price)}</span>
                    <span className="text-xs font-semibold text-red-600 bg-red-100 px-1.5 py-0.5 rounded flex items-center">
                      <ArrowUpRight className="w-3 h-3 mr-0.5" />
                      {toBengaliNumber(product.change)}%
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* Price Down Box */}
          <div className="bg-emerald-50/60 border border-emerald-100 rounded-xl p-5">
            <div className="flex items-center gap-2 text-emerald-700 font-bold mb-4">
              <TrendingDown className="w-5 h-5" />
              <span>আজ দাম কমেছে</span>
            </div>
            <div className="grid grid-cols-2 gap-3">
              {priceDownProducts.map((product) => (
                <Link
                  key={product.id}
                  href={`/product/${product.id}`}
                  className="bg-white p-3 rounded-lg border border-emerald-100 hover:shadow-md transition-shadow block"
                >
                  <p className="text-sm font-semibold text-gray-800 truncate">{product.name}</p>
                  <p className="text-xs text-gray-500 mb-1">প্রতি {product.unit}</p>
                  <div className="flex items-center justify-between mt-2">
                    <span className="text-sm font-bold text-gray-900">{formatPrice(product.price)}</span>
                    <span className="text-xs font-semibold text-emerald-600 bg-emerald-100 px-1.5 py-0.5 rounded flex items-center">
                      <ArrowDownRight className="w-3 h-3 mr-0.5" />
                      {toBengaliNumber(product.change)}%
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* All Products Grid */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold text-gray-800 border-l-4 border-emerald-600 pl-3">
            সব পণ্য
          </h2>
          <span className="text-sm text-gray-500">
            মোট {toBengaliNumber(products.length)} টি পণ্য
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {products.map((product) => (
            <Link
              key={product.id}
              href={`/product/${product.id}`}
              className="bg-white p-4 rounded-xl border border-gray-200 hover:border-emerald-500 hover:shadow-md transition-all group"
            >
              <div className="flex justify-between items-start mb-2">
                <h3 className="font-bold text-gray-900 group-hover:text-emerald-600 transition-colors">
                  {product.name}
                </h3>
              </div>
              <p className="text-xs text-gray-500 mb-3">প্রতি {product.unit}</p>
              <div className="flex items-center justify-between pt-2 border-t border-gray-100">
                <span className="font-extrabold text-emerald-800">{formatPrice(product.price)}</span>
                {product.trend === "up" && (
                  <span className="text-xs text-red-600 font-semibold flex items-center">
                    ▲ {toBengaliNumber(product.change)}%
                  </span>
                )}
                {product.trend === "down" && (
                  <span className="text-xs text-emerald-600 font-semibold flex items-center">
                    ▼ {toBengaliNumber(product.change)}%
                  </span>
                )}
                {product.trend === "same" && (
                  <span className="text-xs text-gray-400 font-semibold">— ০.০%</span>
                )}
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}