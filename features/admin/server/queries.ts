import "server-only";

import { cache } from "react";

import { getAdminSession } from "@/lib/admin";
import { getPortfolioItemsForAdmin } from "@/lib/portfolio";
import prisma from "@/lib/prisma";
import type {
  AdminOverviewData,
  ContactMessagesData,
  PortfolioManagerData,
} from "@/features/admin/types";

const dateFormatter = new Intl.DateTimeFormat("id-ID", {
  dateStyle: "medium",
});

const dateTimeFormatter = new Intl.DateTimeFormat("id-ID", {
  dateStyle: "medium",
  timeStyle: "short",
});

export const getAdminOverviewData = cache(async (): Promise<AdminOverviewData> => {
  const [session, mainCategoryCount, subCategoryCount, portfolioCount, unreadMessageCount] = await Promise.all([
    getAdminSession(),
    prisma.mainCategory.count(),
    prisma.subCategory.count(),
    prisma.portfolioItem.count(),
    prisma.contactMessage.count({
      where: {
        isRead: false,
      },
    }),
  ]);

  return {
    adminEmail: session?.user.email ?? null,
    stats: [
      { label: "Main Categories", value: mainCategoryCount, helper: "Top-level portfolio filters" },
      { label: "Sub Categories", value: subCategoryCount, helper: "Nested filters under each category" },
      { label: "Portfolio Cards", value: portfolioCount, helper: "Cards shown on the public page" },
      { label: "Unread Messages", value: unreadMessageCount, helper: "Incoming contact messages waiting for review" },
    ],
  };
});

export const getPortfolioManagerData = cache(async (): Promise<PortfolioManagerData> => {
  const [session, mainCategories, subCategories, portfolioItems] = await Promise.all([
    getAdminSession(),
    prisma.mainCategory.findMany({
      include: {
        _count: {
          select: {
            subCategories: true,
          },
        },
      },
      orderBy: {
        name: "asc",
      },
    }),
    prisma.subCategory.findMany({
      include: {
        mainCategory: true,
        _count: {
          select: {
            portfolioItems: true,
          },
        },
      },
      orderBy: [
        {
          mainCategory: {
            name: "asc",
          },
        },
        {
          name: "asc",
        },
      ],
    }),
    getPortfolioItemsForAdmin(),
  ]);

  const mainCategoryRows = mainCategories.map((category) => ({
    id: category.id,
    name: category.name,
    slug: category.slug,
    subCount: category._count.subCategories,
  }));

  const mainCategoryOptions = mainCategories.map((category) => ({
    id: category.id,
    name: category.name,
  }));

  const subCategoryRows = subCategories.map((subCategory) => ({
    id: subCategory.id,
    name: subCategory.name,
    slug: subCategory.slug,
    mainCategoryId: subCategory.mainCategoryId,
    mainCategoryName: subCategory.mainCategory.name,
    portfolioCount: subCategory._count.portfolioItems,
  }));

  const subCategoryOptions = subCategories.map((subCategory) => ({
    id: subCategory.id,
    name: subCategory.name,
    mainCategoryName: subCategory.mainCategory.name,
  }));

  const portfolioRows = portfolioItems.map((item) => ({
    id: item.id,
    title: item.title,
    thumbnailLabel: item.thumbnailLabel,
    thumbnailUrl: item.thumbnailUrl,
    mediaType: item.mediaType as "video" | "image",
    youtubeUrl: item.youtubeUrl,
    gradient: item.gradient,
    subCategoryId: item.subCategoryId,
    subCategoryName: item.subCategory.name,
    mainCategoryName: item.subCategory.mainCategory.name,
    updatedAt: dateFormatter.format(item.updatedAt),
  }));

  return {
    adminEmail: session?.user.email ?? null,
    stats: [
      { label: "Main Categories", value: mainCategoryRows.length },
      { label: "Sub Categories", value: subCategoryRows.length },
      { label: "Portfolio Cards", value: portfolioRows.length },
    ],
    mainCategoryRows,
    mainCategoryOptions,
    subCategoryRows,
    subCategoryOptions,
    portfolioRows,
  };
});

export const getContactMessagesData = cache(async (): Promise<ContactMessagesData> => {
  const [session, unreadCount, messages] = await Promise.all([
    getAdminSession(),
    prisma.contactMessage.count({
      where: {
        isRead: false,
      },
    }),
    prisma.contactMessage.findMany({
      orderBy: [
        {
          isRead: "asc",
        },
        {
          createdAt: "desc",
        },
      ],
    }),
  ]);

  const rows = messages.map((message) => ({
    id: message.id,
    name: message.name,
    email: message.email,
    message: message.message,
    isRead: message.isRead,
    createdAt: dateTimeFormatter.format(message.createdAt),
    readAt: message.readAt ? dateTimeFormatter.format(message.readAt) : null,
  }));

  return {
    adminEmail: session?.user.email ?? null,
    unreadCount,
    rows,
    stats: [
      { label: "Total Messages", value: rows.length },
      { label: "Unread", value: unreadCount },
      { label: "Read", value: rows.length - unreadCount },
    ],
  };
});
