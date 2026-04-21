import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import BackgroundDecorations from "@/components/layout/BackgroundDecorations";

export default function RootGroupLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="relative flex min-h-screen flex-col">
      <BackgroundDecorations />
      <Navbar />
      <main className="relative z-10 flex-1">
        <div className="mx-auto flex w-full max-w-[860px] flex-1 flex-col px-4 py-6 sm:px-6">
          {children}
        </div>
      </main>
      <Footer />
    </div>
  );
}
