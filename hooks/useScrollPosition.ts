"use client";

import { useSyncExternalStore } from "react";

const subscribe = (callback: () => void) => {
  window.addEventListener("scroll", callback, { passive: true });
  return () => window.removeEventListener("scroll", callback);
};

/**
 * Returns `true` once the user has scrolled past the given threshold (in px).
 * Uses useSyncExternalStore for tear-free reads, safe for SSR.
 */
export function useScrolledPast(threshold = 50): boolean {
  return useSyncExternalStore(
    subscribe,
    () => window.scrollY > threshold,
    () => false
  );
}
