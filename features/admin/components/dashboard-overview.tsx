import Link from "next/link";

import { Button } from "@/components/ui/Button";
import { getAdminOverviewData } from "@/features/admin/server/queries";

export async function AdminDashboardOverview() {
  const { adminEmail, stats } = await getAdminOverviewData();

  return (
    <div className="flex flex-col gap-6">
      <section className="neo-panel p-6">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="text-xs font-heading uppercase tracking-wide text-foreground/60">Dashboard</p>
            <h1 className="mt-2 text-3xl font-heading text-foreground">Portfolio Overview</h1>
            <p className="mt-2 max-w-2xl text-sm text-foreground/75">
              Quick snapshot of your portfolio structure. Jump into the portfolio workspace when you want
              to add filters, thumbnails, videos, or edit cards.
            </p>
            <p className="mt-3 text-xs font-heading text-foreground/60">
              Logged in as {adminEmail}
            </p>
          </div>

          <Button asChild size="lg">
            <Link href="/admin/portfolios">Open Portfolio Manager</Link>
          </Button>
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-3">
        {stats.map((stat) => (
          <div key={stat.label} className="neo-panel p-5">
            <p className="text-xs font-heading uppercase tracking-wide text-foreground/60">{stat.label}</p>
            <p className="mt-3 text-4xl font-heading text-foreground">{stat.value}</p>
            <p className="mt-3 text-sm text-foreground/70">{stat.helper}</p>
          </div>
        ))}
      </section>
    </div>
  );
}
