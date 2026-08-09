"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { X } from "lucide-react";

interface NeoModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
  className?: string;
  topRightAction?: React.ReactNode;
}

/**
 * Neobrutalism-styled modal with smooth open/close animations.
 *
 * Uses onAnimationEnd + animationFillMode: forwards to prevent blink on close.
 * Consumer components are responsible for keeping their children alive during
 * close (i.e. don't null-out the data that drives content until modal unmounts).
 */
export function NeoModal({
  isOpen,
  onClose,
  title,
  children,
  className = "max-w-md",
  topRightAction,
}: NeoModalProps) {
  const [shouldRender, setShouldRender] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const prevIsOpen = useRef(false);
  const panelRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const previouslyFocused = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (isOpen && !prevIsOpen.current) {
      setShouldRender(true);
      setIsClosing(false);
      document.body.style.overflow = "hidden";
      previouslyFocused.current = document.activeElement as HTMLElement | null;
    } else if (!isOpen && prevIsOpen.current) {
      setIsClosing(true);
    }
    prevIsOpen.current = isOpen;
  }, [isOpen]);

  // Grab focus on open so keyboard users land inside the dialog.
  useEffect(() => {
    if (shouldRender && !isClosing) {
      closeButtonRef.current?.focus();
    }
  }, [shouldRender, isClosing]);

  // Clean up on unmount
  useEffect(() => {
    return () => {
      document.body.style.overflow = "unset";
    };
  }, []);

  // Escape key + focus trap
  useEffect(() => {
    if (!shouldRender) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
        return;
      }
      if (e.key !== "Tab") return;
      const panel = panelRef.current;
      if (!panel) return;
      const focusables = panel.querySelectorAll<HTMLElement>(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );
      if (focusables.length === 0) return;
      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [shouldRender, onClose]);

  const handleAnimationEnd = useCallback(() => {
    if (isClosing) {
      setShouldRender(false);
      setIsClosing(false);
      document.body.style.overflow = "unset";
      // Return focus to whatever opened the dialog.
      previouslyFocused.current?.focus();
      previouslyFocused.current = null;
    }
  }, [isClosing]);

  if (!shouldRender || typeof document === "undefined") return null;

  return createPortal(
    <div className="fixed inset-0 z-999 flex items-center justify-center p-4" id="neo-modal-portal">
      {/* Backdrop */}
      <div
        className={`absolute inset-0 bg-overlay cursor-pointer ${
          isClosing
            ? "animate-out fade-out duration-200"
            : "animate-in fade-in duration-200"
        }`}
        style={{ animationFillMode: "forwards" }}
        onClick={onClose}
      />

      {/* Modal Box */}
      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-label={title ?? "Dialog"}
        onAnimationEnd={handleAnimationEnd}
        className={`relative w-full ${className} max-h-[90vh] overflow-y-auto rounded-base border-[3px] border-border bg-secondary-background shadow-[4px_4px_0px_0px_var(--border)] flex flex-col p-6 sm:p-8 ${
          isClosing
            ? "animate-out zoom-out-95 fade-out duration-200"
            : "animate-in zoom-in-95 fade-in duration-200"
        }`}
        style={{ animationFillMode: "forwards" }}
      >
        <div className="absolute top-3 right-3 flex items-center gap-2 z-20">
          {topRightAction}
          <button
            ref={closeButtonRef}
            onClick={onClose}
            className="neo-icon h-8 w-8"
            aria-label="Close modal"
          >
            <X size={18} strokeWidth={2.5} />
          </button>
        </div>

        {title && (
          <h3 className="text-xl sm:text-2xl text-foreground text-center mb-6 px-4 leading-tight">
            {title}
          </h3>
        )}

        <div className="flex flex-col">{children}</div>
      </div>
    </div>,
    document.body
  );
}
