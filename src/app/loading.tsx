export default function Loading() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-8 space-y-8 animate-pulse">
      {/* Banner Skeleton */}
      <div className="h-40 bg-gray-200 rounded-2xl w-full"></div>

      {/* Grid Skeleton */}
      <div className="space-y-4">
        <div className="h-6 bg-gray-200 rounded w-1/4"></div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {[...Array(8)].map((_, i) => (
            <div key={i} className="h-28 bg-gray-200 rounded-xl"></div>
          ))}
        </div>
      </div>
    </div>
  );
}