"use client";

import { useState } from "react";
import type { PortfolioItem } from "@/types/Portfolio";
import PortfolioCard from "@/components/portfolio/PortfolioCard";
import PortfolioDetailModal from "@/components/portfolio/PortfolioDetailModal";

interface PortfolioGridProps {
  items: PortfolioItem[];
}

export default function PortfolioGrid({ items }: PortfolioGridProps) {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const handleCardClick = (item: PortfolioItem) => {
    const index = items.findIndex((i) => i.id === item.id);
    setSelectedIndex(index >= 0 ? index : null);
  };

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
