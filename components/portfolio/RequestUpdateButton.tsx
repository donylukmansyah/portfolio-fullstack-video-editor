"use client";

import { useState } from "react";
import { profileData } from "@/data/PortfolioData";
import { NeoModal } from "@/components/ui/neo-modal";

interface Props {
  className?: string;
}

export default function RequestUpdateButton({ className }: Props = {}) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        className={`neo-btn text-xs font-heading ${className || ""}`}
        id="request-update-button"
      >
        Request information update
      </button>

      <NeoModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        title="Request information update"
        className="max-w-md"
      >
        <div className="flex flex-col gap-5 text-left">
          <p className="m-0 text-[0.95rem] leading-relaxed font-medium">
            Kalau ada detail portfolio yang perlu diupdate, kamu bisa hubungi Dony lewat social channel di bawah ini.
          </p>
          
          <div className="flex flex-col gap-3">
            {profileData.socialLinks.map((link) => (
              <a
                key={link.name}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className={`flex items-center justify-center gap-2 rounded-base border-2 border-border px-4 py-3.5 text-[0.95rem] font-bold shadow-shadow transition-all hover:translate-x-boxShadowX hover:translate-y-boxShadowY hover:shadow-none ${
                  link.type === "website" ? "bg-white text-foreground" : "bg-main text-black"
                }`}
              >
                {link.name} &rarr;
              </a>
            ))}
          </div>

          <div className="mt-4 flex items-center justify-center gap-3">
            <a
              href={profileData.websiteUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="neo-btn-main !px-5"
            >
              Open website &rarr;
            </a>
            <button
              onClick={() => setIsOpen(false)}
              className="neo-btn"
            >
              Close
            </button>
          </div>
        </div>
      </NeoModal>
    </>
  );
}
