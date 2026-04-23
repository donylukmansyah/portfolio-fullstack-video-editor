import PublicShell from "@/components/layout/PublicShell";
import { getPortfolioCommandItems } from "@/lib/portfolio";

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
