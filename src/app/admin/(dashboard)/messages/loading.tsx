import { Skeleton } from "@/components/ui/skeleton";

export default function MessagesAdminLoading() {
  return (
    <div className="flex flex-col gap-8">
      <section className="neo-panel p-5 sm:p-6">
        <div className="flex flex-col gap-5 xl:flex-row xl:items-end xl:justify-between">
          <div className="space-y-3">
            <div className="neo-label w-fit shadow-[2px_2px_0px_0px_var(--border)]">
              MESSAGES
            </div>
            <Skeleton className="h-9 w-56 max-w-full" />
            <Skeleton className="h-4 w-[min(42rem,100%)]" />
            <Skeleton className="h-4 w-[min(32rem,82%)]" />
          </div>
          <div className="flex flex-wrap gap-3">
            {Array.from({ length: 3 }).map((_, index) => (
              <div
                key={index}
                className="rounded-base border-2 border-border bg-secondary-background px-4 py-2.5 shadow-[2px_2px_0px_0px_var(--border)]"
              >
                <Skeleton className="h-3 w-24 bg-main/20" />
                <Skeleton className="mt-2 h-6 w-8" />
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="neo-panel overflow-hidden">
        <div className="flex items-center justify-between gap-4 border-b-2 border-border bg-main/10 px-5 py-4 sm:px-6">
          <div className="flex min-w-0 items-center gap-3">
            <Skeleton className="size-10 shrink-0 bg-main/20" />
            <div className="min-w-0 space-y-2">
              <Skeleton className="h-6 w-28" />
              <Skeleton className="h-3 w-56 max-w-full" />
            </div>
          </div>
          <Skeleton className="h-8 w-20 bg-main/20" />
        </div>

        <div className="no-scrollbar overflow-x-auto">
          <div className="min-w-[62rem]">
            <div className="grid grid-cols-[1.1fr_1.6fr_0.8fr_0.9fr_1fr] gap-5 border-b-2 border-border bg-main px-5 py-3 sm:px-6">
              {["Sender", "Message", "Status", "Received", "Actions"].map(
                (label) => (
                  <Skeleton
                    key={label}
                    className="h-4 w-24 bg-background/50"
                  />
                ),
              )}
            </div>

            {Array.from({ length: 4 }).map((_, index) => (
              <div
                key={index}
                className="grid grid-cols-[1.1fr_1.6fr_0.8fr_0.9fr_1fr] gap-5 border-b-2 border-border px-5 py-5 last:border-b-0 sm:px-6"
              >
                <div className="space-y-2">
                  <Skeleton className="h-5 w-32" />
                  <Skeleton className="h-3 w-44" />
                </div>
                <div className="space-y-2">
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-[70%]" />
                </div>
                <Skeleton className="h-8 w-20 bg-main/20" />
                <Skeleton className="h-4 w-28" />
                <div className="flex gap-2">
                  <Skeleton className="h-9 w-28" />
                  <Skeleton className="h-9 w-10 bg-main/20" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
