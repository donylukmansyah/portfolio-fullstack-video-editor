import type { PortfolioItem } from "@/types/Portfolio";
import PortfolioCard from "@/components/portfolio/PortfolioCard";

interface PortfolioGridProps {
  items: PortfolioItem[];
}

export default function PortfolioGrid({ items }: PortfolioGridProps) {
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
    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {items.map((item, index) => (
        <PortfolioCard key={item.id} item={item} index={index} />
      ))}
    </div>
  );
}
