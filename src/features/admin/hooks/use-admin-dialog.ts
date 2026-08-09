"use client";

import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";

import type { AdminActionResult } from "@/features/admin/types";

type MutationIntent = "save" | "delete";

export function useAdminDialog() {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [feedback, setFeedback] = useState<AdminActionResult | null>(null);
  const [intent, setIntent] = useState<MutationIntent | null>(null);
  const [isPending, startTransition] = useTransition();

  const handleOpenChange = (nextOpen: boolean) => {
    setOpen(nextOpen);

    if (!nextOpen) {
      setFeedback(null);
      setIntent(null);
    }
  };

  const runAction = (
    nextIntent: MutationIntent,
    action: () => Promise<AdminActionResult>,
    onSuccess?: (result: Extract<AdminActionResult, { ok: true }>) => void,
  ) => {
    setFeedback(null);
    setIntent(nextIntent);

    startTransition(async () => {
      const result = await action();

      if (!result.ok) {
        setFeedback(result);
        setIntent(null);
        return;
      }

      router.refresh();
      onSuccess?.(result);
      setIntent(null);
      setFeedback(null);
      setOpen(false);
    });
  };

  return {
    feedback,
    handleOpenChange,
    intent,
    isPending,
    open,
    runAction,
  };
}
