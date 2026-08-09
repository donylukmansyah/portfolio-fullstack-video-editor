import Link from "next/link";

import PublicShell from "@/components/layout/PublicShell";

export default function NotFound() {
  return (
    <PublicShell>
      <section className="hero-entrance flex flex-1 items-center pb-10 pt-28 sm:pt-32">
        <div className="relative w-full overflow-hidden rounded-base border-2 border-border bg-secondary-background p-6 shadow-shadow sm:p-8">
          <div className="absolute -right-6 -top-6 h-20 w-20 rotate-12 rounded-base border-2 border-border bg-main" />
          <div className="absolute -bottom-4 left-8 h-10 w-10 -rotate-12 rounded-base border-2 border-border bg-background" />

          <div className="relative flex flex-col gap-6">
            <span className="neo-label self-start">404 / Lost Frame</span>

            <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
              <div className="max-w-2xl">
                <p className="mb-3 text-sm font-heading uppercase tracking-[0.2em] text-foreground">
                  Page not found
                </p>
                <h1 className="text-[2.2rem] leading-[1.02] font-heading text-foreground sm:text-[3rem]">
                  This page is not in the current cut.
                </h1>
                <p className="mt-4 max-w-xl text-sm leading-relaxed text-foreground sm:text-base">
                  The link may have moved, expired, or never existed. You can
                  jump back to the portfolio, open the resume, or start a new
                  conversation from the contact page.
                </p>
              </div>

              <div className="hidden rounded-base border-2 border-border bg-main px-5 py-4 font-heading text-4xl text-main-foreground shadow-shadow sm:block">
                404
              </div>
            </div>

            <div className="flex flex-wrap gap-3">
              <Link href="/" className="neo-btn-main">
                Back to Home
              </Link>
              <Link href="/resume" className="neo-btn">
                View Resume
              </Link>
              <Link href="/contact" className="neo-btn">
                Contact
              </Link>
            </div>
          </div>
        </div>
      </section>
    </PublicShell>
  );
}
