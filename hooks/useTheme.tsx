"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

type Theme = "light" | "dark" | "system";
type ResolvedTheme = "light" | "dark";

type ThemeContextValue = {
  /** Current theme preference (light | dark | system) */
  theme: Theme;
  /** The actual applied theme after resolving "system" */
  resolvedTheme: ResolvedTheme;
  /** Whether the provider has mounted and synced with localStorage */
  mounted: boolean;
  /** Set the theme preference */
  setTheme: (theme: Theme) => void;
  /** Convenience: toggle between light ↔ dark (ignores system) */
  toggleTheme: () => void;
  /**
   * Toggle with a circle-reveal transition originating from the given
   * screen coordinates (typically the click position of the toggle button).
   *
   * Uses the View Transitions API where supported; falls back to an
   * instant toggle otherwise.
   */
  toggleThemeWithTransition: (x: number, y: number) => void;
};

const STORAGE_KEY = "theme-preference";

const ThemeContext = createContext<ThemeContextValue | null>(null);

function getSystemTheme(): ResolvedTheme {
  if (typeof window === "undefined") return "light";
  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
}

function resolveTheme(theme: Theme): ResolvedTheme {
  return theme === "system" ? getSystemTheme() : theme;
}

function applyTheme(resolved: ResolvedTheme) {
  const root = document.documentElement;
  root.classList.toggle("dark", resolved === "dark");
}

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  // Always start with "light" to match server HTML (the inline script in
  // layout.tsx already applies the correct class before paint, so there's
  // no visible flash). After mount we sync from localStorage.
  const [theme, setThemeState] = useState<Theme>("light");
  const [mounted, setMounted] = useState(false);

  // Sync from localStorage after mount (runs once)
  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY) as Theme | null;
    setThemeState(stored ?? "system");
    setMounted(true);
  }, []);

  const resolvedTheme = resolveTheme(theme);

  // Apply class on theme changes (after mount)
  useEffect(() => {
    if (!mounted) return;
    applyTheme(resolvedTheme);
  }, [resolvedTheme, mounted]);

  // Listen for system preference changes when in "system" mode
  useEffect(() => {
    if (theme !== "system") return;

    const mql = window.matchMedia("(prefers-color-scheme: dark)");
    const handler = () => applyTheme(getSystemTheme());
    mql.addEventListener("change", handler);
    return () => mql.removeEventListener("change", handler);
  }, [theme]);

  const setTheme = useCallback((next: Theme) => {
    setThemeState(next);
    localStorage.setItem(STORAGE_KEY, next);
  }, []);

  const toggleTheme = useCallback(() => {
    setThemeState((prev) => {
      const next = resolveTheme(prev) === "dark" ? "light" : "dark";
      localStorage.setItem(STORAGE_KEY, next);
      return next;
    });
  }, []);

  // ── Circle-reveal transition using View Transitions API ──
  const toggleThemeWithTransition = useCallback(
    (x: number, y: number) => {
      // Fallback: instant toggle if View Transitions API is not available
      const doc = document as Document & {
        startViewTransition?: (cb: () => void) => {
          ready: Promise<void>;
        };
      };

      if (!doc.startViewTransition) {
        toggleTheme();
        return;
      }

      // Calculate radius needed to cover the entire viewport from (x, y)
      const endRadius = Math.hypot(
        Math.max(x, window.innerWidth - x),
        Math.max(y, window.innerHeight - y)
      );

      const transition = doc.startViewTransition(() => {
        toggleTheme();
      });

      transition.ready.then(() => {
        document.documentElement.animate(
          {
            clipPath: [
              `circle(0px at ${x}px ${y}px)`,
              `circle(${endRadius}px at ${x}px ${y}px)`,
            ],
          },
          {
            duration: 500,
            easing: "ease-in-out",
            pseudoElement: "::view-transition-new(root)",
          }
        );
      });
    },
    [toggleTheme]
  );

  const value = useMemo(
    () => ({
      theme,
      resolvedTheme,
      mounted,
      setTheme,
      toggleTheme,
      toggleThemeWithTransition,
    }),
    [theme, resolvedTheme, mounted, setTheme, toggleTheme, toggleThemeWithTransition]
  );

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
}

export function useTheme(): ThemeContextValue {
  const ctx = useContext(ThemeContext);
  if (!ctx) {
    throw new Error("useTheme must be used within a <ThemeProvider>");
  }
  return ctx;
}
