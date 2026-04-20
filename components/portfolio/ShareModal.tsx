"use client";

import Image from "next/image";
import { NeoModal } from "@/components/ui/neo-modal";
import { useClipboard } from "@/hooks/useClipboard";

interface ShareModalProps {
  isOpen: boolean;
  onClose: () => void;
  url: string;
  title: string;
}

export default function ShareModal({ isOpen, onClose, url, title }: ShareModalProps) {
  const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(url)}&margin=8`;
  const { copied, copy } = useClipboard(1500);

  return (
    <NeoModal isOpen={isOpen} onClose={onClose} title="Share Profile" className="max-w-[420px]">
      <div className="mx-auto flex w-full max-w-[360px] flex-col items-center gap-5 p-1">
        {/* QR Code */}
        <div className="group cursor-pointer rounded-base border-2 border-border bg-white p-3 shadow-[6px_6px_0px_0px_var(--border)] transition-all hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[8px_8px_0px_0px_var(--border)]">
          <Image src={qrUrl} alt="QR Code" width={160} height={160} className="pointer-events-none block rounded-[4px]" unoptimized />
        </div>

        {/* Divider */}
        <div className="relative my-1 h-[2px] w-full bg-border">
          <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-secondary-background px-3 text-[12px] font-bold text-foreground">
            Bagikan Tautan
          </span>
        </div>

        {/* Share buttons grid */}
        <div className="grid w-full grid-cols-2 gap-3 p-1">
          <a
            href={`https://wa.me/?text=${encodeURIComponent(title + " " + url)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 rounded-base border-2 border-border bg-white p-3 text-[13px] font-bold text-black shadow-[3px_3px_0px_0px_var(--border)] transition-all hover:translate-x-[3px] hover:translate-y-[3px] hover:shadow-none"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/></svg>
            WhatsApp
          </a>
          <a
            href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 rounded-base border-2 border-border bg-white p-3 text-[13px] font-bold text-black shadow-[3px_3px_0px_0px_var(--border)] transition-all hover:translate-x-[3px] hover:translate-y-[3px] hover:shadow-none"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
            Facebook
          </a>
          <a
            href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 rounded-base border-2 border-border bg-white p-3 text-[13px] font-bold text-black shadow-[3px_3px_0px_0px_var(--border)] transition-all hover:translate-x-[3px] hover:translate-y-[3px] hover:shadow-none"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4l11.733 16h4.267l-11.733 -16z"/><path d="M4 20l6.768 -6.768m2.46 -2.46l6.772 -6.772"/></svg>
            X / Twitter
          </a>
          <a
            href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 rounded-base border-2 border-border bg-white p-3 text-[13px] font-bold text-black shadow-[3px_3px_0px_0px_var(--border)] transition-all hover:translate-x-[3px] hover:translate-y-[3px] hover:shadow-none"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/></svg>
            LinkedIn
          </a>
          
          <button
            onClick={() => copy(url)}
            className={`col-span-2 flex cursor-pointer items-center justify-center gap-2 rounded-base border-2 border-border p-3.5 text-[14px] font-bold shadow-[4px_4px_0px_0px_var(--border)] transition-all hover:translate-x-[4px] hover:translate-y-[4px] hover:shadow-none ${
              copied ? "bg-white text-black" : "bg-main text-main-foreground"
            }`}
          >
            {copied ? (
              <>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                Copied!
              </>
            ) : (
              <>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg>
                Copy Short URL
              </>
            )}
          </button>
        </div>
      </div>
    </NeoModal>
  );
}
