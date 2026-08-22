"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  useSyncExternalStore,
} from "react";
import { flushSync } from "react-dom";

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
   * Toggle with a circle-reveal transition anchored at the toggle button
   * (the circle grows from the button's center).
   *
   * Uses the View Transitions API where supported; falls back to an
   * instant toggle otherwise.
   */
  toggleThemeWithTransition: (anchor: HTMLElement) => void;
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
  // Start with "light" on the server to match server HTML (the inline script
  // in layout.tsx already applies the correct class before paint, so there's
  // no visible flash). On the client we read the stored preference during
  // the initial render; UI that depends on the theme is gated behind
  // `mounted`, so hydration stays consistent.
  const [theme, setThemeState] = useState<Theme>(() => {
    if (typeof window === "undefined") return "light";
    const stored = localStorage.getItem(STORAGE_KEY) as Theme | null;
    return stored ?? "system";
  });
  // False during SSR/hydration, true after mount — used to gate
  // client-only UI so hydration stays consistent.
  const mounted = useSyncExternalStore(
    () => () => {},
    () => true,
    () => false
  );

  const resolvedTheme = resolveTheme(theme);

  // Listen for system preference changes when in "system" mode
  useEffect(() => {
    if (theme !== "system") return;

    const mql = window.matchMedia("(prefers-color-scheme: dark)");
    const handler = () => applyTheme(getSystemTheme());
    mql.addEventListener("change", handler);
    return () => mql.removeEventListener("change", handler);
  }, [theme]);

  /**
   * Commit a new theme preference synchronously: updates React state,
   * persists to localStorage, and applies the `dark` class on <html>
   * right away (NOT deferred to an effect). This guarantees the DOM is
   * fully updated by the time `startViewTransition` takes its snapshot,
   * which is what makes the circle reveal actually animate instead of
   * flashing the old theme.
   */
  const commitTheme = useCallback((next: Theme) => {
    setThemeState(next);
    localStorage.setItem(STORAGE_KEY, next);
    applyTheme(resolveTheme(next));
  }, []);

  const setTheme = useCallback(
    (next: Theme) => commitTheme(next),
    [commitTheme]
  );

  const toggleTheme = useCallback(() => {
    commitTheme(resolveTheme(theme) === "dark" ? "light" : "dark");
  }, [commitTheme, theme]);

  // ── Circle-reveal transition using View Transitions API ──
  const toggleThemeWithTransition = useCallback(
    (anchor: HTMLElement) => {
      // Fallback: instant toggle if View Transitions API is not available
      const doc = document as Document & {
        startViewTransition?: (cb: () => void) => {
          ready: Promise<void>;
        };
      };

      if (
        !doc.startViewTransition ||
        window.matchMedia("(prefers-reduced-motion: reduce)").matches
      ) {
        toggleTheme();
        return;
      }

      // Anchor the circle to the toggle button's center
      const rect = anchor.getBoundingClientRect();
      const x = rect.left + rect.width / 2;
      const y = rect.top + rect.height / 2;

      // Radius needed to cover the entire viewport from (x, y)
      const endRadius = Math.hypot(
        Math.max(x, window.innerWidth - x),
        Math.max(y, window.innerHeight - y)
      );

      const transition = doc.startViewTransition(() => {
        // flushSync makes React commit the DOM synchronously so the browser
        // captures the NEW theme in its snapshot. Without it the snapshot is
        // taken before the update and the reveal animates nothing.
        flushSync(() => {
          commitTheme(resolveTheme(theme) === "dark" ? "light" : "dark");
        });
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
            duration: 600,
            easing: "cubic-bezier(0.25, 1, 0.5, 1)",
            pseudoElement: "::view-transition-new(root)",
          }
        );
      });
    },
    [commitTheme, theme, toggleTheme]
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
