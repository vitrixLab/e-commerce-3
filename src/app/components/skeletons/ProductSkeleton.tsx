"use client";

export function ProductSkeletonCard() {
  return (
    <div className="w-full max-w-[320px] mx-auto rounded-lg overflow-hidden border border-gray-100 shadow-sm animate-pulse bg-white">
      {/* Image Skeleton */}
      <div className="aspect-[4/5] bg-gray-200 w-full" />

      {/* Info Skeleton */}
      <div className="p-4 space-y-3">
        <div className="flex justify-between items-center">
          <div className="h-3 bg-gray-200 rounded w-16" />
          <div className="h-3 bg-gray-200 rounded w-10" />
        </div>
        <div className="h-4 bg-gray-200 rounded w-3/4" />
        <div className="flex gap-2 items-center">
          <div className="h-5 bg-gray-200 rounded w-16" />
          <div className="h-4 bg-gray-200 rounded w-12" />
        </div>
      </div>
    </div>
  );
}

export function ProductSkeletonGrid({
  count = 6,
  gridClass = "grid grid-cols-1 sm:grid-cols-2 place-items-center lg:grid-cols-2 xl:grid-cols-3 gap-6",
}: {
  count?: number;
  gridClass?: string;
}) {
  return (
    <div className={gridClass}>
      {Array.from({ length: count }).map((_, idx) => (
        <ProductSkeletonCard key={idx} />
      ))}
    </div>
  );
}
