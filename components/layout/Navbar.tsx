"use client";

import Image from "next/image";
import { Copy, ExternalLink, Check, Share2 } from "lucide-react";
import { useState, useEffect, useCallback } from "react";
import Swal from "sweetalert2";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { profileData } from "@/data/PortfolioData";

function getShareUrl() {
  if (typeof window !== "undefined") {
    return window.location.origin;
  }
  return profileData.websiteUrl;
}

function openSharePopup() {
  const url = getShareUrl();
  const title = `${profileData.name} — Video Editor & Motion Design`;
  const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(url)}&margin=8`;

  Swal.fire({
    title: "Share Profile",
    html: `
      <div style="display:flex;flex-direction:column;align-items:center;gap:20px;padding:4px;">
        
        <!-- QR Code -->
        <div style="border:2px solid #000;border-radius:8px;padding:12px;background:#fff;box-shadow:6px 6px 0px 0px #000;transition:transform 0.2s ease;cursor:pointer;" 
             onmouseover="this.style.transform='translate(-2px,-2px) scale(1.02)';this.style.boxShadow='8px 8px 0px 0px #000';" 
             onmouseout="this.style.transform='translate(0,0) scale(1)';this.style.boxShadow='6px 6px 0px 0px #000';">
          <img src="${qrUrl}" alt="QR Code" width="160" height="160" style="display:block;border-radius:4px;" />
        </div>

        <div style="width:100%;height:2px;background:#000;margin:4px 0;position:relative;">
          <span style="position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);background:#fff;padding:0 12px;font-size:12px;font-weight:700;color:#000;">Bagikan Tautan</span>
        </div>

        <!-- Share buttons grid -->
        <div style="display:grid;grid-template-columns:repeat(2,1fr);gap:12px;width:100%;padding:4px 4px 6px 4px;">
          <a href="https://wa.me/?text=${encodeURIComponent(title + " " + url)}" target="_blank" rel="noopener noreferrer"
            style="display:flex;align-items:center;justify-content:center;gap:8px;padding:12px;border:2px solid #000;border-radius:8px;background:#fff;text-decoration:none;color:#000;font-size:13px;font-weight:700;box-shadow:3px 3px 0px 0px #000;transition:all 0.15s ease;"
            onmouseover="this.style.transform='translate(3px,3px)';this.style.boxShadow='none';"
            onmouseout="this.style.transform='translate(0,0)';this.style.boxShadow='3px 3px 0px 0px #000';">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/></svg>
            WhatsApp
          </a>
          <a href="https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}" target="_blank" rel="noopener noreferrer"
            style="display:flex;align-items:center;justify-content:center;gap:8px;padding:12px;border:2px solid #000;border-radius:8px;background:#fff;text-decoration:none;color:#000;font-size:13px;font-weight:700;box-shadow:3px 3px 0px 0px #000;transition:all 0.15s ease;"
            onmouseover="this.style.transform='translate(3px,3px)';this.style.boxShadow='none';"
            onmouseout="this.style.transform='translate(0,0)';this.style.boxShadow='3px 3px 0px 0px #000';">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
            Facebook
          </a>
          <a href="https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}" target="_blank" rel="noopener noreferrer"
            style="display:flex;align-items:center;justify-content:center;gap:8px;padding:12px;border:2px solid #000;border-radius:8px;background:#fff;text-decoration:none;color:#000;font-size:13px;font-weight:700;box-shadow:3px 3px 0px 0px #000;transition:all 0.15s ease;"
            onmouseover="this.style.transform='translate(3px,3px)';this.style.boxShadow='none';"
            onmouseout="this.style.transform='translate(0,0)';this.style.boxShadow='3px 3px 0px 0px #000';">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 4l11.733 16h4.267l-11.733 -16z"/><path d="M4 20l6.768 -6.768m2.46 -2.46l6.772 -6.772"/></svg>
            X / Twitter
          </a>
          <a href="https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}" target="_blank" rel="noopener noreferrer"
            style="display:flex;align-items:center;justify-content:center;gap:8px;padding:12px;border:2px solid #000;border-radius:8px;background:#fff;text-decoration:none;color:#000;font-size:13px;font-weight:700;box-shadow:3px 3px 0px 0px #000;transition:all 0.15s ease;"
            onmouseover="this.style.transform='translate(3px,3px)';this.style.boxShadow='none';"
            onmouseout="this.style.transform='translate(0,0)';this.style.boxShadow='3px 3px 0px 0px #000';">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/></svg>
            LinkedIn
          </a>
          
          <button onclick="navigator.clipboard.writeText('${url}').then(()=>{
            const origHTML = this.innerHTML;
            const origBg = this.style.background;
            const origColor = this.style.color;
            this.innerHTML='<svg width=\\'20\\' height=\\'20\\' viewBox=\\'0 0 24 24\\' fill=\\'none\\' stroke=\\'currentColor\\' stroke-width=\\'3\\' stroke-linecap=\\'round\\' stroke-linejoin=\\'round\\'><polyline points=\\'20 6 9 17 4 12\\'/></svg>Copied!';
            this.style.background='#fff';
            this.style.color='#000';
            setTimeout(()=>{
              this.innerHTML=origHTML;
              this.style.background=origBg;
              this.style.color=origColor;
            },1500)})"
            style="grid-column: span 2; display:flex;align-items:center;justify-content:center;gap:8px;padding:14px;border:2px solid #000;border-radius:8px;background:var(--main);text-decoration:none;color:var(--main-foreground);font-size:14px;font-weight:800;box-shadow:4px 4px 0px 0px #000;transition:all 0.15s ease;cursor:pointer;"
            onmouseover="this.style.transform='translate(4px,4px)';this.style.boxShadow='none';"
            onmouseout="this.style.transform='translate(0,0)';this.style.boxShadow='4px 4px 0px 0px #000';">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg>
            Copy Short URL
          </button>
        </div>
      </div>
    `,
    showCloseButton: true,
    showConfirmButton: false,
    buttonsStyling: false,
    scrollbarPadding: false,
    customClass: {
      popup: "neo-swal-popup !border-[3px]",
      htmlContainer: "!overflow-visible",
    },
  });
}

export default function Navbar() {
  const [copied, setCopied] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [shareUrl, setShareUrl] = useState(profileData.websiteUrl);

  const handleScroll = useCallback(() => {
    setScrolled(window.scrollY > 50);
  }, []);

  useEffect(() => {
    setShareUrl(window.location.origin);
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(getShareUrl());
      setCopied(true);
      setShowAlert(true);
      setTimeout(() => setCopied(false), 2000);
      setTimeout(() => setShowAlert(false), 3000);
    } catch {
      console.error("Failed to copy URL");
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
          onClick={openSharePopup}
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
            <span className="hidden max-w-60 truncate text-xs font-base sm:inline-flex">
              {shareUrl}
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
              onClick={openSharePopup}
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

      {/* Copy Alert Popup */}
      {showAlert && (
        <div className="fixed bottom-6 right-6 z-100 w-80 animate-in slide-in-from-bottom-10 fade-in duration-300 sm:bottom-10 sm:right-10">
          <Alert className="bg-main text-main-foreground shadow-[4px_4px_0px_0px_var(--border)]">
            <Check className="mb-[-2px] h-4 w-4 bg-white/20 rounded-full p-0.5" />
            <AlertTitle>Berhasil disalin!</AlertTitle>
            <AlertDescription>Link website berhasil disalin ke clipboard.</AlertDescription>
          </Alert>
        </div>
      )}
    </>
  );
}
