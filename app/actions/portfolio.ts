"use server";

import { revalidatePath } from "next/cache";
import { type ZodType } from "zod";

import { assertAdminAction } from "@/lib/admin";
import prisma from "@/lib/prisma";
import { mainCategorySchema, portfolioItemSchema, subCategorySchema } from "@/lib/schema";

export type AdminActionResult =
  | {
      ok: true;
      message: string;
    }
  | {
      ok: false;
      error: string;
    };

const slugify = (value: string) =>
  value
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

function getFormValue(formData: FormData, key: string) {
  const value = formData.get(key);
  return typeof value === "string" ? value : null;
}

function parseWithSchema<T>(schema: ZodType<T>, input: unknown) {
  const result = schema.safeParse(input);

  if (result.success) {
    return {
      success: true as const,
      data: result.data,
    };
  }

  const flattened = result.error.flatten();
  const firstFieldError = Object.values(flattened.fieldErrors).flat().find(
    (issue): issue is string => typeof issue === "string",
  );

  return {
    success: false as const,
    error: firstFieldError ?? flattened.formErrors[0] ?? "Invalid form submission.",
  };
}

function successResult(message: string): AdminActionResult {
  return {
    ok: true,
    message,
  };
}

function errorResult(error: string): AdminActionResult {
  return {
    ok: false,
    error,
  };
}

function toActionError(error: unknown, fallbackMessage: string): AdminActionResult {
  if (error instanceof Error && error.message === "Unauthorized") {
    return errorResult("Your session has expired. Please sign in again.");
  }

  console.error(fallbackMessage, error);
  return errorResult(fallbackMessage);
}

async function getUniqueMainCategorySlug(name: string, excludeId?: string) {
  const baseSlug = slugify(name);
  let candidate = baseSlug;
  let suffix = 2;

  while (true) {
    const existing = await prisma.mainCategory.findFirst({
      where: {
        slug: candidate,
        ...(excludeId ? { NOT: { id: excludeId } } : {}),
      },
    });

    if (!existing) {
      return candidate;
    }

    candidate = `${baseSlug}-${suffix++}`;
  }
}

async function getUniqueSubCategorySlug(name: string, excludeId?: string) {
  const baseSlug = slugify(name);
  let candidate = baseSlug;
  let suffix = 2;

  while (true) {
    const existing = await prisma.subCategory.findFirst({
      where: {
        slug: candidate,
        ...(excludeId ? { NOT: { id: excludeId } } : {}),
      },
    });

    if (!existing) {
      return candidate;
    }

    candidate = `${baseSlug}-${suffix++}`;
  }
}

function revalidatePortfolioRoutes() {
  revalidatePath("/admin");
  revalidatePath("/admin/main-categories");
  revalidatePath("/admin/sub-categories");
  revalidatePath("/admin/portfolios");
  revalidatePath("/");
}

export async function createMainCategory(formData: FormData) {
  try {
    await assertAdminAction();

    const parsed = parseWithSchema(mainCategorySchema, {
      name: getFormValue(formData, "name"),
    });

    if (!parsed.success) {
      return errorResult(parsed.error);
    }

    const slug = await getUniqueMainCategorySlug(parsed.data.name);

    await prisma.mainCategory.create({
      data: {
        name: parsed.data.name,
        slug,
      },
    });

    revalidatePortfolioRoutes();
    return successResult("Main category created.");
  } catch (error) {
    return toActionError(error, "Failed to create the main category.");
  }
}

export async function updateMainCategory(id: string, formData: FormData) {
  try {
    await assertAdminAction();

    const parsed = parseWithSchema(mainCategorySchema, {
      name: getFormValue(formData, "name"),
    });

    if (!parsed.success) {
      return errorResult(parsed.error);
    }

    const slug = await getUniqueMainCategorySlug(parsed.data.name, id);

    await prisma.mainCategory.update({
      where: { id },
      data: {
        name: parsed.data.name,
        slug,
      },
    });

    revalidatePortfolioRoutes();
    return successResult("Main category updated.");
  } catch (error) {
    return toActionError(error, "Failed to update the main category.");
  }
}

export async function deleteMainCategory(id: string) {
  try {
    await assertAdminAction();

    await prisma.mainCategory.delete({ where: { id } });
    revalidatePortfolioRoutes();
    return successResult("Main category deleted.");
  } catch (error) {
    return toActionError(error, "Failed to delete the main category.");
  }
}

export async function createSubCategory(formData: FormData) {
  try {
    await assertAdminAction();

    const parsed = parseWithSchema(subCategorySchema, {
      name: getFormValue(formData, "name"),
      mainCategoryId: getFormValue(formData, "mainCategoryId"),
    });

    if (!parsed.success) {
      return errorResult(parsed.error);
    }

    const slug = await getUniqueSubCategorySlug(parsed.data.name);

    await prisma.subCategory.create({
      data: {
        name: parsed.data.name,
        slug,
        mainCategoryId: parsed.data.mainCategoryId,
      },
    });

    revalidatePortfolioRoutes();
    return successResult("Sub category created.");
  } catch (error) {
    return toActionError(error, "Failed to create the sub category.");
  }
}

export async function updateSubCategory(id: string, formData: FormData) {
  try {
    await assertAdminAction();

    const parsed = parseWithSchema(subCategorySchema, {
      name: getFormValue(formData, "name"),
      mainCategoryId: getFormValue(formData, "mainCategoryId"),
    });

    if (!parsed.success) {
      return errorResult(parsed.error);
    }

    const slug = await getUniqueSubCategorySlug(parsed.data.name, id);

    await prisma.subCategory.update({
      where: { id },
      data: {
        name: parsed.data.name,
        slug,
        mainCategoryId: parsed.data.mainCategoryId,
      },
    });

    revalidatePortfolioRoutes();
    return successResult("Sub category updated.");
  } catch (error) {
    return toActionError(error, "Failed to update the sub category.");
  }
}

export async function deleteSubCategory(id: string) {
  try {
    await assertAdminAction();

    await prisma.subCategory.delete({ where: { id } });
    revalidatePortfolioRoutes();
    return successResult("Sub category deleted.");
  } catch (error) {
    return toActionError(error, "Failed to delete the sub category.");
  }
}

function parsePortfolioFormData(formData: FormData) {
  const mediaType = getFormValue(formData, "mediaType");

  return parseWithSchema(portfolioItemSchema, {
    title: getFormValue(formData, "title"),
    thumbnailLabel: getFormValue(formData, "thumbnailLabel"),
    thumbnailUrl: getFormValue(formData, "thumbnailUrl"),
    mediaType,
    youtubeUrl: mediaType === "image" ? null : getFormValue(formData, "youtubeUrl"),
    gradient: getFormValue(formData, "gradient"),
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
        gradient: parsed.data.gradient ?? null,
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
        gradient: parsed.data.gradient ?? null,
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
