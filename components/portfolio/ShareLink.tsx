"use client";

import { useState, useEffect } from "react";
import { Copy, ExternalLink, Check } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { profileData } from "@/data/PortfolioData";

export default function ShareLink() {
  const [copied, setCopied] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const displayUrl = mounted ? window.location.host : profileData.websiteUrl.replace(/^https?:\/\//, '');
  const fullUrl = mounted ? window.location.href : profileData.websiteUrl;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(fullUrl);
      setCopied(true);
      setShowAlert(true);
      setTimeout(() => setCopied(false), 2000);
      setTimeout(() => setShowAlert(false), 3000);
    } catch (err) {
      console.error("Failed to copy link", err);
    }
  };

  return (
    <>
      <div className="flex items-center gap-3">
        <span className="font-heading text-sm text-foreground truncate max-w-[200px]">
          {displayUrl}
        </span>
        <button
          onClick={handleCopy}
          className="flex h-9 w-9 items-center justify-center rounded-base border-2 border-border bg-main text-main-foreground shadow-[2px_2px_0px_0px_var(--border)] transition-all hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none"
          aria-label="Copy link"
        >
          {copied ? <Check size={16} strokeWidth={2.5} /> : <Copy size={16} strokeWidth={2.5} />}
        </button>
        <a
          href={fullUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex h-9 w-9 items-center justify-center rounded-base border-2 border-border bg-secondary-background text-foreground shadow-[2px_2px_0px_0px_var(--border)] transition-all hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none"
          aria-label="Open link"
        >
          <ExternalLink size={16} strokeWidth={2.5} />
        </a>
      </div>

      {showAlert && (
        <div className="fixed bottom-6 right-6 z-50 w-80 animate-in slide-in-from-bottom-10 fade-in duration-300 sm:bottom-10 sm:right-10">
          <Alert className="bg-main text-main-foreground shadow-[4px_4px_0px_0px_var(--border)]">
            <Check className="h-4 w-4 bg-white/20 rounded-full p-0.5" />
            <AlertTitle>Berhasil disalin!</AlertTitle>
            <AlertDescription>Link portfolio berhasil disalin ke clipboard.</AlertDescription>
          </Alert>
        </div>
      )}
    </>
  );
}
