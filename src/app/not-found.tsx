import Link from "next/link";
import { ShoppingBag, ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-[75vh] flex items-center justify-center px-4 py-12">
      <div className="max-w-md w-full bg-white rounded-2xl border border-gray-200 p-8 shadow-sm text-center space-y-6">
        <div className="w-16 h-16 bg-emerald-50 text-emerald-700 rounded-full flex items-center justify-center mx-auto">
          <ShoppingBag className="w-8 h-8" />
        </div>

        <div className="space-y-2">
          <h1 className="text-4xl font-extrabold text-emerald-800">৪০৪</h1>
          <h2 className="text-xl font-bold text-gray-900">পেজটি পাওয়া যায়নি</h2>
          <p className="text-sm text-gray-500 leading-relaxed">
            আপনি যে পেজটি খুঁজছেন তা মুছে ফেলা হয়েছে অথবা ভুল ইউআরএল (URL) প্রদান করা হয়েছে।
          </p>
        </div>

        <Link
          href="/"
          className="inline-flex items-center justify-center gap-2 w-full bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-2.5 rounded-xl text-sm transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>হোম পেজে ফিরে যান</span>
        </Link>
      </div>
    </div>
  );
}