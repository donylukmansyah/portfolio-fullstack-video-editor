import {
  ArrowRight,
  FolderKanban,
  Inbox,
  Layers,
  LayoutDashboard,
  LayoutGrid,
} from "lucide-react";
import Link from "next/link";

import { Button } from "@/components/ui/Button";
import type { AdminStat } from "@/features/admin/types";
import { getAdminOverviewData } from "@/features/admin/server/queries";
import { DashboardQuickActions } from "@/features/admin/components/dashboard/dashboard-quick-actions";

const statMeta = {
  "Main Categories": {
    icon: Layers,
    label: "Filters",
  },
  "Sub Categories": {
    icon: LayoutGrid,
    label: "Nested filters",
  },
  "Portfolio Cards": {
    icon: FolderKanban,
    label: "Published cards",
  },
  "Unread Messages": {
    icon: Inbox,
    label: "Inbox queue",
  },
} as const;

export async function AdminDashboardOverview() {
  const { adminEmail, stats } = await getAdminOverviewData();
  const getStatValue = createStatValueGetter(stats);
  const portfolioCount = getStatValue("Portfolio Cards");
  const unreadMessages = getStatValue("Unread Messages");

  return (
    <div className="mx-auto flex w-full max-w-[1380px] flex-col gap-6">
      <section className="neo-panel overflow-hidden">
        <div className="grid gap-0 lg:grid-cols-[minmax(0,1fr)_21rem]">
          <div className="space-y-6 p-5 sm:p-7 lg:p-8">
            <div className="flex items-center gap-3">
              <span className="flex size-11 items-center justify-center rounded-base border-2 border-border bg-main text-main-foreground shadow-[3px_3px_0_0_var(--border)]">
                <LayoutDashboard className="size-5" aria-hidden="true" />
              </span>
              <div>
                <p className="neo-label shadow-[2px_2px_0_0_var(--border)]">
                  Admin Dashboard
                </p>
                <p className="mt-2 text-xs text-foreground/55">
                  {adminEmail ?? "Active admin session"}
                </p>
              </div>
            </div>

            <div className="max-w-3xl space-y-3">
              <h1 className="text-3xl font-heading leading-tight text-foreground sm:text-5xl">
                Manage content, categories, and inbox.
              </h1>
              <p className="max-w-2xl text-sm leading-relaxed text-foreground/65 sm:text-base">
                Same visual language as the public portfolio, but focused for
                admin work: quick scan, fast CRUD, no heavy chrome.
              </p>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row">
              <Button asChild size="lg">
                <Link href="/admin/portfolios">
                  <FolderKanban className="size-4" />
                  Portfolio CRUD
                </Link>
              </Button>
              <Button asChild variant="neutral" size="lg">
                <Link href="/admin/messages">
                  <Inbox className="size-4" />
                  Message Inbox
                </Link>
              </Button>
            </div>
          </div>

          <div className="border-t-2 border-border bg-main/10 p-5 sm:p-6 lg:border-l-2 lg:border-t-0">
            <div className="grid h-full gap-3">
              <HeroMiniStat
                label="Portfolio cards"
                value={portfolioCount}
                helper="Live content"
              />
              <HeroMiniStat
                label="Unread messages"
                value={unreadMessages}
                helper={unreadMessages > 0 ? "Needs review" : "Inbox clear"}
              />
              <HeroMiniStat
                label="Theme"
                value="2"
                helper="Light and dark modes"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map((stat) => (
          <DashboardStatCard key={stat.label} stat={stat} />
        ))}
      </section>

      <DashboardQuickActions
        portfolioCount={portfolioCount}
        unreadMessages={unreadMessages}
      />
    </div>
  );
}

function HeroMiniStat({
  helper,
  label,
  value,
}: {
  helper: string;
  label: string;
  value: number | string;
}) {
  return (
    <div className="flex items-center justify-between gap-4 rounded-base border-2 border-border bg-secondary-background px-4 py-4 shadow-[3px_3px_0_0_var(--border)]">
      <div>
        <p className="text-[10px] font-heading uppercase tracking-[0.16em] text-foreground/45">
          {label}
        </p>
        <p className="mt-1 text-xs text-foreground/60">{helper}</p>
      </div>
      <p className="text-3xl font-heading text-main tabular-nums">{value}</p>
    </div>
  );
}

function DashboardStatCard({ stat }: { stat: AdminStat }) {
  const meta = statMeta[stat.label as keyof typeof statMeta] ?? {
    icon: LayoutDashboard,
    label: "Admin metric",
  };
  const Icon = meta.icon;

  return (
    <article className="neo-panel group p-5 transition-all hover:translate-x-boxShadowX hover:translate-y-boxShadowY hover:shadow-none">
      <div className="flex items-start justify-between gap-4">
        <span className="flex size-10 items-center justify-center rounded-base border-2 border-border bg-main text-main-foreground">
          <Icon className="size-5" aria-hidden="true" />
        </span>
        <p className="rounded-base border-2 border-border bg-secondary-background px-2.5 py-1 text-[10px] font-heading uppercase text-foreground/60 shadow-[2px_2px_0_0_var(--border)]">
          {meta.label}
        </p>
      </div>
      <p className="mt-8 text-5xl font-heading leading-none text-foreground tabular-nums">
        {stat.value}
      </p>
      <div className="mt-3 flex items-end justify-between gap-4">
        <div>
          <h2 className="text-sm font-heading text-foreground">{stat.label}</h2>
          {stat.helper ? (
            <p className="mt-1 text-xs leading-relaxed text-foreground/55">
              {stat.helper}
            </p>
          ) : null}
        </div>
        <ArrowRight
          className="size-4 text-foreground/35 transition-transform group-hover:translate-x-1"
          aria-hidden="true"
        />
      </div>
    </article>
  );
}

function createStatValueGetter(stats: AdminStat[]) {
  const valueByLabel = new Map(stats.map((stat) => [stat.label, stat.value]));

  return (label: string) => valueByLabel.get(label) ?? 0;
}
