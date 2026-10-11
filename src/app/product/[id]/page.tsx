import Link from "next/link";
import { fetchApi } from "@/lib/api";
import { Product } from "@/types";
import { formatPrice, toBengaliNumber } from "@/lib/utils";
import { ArrowLeft, TrendingUp, TrendingDown, Minus, Tag } from "lucide-react";

interface ProductPageProps {
  params: Promise<{
    id: string;
  }>;
}

async function getProductById(id: string) {
  try {
    const product = await fetchApi<Product>(`/api/products/${id}`);
    return product;
  } catch (error) {
    console.error(`Failed to fetch product ${id}:`, error);
    return null;
  }
}

export default async function ProductDetailsPage({ params }: ProductPageProps) {
  const { id } = await params;
  const product = await getProductById(id);

  if (!product) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-16 text-center space-y-4">
        <h1 className="text-2xl font-bold text-gray-800">পণ্যটি পাওয়া যায়নি</h1>
        <p className="text-gray-500">আপনার খোঁজা পণ্যের তথ্য ডাটাবেজে নেই বা মুছে ফেলা হয়েছে।</p>
        <Link
          href="/"
          className="inline-flex items-center text-sm font-semibold bg-emerald-600 text-white px-4 py-2 rounded-lg hover:bg-emerald-700 transition-colors"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          হোম পেজে ফিরে যান
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 space-y-6">
      {/* Back Link */}
      <Link
        href="/"
        className="inline-flex items-center text-sm text-gray-500 hover:text-emerald-700 transition-colors"
      >
        <ArrowLeft className="w-4 h-4 mr-1" />
        সকল পণ্যের তালিকায় ফিরে যান
      </Link>

      {/* Product Details Card */}
      <div className="bg-white rounded-2xl border border-gray-200 p-6 md:p-8 shadow-sm space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b pb-6">
          <div>
            <span className="inline-flex items-center gap-1 text-xs font-semibold bg-emerald-50 text-emerald-700 px-2.5 py-1 rounded-full mb-2">
              <Tag className="w-3 h-3" />
              {product.category}
            </span>
            <h1 className="text-2xl md:text-3xl font-extrabold text-gray-900">{product.name}</h1>
          </div>

          <div className="bg-gray-50 p-4 rounded-xl border border-gray-100 flex items-baseline gap-2">
            <span className="text-xs text-gray-500">আজকের দাম:</span>
            <span className="text-2xl md:text-3xl font-black text-emerald-800">
              {formatPrice(product.price)}
            </span>
            <span className="text-xs text-gray-500">/ প্রতি {product.unit}</span>
          </div>
        </div>

        {/* Price Change Analysis */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="p-4 rounded-xl border bg-gray-50/50">
            <span className="text-xs text-gray-500 block mb-1">দামের পরিবর্তন</span>
            <div className="flex items-center gap-1.5 font-bold">
              {product.trend === "up" && (
                <>
                  <TrendingUp className="w-4 h-4 text-red-600" />
                  <span className="text-red-600">▲ {toBengaliNumber(product.change)}% বৃদ্ধি</span>
                </>
              )}
              {product.trend === "down" && (
                <>
                  <TrendingDown className="w-4 h-4 text-emerald-600" />
                  <span className="text-emerald-600">▼ {toBengaliNumber(product.change)}% হ্রাস</span>
                </>
              )}
              {product.trend === "same" && (
                <>
                  <Minus className="w-4 h-4 text-gray-400" />
                  <span className="text-gray-500">অপরিবর্তিত</span>
                </>
              )}
            </div>
          </div>

          <div className="p-4 rounded-xl border bg-gray-50/50">
            <span className="text-xs text-gray-500 block mb-1">একক</span>
            <span className="font-semibold text-gray-800">প্রতি {product.unit}</span>
          </div>

          <div className="p-4 rounded-xl border bg-gray-50/50">
            <span className="text-xs text-gray-500 block mb-1">সর্বশেষ আপডেট</span>
            <span className="font-semibold text-gray-800">
              {product.updatedAt ? product.updatedAt : "আজ"}
            </span>
          </div>
        </div>

        {/* Description */}
        {product.description && (
          <div className="space-y-2 pt-4 border-t">
            <h3 className="text-base font-bold text-gray-900">বিস্তারিত বিবরণ</h3>
            <p className="text-sm text-gray-600 leading-relaxed">{product.description}</p>
          </div>
        )}
      </div>
    </div>
  );
}