import type { Metadata } from "next";
import { Space_Grotesk } from "next/font/google";

import { ScrollArea } from "@/components/ui/scroll-area";
import { createPublicRootMetadata } from "@/lib/metadata/public";

import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-space-grotesk",
});

export const metadata: Metadata = createPublicRootMetadata();

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="id"
      className={`${spaceGrotesk.variable} h-full antialiased`}
      data-scroll-behavior="smooth"
      suppressHydrationWarning
    >
      <body
        className={`${spaceGrotesk.className} h-full overflow-hidden flex flex-col`}
        suppressHydrationWarning
      >
        <ScrollArea id="main-scroll-area" className="h-full w-full">
          {children}
        </ScrollArea>
      </body>
    </html>
  );
}
