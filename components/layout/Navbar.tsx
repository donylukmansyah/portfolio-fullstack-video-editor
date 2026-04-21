"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import { ExternalLink, Search, Home, FileText, Mail } from "lucide-react";
import { profileData } from "@/data/PortfolioData";
import { useModal } from "@/hooks/useModal";
import { useScrolledPast } from "@/hooks/useScrollPosition";
import ShareModal from "@/components/portfolio/ShareModal";
import type { PortfolioCommandItem } from "@/types/Portfolio";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command";

export default function Navbar({
  portfolioCommandItems = [],
}: {
  portfolioCommandItems?: PortfolioCommandItem[];
}) {
  const router = useRouter();
  const pathname = usePathname();
  const shareModal = useModal();
  const scrolled = useScrolledPast(50);
  const [shareUrl, setShareUrl] = useState(profileData.websiteUrl);
  const [commandOpen, setCommandOpen] = useState(false);
  const [activeCommand, setActiveCommand] = useState("home");

  // Set actual URL after hydration
  useEffect(() => {
    // eslint-disable-next-line
    setShareUrl(window.location.origin);
  }, []);

  // Open dialog and initialize active command based on current route
  const handleOpenChange = useCallback((open: boolean) => {
    if (open) {
      if (pathname === '/resume') setActiveCommand('resume');
      else if (pathname === '/contact') setActiveCommand('contact');
      else setActiveCommand('home');
    }
    setCommandOpen(open);
  }, [pathname]);

  // ── Keyboard shortcut: ⌘K / Ctrl+K ──
  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setCommandOpen((open) => {
          const nextOpen = !open;
          if (nextOpen) {
            handleOpenChange(true);
          }
          return nextOpen;
        });
      }
    };
    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, [handleOpenChange]);

  // ── Navigate from command palette ──
  const handleNavigate = useCallback(
    (href: string) => {
      setCommandOpen(false);
      router.push(href);
    },
    [router]
  );

  return (
    <>
      {/* ── Mobile-only: floating buttons (visible before scroll) ── */}
      <div
        className={`fixed top-4 right-4 z-50 sm:hidden flex items-center gap-2 transition-all duration-300 ease-out ${
          scrolled
            ? "opacity-0 -translate-y-4 pointer-events-none"
            : "opacity-100 translate-y-0"
        }`}
      >
        <button
          type="button"
          onClick={() => handleOpenChange(true)}
          className="inline-flex h-10 w-10 items-center justify-center rounded-base border-2 border-border bg-secondary-background text-foreground shadow-shadow transition-all hover:translate-x-boxShadowX hover:translate-y-boxShadowY hover:shadow-none hover:bg-main hover:text-main-foreground"
          title="Search (Ctrl+K)"
          aria-label="Open search"
          id="mobile-search-button"
        >
          <Search size={18} />
        </button>
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
          <Link href="/" className="flex min-w-0 items-center gap-3 transition-opacity hover:opacity-80">
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
          </Link>

          <div className="flex items-center gap-2 text-foreground">
            {/* Search button - Desktop: with label + ⌘K, Mobile: icon only */}
            <button
              type="button"
              onClick={() => handleOpenChange(true)}
              className="hidden sm:inline-flex items-center gap-2 h-8 rounded-base border-2 border-border bg-secondary-background pl-3 pr-2 text-sm font-base text-foreground shadow-[2px_2px_0px_0px_var(--border)] transition-all hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none hover:bg-main hover:text-main-foreground"
              title="Search (Ctrl+K)"
              aria-label="Open search"
              id="desktop-search-button"
            >
              <Search size={14} />
              <span className="text-xs opacity-70">Search</span>
              <kbd className="pointer-events-none ml-1 inline-flex h-5 items-center gap-0.5 rounded-[3px] border-2 border-border bg-main px-1 font-mono text-[10px] font-heading text-main-foreground select-none">
                <span className="text-xs">⌘</span>K
              </kbd>
            </button>

            {/* Search button - Mobile (in navbar) */}
            <button
              type="button"
              onClick={() => handleOpenChange(true)}
              className="sm:hidden inline-flex h-8 w-8 items-center justify-center rounded-base border-2 border-border bg-secondary-background text-foreground shadow-[2px_2px_0px_0px_var(--border)] transition-all hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none hover:bg-main hover:text-main-foreground"
              title="Search"
              aria-label="Open search"
              id="mobile-navbar-search-button"
            >
              <Search size={14} />
            </button>

            {/* Share button */}
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

      {/* ── Share Modal ── */}
      <ShareModal
        isOpen={shareModal.isOpen}
        onClose={shareModal.close}
        url={shareUrl}
        title={`${profileData.name} — Video Editor & Motion Design`}
      />

      {/* ── Command Palette (Search) ── */}
      <CommandDialog 
        open={commandOpen} 
        onOpenChange={handleOpenChange}
        commandProps={{ value: activeCommand, onValueChange: setActiveCommand }}
      >
        <CommandInput placeholder="Search pages, portfolio..." />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>

          <CommandGroup heading="Navigation">
            <CommandItem value="home" onSelect={() => handleNavigate("/")} className="cursor-pointer">
              <Home />
              <span>Home</span>
            </CommandItem>
            <CommandItem value="resume" onSelect={() => handleNavigate("/resume")} className="cursor-pointer">
              <FileText />
              <span>Resume</span>
            </CommandItem>
            <CommandItem value="contact" onSelect={() => handleNavigate("/contact")} className="cursor-pointer">
              <Mail />
              <span>Contact</span>
            </CommandItem>
          </CommandGroup>

          <CommandSeparator />

          <CommandGroup heading="Portfolio">
            {portfolioCommandItems.map((item) => (
              <CommandItem
                key={item.id}
                onSelect={() => {
                  setCommandOpen(false);
                  // Navigate home first if not on home, then scroll
                  if (window.location.pathname !== "/") {
                    router.push("/");
                    // Give time for page to load then scroll
                    setTimeout(() => {
                      const el = document.getElementById(`portfolio-item-${item.id}`);
                      if (el) {
                        el.scrollIntoView({ behavior: "smooth", block: "center" });
                        el.classList.add("ring-2", "ring-main", "ring-offset-2");
                        setTimeout(() => {
                          el.classList.remove("ring-2", "ring-main", "ring-offset-2");
                        }, 2000);
                      }
                    }, 500);
                  } else {
                    const el = document.getElementById(`portfolio-item-${item.id}`);
                    if (el) {
                      el.scrollIntoView({ behavior: "smooth", block: "center" });
                      el.classList.add("ring-2", "ring-main", "ring-offset-2");
                      setTimeout(() => {
                        el.classList.remove("ring-2", "ring-main", "ring-offset-2");
                      }, 2000);
                    }
                  }
                }}
                className="cursor-pointer"
              >
                <span className="truncate">{item.title}</span>
                <span className="ml-auto text-xs opacity-60">{item.subCategory}</span>
              </CommandItem>
            ))}
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </>
  );
}
