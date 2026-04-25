import "server-only";

import { createClient } from "@supabase/supabase-js";

/**
 * Creates a Supabase admin client with the service role key.
 * This client bypasses Row Level Security and should ONLY be used
 * in server-side code (API routes, server actions).
 */
export function getSupabaseAdmin() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!supabaseUrl || !supabaseServiceRoleKey) {
    return null;
  }

  return createClient(supabaseUrl, supabaseServiceRoleKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  });
}

// ─── Storage Constants ───────────────────────────────────────────────────────
export const STORAGE_BUCKET = "portfolio-assets";
export const THUMBNAIL_FOLDER = "thumbnails";

// ─── Allowed upload config ───────────────────────────────────────────────────
export const ALLOWED_MIME_TYPES = [
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/gif",
  "image/avif",
] as const;

/** Maximum file size in bytes (5 MB) */
export const MAX_FILE_SIZE = 5 * 1024 * 1024;
