import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";

/**
 * Named skeleton primitives — DESIGN.md §2.2, REVAMP_PLAN §5.1.
 * Always use these instead of raw spinners.
 */

export function SkeletonCard({ className }) {
  return (
    <div className={cn("rounded-2xl overflow-hidden bg-surface shadow-soft-sm border border-brand-hairline", className)}>
      <Skeleton className="aspect-[4/3] w-full rounded-none" />
      <div className="p-4 space-y-3">
        <Skeleton className="h-3 w-16" />
        <Skeleton className="h-5 w-4/5" />
        <Skeleton className="h-4 w-3/5" />
        <div className="flex items-center justify-between pt-2">
          <Skeleton className="h-6 w-24" />
          <Skeleton className="h-8 w-20 rounded-lg" />
        </div>
      </div>
    </div>
  );
}

export function SkeletonList({ count = 6, columns = 3, className }) {
  const gridCls = {
    1: "grid-cols-1",
    2: "grid-cols-1 sm:grid-cols-2",
    3: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3",
    4: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-4",
  }[columns] || "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3";

  return (
    <div className={cn("grid gap-4 md:gap-6 lg:gap-8", gridCls, className)}>
      {Array.from({ length: count }).map((_, i) => (
        <SkeletonCard key={i} />
      ))}
    </div>
  );
}

export function SkeletonDetail() {
  return (
    <div className="container-custom py-8 space-y-8">
      <Skeleton className="h-4 w-64" /> {/* breadcrumb */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        <Skeleton className="col-span-2 aspect-[16/9] rounded-2xl" />
        <div className="grid grid-rows-2 gap-3">
          <Skeleton className="aspect-[16/9] rounded-2xl" />
          <Skeleton className="aspect-[16/9] rounded-2xl" />
        </div>
      </div>
      <Skeleton className="h-10 w-3/4" />
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-4">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-3/4" />
          <div className="h-4" />
          <Skeleton className="h-6 w-40" />
          <Skeleton className="h-24 w-full" />
        </div>
        <div className="space-y-4">
          <Skeleton className="h-64 w-full rounded-2xl" />
        </div>
      </div>
    </div>
  );
}

export function SkeletonHero() {
  return (
    <div className="relative w-full overflow-hidden">
      <Skeleton className="h-[420px] md:h-[520px] lg:h-[600px] w-full rounded-none" />
    </div>
  );
}
