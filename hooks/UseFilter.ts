"use client";

import { useState, useMemo, useCallback } from "react";
import type { MainCategory, PortfolioItem } from "@/types/Portfolio";

export function useFilter(items: PortfolioItem[]) {
  const [activeMainCategory, setActiveMainCategory] = useState<MainCategory>("All");
  const [activeSubCategory, setActiveSubCategory] = useState<string>("All");

  const filteredItems = useMemo(() => {
    let filtered = items;
    
    // Filter by main category
    if (activeMainCategory !== "All") {
      filtered = filtered.filter((item) => item.category === activeMainCategory);
    }
    
    // Filter by sub category
    if (activeSubCategory !== "All") {
      filtered = filtered.filter((item) => item.subCategory === activeSubCategory);
    }
    
    return filtered;
  }, [items, activeMainCategory, activeSubCategory]);

  const handleMainCategoryChange = useCallback((category: MainCategory) => {
    setActiveMainCategory(category);
    setActiveSubCategory("All"); // Reset subcategory when main changes
  }, []);

  const handleSubCategoryChange = useCallback((subCategory: string) => {
    setActiveSubCategory((prev) => (prev === subCategory ? "All" : subCategory));
  }, []);

  return {
    activeMainCategory,
    activeSubCategory,
    setActiveMainCategory: handleMainCategoryChange,
    setActiveSubCategory: handleSubCategoryChange,
    filteredItems,
  };
}
