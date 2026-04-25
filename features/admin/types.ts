import type { AdminActionResult } from "@/server/admin/action-utils";

export type { AdminActionResult };

export type AdminStat = {
  label: string;
  value: number;
  helper?: string;
};

export type MainCategoryRow = {
  id: string;
  name: string;
  slug: string;
  subCount: number;
};

export type MainCategoryOption = {
  id: string;
  name: string;
};

export type SubCategoryRow = {
  id: string;
  name: string;
  slug: string;
  mainCategoryId: string;
  mainCategoryName: string;
  portfolioCount: number;
};

export type SubCategoryOption = {
  id: string;
  name: string;
  mainCategoryName: string;
};

export type PortfolioRow = {
  id: string;
  title: string;
  thumbnailLabel: string;
  thumbnailUrl: string | null;
  mediaType: "video" | "image";
  youtubeUrl: string | null;
  externalLinkName: string | null;
  externalLinkUrl: string | null;
  externalLinkLogoUrl: string | null;
  subCategoryId: string;
  subCategoryName: string;
  mainCategoryName: string;
  updatedAt: string;
};

export type AdminOverviewData = {
  adminEmail: string | null;
  stats: AdminStat[];
};

export type PortfolioManagerData = {
  adminEmail: string | null;
  stats: AdminStat[];
  mainCategoryRows: MainCategoryRow[];
  mainCategoryOptions: MainCategoryOption[];
  subCategoryRows: SubCategoryRow[];
  subCategoryOptions: SubCategoryOption[];
  portfolioRows: PortfolioRow[];
};

export type ContactMessageRow = {
  id: string;
  name: string;
  email: string;
  message: string;
  isRead: boolean;
  createdAt: string;
  readAt: string | null;
};

export type ContactMessagesData = {
  adminEmail: string | null;
  stats: AdminStat[];
  unreadCount: number;
  rows: ContactMessageRow[];
};
