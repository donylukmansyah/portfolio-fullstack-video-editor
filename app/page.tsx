import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import BackgroundDecorations from "@/components/layout/BackgroundDecorations";
import ProfileSection from "@/components/portfolio/ProfileSection";
import PortfolioFetcher from "@/components/portfolio/PortfolioFetcher";
import { getPortfolioCommandItems } from "@/lib/portfolio";

type Props = {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}

export default async function Home({ searchParams }: Props) {
  const resolvedParams = await searchParams;
  const categorySlug = typeof resolvedParams.category === 'string' ? resolvedParams.category : "all";
  const subCategorySlug = typeof resolvedParams.sub === 'string' ? resolvedParams.sub : "all";
  const page = typeof resolvedParams.page === 'string' ? parseInt(resolvedParams.page, 10) : 1;
  const portfolioCommandItems = await getPortfolioCommandItems();

  return (
    <div className="relative flex min-h-screen flex-col">
      <BackgroundDecorations />
      <Navbar portfolioCommandItems={portfolioCommandItems} />
      <main className="relative z-10 flex-1">
        <div className="mx-auto flex w-full max-w-[860px] flex-1 flex-col px-4 py-6 sm:px-6">
          <ProfileSection />
          <PortfolioFetcher categorySlug={categorySlug} subCategorySlug={subCategorySlug} page={page} />
        </div>
      </main>
      <Footer />
    </div>
  );
}
