export default function Loading() {
  return (
    <section className="mt-30 flex flex-col items-center min-h-screen m-10">
      <div className="animate-pulse space-y-8 w-full max-w-7xl">
        {/* Hero section skeleton */}
        <div className="space-y-4">
          <div className="h-16 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mx-auto" />
          <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-1/2 mx-auto" />
        </div>

        {/* Button skeleton */}
        <div className="h-12 bg-gray-200 dark:bg-gray-700 rounded w-40 mx-auto" />

        {/* Events grid skeleton */}
        <div className="mt-20 space-y-7">
          <div className="h-10 bg-gray-200 dark:bg-gray-700 rounded w-64" />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {[...Array(8)].map((_, i) => (
              <div
                key={i}
                className="rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 overflow-hidden"
              >
                <div className="aspect-[4/3] bg-gray-200 dark:bg-gray-700" />
                <div className="p-4 space-y-3">
                  <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4" />
                  <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded" />
                  <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/2" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
