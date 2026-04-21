"use client";

import { useState } from "react";
import type { PortfolioItem } from "@/types/Portfolio";
import PortfolioCard from "@/components/portfolio/PortfolioCard";
import PortfolioDetailModal from "@/components/portfolio/PortfolioDetailModal";
import { Skeleton } from "@/components/ui/skeleton";

interface PortfolioGridProps {
  items: PortfolioItem[];
  isLoading?: boolean;
}

export default function PortfolioGrid({ items, isLoading = false }: PortfolioGridProps) {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const handleCardClick = (item: PortfolioItem) => {
    const index = items.findIndex((i) => i.id === item.id);
    setSelectedIndex(index >= 0 ? index : null);
  };

  if (isLoading) {
    return (
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
    );
  }

  if (items.length === 0) {
    return (
      <div className="neo-panel flex items-center justify-center p-12">
        <p className="text-sm font-heading text-foreground/60">
          No items in this category yet.
        </p>
      </div>
    );
  }

  return (
    <>
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((item, index) => (
          <PortfolioCard key={item.id} item={item} index={index} onClick={handleCardClick} />
        ))}
      </div>

      <PortfolioDetailModal
        items={items}
        selectedIndex={selectedIndex}
        onClose={() => setSelectedIndex(null)}
      />
    </>
  );
}
