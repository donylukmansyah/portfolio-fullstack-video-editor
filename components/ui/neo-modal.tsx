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
}: NeoModalProps) {
  const [shouldRender, setShouldRender] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const prevIsOpen = useRef(false);

  useEffect(() => {
    if (isOpen && !prevIsOpen.current) {
      setShouldRender(true);
      setIsClosing(false);
      document.body.style.overflow = "hidden";
    } else if (!isOpen && prevIsOpen.current) {
      setIsClosing(true);
    }
    prevIsOpen.current = isOpen;
  }, [isOpen]);

  // Clean up on unmount
  useEffect(() => {
    return () => {
      document.body.style.overflow = "unset";
    };
  }, []);

  // Escape key
  useEffect(() => {
    if (!shouldRender) return;
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, [shouldRender, onClose]);

  const handleAnimationEnd = useCallback(() => {
    if (isClosing) {
      setShouldRender(false);
      setIsClosing(false);
      document.body.style.overflow = "unset";
    }
  }, [isClosing]);

  if (!shouldRender || typeof document === "undefined") return null;

  return createPortal(
    <div className="fixed inset-0 z-999 flex items-center justify-center p-4" id="neo-modal-portal">
      {/* Backdrop */}
      <div
        className={`absolute inset-0 bg-black/40 backdrop-blur-sm cursor-pointer ${
          isClosing
            ? "animate-out fade-out duration-200"
            : "animate-in fade-in duration-200"
        }`}
        style={{ animationFillMode: "forwards" }}
        onClick={onClose}
      />

      {/* Modal Box */}
      <div
        onAnimationEnd={handleAnimationEnd}
        className={`relative w-full ${className} max-h-[90vh] overflow-y-auto rounded-base border-[3px] border-border bg-secondary-background shadow-[4px_4px_0px_0px_var(--border)] flex flex-col p-6 sm:p-8 ${
          isClosing
            ? "animate-out zoom-out-95 fade-out duration-200"
            : "animate-in zoom-in-95 fade-in duration-200"
        }`}
        style={{ animationFillMode: "forwards" }}
      >
        <button
          onClick={onClose}
          className="absolute top-3 right-3 flex h-8 w-8 items-center justify-center rounded-base border-2 border-border bg-secondary-background text-foreground shadow-[2px_2px_0px_0px_var(--border)] transition-all hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none hover:bg-main hover:text-main-foreground z-20"
          aria-label="Close modal"
        >
          <X size={18} strokeWidth={2.5} />
        </button>

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
