"use client";

import { useSyncExternalStore } from "react";

// Cache the viewport element: the scroll area mounts once at app root and
// never swaps, so one lookup is enough (avoid querySelector per scroll event).
let cachedViewport: HTMLElement | null | undefined;

const getViewport = () => {
  if (typeof document === "undefined") return null;
  if (cachedViewport !== undefined) return cachedViewport;
  cachedViewport =
    document.querySelector<HTMLElement>(
      "#main-scroll-area [data-radix-scroll-area-viewport]"
    ) ?? null;
  return cachedViewport;
};

const subscribe = (callback: () => void) => {
  if (typeof window === "undefined") return () => {};

  const target = getViewport() ?? window;
  // Throttle to one snapshot re-read per animation frame so fast scrolls
  // (wheel/touch) don't trigger layout reads more often than the screen updates.
  let frame = 0;
  const onScroll = () => {
    if (frame) return;
    frame = requestAnimationFrame(() => {
      frame = 0;
      callback();
    });
  };

  target.addEventListener("scroll", onScroll, { passive: true });
  return () => {
    if (frame) cancelAnimationFrame(frame);
    target.removeEventListener("scroll", onScroll);
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