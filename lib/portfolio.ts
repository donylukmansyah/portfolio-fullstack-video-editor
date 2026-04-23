import "server-only";

import { cache } from "react";
import type { Prisma } from "@prisma/client";

import prisma from "@/lib/prisma";
import type { PortfolioCommandItem, PortfolioItem } from "@/types/Portfolio";

const portfolioInclude = {
  subCategory: {
    include: {
      mainCategory: true,
    },
  },
} satisfies Prisma.PortfolioItemInclude;

type PortfolioRecord = Prisma.PortfolioItemGetPayload<{
  include: typeof portfolioInclude;
}>;

export function mapPortfolioItem(item: PortfolioRecord): PortfolioItem {
  return {
    id: item.id,
    title: item.title,
    thumbnailLabel: item.thumbnailLabel,
    thumbnailUrl: item.thumbnailUrl,
    category: item.subCategory.mainCategory.name,
    subCategory: item.subCategory.name,
    youtubeUrl: item.youtubeUrl,
    gradient: item.gradient,
    mediaType: item.mediaType as "video" | "image",
  };
}

export const getPortfolioCommandItems = cache(async (): Promise<PortfolioCommandItem[]> => {
  const items = await prisma.portfolioItem.findMany({
    select: {
      id: true,
      title: true,
      subCategory: {
        select: {
          name: true,
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
    take: 50,
  });

  return items.map((item) => ({
    id: item.id,
    title: item.title,
    subCategory: item.subCategory.name,
  }));
});

export const getPortfolioItemsForAdmin = cache(async () => {
  return prisma.portfolioItem.findMany({
    include: portfolioInclude,
    orderBy: {
      createdAt: "desc",
    },
  });
});
