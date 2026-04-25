"use client";

import { useEffect } from "react";
import Link from "next/link";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <section className="hero-entrance flex flex-1 items-center justify-center px-4 py-28">
      <div className="relative w-full max-w-lg overflow-hidden rounded-base border-2 border-border bg-secondary-background p-6 shadow-shadow sm:p-8">
        <div className="absolute -right-6 -top-6 h-20 w-20 rotate-12 rounded-base border-2 border-border bg-main" />
        <div className="relative flex flex-col gap-5">
          <span className="neo-label self-start">Error</span>
          <h2 className="text-2xl font-heading text-foreground">Something went wrong</h2>
          <p className="text-sm text-foreground/70">
            An unexpected error occurred. Please try again.
          </p>
          <div className="flex flex-wrap gap-3">
            <button onClick={reset} className="neo-btn-main">Try Again</button>
            <Link href="/" className="neo-btn">Back to Home</Link>
          </div>
        </div>
      </div>
    </section>
  );
}
