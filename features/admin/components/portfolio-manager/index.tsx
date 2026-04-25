import { getPortfolioManagerData } from "@/features/admin/server/queries";
import { MainCategoriesSection } from "@/features/admin/components/portfolio-manager/main-categories-section";
import { PortfolioItemsSection } from "@/features/admin/components/portfolio-manager/portfolio-items-section";
import {
  AdminStatStrip,
  PageHeader,
} from "@/features/admin/components/portfolio-manager/primitives";
import { SubCategoriesSection } from "@/features/admin/components/portfolio-manager/sub-categories-section";

export async function PortfolioManager() {
  const {
    mainCategoryOptions,
    mainCategoryRows,
    portfolioRows,
    stats,
    subCategoryOptions,
    subCategoryRows,
  } = await getPortfolioManagerData();

  return (
    <div className="flex flex-col gap-8">
      {/* ─── Page header ─── */}
      <PageHeader
        subtitle="Portfolio"
        title="Portfolio Manager"
        description="Everything for your portfolio lives here: top-level filters, sub-filters, and portfolio cards. Public UI stays the same, you only manage the content."
      >
        <AdminStatStrip stats={stats} />
      </PageHeader>

      {/* ─── Categories grid ─── */}
      <div className="grid gap-6 xl:grid-cols-[0.9fr_1.1fr]">
        <MainCategoriesSection rows={mainCategoryRows} />
        <SubCategoriesSection
          rows={subCategoryRows}
          mainCategories={mainCategoryOptions}
        />
      </div>

      {/* ─── Portfolio items ─── */}
      <PortfolioItemsSection
        rows={portfolioRows}
        subCategories={subCategoryOptions}
      />
    </div>
  );
}
