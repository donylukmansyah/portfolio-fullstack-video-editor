import { Skeleton } from "@/components/ui/skeleton";

export default function AdminDashboardLoading() {
  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col gap-5 xl:flex-row xl:items-end xl:justify-between">
        <div className="space-y-2">
          <Skeleton className="h-3 w-24" />
          <Skeleton className="h-9 w-72 max-w-full" />
          <Skeleton className="h-4 w-[34rem] max-w-full" />
          <Skeleton className="h-4 w-[26rem] max-w-full" />
        </div>
        <div className="flex flex-wrap gap-3">
          <Skeleton className="h-16 w-36" />
          <Skeleton className="h-16 w-36" />
          <Skeleton className="h-16 w-36" />
        </div>
      </div>

      <div className="grid gap-6 xl:grid-cols-[0.9fr_1.1fr]">
        <AdminTableSkeleton rows={4} />
        <AdminTableSkeleton rows={6} />
      </div>

      <AdminTableSkeleton rows={5} wide />
    </div>
  );
}

function AdminTableSkeleton({
  rows,
  wide = false,
}: {
  rows: number;
  wide?: boolean;
}) {
  return (
    <section className="neo-panel overflow-hidden">
      <div className="flex items-center justify-between gap-4 border-b-2 border-border bg-secondary-background px-5 py-4 sm:px-6">
        <div className="flex min-w-0 items-center gap-3">
          <Skeleton className="size-9 shrink-0" />
          <div className="min-w-0 space-y-2">
            <Skeleton className="h-5 w-44 max-w-full" />
            <Skeleton className="h-3 w-56 max-w-full" />
          </div>
        </div>
        <Skeleton className="h-9 w-32 shrink-0" />
      </div>
      <div className="overflow-x-auto">
        <div className="min-w-[42rem]">
          <div
            className={`grid border-b-2 border-border bg-main px-5 py-3 sm:px-6 ${
              wide ? "grid-cols-[1.3fr_1fr_1fr_1fr]" : "grid-cols-3"
            } gap-5`}
          >
            {Array.from({ length: wide ? 4 : 3 }).map((_, index) => (
              <Skeleton key={index} className="h-4 w-24 bg-background/40" />
            ))}
          </div>
          {Array.from({ length: rows }).map((_, index) => (
            <div
              key={index}
              className={`grid border-b-2 border-border px-5 py-4 last:border-b-0 sm:px-6 ${
                wide ? "grid-cols-[1.3fr_1fr_1fr_1fr]" : "grid-cols-3"
              } gap-5`}
            >
              <Skeleton className="h-5 w-40 max-w-full" />
              <Skeleton className="h-5 w-28 max-w-full" />
              <Skeleton className="h-9 w-24 max-w-full" />
              {wide && <Skeleton className="h-9 w-24 max-w-full" />}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
