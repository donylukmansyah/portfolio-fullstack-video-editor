import { NextResponse } from "next/server";

import { assertAdminAction } from "@/lib/admin";
import {
  ALLOWED_MIME_TYPES,
  MAX_FILE_SIZE,
  STORAGE_BUCKET,
  THUMBNAIL_FOLDER,
  getSupabaseAdmin,
} from "@/utils/supabase/server";

// ─── Helpers ─────────────────────────────────────────────────────────────────

function jsonError(message: string, status: number) {
  return NextResponse.json({ error: message }, { status });
}

/**
 * Ensures the storage bucket exists, creating it (public) if necessary.
 * Uses the admin client so RLS is irrelevant.
 */
async function ensureBucketExists(supabase: ReturnType<typeof getSupabaseAdmin>) {
  if (!supabase) return false;

  const { data: buckets, error: listError } = await supabase.storage.listBuckets();

  if (listError) {
    console.error("Failed to list storage buckets:", listError.message);
    return false;
  }

  const exists = buckets?.some((b) => b.name === STORAGE_BUCKET);

  if (!exists) {
    const { error: createError } = await supabase.storage.createBucket(STORAGE_BUCKET, {
      public: true,
      fileSizeLimit: MAX_FILE_SIZE,
      allowedMimeTypes: [...ALLOWED_MIME_TYPES],
    });

    if (createError) {
      console.error("Failed to create storage bucket:", createError.message);
      return false;
    }

    console.info(`Created storage bucket "${STORAGE_BUCKET}".`);
  }

  return true;
}

// ─── POST /api/admin/upload ──────────────────────────────────────────────────

export async function POST(request: Request) {
  // 1. Auth check – only admins may upload
  try {
    await assertAdminAction();
  } catch {
    return jsonError("Unauthorized. Please sign in again.", 401);
  }

  // 2. Supabase admin client
  const supabase = getSupabaseAdmin();

  if (!supabase) {
    return jsonError(
      "Storage is not configured. Please set SUPABASE_SERVICE_ROLE_KEY.",
      500,
    );
  }

  // 3. Parse multipart form data
  let formData: FormData;

  try {
    formData = await request.formData();
  } catch {
    return jsonError("Invalid request body.", 400);
  }

  const file = formData.get("file");

  if (!file || !(file instanceof File)) {
    return jsonError("No file provided.", 400);
  }

  // 4. Validate MIME type
  if (!ALLOWED_MIME_TYPES.includes(file.type as (typeof ALLOWED_MIME_TYPES)[number])) {
    return jsonError(
      `Unsupported file type "${file.type}". Allowed: ${ALLOWED_MIME_TYPES.join(", ")}`,
      400,
    );
  }

  // 5. Validate file size
  if (file.size > MAX_FILE_SIZE) {
    const maxMB = MAX_FILE_SIZE / (1024 * 1024);
    return jsonError(`File exceeds the ${maxMB} MB limit.`, 400);
  }

  // 6. Ensure the bucket exists (auto-create if missing)
  const bucketReady = await ensureBucketExists(supabase);

  if (!bucketReady) {
    return jsonError(
      "Storage bucket could not be initialised. Check server logs.",
      500,
    );
  }

  // 7. Build a unique file path
  const ext = file.name.split(".").pop()?.toLowerCase() ?? "jpg";
  const uniqueName = `${crypto.randomUUID()}.${ext}`;
  const filePath = `${THUMBNAIL_FOLDER}/${uniqueName}`;

  // 8. Upload
  const { error: uploadError } = await supabase.storage
    .from(STORAGE_BUCKET)
    .upload(filePath, file, {
      contentType: file.type,
      upsert: false,
    });

  if (uploadError) {
    console.error("Storage upload failed:", uploadError.message);
    return jsonError("Upload failed. Please try again.", 500);
  }

  // 9. Get public URL
  const {
    data: { publicUrl },
  } = supabase.storage.from(STORAGE_BUCKET).getPublicUrl(filePath);

  return NextResponse.json({ url: publicUrl });
}
