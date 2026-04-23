import "server-only";

import type { Prisma } from "@prisma/client";

import { mapPortfolioItem } from "@/lib/portfolio";
import prisma from "@/lib/prisma";

type GetPortfolioPageDataOptions = {
  categorySlug: string;
  page: number;
  subCategorySlug: string;
};

export async function getPortfolioPageData({
  categorySlug,
  page,
  subCategorySlug,
}: GetPortfolioPageDataOptions) {
  const limit = 6;
  const currentPage = Math.max(page, 1);
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

  const [categories, items, totalCount] = await Promise.all([
    prisma.mainCategory.findMany({
      include: { subCategories: true },
      orderBy: { createdAt: "asc" },
    }),
    prisma.portfolioItem.findMany({
      where: whereClause,
      include: { subCategory: { include: { mainCategory: true } } },
      skip: (currentPage - 1) * limit,
      take: limit,
      orderBy: { createdAt: "desc" },
    }),
    prisma.portfolioItem.count({ where: whereClause }),
  ]);

  return {
    categories,
    currentPage,
    items: items.map(mapPortfolioItem),
    totalCount,
    totalPages: Math.ceil(totalCount / limit),
  };
}
