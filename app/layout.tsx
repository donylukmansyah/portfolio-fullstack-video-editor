import type { Metadata } from "next";
import { Space_Grotesk } from "next/font/google";

import { ScrollArea } from "@/components/ui/scroll-area";
import { ThemeProvider } from "@/hooks/useTheme";
import { createPublicRootMetadata } from "@/lib/metadata/public";

import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-space-grotesk",
});

export const metadata: Metadata = createPublicRootMetadata();

/**
 * Inline script that runs before React hydration to apply the saved
 * theme class on <html>, preventing a flash of the wrong theme.
 */
const themeInitScript = `
(function(){
  try {
    var t = localStorage.getItem('theme-preference') || 'system';
    var dark = t === 'dark' || (t === 'system' && matchMedia('(prefers-color-scheme:dark)').matches);
    document.documentElement.classList.toggle('dark', dark);
  } catch(e) {}
})();
`;

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
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
      </head>
      <body
        className={`${spaceGrotesk.className} h-full overflow-hidden flex flex-col`}
        suppressHydrationWarning
      >
        <ThemeProvider>
          <ScrollArea id="main-scroll-area" className="h-full w-full">
            {children}
          </ScrollArea>
        </ThemeProvider>
      </body>
    </html>
  );
}
