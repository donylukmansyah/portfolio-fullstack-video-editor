import PortfolioSection from "@/components/portfolio/PortfolioSection";
import type { Prisma } from "@prisma/client";

import { mapPortfolioItem } from "@/lib/portfolio";
import prisma from "@/lib/prisma";

type Props = {
  categorySlug: string;
  subCategorySlug: string;
  page: number;
}

export default async function PortfolioFetcher({ categorySlug, subCategorySlug, page }: Props) {
  const limit = 6;

  // Retrieve Main Categories 
  const mainCategories = await prisma.mainCategory.findMany({
    include: { subCategories: true },
    orderBy: { createdAt: "asc" },
  });

  const whereClause: Prisma.PortfolioItemWhereInput = {};
  const subCategoryWhere: Prisma.SubCategoryWhereInput = {};

  if (categorySlug !== "all") {
    subCategoryWhere.mainCategory = {
      slug: categorySlug,
    };
  }
  if (subCategorySlug !== "all") {
    subCategoryWhere.slug = subCategorySlug;
  }

  if (Object.keys(subCategoryWhere).length > 0) {
    whereClause.subCategory = {
      is: subCategoryWhere,
    };
  }

  // Fetch items
  const [items, totalCount] = await Promise.all([
    prisma.portfolioItem.findMany({
      where: whereClause,
      include: { subCategory: { include: { mainCategory: true } } },
      skip: (page - 1) * limit,
      take: limit,
      orderBy: { createdAt: 'desc' }
    }),
    prisma.portfolioItem.count({ where: whereClause })
  ]);

  const totalPages = Math.ceil(totalCount / limit);

  const mappedItems = items.map(mapPortfolioItem);

  return (
    <PortfolioSection 
      items={mappedItems} 
      categories={mainCategories}
      activeCategory={categorySlug}
      activeSubCategory={subCategorySlug}
      totalCount={totalCount}
      currentPage={page}
      totalPages={totalPages}
    />
  );
}
