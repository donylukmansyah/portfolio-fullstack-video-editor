"use client";

import { useState, useCallback, useRef, useEffect } from "react";

/**
 * Reusable hook for clipboard copy operations.
 * Returns `copied` state (auto-resets) and a `copy` function.
 */
export function useClipboard(resetDelay = 2000) {
  const [copied, setCopied] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const copy = useCallback(
    async (text: string): Promise<boolean> => {
      try {
        await navigator.clipboard.writeText(text);
        setCopied(true);
        if (timeoutRef.current) clearTimeout(timeoutRef.current);
        timeoutRef.current = setTimeout(() => setCopied(false), resetDelay);
        return true;
      } catch (err) {
        console.error("Failed to copy to clipboard:", err);
        return false;
      }
    },
    [resetDelay]
  );

  // Clean up timer on unmount
  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  return { copied, copy } as const;
}
