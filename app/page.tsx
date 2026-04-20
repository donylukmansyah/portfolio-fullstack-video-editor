import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import BackgroundDecorations from "@/components/layout/BackgroundDecorations";
import ProfileSection from "@/components/portfolio/ProfileSection";
import PortfolioSection from "@/components/portfolio/PortfolioSection";

export default function Home() {
  return (
    <div className="relative flex min-h-screen flex-col">
      <BackgroundDecorations />
      <Navbar />
      <main className="relative z-10 flex-1">
        <div className="mx-auto flex w-full max-w-[860px] flex-1 flex-col px-4 py-6 sm:px-6">
          <ProfileSection />
          <PortfolioSection />
        </div>
      </main>
      <Footer />
    </div>
  );
}
