"use client";

import { Moon, Sun } from "lucide-react";

import { useTheme } from "@/hooks/useTheme";

type ThemeToggleProps = {
  /** Icon size in pixels */
  size?: number;
  /** Additional CSS class names */
  className?: string;
  /** Visual variant of the button */
  variant?: "default" | "mobile-floating";
};

/**
 * Neobrutalism-styled dark/light mode toggle button.
 *
 * Drop-in anywhere — it reads from the ThemeProvider context.
 * The sun/moon icons crossfade with a subtle rotation animation.
 */
export default function ThemeToggle({ size = 14, className, variant = "default" }: ThemeToggleProps) {
  const { resolvedTheme, mounted, toggleThemeWithTransition } = useTheme();
  const isDark = resolvedTheme === "dark";

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    toggleThemeWithTransition(e.clientX, e.clientY);
  };

  const shadowClasses = variant === "mobile-floating"
    ? "shadow-shadow hover:translate-x-boxShadowX hover:translate-y-boxShadowY hover:shadow-none"
    : "shadow-[2px_2px_0px_0px_var(--border)] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none";

  return (
    <button
      type="button"
      onClick={handleClick}
      className={`inline-flex items-center justify-center rounded-base border-2 border-border bg-secondary-background text-foreground transition-all hover:bg-main hover:text-main-foreground ${shadowClasses} ${className ?? ""}`}
      title={isDark ? "Switch to light mode" : "Switch to dark mode"}
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      id="theme-toggle-button"
    >
      <span className="relative flex items-center justify-center">
        {/* Before mount: render static Moon to match SSR (light default) */}
        {!mounted ? (
          <Moon size={size} className="rotate-0 scale-100 opacity-100" />
        ) : (
          <>
            {/* Sun icon — visible in dark mode (click to go light) */}
            <Sun
              size={size}
              className={`absolute transition-all duration-300 ${
                isDark
                  ? "rotate-0 scale-100 opacity-100"
                  : "rotate-90 scale-0 opacity-0"
              }`}
            />
            {/* Moon icon — visible in light mode (click to go dark) */}
            <Moon
              size={size}
              className={`transition-all duration-300 ${
                isDark
                  ? "-rotate-90 scale-0 opacity-0"
                  : "rotate-0 scale-100 opacity-100"
              }`}
            />
          </>
        )}
      </span>
    </button>
  );
}

