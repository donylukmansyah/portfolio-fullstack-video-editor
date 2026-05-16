import "server-only";

import { revalidatePath, revalidateTag } from "next/cache";

import { PORTFOLIO_CACHE_TAG } from "@/lib/cache";

const revalidatePaths = [
  "/",
  "/admin",
  "/admin/main-categories",
  "/admin/sub-categories",
  "/admin/portfolios",
] as const;

export function revalidatePortfolioRoutes() {
  revalidatePaths.forEach((path) => revalidatePath(path));
  revalidateTag(PORTFOLIO_CACHE_TAG, { expire: 0 });
}
