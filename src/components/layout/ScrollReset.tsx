"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

/**
 * The app scrolls inside the Radix ScrollArea viewport, not `window`, so
 * browser-native scroll restoration never fires. Reset to top on route change
 * (mirrors default browser behavior for page-to-page navigation).
 */
export function ScrollReset() {
  const pathname = usePathname();

  useEffect(() => {
    const viewport = document.querySelector<HTMLElement>(
      "#main-scroll-area [data-radix-scroll-area-viewport]"
    );
    viewport?.scrollTo(0, 0);
  }, [pathname]);

  return null;
}