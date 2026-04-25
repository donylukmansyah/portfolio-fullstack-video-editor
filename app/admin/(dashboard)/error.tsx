"use client";

import { useEffect } from "react";
import { AlertCircle, RotateCw } from "lucide-react";

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
    <div className="mx-auto flex max-w-lg flex-col items-center gap-6 py-16 text-center">
      <div className="flex size-16 items-center justify-center rounded-base border-2 border-border bg-main text-main-foreground shadow-shadow">
        <AlertCircle className="size-8" />
      </div>
      <div className="space-y-2">
        <p className="text-[11px] font-heading uppercase tracking-[0.2em] text-foreground/45">
          Dashboard Error
        </p>
        <h1 className="text-2xl font-heading text-foreground">
          The admin workspace hit a problem.
        </h1>
        <p className="text-sm leading-relaxed text-foreground/65">
          No data was changed, but this screen needs to be reloaded before you
          continue editing the portfolio.
        </p>
      </div>
      <Button type="button" onClick={() => unstable_retry()}>
        <RotateCw className="size-4" />
        Try Again
      </Button>
    </div>
  );
}
