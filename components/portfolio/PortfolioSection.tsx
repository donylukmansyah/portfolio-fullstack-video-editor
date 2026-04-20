"use client";

import { useFilter } from "@/hooks/UseFilter";
import { portfolioItems, MAIN_CATEGORIES, SUB_CATEGORIES } from "@/data/PortfolioData";
import FilterTabs from "@/components/portfolio/FilterTabs";
import PortfolioGrid from "@/components/portfolio/PortfolioGrid";
import type { MainCategory } from "@/types/Portfolio";

export default function PortfolioSection() {
  const { 
    activeMainCategory, 
    activeSubCategory,
    setActiveMainCategory,
    setActiveSubCategory, 
    filteredItems 
  } = useFilter(portfolioItems);

  // Determine subcategories based on active main category
  const currentSubCategories = activeMainCategory !== "All" 
    ? SUB_CATEGORIES[activeMainCategory]
    : null;

  return (
    <section className="pb-6" id="portfolio-section">
      <div className="mb-5 flex items-center justify-between gap-3">
        <span className="neo-label">Selected work</span>
        <div className="rounded-base border-2 border-border bg-secondary-background px-3 py-1 text-xs font-heading text-foreground shadow-[2px_2px_0px_0px_var(--border)]">
          {filteredItems.length} pieces
        </div>
      </div>

      <div className="mb-6 flex flex-col gap-3">
        {/* Level 1: Main Categories */}
        <FilterTabs
          categories={MAIN_CATEGORIES as string[]}
          activeCategory={activeMainCategory}
          onCategoryChange={(c) => setActiveMainCategory(c as MainCategory)}
        />
        
        {/* Level 2: Subcategories (only shows if a parent category is selected) */}
        {currentSubCategories && (
          <FilterTabs
            categories={currentSubCategories}
            activeCategory={activeSubCategory}
            onCategoryChange={setActiveSubCategory}
          />
        )}
      </div>

      <PortfolioGrid items={filteredItems} key={`${activeMainCategory}-${activeSubCategory}`} />
    </section>
  );
}
