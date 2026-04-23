"use server";

import prisma from "@/lib/prisma";
import { assertAdminAction } from "@/lib/admin";
import { mainCategorySchema } from "@/server/validation/portfolio";
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
