import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

interface FilterTabsProps {
  categories: string[];
  activeCategory: string;
  onCategoryChange: (category: string) => void;
  className?: string;
}

export default function FilterTabs({
  categories,
  activeCategory,
  onCategoryChange,
  className,
}: FilterTabsProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  // Auto-scroll the active tab into the center of the container on mount or when activeCategory changes
  useEffect(() => {
    if (!containerRef.current) return;
    const container = containerRef.current;
    const activeElement = container.querySelector('[aria-selected="true"]') as HTMLElement;
    if (activeElement) {
      // Use setTimeout to ensure DOM layouts are calculated (especially on fast mount/hydration)
      const timer = setTimeout(() => {
        activeElement.scrollIntoView({
          behavior: "smooth",
          block: "nearest",
          inline: "center",
        });
      }, 50);
      return () => clearTimeout(timer);
    }
  }, [activeCategory]);

  const handleTabClick = (e: React.MouseEvent<HTMLButtonElement>, category: string) => {
    onCategoryChange(category);
    e.currentTarget.scrollIntoView({
      behavior: "smooth",
      block: "nearest",
      inline: "center",
    });
  };

  return (
    <div
      ref={containerRef}
      className={cn(
        "flex overflow-x-auto sm:overflow-visible pb-1 pr-2 sm:pb-0 sm:pr-0 sm:flex-wrap gap-2 no-scrollbar scroll-smooth",
        className
      )}
      role="tablist"
      aria-label="Filter portfolio by category"
    >
      {categories.map((category) => (
        <button
          key={category}
          onClick={(e) => handleTabClick(e, category)}
          role="tab"
          aria-selected={activeCategory === category}
          id={`filter-tab-${category.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`}
          className={cn(
            "whitespace-nowrap flex-shrink-0 rounded-base border-2 border-border px-4 py-2 text-sm font-heading transition-all",
            activeCategory === category
              ? "bg-main text-main-foreground shadow-shadow"
              : "bg-secondary-background text-foreground shadow-[2px_2px_0px_0px_var(--border)] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none hover:bg-main/20"
          )}
        >
          {category}
        </button>
      ))}
    </div>
  );
}
