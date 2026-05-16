"use client";

import { Moon, Sun } from "lucide-react";
import * as React from "react";
import { useCallback, useMemo, useSyncExternalStore } from "react";

import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";

const STORAGE_KEY = "admin-theme";
const THEME_EVENT = "admin-theme-change";

type AdminTheme = "light" | "dark";

export function AdminThemeProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const theme = useSyncExternalStore(
    subscribeTheme,
    getThemeSnapshot,
    getServerThemeSnapshot,
  );
  const setTheme = useCallback((nextTheme: AdminTheme) => {
    window.localStorage.setItem(STORAGE_KEY, nextTheme);
    window.dispatchEvent(new Event(THEME_EVENT));
  }, []);
  const value = useMemo(() => ({ theme, setTheme }), [setTheme, theme]);

  return (
    <AdminThemeContext.Provider value={value}>
      <div
        className={cn(
          "min-h-svh bg-background text-foreground transition-colors",
          theme === "dark" && "dark",
        )}
      >
        {children}
      </div>
    </AdminThemeContext.Provider>
  );
}

function getThemeSnapshot(): AdminTheme {
  const storedTheme = window.localStorage.getItem(STORAGE_KEY);
  return storedTheme === "dark" || storedTheme === "light"
    ? storedTheme
    : "light";
}

function getServerThemeSnapshot(): AdminTheme {
  return "light";
}

function subscribeTheme(onStoreChange: () => void) {
  window.addEventListener(THEME_EVENT, onStoreChange);
  window.addEventListener("storage", onStoreChange);

  return () => {
    window.removeEventListener(THEME_EVENT, onStoreChange);
    window.removeEventListener("storage", onStoreChange);
  };
}

const AdminThemeContext = React.createContext<{
  theme: AdminTheme;
  setTheme: (theme: AdminTheme) => void;
} | null>(null);

function useAdminTheme() {
  const context = React.useContext(AdminThemeContext);

  if (!context) {
    throw new Error("useAdminTheme must be used inside AdminThemeProvider");
  }

  return context;
}

export function AdminThemeToggle() {
  const { setTheme, theme } = useAdminTheme();
  const isDark = theme === "dark";

  return (
    <Button
      type="button"
      variant="neutral"
      size="sm"
      aria-label={`Switch to ${isDark ? "light" : "dark"} mode`}
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className="h-9 gap-2 px-3"
    >
      {isDark ? <Sun className="size-4" /> : <Moon className="size-4" />}
      <span className="hidden sm:inline">{isDark ? "Light" : "Dark"}</span>
    </Button>
  );
}
