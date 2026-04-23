import PortfolioSection from "@/components/portfolio/PortfolioSection";
import { getPortfolioPageData } from "@/features/portfolio/server/queries";

type Props = {
  categorySlug: string;
  subCategorySlug: string;
  page: number;
}

export default async function PortfolioFetcher({ categorySlug, subCategorySlug, page }: Props) {
  const data = await getPortfolioPageData({
    categorySlug,
    subCategorySlug,
    page,
  });

  return (
    <PortfolioSection
      items={data.items}
      categories={data.categories}
      activeCategory={categorySlug}
      activeSubCategory={subCategorySlug}
      totalCount={data.totalCount}
      currentPage={data.currentPage}
      totalPages={data.totalPages}
    />
  );
}
