export default function Footer() {
  return (
    <footer className="bg-white border-t border-gray-200/80 py-6 mt-auto">
      <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-gray-500 font-medium">
        {/* Left Side Text */}
        <div>
          বাজার দর — প্রয়োজনীয় পণ্যের দাম এক নজরে।
        </div>

        {/* Right Side Text */}
        <div className="text-center sm:text-right">
          সকল দাম সম্ভাব্য; বাজার অবস্থার ওপর নির্ভর করে পরিবর্তিত হয়।
        </div>
      </div>
    </footer>
  );
}