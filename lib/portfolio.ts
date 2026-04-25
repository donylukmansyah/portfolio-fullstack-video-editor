import "server-only";

import { cache } from "react";
import type { Prisma } from "@prisma/client";

import prisma from "@/lib/prisma";
import type { PortfolioCommandItem, PortfolioItem } from "@/types/Portfolio";

export const portfolioItemSelect = {
  id: true,
  title: true,
  thumbnailLabel: true,
  thumbnailUrl: true,
  mediaType: true,
  youtubeUrl: true,
  externalLinkName: true,
  externalLinkUrl: true,
  externalLinkLogoUrl: true,
  subCategoryId: true,
  updatedAt: true,
  subCategory: {
    select: {
      name: true,
      mainCategory: {
        select: {
          name: true,
        },
      },
    },
  },
} satisfies Prisma.PortfolioItemSelect;

type PortfolioRecord = Prisma.PortfolioItemGetPayload<{
  select: typeof portfolioItemSelect;
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
    externalLinkName: item.externalLinkName,
    externalLinkUrl: item.externalLinkUrl,
    externalLinkLogoUrl: item.externalLinkLogoUrl,
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
    select: portfolioItemSelect,
    orderBy: {
      createdAt: "desc",
    },
  });
});
