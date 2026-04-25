"use client";

import type { ReactNode } from "react";
import { AlertCircle, CheckCircle2, LoaderCircle, Trash2 } from "lucide-react";

import type { AdminActionResult } from "@/features/admin/types";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/Button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

export const dialogClassName = "max-h-[90vh] overflow-y-auto sm:max-w-3xl";
export const selectClassName =
  "w-full rounded-base border-2 border-border bg-secondary-background px-3 py-2.5 text-sm font-base outline-none transition-colors focus:border-foreground";
export const labelClassName = "mb-1.5 block text-xs font-heading uppercase tracking-wide text-foreground/60";
export const fieldGroupClassName = "grid gap-5 md:grid-cols-2";

export function DialogShell({
  children,
  description,
  onOpenChange,
  open,
  title,
  triggerLabel,
  triggerVariant = "default",
}: {
  children: ReactNode;
  description: string;
  onOpenChange: (open: boolean) => void;
  open: boolean;
  title: string;
  triggerLabel: string;
  triggerVariant?: "default" | "neutral";
}) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>
        <Button variant={triggerVariant} size="sm">
          {triggerLabel}
        </Button>
      </DialogTrigger>
      <DialogContent className={dialogClassName}>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>
        <div className="mt-1">{children}</div>
      </DialogContent>
    </Dialog>
  );
}

export function FeedbackAlert({ feedback }: { feedback: AdminActionResult | null }) {
  if (!feedback) {
    return null;
  }

  const isError = !feedback.ok;

  return (
    <Alert variant={isError ? "destructive" : "default"}>
      {isError ? <AlertCircle /> : <CheckCircle2 />}
      <AlertTitle>{isError ? "Please check this form" : "Saved"}</AlertTitle>
      <AlertDescription>{isError ? feedback.error : feedback.message}</AlertDescription>
    </Alert>
  );
}

export function SubmitButton({
  isPending,
  label,
  pendingLabel,
  variant = "default",
}: {
  isPending: boolean;
  label: string;
  pendingLabel: string;
  variant?: "default" | "neutral";
}) {
  return (
    <Button type="submit" variant={variant} disabled={isPending}>
      {isPending ? <LoaderCircle className="animate-spin" /> : null}
      {isPending ? pendingLabel : label}
    </Button>
  );
}

export function DeleteButton({
  isPending,
  label,
  onClick,
  pendingLabel,
}: {
  isPending: boolean;
  label: string;
  onClick: () => void;
  pendingLabel: string;
}) {
  return (
    <Button type="button" variant="default" disabled={isPending} onClick={onClick}>
      {isPending ? <LoaderCircle className="animate-spin" /> : <Trash2 />}
      {isPending ? pendingLabel : label}
    </Button>
  );
}
