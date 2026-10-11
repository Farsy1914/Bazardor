import Link from "next/link";
import { fetchApi } from "@/lib/api";
import { Product } from "@/types";
import { formatPrice, toBengaliNumber } from "@/lib/utils";
import { ArrowLeft } from "lucide-react";

interface CategoryPageProps {
  params: Promise<{
    slug: string;
  }>;
}

async function getProductsByCategory(slug: string) {
  try {
    const products = await fetchApi<Product[]>(`/api/products?category=${slug}`);
    return products;
  } catch (error) {
    console.error(`Failed to fetch category products for ${slug}:`, error);
    return [];
  }
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { slug } = await params;
  const products = await getProductsByCategory(slug);

  // ক্যাটাগরির নাম ফরম্যাট বা প্রথম পণ্যের ক্যাটাগরি নাম ব্যবহার
  const categoryName = products.length > 0 ? products[0].category : slug;

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 space-y-6">
      {/* Back Button & Header */}
      <div>
        <Link
          href="/"
          className="inline-flex items-center text-sm text-gray-500 hover:text-emerald-700 transition-colors mb-4"
        >
          <ArrowLeft className="w-4 h-4 mr-1" />
          হোম পেজে ফিরে যান
        </Link>
        <div className="flex items-center justify-between border-b pb-4">
          <h1 className="text-2xl font-bold text-gray-900">
            ক্যাটাগরি: <span className="text-emerald-700">{categoryName}</span>
          </h1>
          <span className="text-sm text-gray-500">
            মোট {toBengaliNumber(products.length)} টি পণ্য
          </span>
        </div>
      </div>

      {/* Product List Grid */}
      {products.length === 0 ? (
        <div className="bg-white p-12 rounded-xl text-center border text-gray-500">
          এই ক্যাটাগরিতে কোনো পণ্য পাওয়া যায়নি।
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {products.map((product) => (
            <Link
              key={product.id}
              href={`/product/${product.id}`}
              className="bg-white p-4 rounded-xl border border-gray-200 hover:border-emerald-500 hover:shadow-md transition-all group"
            >
              <h3 className="font-bold text-gray-900 group-hover:text-emerald-600 transition-colors mb-1">
                {product.name}
              </h3>
              <p className="text-xs text-gray-500 mb-3">প্রতি {product.unit}</p>
              <div className="flex items-center justify-between pt-2 border-t border-gray-100">
                <span className="font-extrabold text-emerald-800">
                  {formatPrice(product.price)}
                </span>
                {product.trend === "up" && (
                  <span className="text-xs text-red-600 font-semibold">
                    ▲ {toBengaliNumber(product.change)}%
                  </span>
                )}
                {product.trend === "down" && (
                  <span className="text-xs text-emerald-600 font-semibold">
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
      )}
    </div>
  );
}