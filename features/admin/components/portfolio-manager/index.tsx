import { getPortfolioManagerData } from "@/features/admin/server/queries";
import { MainCategoriesSection } from "@/features/admin/components/portfolio-manager/main-categories-section";
import { PortfolioItemsSection } from "@/features/admin/components/portfolio-manager/portfolio-items-section";
import {
  AdminStatStrip,
} from "@/features/admin/components/portfolio-manager/primitives";
import { SubCategoriesSection } from "@/features/admin/components/portfolio-manager/sub-categories-section";

export async function PortfolioManager() {
  const {
    adminEmail,
    mainCategoryOptions,
    mainCategoryRows,
    portfolioRows,
    stats,
    subCategoryOptions,
    subCategoryRows,
  } = await getPortfolioManagerData();

  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col gap-4 xl:flex-row xl:items-end xl:justify-between">
        <div>
          <p className="text-xs font-heading uppercase tracking-wide text-foreground/60">Portfolio</p>
          <h1 className="mt-2 text-3xl font-heading text-foreground">Portfolio Manager</h1>
          <p className="mt-2 max-w-2xl text-sm text-foreground/75">
            Everything for your portfolio lives here: top-level filters, sub-filters, and portfolio cards.
            Public UI stays the same, you only manage the content.
          </p>
          <p className="mt-2 text-xs font-heading text-foreground/60">
            Logged in as {adminEmail}
          </p>
        </div>

        <AdminStatStrip stats={stats} />
      </div>

      <div className="grid gap-6 xl:grid-cols-[0.9fr_1.1fr]">
        <MainCategoriesSection rows={mainCategoryRows} />
        <SubCategoriesSection rows={subCategoryRows} mainCategories={mainCategoryOptions} />
      </div>

      <PortfolioItemsSection rows={portfolioRows} subCategories={subCategoryOptions} />
    </div>
  );
}
