export default function Loading() {
  return (
    <div className="min-h-screen pb-12">
      <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="animate-pulse space-y-8">
          {/* Header */}
          <div className="pt-8 pb-10 md:pt-12 lg:pt-16 space-y-4">
            <div className="h-12 bg-gray-200 dark:bg-gray-700 rounded w-1/2" />
            <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-3/4" />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 lg:gap-10 xl:gap-12">
            {/* Main content */}
            <div className="lg:col-span-2 space-y-10 lg:space-y-12">
              {/* Banner skeleton */}
              <div className="aspect-[16/9] w-full bg-gray-200 dark:bg-gray-700 rounded-xl" />

              {/* Content sections */}
              <div className="space-y-4">
                <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-1/4" />
                <div className="space-y-2">
                  <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded" />
                  <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded" />
                  <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4" />
                </div>
              </div>

              <div className="space-y-4">
                <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-1/3" />
                <div className="space-y-3">
                  {[...Array(4)].map((_, i) => (
                    <div key={i} className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/2" />
                  ))}
                </div>
              </div>
            </div>

            {/* Sidebar skeleton */}
            <aside className="lg:col-span-1">
              <div className="sticky top-6 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-6 space-y-4">
                <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-3/4" />
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/2" />
                <div className="h-12 bg-gray-200 dark:bg-gray-700 rounded" />
              </div>
            </aside>
          </div>
        </div>
      </main>
    </div>
  );
}
