import { Skeleton } from "@/components/ui/skeleton";

export default function PortfolioSkeleton() {
  return (
    <section className="w-full pb-6" id="portfolio-section">
      <div className="mb-5 flex items-center justify-between gap-3">
        <span className="neo-label">Selected work</span>
        <Skeleton className="h-[30px] w-20 rounded-base border-2 border-border" />
      </div>
      <div className="mb-6 flex gap-2 overflow-hidden pb-1">
        <Skeleton className="h-10 w-16 shrink-0 rounded-base border-2 border-border" />
        <Skeleton className="h-10 w-28 shrink-0 rounded-base border-2 border-border" />
        <Skeleton className="h-10 w-36 shrink-0 rounded-base border-2 border-border" />
      </div>
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="portfolio-card w-full rounded-base border-2 border-border bg-secondary-background">
            <Skeleton className="relative aspect-video w-full rounded-t-sm border-b-2 border-border" />
            <div className="px-3 py-3">
              <Skeleton className="h-4 w-3/4" />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
