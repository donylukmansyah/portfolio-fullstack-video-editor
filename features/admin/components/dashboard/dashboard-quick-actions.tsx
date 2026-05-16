"use client";

import { useMemo, useState } from "react";
import {
  ArrowRight,
  ExternalLink,
  FolderKanban,
  Inbox,
  type LucideIcon,
} from "lucide-react";
import Link from "next/link";

import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";

type QuickActionId = "portfolio" | "messages" | "public";

type QuickAction = {
  id: QuickActionId;
  title: string;
  description: string;
  href: string;
  metric: string;
  icon: LucideIcon;
  cta: string;
};

export function DashboardQuickActions({
  portfolioCount,
  unreadMessages,
}: {
  portfolioCount: number;
  unreadMessages: number;
}) {
  const actions = useMemo<QuickAction[]>(
    () => [
      {
        id: "portfolio",
        title: "Portfolio CRUD",
        description: "Create, edit, and organize portfolio content.",
        href: "/admin/portfolios",
        metric: `${portfolioCount} cards`,
        icon: FolderKanban,
        cta: "Manage",
      },
      {
        id: "messages",
        title: "Messages",
        description: "Read contact messages and update status.",
        href: "/admin/messages",
        metric: `${unreadMessages} unread`,
        icon: Inbox,
        cta: "Open inbox",
      },
      {
        id: "public",
        title: "Preview Site",
        description: "Check the public portfolio after edits.",
        href: "/",
        metric: "public",
        icon: ExternalLink,
        cta: "Preview",
      },
    ],
    [portfolioCount, unreadMessages],
  );
  const [activeActionId, setActiveActionId] =
    useState<QuickActionId>("portfolio");
  const activeAction =
    actions.find((action) => action.id === activeActionId) ?? actions[0];

  return (
    <section className="rounded-base border-2 border-border bg-secondary-background shadow-shadow">
      <div className="flex flex-col gap-2 border-b-2 border-border p-5 sm:flex-row sm:items-end sm:justify-between sm:p-6">
        <div>
          <p className="text-[11px] font-heading uppercase tracking-[0.18em] text-foreground/45">
            Quick actions
          </p>
          <h2 className="mt-1 text-2xl font-heading text-foreground">
            Start work fast
          </h2>
        </div>
        <p className="max-w-md text-sm leading-relaxed text-foreground/60 sm:text-right">
          Select an action to preview context, then jump to the right admin
          page.
        </p>
      </div>

      <div className="grid gap-4 p-5 lg:grid-cols-[minmax(0,1fr)_18rem] sm:p-6">
        <div className="grid gap-3 sm:grid-cols-3">
          {actions.map((action) => {
            const Icon = action.icon;
            const isActive = action.id === activeAction.id;

            return (
              <button
                key={action.id}
                type="button"
                aria-pressed={isActive}
                onClick={() => setActiveActionId(action.id)}
                onFocus={() => setActiveActionId(action.id)}
                className={cn(
                  "flex min-h-36 flex-col items-start justify-between rounded-base border-2 border-border bg-background p-4 text-left shadow-[3px_3px_0_0_var(--border)] transition-all",
                  "hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-none",
                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
                  isActive && "bg-main text-main-foreground shadow-none",
                )}
              >
                <span className="flex w-full items-start justify-between gap-3">
                  <span className="flex size-10 items-center justify-center rounded-base border-2 border-border bg-secondary-background text-foreground">
                    <Icon className="size-5" aria-hidden="true" />
                  </span>
                  <span className="rounded-base border-2 border-border bg-secondary-background px-2 py-1 text-[10px] font-heading uppercase text-foreground">
                    {action.metric}
                  </span>
                </span>
                <span>
                  <span className="block text-base font-heading">
                    {action.title}
                  </span>
                  <span
                    className={cn(
                      "mt-1 block text-xs leading-relaxed",
                      isActive ? "text-main-foreground/70" : "text-foreground/60",
                    )}
                  >
                    {action.description}
                  </span>
                </span>
              </button>
            );
          })}
        </div>

        <div className="flex flex-col justify-between gap-5 rounded-base border-2 border-border bg-main/10 p-5">
          <div>
            <p className="text-[10px] font-heading uppercase tracking-[0.18em] text-foreground/45">
              Selected
            </p>
            <h3 className="mt-2 text-2xl font-heading text-foreground">
              {activeAction.title}
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-foreground/60">
              {activeAction.description}
            </p>
          </div>
          <Button asChild className="justify-between">
            <Link
              href={activeAction.href}
              target={activeAction.id === "public" ? "_blank" : undefined}
            >
              {activeAction.cta}
              <ArrowRight className="size-4" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
