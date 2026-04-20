"use client";

import Image from "next/image";
import { MapPin } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { profileData } from "@/data/PortfolioData";
import SocialLinks from "@/components/portfolio/SocialLinks";
import RequestUpdateButton from "@/components/portfolio/RequestUpdateButton";

export default function ProfileSection() {
  const [showLocation, setShowLocation] = useState(false);
  const flagRef = useRef<HTMLDivElement>(null);

  // Close tooltip when clicking outside
  useEffect(() => {
    if (!showLocation) return;
    const handleClickOutside = (e: MouseEvent | TouchEvent) => {
      if (flagRef.current && !flagRef.current.contains(e.target as Node)) {
        setShowLocation(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("touchstart", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("touchstart", handleClickOutside);
    };
  }, [showLocation]);

  return (
    <section className="hero-entrance mb-10 pt-28 sm:pt-32" id="top">
      <div className="flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">
        <div className="flex flex-col gap-5 sm:flex-row sm:items-start">
          {/* Avatar */}
          <div className="relative h-[80px] w-[80px] shrink-0 overflow-hidden rounded-base border-2 border-border bg-main shadow-shadow">
            <Image
              src={profileData.avatar}
              alt={profileData.name}
              fill
              className="object-cover"
              sizes="80px"
              priority
            />
          </div>

          <div className="pt-1">
            {/* Subtitle + Flag (mobile: flag replaces location) */}
            <div className="mb-2 flex flex-wrap items-center gap-2">
              <div className="inline-flex items-center rounded-base border-2 border-border bg-main px-2.5 py-1 text-[11px] font-heading uppercase tracking-wider text-main-foreground shadow-[2px_2px_0px_0px_var(--border)]">
                {profileData.subtitle}
              </div>

              {/* Mobile-only: flag button with tooltip */}
              <div className="relative sm:hidden" ref={flagRef}>
                <button
                  type="button"
                  onClick={() => setShowLocation((v) => !v)}
                  className="inline-flex h-[28px] w-[36px] items-center justify-center rounded-base border-2 border-border bg-secondary-background shadow-[2px_2px_0px_0px_var(--border)] transition-all hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none active:translate-x-[2px] active:translate-y-[2px] active:shadow-none overflow-hidden"
                  aria-label="Show location"
                  id="mobile-flag-button"
                >
                  <svg width="22" height="15" viewBox="0 0 22 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect width="22" height="7.5" fill="#FF0000" />
                    <rect y="7.5" width="22" height="7.5" fill="#FFFFFF" />
                    <rect x="0.5" y="0.5" width="21" height="14" rx="1" stroke="#000" strokeWidth="0.5" fill="none" />
                  </svg>
                </button>

                {/* Tooltip */}
                <div
                  className={`absolute left-1/2 -top-10 -translate-x-1/2 whitespace-nowrap rounded-base border-2 border-border bg-foreground px-2.5 py-1 text-[11px] font-heading text-secondary-background shadow-[2px_2px_0px_0px_var(--border)] transition-all duration-200 ${
                    showLocation
                      ? "opacity-100 translate-y-0"
                      : "opacity-0 translate-y-1 pointer-events-none"
                  }`}
                >
                  Indonesia
                  {/* Arrow */}
                  <div className="absolute left-1/2 -bottom-[6px] -translate-x-1/2 h-0 w-0 border-l-[6px] border-r-[6px] border-t-[6px] border-l-transparent border-r-transparent border-t-foreground" />
                </div>
              </div>
            </div>

            {/* Name */}
            <h1 className="text-[2rem] leading-[1.05] font-heading text-foreground sm:text-[2.3rem] md:text-[2.8rem]">
              {profileData.name}
            </h1>

            {/* Location - desktop only */}
            <div className="mt-2 hidden sm:inline-flex items-center gap-1.5 rounded-base border-2 border-border bg-secondary-background px-2.5 py-1 text-sm font-base text-foreground">
              <MapPin size={14} strokeWidth={2.5} />
              <span>{profileData.location}</span>
            </div>

            {/* Social Links */}
            <div className="mt-3 sm:mt-4">
              <SocialLinks links={profileData.socialLinks} />
            </div>

          </div>
        </div>

        <div className="hidden sm:block sm:pt-1">
          <RequestUpdateButton />
        </div>
      </div>

      {/* Bio and mobile button */}
      <div className="mt-5 flex flex-col gap-4 sm:pl-[100px]">
        <div className="neo-panel p-4">
          <p className="max-w-[560px] text-[14px] leading-relaxed text-foreground sm:text-base">
            {profileData.bio}
          </p>
        </div>
        
        {/* Request info - Mobile only (below bio) */}
        <div className="sm:hidden w-full">
          <RequestUpdateButton className="w-full justify-center text-center" />
        </div>
      </div>
    </section>
  );
}
