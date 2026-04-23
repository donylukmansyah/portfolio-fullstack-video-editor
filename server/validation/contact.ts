import "server-only";

import { z } from "zod";

const emptyToUndefined = (value: unknown) => {
  if (typeof value !== "string") {
    return value;
  }

  const trimmed = value.trim();
  return trimmed === "" ? undefined : trimmed;
};

export const contactMessageSchema = z.object({
  name: z.string().trim().min(2, "Name must be at least 2 characters").max(80),
  email: z.string().trim().email("Email must be valid").max(120).transform((value) => value.toLowerCase()),
  message: z.string().trim().min(10, "Message must be at least 10 characters").max(2000),
  website: z.preprocess(emptyToUndefined, z.string().max(0).optional()),
});

export type ContactMessageInput = z.infer<typeof contactMessageSchema>;
