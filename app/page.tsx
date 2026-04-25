import type { Metadata } from "next";
import { Suspense } from "react";

import PublicShell from "@/components/layout/PublicShell";
import ProfileSection from "@/components/portfolio/ProfileSection";
import PortfolioFetcher from "@/components/portfolio/PortfolioFetcher";
import PortfolioSkeleton from "@/components/portfolio/PortfolioSkeleton";
import { createPublicPageMetadata } from "@/lib/metadata/public";
import { getPortfolioCommandItems } from "@/lib/portfolio";
import { getPortfolioPageData } from "@/features/portfolio/server/queries";

type Props = {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export const metadata: Metadata = createPublicPageMetadata({
  path: "/",
});

function getPositivePage(value: string | string[] | undefined) {
  if (typeof value !== "string") {
    return 1;
  }

  const parsed = Number.parseInt(value, 10);
  return Number.isFinite(parsed) && parsed > 0 ? parsed : 1;
}

export default async function Home({ searchParams }: Props) {
  const portfolioCommandItemsPromise = getPortfolioCommandItems();
  const resolvedParams = await searchParams;
  const categorySlug =
    typeof resolvedParams.category === "string"
      ? resolvedParams.category
      : "all";
  const subCategorySlug =
    typeof resolvedParams.sub === "string" ? resolvedParams.sub : "all";
  const page = getPositivePage(resolvedParams.page);
  const portfolioDataPromise = getPortfolioPageData({
    categorySlug,
    subCategorySlug,
    page,
  });
  const portfolioCommandItems = await portfolioCommandItemsPromise;

  return (
    <PublicShell
      portfolioCommandItems={portfolioCommandItems}
      decorationVariant="home"
    >
      <ProfileSection />
      <Suspense fallback={<PortfolioSkeleton />}>
        <PortfolioFetcher
          categorySlug={categorySlug}
          dataPromise={portfolioDataPromise}
          subCategorySlug={subCategorySlug}
          page={page}
        />
      </Suspense>
    </PublicShell>
  );
}
