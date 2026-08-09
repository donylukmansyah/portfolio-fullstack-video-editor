"use server";

import prisma from "@/server/db/prisma";
import { assertAdminAction } from "@/server/auth/session";
import { portfolioItemSchema } from "@/features/portfolio/schema";
import {
  errorResult,
  getFormValue,
  parseWithSchema,
  successResult,
  toActionError,
} from "@/features/admin/server/action-utils";
import { revalidatePortfolioRoutes } from "@/features/portfolio/server/revalidation";

function parsePortfolioFormData(formData: FormData) {
  const mediaType = getFormValue(formData, "mediaType");

  return parseWithSchema(portfolioItemSchema, {
    title: getFormValue(formData, "title"),
    thumbnailLabel: getFormValue(formData, "thumbnailLabel"),
    thumbnailUrl: getFormValue(formData, "thumbnailUrl"),
    mediaType,
    youtubeUrl: mediaType === "image" ? null : getFormValue(formData, "youtubeUrl"),
    externalLinkName: getFormValue(formData, "externalLinkName"),
    externalLinkUrl: getFormValue(formData, "externalLinkUrl"),
    externalLinkLogoUrl: getFormValue(formData, "externalLinkLogoUrl"),
    subCategoryId: getFormValue(formData, "subCategoryId"),
  });
}

export async function createPortfolioItem(formData: FormData) {
  try {
    await assertAdminAction();

    const parsed = parsePortfolioFormData(formData);

    if (!parsed.success) {
      return errorResult(parsed.error);
    }

    await prisma.portfolioItem.create({
      data: {
        title: parsed.data.title,
        thumbnailLabel: parsed.data.thumbnailLabel,
        thumbnailUrl: parsed.data.thumbnailUrl ?? null,
        mediaType: parsed.data.mediaType,
        youtubeUrl: parsed.data.youtubeUrl ?? null,
        externalLinkName: parsed.data.externalLinkName ?? null,
        externalLinkUrl: parsed.data.externalLinkUrl ?? null,
        externalLinkLogoUrl: parsed.data.externalLinkLogoUrl ?? null,
        subCategoryId: parsed.data.subCategoryId,
      },
    });

    revalidatePortfolioRoutes();
    return successResult("Portfolio card created.");
  } catch (error) {
    return toActionError(error, "Failed to create the portfolio card.");
  }
}

export async function updatePortfolioItem(id: string, formData: FormData) {
  try {
    await assertAdminAction();

    const parsed = parsePortfolioFormData(formData);

    if (!parsed.success) {
      return errorResult(parsed.error);
    }

    await prisma.portfolioItem.update({
      where: { id },
      data: {
        title: parsed.data.title,
        thumbnailLabel: parsed.data.thumbnailLabel,
        thumbnailUrl: parsed.data.thumbnailUrl ?? null,
        mediaType: parsed.data.mediaType,
        youtubeUrl: parsed.data.youtubeUrl ?? null,
        externalLinkName: parsed.data.externalLinkName ?? null,
        externalLinkUrl: parsed.data.externalLinkUrl ?? null,
        externalLinkLogoUrl: parsed.data.externalLinkLogoUrl ?? null,
        subCategoryId: parsed.data.subCategoryId,
      },
    });

    revalidatePortfolioRoutes();
    return successResult("Portfolio card updated.");
  } catch (error) {
    return toActionError(error, "Failed to update the portfolio card.");
  }
}

export async function deletePortfolioItem(id: string) {
  try {
    await assertAdminAction();

    await prisma.portfolioItem.delete({ where: { id } });
    revalidatePortfolioRoutes();
    return successResult("Portfolio card deleted.");
  } catch (error) {
    return toActionError(error, "Failed to delete the portfolio card.");
  }
}
