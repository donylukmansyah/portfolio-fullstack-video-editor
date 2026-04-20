import type { Metadata } from "next";
import { Space_Grotesk } from "next/font/google";
import "./globals.css";
import "sweetalert2/dist/sweetalert2.min.css";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-space-grotesk",
});

export const metadata: Metadata = {
  title: "Dony Lukmansyah | Video Editor & Motion Design",
  description:
    "21 year old video editor creating visual stories with passion and purpose. Portfolio showcasing video editing and motion design work.",
  metadataBase: new URL("https://donylukmansyah.vercel.app"),
  openGraph: {
    title: "Dony Lukmansyah | Video Editor & Motion Design",
    description:
      "21 year old video editor creating visual stories with passion and purpose.",
    images: ["/og-image.jpg"],
    url: "https://donylukmansyah.vercel.app",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" className={`${spaceGrotesk.variable} h-full antialiased`}>
      <body
        className={`${spaceGrotesk.className} min-h-full overflow-x-hidden flex flex-col`}
      >
        {children}
      </body>
    </html>
  );
}
