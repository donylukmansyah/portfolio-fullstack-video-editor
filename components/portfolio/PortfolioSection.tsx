"use client";

import { useTransition } from "react";
import { usePathname, useRouter } from "next/navigation";
import FilterTabs from "@/components/portfolio/FilterTabs";
import PortfolioGrid from "@/components/portfolio/PortfolioGrid";
import type { PortfolioItem } from "@/types/Portfolio";
import type { PortfolioSectionCategory } from "@/types/Portfolio";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

interface PortfolioSectionProps {
  items: PortfolioItem[];
  categories: PortfolioSectionCategory[];
  activeCategory: string;
  activeSubCategory: string;
  totalCount: number;
  currentPage: number;
  totalPages: number;
}

export default function PortfolioSection({ 
  items, 
  categories, 
  activeCategory, 
  activeSubCategory, 
  totalCount,
  currentPage,
  totalPages
}: PortfolioSectionProps) {
  const router = useRouter();
  const pathname = usePathname();
  const [isPending, startTransition] = useTransition();

  const createQueryString = (paramsToUpdate: Record<string, string>) => {
    const params = new URLSearchParams();

    if (activeCategory !== "all") {
      params.set("category", activeCategory);
    }

    if (activeSubCategory !== "all") {
      params.set("sub", activeSubCategory);
    }

    if (currentPage > 1) {
      params.set("page", String(currentPage));
    }

    Object.entries(paramsToUpdate).forEach(([name, value]) => {
      if (value === "all" || (name === "page" && value === "1")) {
        params.delete(name);
        return;
      }

      params.set(name, value);
    });

    return params.toString();
  };

  const getHref = (queryString: string) =>
    queryString ? `${pathname}?${queryString}` : pathname;

  const mainCategoryOptions = [
    { label: "All", slug: "all" },
    ...categories.map((category) => ({
      label: category.name,
      slug: category.slug,
    })),
  ];

  const currentMainCat = categories.find((category) => category.slug === activeCategory) ?? null;
  const currentSubCategoryOptions = currentMainCat
    ? currentMainCat.subCategories.map((subCategory) => ({
        label: subCategory.name,
        slug: subCategory.slug,
      }))
    : null;

  const activeMainCategoryLabel =
    mainCategoryOptions.find((category) => category.slug === activeCategory)?.label ?? "All";
  const activeSubCategoryLabel =
    activeSubCategory === "all"
      ? ""
      : currentSubCategoryOptions?.find((subCategory) => subCategory.slug === activeSubCategory)?.label ?? "";

  const navigateWithTransition = (href: string) => {
    startTransition(() => {
      router.push(href, { scroll: false });
    });
  };

  const handleMainCategoryChange = (val: string) => {
    const selectedCategory = mainCategoryOptions.find((category) => category.label === val);

    if (!selectedCategory || selectedCategory.slug === "all") {
      navigateWithTransition(pathname);
    } else {
      navigateWithTransition(
        getHref(createQueryString({ category: selectedCategory.slug, sub: "all", page: "1" }))
      );
    }
  };

  const handleSubCategoryChange = (val: string) => {
    const selectedSubCategory = currentSubCategoryOptions?.find((subCategory) => subCategory.label === val);

    if (!selectedSubCategory) {
      return;
    }

    if (selectedSubCategory.slug === activeSubCategory) {
      navigateWithTransition(getHref(createQueryString({ sub: "all", page: "1" })));
    } else {
      navigateWithTransition(getHref(createQueryString({ sub: selectedSubCategory.slug, page: "1" })));
    }
  };

  return (
    <section className="pb-6" id="portfolio-section">
      <div className="mb-5 flex items-center justify-between gap-3">
        <span className="neo-label">Selected work</span>
        <div className="rounded-base border-2 border-border bg-secondary-background px-3 py-1 text-xs font-heading text-foreground shadow-[2px_2px_0px_0px_var(--border)]">
          {totalCount} pieces
        </div>
      </div>

      <div className="mb-6 flex flex-col gap-3">
        {/* Level 1: Main Categories */}
        <FilterTabs
          categories={mainCategoryOptions.map((category) => category.label)}
          activeCategory={activeMainCategoryLabel}
          onCategoryChange={handleMainCategoryChange}
        />
        
        {/* Level 2: Subcategories (only shows if a parent category is selected) */}
        {currentSubCategoryOptions && currentSubCategoryOptions.length > 0 && (
          <FilterTabs
            categories={currentSubCategoryOptions.map((subCategory) => subCategory.label)}
            activeCategory={activeSubCategoryLabel}
            onCategoryChange={handleSubCategoryChange}
          />
        )}
      </div>

      <PortfolioGrid
        items={items}
        isLoading={isPending}
        key={`${activeCategory}-${activeSubCategory}-${currentPage}`}
      />

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="mt-8">
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious 
                  href={currentPage > 1 ? getHref(createQueryString({ page: String(currentPage - 1) })) : "#"} 
                  className={currentPage <= 1 ? "pointer-events-none opacity-50" : ""}
                />
              </PaginationItem>
              
              {Array.from({ length: totalPages }).map((_, i) => (
                <PaginationItem key={i}>
                  <PaginationLink 
                    href={getHref(createQueryString({ page: String(i + 1) }))}
                    isActive={currentPage === i + 1}
                  >
                    {i + 1}
                  </PaginationLink>
                </PaginationItem>
              ))}

              <PaginationItem>
                <PaginationNext 
                  href={currentPage < totalPages ? getHref(createQueryString({ page: String(currentPage + 1) })) : "#"}
                  className={currentPage >= totalPages ? "pointer-events-none opacity-50" : ""}
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      )}
    </section>
  );
}
