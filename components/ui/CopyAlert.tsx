"use client";

import { Check } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

interface CopyAlertProps {
  show: boolean;
  title?: string;
  description?: string;
}

/**
 * Fixed-position toast notification for clipboard copy feedback.
 * Slides in from the bottom-right corner.
 */
export function CopyAlert({
  show,
  title = "Berhasil disalin!",
  description = "Link berhasil disalin ke clipboard.",
}: CopyAlertProps) {
  if (!show) return null;

  return (
    <div className="fixed bottom-6 right-6 z-[1000] w-80 animate-in slide-in-from-bottom-10 fade-in duration-300 sm:bottom-10 sm:right-10">
      <Alert className="bg-main text-main-foreground shadow-[4px_4px_0px_0px_var(--border)]">
        <Check className="mb-[-2px] h-4 w-4 rounded-full bg-white/20 p-0.5" />
        <AlertTitle>{title}</AlertTitle>
        <AlertDescription>{description}</AlertDescription>
      </Alert>
    </div>
  );
}
