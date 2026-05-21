function SkeletonBlock({ className = '' }) {
  return (
    <div
      className={`animate-pulse rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface-raised)]/70 ${className}`}
    />
  )
}

export function InlineLoadingSkeleton() {
  return (
    <div className="space-y-3">
      <SkeletonBlock className="h-5 w-1/3" />
      <SkeletonBlock className="h-4 w-2/3" />
      <SkeletonBlock className="h-4 w-1/2" />
    </div>
  )
}

export function VehicleGridSkeleton({ count = 6 }) {
  return (
    <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
      {Array.from({ length: count }).map((_, index) => (
        <div key={`vehicle-skeleton-${index}`} className="space-y-4">
          <SkeletonBlock className="h-56 w-full" />
          <SkeletonBlock className="h-5 w-2/3" />
          <SkeletonBlock className="h-4 w-1/2" />
          <SkeletonBlock className="h-6 w-1/3" />
        </div>
      ))}
    </div>
  )
}

export function HorizontalVehicleSkeleton({ count = 4 }) {
  return (
    <div className="flex gap-6 overflow-hidden pb-2">
      {Array.from({ length: count }).map((_, index) => (
        <div key={`horizontal-skeleton-${index}`} className="min-w-[280px] flex-1 space-y-4">
          <SkeletonBlock className="h-52 w-full" />
          <SkeletonBlock className="h-4 w-3/5" />
          <SkeletonBlock className="h-4 w-2/5" />
        </div>
      ))}
    </div>
  )
}

export default SkeletonBlock
