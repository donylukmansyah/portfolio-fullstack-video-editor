import {
  ArrowRight,
  FolderKanban,
  Inbox,
  Layers,
  LayoutGrid,
} from "lucide-react";
import Link from "next/link";

import { Button } from "@/components/ui/Button";
import { getAdminOverviewData } from "@/features/admin/server/queries";

const statIcons = [Layers, LayoutGrid, FolderKanban, Inbox] as const;
const statColors = [
  "bg-[#FFD93D]",
  "bg-[#6BCB77]",
  "bg-main",
  "bg-[#4D96FF]",
] as const;

export async function AdminDashboardOverview() {
  const { adminEmail, stats } = await getAdminOverviewData();

  return (
    <div className="flex flex-col gap-8">
      {/* ─── Welcome card ─── */}
      <section className="neo-panel overflow-hidden">
        <div className="border-b-2 border-border bg-main px-6 py-1.5">
          <p className="text-[11px] font-heading uppercase tracking-[0.2em] text-main-foreground/70">
            Welcome back
          </p>
        </div>
        <div className="flex flex-col gap-6 p-6 lg:flex-row lg:items-center lg:justify-between">
          <div className="space-y-3">
            <h1 className="text-2xl font-heading text-foreground sm:text-3xl">
              Portfolio Dashboard
            </h1>
            <p className="max-w-xl text-sm leading-relaxed text-foreground/65">
              Quick snapshot of your portfolio structure and incoming contact
              activity. Jump into the workspace to add content, edit cards, or
              review messages.
            </p>
            <p className="text-xs font-heading text-foreground/40">
              Signed in as {adminEmail}
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <Button asChild>
              <Link href="/admin/portfolios">
                <FolderKanban className="size-4" />
                Portfolio Manager
              </Link>
            </Button>
            <Button asChild variant="neutral">
              <Link href="/admin/messages">
                <Inbox className="size-4" />
                View Messages
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* ─── Stats grid ─── */}
      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map((stat, index) => {
          const Icon = statIcons[index] ?? Layers;
          const color = statColors[index] ?? "bg-main";

          return (
            <div
              key={stat.label}
              className="neo-panel group flex flex-col gap-4 p-5 transition-transform hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-none"
            >
              <div className="flex items-center justify-between">
                <div
                  className={`flex size-10 items-center justify-center rounded-base border-2 border-border ${color} text-main-foreground`}
                >
                  <Icon className="size-5" />
                </div>
                <p className="text-[10px] font-heading uppercase tracking-[0.15em] text-foreground/40">
                  {stat.label}
                </p>
              </div>
              <div>
                <p className="text-4xl font-heading text-foreground tabular-nums">
                  {stat.value}
                </p>
                {stat.helper && (
                  <p className="mt-2 text-xs leading-relaxed text-foreground/50">
                    {stat.helper}
                  </p>
                )}
              </div>
            </div>
          );
        })}
      </section>

      {/* ─── Quick navigation ─── */}
      <section className="grid gap-4 sm:grid-cols-2">
        <Link
          href="/admin/portfolios"
          className="neo-panel group flex items-center justify-between p-5 transition-transform hover:translate-x-boxShadowX hover:translate-y-boxShadowY hover:shadow-none"
        >
          <div className="flex items-center gap-3">
            <div className="flex size-10 items-center justify-center rounded-base border-2 border-border bg-main text-main-foreground">
              <FolderKanban className="size-5" />
            </div>
            <div>
              <p className="font-heading text-sm text-foreground">
                Portfolio Manager
              </p>
              <p className="text-xs text-foreground/55">
                Categories, sub-categories & cards
              </p>
            </div>
          </div>
          <ArrowRight className="size-5 text-foreground/30 transition-transform group-hover:translate-x-1" />
        </Link>

        <Link
          href="/admin/messages"
          className="neo-panel group flex items-center justify-between p-5 transition-transform hover:translate-x-boxShadowX hover:translate-y-boxShadowY hover:shadow-none"
        >
          <div className="flex items-center gap-3">
            <div className="flex size-10 items-center justify-center rounded-base border-2 border-border bg-[#4D96FF] text-main-foreground">
              <Inbox className="size-5" />
            </div>
            <div>
              <p className="font-heading text-sm text-foreground">
                Contact Inbox
              </p>
              <p className="text-xs text-foreground/55">
                Review & manage incoming messages
              </p>
            </div>
          </div>
          <ArrowRight className="size-5 text-foreground/30 transition-transform group-hover:translate-x-1" />
        </Link>
      </section>
    </div>
  );
}
