"use client";

import { useSyncExternalStore } from "react";

const getViewport = () => {
  if (typeof document === "undefined") return null;
  return document.querySelector("#main-scroll-area [data-radix-scroll-area-viewport]");
};

const subscribe = (callback: () => void) => {
  if (typeof window === "undefined") return () => {};
  
  const viewport = getViewport();
  const target = viewport || window;
  
  target.addEventListener("scroll", callback, { passive: true });
  return () => {
    target.removeEventListener("scroll", callback);
  };
};

/**
 * Returns `true` once the user has scrolled past the given threshold (in px).
 * Uses useSyncExternalStore for tear-free reads, safe for SSR.
 */
export function useScrolledPast(threshold = 50): boolean {
  return useSyncExternalStore(
    subscribe,
    () => {
      const viewport = getViewport();
      if (viewport) {
        return viewport.scrollTop > threshold;
      }
      return typeof window !== "undefined" ? window.scrollY > threshold : false;
    },
    () => false
  );
}
