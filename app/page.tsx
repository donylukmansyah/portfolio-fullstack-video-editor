import type { Metadata } from "next";

import PublicShell from "@/components/layout/PublicShell";
import ProfileSection from "@/components/portfolio/ProfileSection";
import PortfolioFetcher from "@/components/portfolio/PortfolioFetcher";
import { createPublicPageMetadata } from "@/lib/metadata/public";
import { getPortfolioCommandItems } from "@/lib/portfolio";

type Props = {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export const metadata: Metadata = createPublicPageMetadata({
  path: "/",
});

export default async function Home({ searchParams }: Props) {
  const resolvedParams = await searchParams;
  const categorySlug =
    typeof resolvedParams.category === "string"
      ? resolvedParams.category
      : "all";
  const subCategorySlug =
    typeof resolvedParams.sub === "string" ? resolvedParams.sub : "all";
  const page =
    typeof resolvedParams.page === "string"
      ? parseInt(resolvedParams.page, 10)
      : 1;
  const portfolioCommandItems = await getPortfolioCommandItems();

  return (
    <PublicShell
      portfolioCommandItems={portfolioCommandItems}
      decorationVariant="home"
    >
      <ProfileSection />
      <PortfolioFetcher
        categorySlug={categorySlug}
        subCategorySlug={subCategorySlug}
        page={page}
      />
    </PublicShell>
  );
}
