"use client";

import { useState, useCallback } from "react";

/**
 * Simple hook for managing modal open/close state.
 * Returns `isOpen`, `open`, `close`, and `toggle` functions.
 */
export function useModal(initialState = false) {
  const [isOpen, setIsOpen] = useState(initialState);

  const open = useCallback(() => setIsOpen(true), []);
  const close = useCallback(() => setIsOpen(false), []);
  const toggle = useCallback(() => setIsOpen((prev) => !prev), []);

  return { isOpen, open, close, toggle } as const;
}
