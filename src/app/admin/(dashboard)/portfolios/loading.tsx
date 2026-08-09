import { Skeleton } from "@/components/ui/skeleton";

export default function PortfolioAdminLoading() {
  return (
    <div className="flex flex-col gap-8">
      <ManagerHeaderSkeleton
        label="PORTFOLIO"
        titleWidth="w-64"
        descriptionWidth="w-[min(42rem,100%)]"
        stats={3}
      />

      <div className="grid gap-6 xl:grid-cols-[0.9fr_1.1fr]">
        <CrudSectionSkeleton titleWidth="w-44" rows={3} columns={4} />
        <CrudSectionSkeleton titleWidth="w-44" rows={5} columns={5} />
      </div>

      <CrudSectionSkeleton titleWidth="w-48" rows={6} columns={8} wide />
    </div>
  );
}

function ManagerHeaderSkeleton({
  descriptionWidth,
  label,
  stats,
  titleWidth,
}: {
  descriptionWidth: string;
  label: string;
  stats: number;
  titleWidth: string;
}) {
  return (
    <section className="neo-panel p-5 sm:p-6">
      <div className="flex flex-col gap-5 xl:flex-row xl:items-end xl:justify-between">
        <div className="space-y-3">
          <div className="neo-label w-fit shadow-[2px_2px_0px_0px_var(--border)]">
            {label}
          </div>
          <Skeleton className={`h-9 ${titleWidth} max-w-full`} />
          <Skeleton className={`h-4 ${descriptionWidth}`} />
          <Skeleton className="h-4 w-[min(30rem,82%)]" />
        </div>
        <div className="flex flex-wrap gap-3">
          {Array.from({ length: stats }).map((_, index) => (
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
  );
}

function CrudSectionSkeleton({
  columns,
  rows,
  titleWidth,
  wide = false,
}: {
  columns: number;
  rows: number;
  titleWidth: string;
  wide?: boolean;
}) {
  return (
    <section className="neo-panel overflow-hidden">
      <div className="flex items-center justify-between gap-4 border-b-2 border-border bg-main/10 px-5 py-4 sm:px-6">
        <div className="flex min-w-0 items-center gap-3">
          <Skeleton className="size-10 shrink-0 bg-main/20" />
          <div className="min-w-0 space-y-2">
            <Skeleton className={`h-6 ${titleWidth} max-w-full`} />
            <Skeleton className="h-3 w-64 max-w-full" />
          </div>
        </div>
        <Skeleton className="h-9 w-36 shrink-0 bg-main/20" />
      </div>

      <div className="no-scrollbar overflow-x-auto">
        <div className={wide ? "min-w-[78rem]" : "min-w-[42rem]"}>
          <div
            className="grid gap-5 border-b-2 border-border bg-main px-5 py-3 sm:px-6"
            style={{
              gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))`,
            }}
          >
            {Array.from({ length: columns }).map((_, index) => (
              <Skeleton key={index} className="h-4 w-24 bg-background/50" />
            ))}
          </div>

          {Array.from({ length: rows }).map((_, rowIndex) => (
            <div
              key={rowIndex}
              className="grid gap-5 border-b-2 border-border px-5 py-4 last:border-b-0 sm:px-6"
              style={{
                gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))`,
              }}
            >
              {Array.from({ length: columns }).map((_, cellIndex) => (
                <Skeleton
                  key={cellIndex}
                  className={
                    cellIndex === columns - 1
                      ? "h-9 w-24 max-w-full bg-main/20"
                      : "h-5 w-32 max-w-full"
                  }
                />
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
