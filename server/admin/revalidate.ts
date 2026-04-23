import "server-only";

import { revalidatePath } from "next/cache";

const revalidatePaths = [
  "/",
  "/admin",
  "/admin/main-categories",
  "/admin/sub-categories",
  "/admin/portfolios",
] as const;

export function revalidatePortfolioRoutes() {
  revalidatePaths.forEach((path) => revalidatePath(path));
}
