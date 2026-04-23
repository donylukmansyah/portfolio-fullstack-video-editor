import "server-only";

import type { ZodType } from "zod";

export type AdminActionResult =
  | {
      ok: true;
      message: string;
    }
  | {
      ok: false;
      error: string;
    };

export function successResult(message: string): AdminActionResult {
  return {
    ok: true,
    message,
  };
}

export function errorResult(error: string): AdminActionResult {
  return {
    ok: false,
    error,
  };
}

export function getFormValue(formData: FormData, key: string) {
  const value = formData.get(key);
  return typeof value === "string" ? value : null;
}

export function parseWithSchema<T>(schema: ZodType<T>, input: unknown) {
  const result = schema.safeParse(input);

  if (result.success) {
    return {
      success: true as const,
      data: result.data,
    };
  }

  const flattened = result.error.flatten();
  const firstFieldError = Object.values(flattened.fieldErrors)
    .flat()
    .find((issue): issue is string => typeof issue === "string");

  return {
    success: false as const,
    error: firstFieldError ?? flattened.formErrors[0] ?? "Invalid form submission.",
  };
}

export function toActionError(error: unknown, fallbackMessage: string): AdminActionResult {
  if (error instanceof Error && error.message === "Unauthorized") {
    return errorResult("Your session has expired. Please sign in again.");
  }

  console.error(fallbackMessage, error);
  return errorResult(fallbackMessage);
}
