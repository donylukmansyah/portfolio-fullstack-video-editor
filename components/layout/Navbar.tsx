"use client";

import { useState } from "react";
import Image from "next/image";
import { Copy, ExternalLink, Check } from "lucide-react";
import { profileData } from "@/data/PortfolioData";
import { useClipboard } from "@/hooks/useClipboard";
import { useModal } from "@/hooks/useModal";
import { useScrolledPast } from "@/hooks/useScrollPosition";
import { CopyAlert } from "@/components/ui/CopyAlert";
import ShareModal from "@/components/portfolio/ShareModal";

function getShareUrl() {
  if (typeof window !== "undefined") {
    return window.location.origin;
  }
  return profileData.websiteUrl;
}

export default function Navbar() {
  const { copied, copy } = useClipboard();
  const shareModal = useModal();
  const scrolled = useScrolledPast(50);
  const [showCopyAlert, setShowCopyAlert] = useState(false);

  const handleCopy = async () => {
    const success = await copy(getShareUrl());
    if (success) {
      setShowCopyAlert(true);
      setTimeout(() => setShowCopyAlert(false), 3000);
    }
  };

  return (
    <>
      {/* ── Mobile-only: floating share button (visible before scroll) ── */}
      <div
        className={`fixed top-4 right-4 z-50 sm:hidden transition-all duration-300 ease-out ${
          scrolled
            ? "opacity-0 -translate-y-4 pointer-events-none"
            : "opacity-100 translate-y-0"
        }`}
      >
        <button
          type="button"
          onClick={shareModal.open}
          className="inline-flex h-10 w-10 items-center justify-center rounded-base border-2 border-border bg-secondary-background text-foreground shadow-shadow transition-all hover:translate-x-boxShadowX hover:translate-y-boxShadowY hover:shadow-none hover:bg-main hover:text-main-foreground"
          title="Share profile"
          aria-label="Share profile"
          id="mobile-share-button"
        >
          <ExternalLink size={18} />
        </button>
      </div>

      {/* ── Full navbar ── */}
      <nav
        className={`fixed top-0 left-0 right-0 z-50 w-full px-4 pt-3 sm:px-6 transition-all duration-300 ease-out
          sm:translate-y-0 sm:opacity-100 sm:pointer-events-auto
          ${
            scrolled
              ? "translate-y-0 opacity-100"
              : "-translate-y-full opacity-0 pointer-events-none"
          }`}
      >
        <div className="mx-auto flex max-w-[860px] items-center justify-between gap-3 rounded-base border-2 border-border bg-secondary-background px-4 py-3 shadow-shadow">
          <div className="flex min-w-0 items-center gap-3">
            <div className="relative h-8 w-8 shrink-0 overflow-hidden rounded-base border-2 border-border bg-main">
              <Image
                src={profileData.avatar}
                alt={profileData.name}
                fill
                className="object-cover"
                sizes="32px"
              />
            </div>
            <div className="min-w-0">
              <p className="truncate text-base font-heading text-foreground">
                {profileData.name}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 text-foreground">
            <span suppressHydrationWarning className="hidden max-w-60 truncate text-xs font-base sm:inline-flex">
              {getShareUrl()}
            </span>
            <button
              onClick={handleCopy}
              className="inline-flex h-8 w-8 items-center justify-center rounded-base border-2 border-border bg-secondary-background text-foreground shadow-[2px_2px_0px_0px_var(--border)] transition-all hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none hover:bg-main hover:text-main-foreground"
              title="Copy URL"
              aria-label="Copy website URL"
              id="copy-url-button"
            >
              {copied ? (
                <Check size={14} strokeWidth={3} />
              ) : (
                <Copy size={14} />
              )}
            </button>
            <button
              type="button"
              onClick={shareModal.open}
              className="inline-flex h-8 w-8 items-center justify-center rounded-base border-2 border-border bg-secondary-background text-foreground shadow-[2px_2px_0px_0px_var(--border)] transition-all hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none hover:bg-main hover:text-main-foreground"
              title="Share profile"
              aria-label="Share profile"
              id="navbar-share-button"
            >
              <ExternalLink size={14} />
            </button>
          </div>
        </div>
      </nav>

      <ShareModal
        isOpen={shareModal.isOpen}
        onClose={shareModal.close}
        url={getShareUrl()}
        title={`${profileData.name} — Video Editor & Motion Design`}
      />

      {/* Copy Alert Toast */}
      <CopyAlert show={showCopyAlert} description="Link website berhasil disalin ke clipboard." />
    </>
  );
}
