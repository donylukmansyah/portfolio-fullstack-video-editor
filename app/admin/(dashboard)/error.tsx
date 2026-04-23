"use client";

import { useEffect } from "react";

import { Button } from "@/components/ui/Button";

export default function AdminDashboardError({
  error,
  unstable_retry,
}: {
  error: Error & { digest?: string };
  unstable_retry: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="neo-panel flex max-w-2xl flex-col gap-4 p-6">
      <p className="text-xs font-heading uppercase tracking-wide text-foreground/60">Dashboard Error</p>
      <h1 className="text-2xl font-heading text-foreground">The admin workspace hit a problem.</h1>
      <p className="text-sm text-foreground/75">
        No data was changed, but this screen needs to be reloaded before you continue editing the portfolio.
      </p>
      <div className="flex flex-wrap gap-3">
        <Button type="button" onClick={() => unstable_retry()}>
          Try Again
        </Button>
      </div>
    </div>
  );
}
