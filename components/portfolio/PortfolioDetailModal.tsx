"use client";

import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import { Play, ChevronLeft, ChevronRight } from "lucide-react";
import { NeoModal } from "@/components/ui/neo-modal";
import { getYouTubeEmbedUrl } from "@/lib/youtube";
import type { PortfolioItem } from "@/types/Portfolio";

interface PortfolioDetailModalProps {
  items: PortfolioItem[];
  selectedIndex: number | null;
  onClose: () => void;
}

export default function PortfolioDetailModal({ items, selectedIndex, onClose }: PortfolioDetailModalProps) {
  const [currentIndex, setCurrentIndex] = useState(selectedIndex ?? 0);
  const [slideDirection, setSlideDirection] = useState<"left" | "right" | null>(null);
  const isModalOpen = selectedIndex !== null;

  const item = items[currentIndex] ?? null;
  const hasPrev = currentIndex > 0;
  const hasNext = currentIndex < items.length - 1;

  const goNext = useCallback(() => {
    if (hasNext) {
      setSlideDirection("right");
      setCurrentIndex((prev) => prev + 1);
    }
  }, [hasNext]);

  const goPrev = useCallback(() => {
    if (hasPrev) {
      setSlideDirection("left");
      setCurrentIndex((prev) => prev - 1);
    }
  }, [hasPrev]);

  useEffect(() => {
    if (!isModalOpen) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") goNext();
      if (e.key === "ArrowLeft") goPrev();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [isModalOpen, goNext, goPrev]);

  return (
    <NeoModal
      isOpen={isModalOpen}
      onClose={onClose}
      title={item?.title}
      className="max-w-4xl"
    >
      {item && (
        <div className="flex flex-col gap-4 w-full">
          {/* Media area */}
          <div
            className="w-full"
            key={currentIndex}
          >
            <div
              className={
                slideDirection === "right"
                  ? "slide-from-right"
                  : slideDirection === "left"
                  ? "slide-from-left"
                  : ""
              }
            >
              <div className="relative w-full aspect-video overflow-hidden rounded-base border-2 border-border bg-white shadow-[4px_4px_0px_0px_var(--border)]">
                {item.mediaType !== "image" && item.youtubeUrl && getYouTubeEmbedUrl(item.youtubeUrl) ? (
                  <iframe
                    src={getYouTubeEmbedUrl(item.youtubeUrl || "")}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="absolute inset-0 h-full w-full"
                  />
                ) : item.thumbnailUrl ? (
                  <Image src={item.thumbnailUrl} alt={item.title} fill className="object-cover" />
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center bg-linear-to-br from-main/30 to-background">
                    <Play className="h-16 w-16 text-main/50" />
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Bottom Row: Badges on left, Arrows on right */}
          <div className="flex items-center justify-between gap-4">
            {/* Badges */}
            <div className="flex flex-wrap gap-2">
              <span className="rounded-base border-2 border-border bg-main px-3 py-1.5 text-xs font-bold text-main-foreground shadow-[2px_2px_0px_0px_var(--border)] whitespace-nowrap">
                {item.category}
              </span>
              <span className="hidden sm:inline-block rounded-base border-2 border-border bg-white px-3 py-1.5 text-xs font-bold text-foreground shadow-[2px_2px_0px_0px_var(--border)] whitespace-nowrap">
                {item.subCategory}
              </span>
            </div>

            {/* Arrow nav — right side */}
            {items.length > 1 && (
              <div className="flex items-center gap-2 shrink-0">
                <button
                  onClick={goPrev}
                  disabled={!hasPrev}
                  className="inline-flex h-10 w-10 items-center justify-center rounded-base border-2 border-border bg-secondary-background text-foreground shadow-[2px_2px_0px_0px_var(--border)] transition-all hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none hover:bg-main hover:text-main-foreground disabled:opacity-30 disabled:pointer-events-none"
                  aria-label="Previous item"
                >
                  <ChevronLeft size={20} strokeWidth={2.5} />
                </button>
                <button
                  onClick={goNext}
                  disabled={!hasNext}
                  className="inline-flex h-10 w-10 items-center justify-center rounded-base border-2 border-border bg-secondary-background text-foreground shadow-[2px_2px_0px_0px_var(--border)] transition-all hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none hover:bg-main hover:text-main-foreground disabled:opacity-30 disabled:pointer-events-none"
                  aria-label="Next item"
                >
                  <ChevronRight size={20} strokeWidth={2.5} />
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </NeoModal>
  );
}
