"use server";

import prisma from "@/lib/prisma";
import { assertAdminAction } from "@/lib/admin";
import { subCategorySchema } from "@/server/validation/portfolio";
import {
  errorResult,
  getFormValue,
  parseWithSchema,
  successResult,
  toActionError,
} from "@/server/admin/action-utils";
import { revalidatePortfolioRoutes } from "@/server/admin/revalidate";

const slugify = (value: string) =>
  value
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

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
