import type { ReactNode } from "react";

import { cn } from "@/lib/utils";
import type { PortfolioCommandItem } from "@/types/Portfolio";

import BackgroundDecorations from "./BackgroundDecorations";
import Footer from "./Footer";
import Navbar from "./Navbar";

type PublicShellProps = {
  children: ReactNode;
  portfolioCommandItems?: PortfolioCommandItem[];
  contentClassName?: string;
};

export default function PublicShell({
  children,
  portfolioCommandItems,
  contentClassName,
}: PublicShellProps) {
  return (
    <div className="relative flex min-h-screen flex-col">
      <BackgroundDecorations />
      <Navbar portfolioCommandItems={portfolioCommandItems} />
      <main className="relative z-10 flex-1">
        <div
          className={cn(
            "mx-auto flex w-full max-w-[860px] flex-1 flex-col px-4 py-6 sm:px-6",
            contentClassName
          )}
        >
          {children}
        </div>
      </main>
      <Footer />
    </div>
  );
}
