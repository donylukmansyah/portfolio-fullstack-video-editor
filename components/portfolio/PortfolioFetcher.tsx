import PortfolioSection from "@/components/portfolio/PortfolioSection";
import { getPortfolioPageData } from "@/features/portfolio/server/queries";

type Props = {
  categorySlug: string;
  dataPromise?: ReturnType<typeof getPortfolioPageData>;
  subCategorySlug: string;
  page: number;
}

export default async function PortfolioFetcher({
  categorySlug,
  dataPromise,
  subCategorySlug,
  page,
}: Props) {
  const data = await (
    dataPromise ??
    getPortfolioPageData({
      categorySlug,
      subCategorySlug,
      page,
    })
  );

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
