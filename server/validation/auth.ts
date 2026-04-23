import "server-only";

import { z } from "zod";

export const adminBootstrapSchema = z.object({
  email: z.string().trim().email("A valid admin email is required."),
  password: z.string().min(1, "Admin password is required."),
});

export type AdminBootstrapInput = z.infer<typeof adminBootstrapSchema>;
