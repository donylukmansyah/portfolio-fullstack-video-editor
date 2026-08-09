import PublicShell from "@/components/layout/PublicShell";
import { getPortfolioCommandItems } from "@/features/portfolio/server/catalog";

export default async function RootGroupLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const portfolioCommandItems = await getPortfolioCommandItems();

  return (
    <PublicShell portfolioCommandItems={portfolioCommandItems}>
      {children}
    </PublicShell>
  );
}
