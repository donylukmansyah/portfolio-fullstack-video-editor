import { Skeleton } from "@/components/ui/skeleton";

export default function AdminDashboardLoading() {
  return (
    <div className="mx-auto flex w-full max-w-[1380px] flex-col gap-6">
      <section className="neo-panel overflow-hidden">
        <div className="grid gap-0 lg:grid-cols-[minmax(0,1fr)_21rem]">
          <div className="space-y-6 p-5 sm:p-7 lg:p-8">
            <div className="flex items-center gap-3">
              <Skeleton className="size-11 shrink-0 bg-main/20" />
              <div className="space-y-2">
                <Skeleton className="h-8 w-44 bg-main/20" />
                <Skeleton className="h-3 w-48" />
              </div>
            </div>

            <div className="max-w-3xl space-y-3">
              <Skeleton className="h-10 w-[min(34rem,100%)]" />
              <Skeleton className="h-10 w-[min(28rem,86%)]" />
              <Skeleton className="h-4 w-[min(38rem,100%)]" />
              <Skeleton className="h-4 w-[min(30rem,78%)]" />
            </div>

            <div className="flex flex-col gap-3 sm:flex-row">
              <Skeleton className="h-11 w-full sm:w-40" />
              <Skeleton className="h-11 w-full sm:w-40" />
            </div>
          </div>

          <div className="border-t-2 border-border bg-main/10 p-5 sm:p-6 lg:border-l-2 lg:border-t-0">
            <div className="grid h-full gap-3">
              <MiniStatSkeleton />
              <MiniStatSkeleton />
              <MiniStatSkeleton />
            </div>
          </div>
        </div>
      </section>

      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {Array.from({ length: 4 }).map((_, index) => (
          <StatCardSkeleton key={index} />
        ))}
      </section>

      <section className="neo-panel overflow-hidden">
        <div className="flex flex-col gap-2 border-b-2 border-border p-5 sm:flex-row sm:items-end sm:justify-between sm:p-6">
          <div className="space-y-2">
            <Skeleton className="h-3 w-28 bg-main/20" />
            <Skeleton className="h-8 w-48" />
          </div>
          <Skeleton className="h-4 w-[min(26rem,100%)]" />
        </div>
        <div className="grid gap-4 p-5 lg:grid-cols-[minmax(0,1fr)_18rem] sm:p-6">
          <div className="grid gap-3 sm:grid-cols-3">
            <ActionSkeleton />
            <ActionSkeleton />
            <ActionSkeleton />
          </div>
          <div className="rounded-base border-2 border-border bg-main/10 p-5">
            <Skeleton className="h-3 w-20 bg-main/20" />
            <Skeleton className="mt-3 h-8 w-40" />
            <Skeleton className="mt-3 h-4 w-full" />
            <Skeleton className="mt-8 h-10 w-full" />
          </div>
        </div>
      </section>
    </div>
  );
}

function MiniStatSkeleton() {
  return (
    <div className="flex items-center justify-between gap-4 rounded-base border-2 border-border bg-secondary-background px-4 py-4 shadow-[3px_3px_0_0_var(--border)]">
      <div className="space-y-2">
        <Skeleton className="h-3 w-28 bg-main/20" />
        <Skeleton className="h-3 w-20" />
      </div>
      <Skeleton className="size-10 bg-main/20" />
    </div>
  );
}

function StatCardSkeleton() {
  return (
    <div className="neo-panel p-5">
      <div className="flex items-start justify-between gap-4">
        <Skeleton className="size-10 bg-main/20" />
        <Skeleton className="h-8 w-24" />
      </div>
      <Skeleton className="mt-8 h-12 w-16" />
      <Skeleton className="mt-4 h-4 w-32" />
      <Skeleton className="mt-2 h-3 w-44 max-w-full" />
    </div>
  );
}

function ActionSkeleton() {
  return (
    <div className="rounded-base border-2 border-border bg-background p-4 shadow-[3px_3px_0_0_var(--border)]">
      <div className="flex items-start justify-between gap-3">
        <Skeleton className="size-10 bg-main/20" />
        <Skeleton className="h-7 w-20" />
      </div>
      <Skeleton className="mt-10 h-5 w-32" />
      <Skeleton className="mt-2 h-3 w-full" />
    </div>
  );
}
