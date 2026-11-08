import Link from "next/link";
import Image from "next/image";
import { fetchApi } from "@/lib/api";
import { Product } from "@/types";
import { formatPrice, toBengaliNumber } from "@/lib/utils";
import PriceTicker from "@/components/layout/PriceTicker";
import AllProductsGrid from "@/components/AllProductsGrid"; // Import the new component

async function getProducts() {
  try {
    const data = await fetchApi<Product[]>("/products");
    return data;
  } catch (error) {
    console.error("Failed to fetch products:", error);
    return [];
  }
}

export default async function HomePage() {
  const products = await getProducts();

  const priceUpProducts = products.filter((p) => p.trend === "up").slice(0, 6);
  const priceDownProducts = products.filter((p) => p.trend === "down").slice(0, 6);

  return (
    <div className="min-h-screen bg-[#f3f6f3]">
      {/* Train Running Ticker Bar */}
      <PriceTicker />

      <div className="max-w-6xl mx-auto px-4 py-8 space-y-12">
        {/* Banner / Hero Section */}
        <section className="bg-white rounded-3xl p-8 md:p-12 border border-gray-200/60 shadow-2xs flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="space-y-4 max-w-xl">
            <span className="inline-block bg-emerald-50 text-[#008a45] text-xs font-bold px-3 py-1 rounded-full">
              রবিবার, ১১ অক্টোবর, ২০২৬
            </span>
            <h1 className="text-3xl md:text-5xl font-black text-gray-900 tracking-tight leading-tight">
              আজকের বাজারের দাম এক নজরে
            </h1>
            <p className="text-gray-500 text-xs md:text-sm leading-relaxed">
              চাল, ডাল, তেল, সবজি, মাছ, মাংস, ডিম ও মসলার দাম — বাজারভিত্তিক বিস্তারিত, গড়, সর্বনিম্ন-সর্বাধিক এবং দামের পরিবর্তন এক জায়গায়।
            </p>
            <a
              href="#all-products"
              className="inline-block bg-[#008a45] hover:bg-[#00753a] text-white font-bold text-xs md:text-sm px-6 py-3 rounded-xl transition-colors shadow-2xs"
            >
              সব পণ্য দেখুন
            </a>
          </div>

          <div className="w-56 md:w-80 shrink-0 flex justify-center">
            <Image
              src="/bazar-hero.png"
              alt="বাজার দর হিরো ব্যানার"
              width={320}
              height={260}
              className="object-contain"
              priority
            />
          </div>
        </section>

        {/* Price Increase Section */}
        <section className="space-y-4">
          <h2 className="text-lg md:text-xl font-bold text-gray-900 flex items-center gap-2">
            <span className="text-red-600">▲</span> আজ দাম বেড়েছে
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {priceUpProducts.map((p) => (
              <Link
                key={p.id}
                href={`/product/${p.id}`}
                className="bg-white p-5 rounded-2xl border border-gray-200/70 hover:shadow-md transition-all flex items-center justify-between group"
              >
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-amber-50 rounded-xl flex items-center justify-center text-2xl">
                    {p.image || "🌾"}
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
                <span className="bg-red-50 text-red-600 text-xs font-bold px-2.5 py-1 rounded-lg">
                  ▲ {toBengaliNumber(p.change)}%
                </span>
              </Link>
            ))}
          </div>
        </section>

        {/* Price Decrease Section */}
        <section className="space-y-4">
          <h2 className="text-lg md:text-xl font-bold text-gray-900 flex items-center gap-2">
            <span className="text-[#008a45]">▼</span> আজ দাম কমেছে
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {priceDownProducts.map((p) => (
              <Link
                key={p.id}
                href={`/product/${p.id}`}
                className="bg-white p-5 rounded-2xl border border-gray-200/70 hover:shadow-md transition-all flex items-center justify-between group"
              >
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-emerald-50 rounded-xl flex items-center justify-center text-2xl">
                    {p.image || "🥬"}
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
                <span className="bg-emerald-50 text-[#008a45] text-xs font-bold px-2.5 py-1 rounded-lg">
                  ▼ {toBengaliNumber(p.change)}%
                </span>
              </Link>
            ))}
          </div>
        </section>

        {/* All Products Grid (Client Component) */}
        <AllProductsGrid initialProducts={products} />
      </div>
    </div>
  );
}