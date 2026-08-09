"use client";

import { useState, useSyncExternalStore } from "react";
import { Copy, ExternalLink, Check } from "lucide-react";
import { profileData } from "@/features/portfolio/data";
import { useClipboard } from "@/shared/hooks/useClipboard";
import { CopyAlert } from "@/components/ui/CopyAlert";

const emptySubscribe = () => () => {};

export default function ShareLink() {
  const { copied, copy } = useClipboard();
  const [showAlert, setShowAlert] = useState(false);
  
  const mounted = useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false
  );

  const displayUrl = mounted ? window.location.host : profileData.websiteUrl.replace(/^https?:\/\//, '');
  const fullUrl = mounted ? window.location.href : profileData.websiteUrl;

  const handleCopy = async () => {
    const success = await copy(fullUrl);
    if (success) {
      setShowAlert(true);
      setTimeout(() => setShowAlert(false), 3000);
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
          className="neo-icon-main size-9 cursor-pointer"
          aria-label="Copy link"
        >
          {copied ? <Check size={16} strokeWidth={2.5} /> : <Copy size={16} strokeWidth={2.5} />}
        </button>
        <a
          href={fullUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="neo-icon size-9"
          aria-label="Open link"
        >
          <ExternalLink size={16} strokeWidth={2.5} />
        </a>
      </div>

      <CopyAlert show={showAlert} description="Link portfolio berhasil disalin ke clipboard." />
    </>
  );
}
