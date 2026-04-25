"use client";

import { createClient } from "@supabase/supabase-js";

/**
 * Returns a Supabase browser client using the public anon key.
 * Use this only for client-side operations that are allowed by RLS policies.
 * For storage uploads, use the server-side API route at /api/admin/upload.
 */
export function getSupabaseBrowserClient() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseAnonKey =
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ??
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;

  if (!supabaseUrl || !supabaseAnonKey) {
    return null;
  }

  return createClient(supabaseUrl, supabaseAnonKey);
}
