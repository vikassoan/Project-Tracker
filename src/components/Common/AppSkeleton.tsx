import Skeleton from "./Skeleton";

const AppSkeleton = () => {
  return (
    <div className="p-4 space-y-4">

      {/* Top View Buttons */}
      <div className="flex gap-3">
        {[...Array(3)].map((_, i) => (
          <Skeleton key={i} className="h-8 w-20 rounded" />
        ))}
      </div>

      {/* Filter Bar */}
      <div className="bg-gray-100 p-3 rounded space-y-3">
        <div className="flex items-center gap-2">
          {[...Array(3)].map((_, i) => (
            <Skeleton key={i} className="w-6 h-6 rounded-full" />
          ))}
          <Skeleton className="h-4 w-32" />
        </div>

        <div className="flex flex-wrap gap-2">
          {[...Array(8)].map((_, i) => (
            <Skeleton key={i} className="h-6 w-16 rounded" />
          ))}
        </div>
      </div>

      {/* Generic Content Area */}
      <div className="grid grid-cols-4 gap-4 h-[70vh]">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="bg-gray-100 rounded-lg p-3 space-y-3">
            <Skeleton className="h-5 w-24" />
            {[...Array(4)].map((_, j) => (
              <Skeleton key={j} className="h-16 w-full rounded" />
            ))}
          </div>
        ))}
      </div>

    </div>
  );
};

export default AppSkeleton;