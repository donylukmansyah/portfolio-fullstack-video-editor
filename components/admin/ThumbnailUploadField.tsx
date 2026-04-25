"use client";

import { useState } from "react";
import { LoaderCircle } from "lucide-react";

import { Input } from "@/components/ui/input";

const MAX_FILE_SIZE_MB = 5;
const ALLOWED_TYPES = ["image/jpeg", "image/png", "image/webp", "image/gif", "image/avif"];

async function uploadThumbnailViaApi(
  file: File,
): Promise<{ url: string } | { error: string }> {
  const formData = new FormData();
  formData.append("file", file);

  try {
    const res = await fetch("/api/admin/upload", {
      method: "POST",
      body: formData,
    });

    const json = await res.json();

    if (!res.ok) {
      return { error: json.error ?? "Upload failed." };
    }

    return { url: json.url };
  } catch {
    return { error: "Network error. Please check your connection and try again." };
  }
}

export function ThumbnailUploadField({
  name,
  defaultValue = "",
  disabled = false,
}: {
  name: string;
  defaultValue?: string;
  disabled?: boolean;
}) {
  const [value, setValue] = useState(defaultValue);
  const [status, setStatus] = useState(
    defaultValue ? "Existing thumbnail will be kept until you upload a new one." : "No thumbnail uploaded yet.",
  );
  const [statusType, setStatusType] = useState<"idle" | "error" | "success">("idle");
  const [uploading, setUploading] = useState(false);

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (!file) {
      return;
    }

    // Client-side validation for instant feedback
    if (!ALLOWED_TYPES.includes(file.type)) {
      setStatus(`Unsupported file type. Allowed: JPEG, PNG, WebP, GIF, AVIF.`);
      setStatusType("error");
      return;
    }

    if (file.size > MAX_FILE_SIZE_MB * 1024 * 1024) {
      setStatus(`File exceeds the ${MAX_FILE_SIZE_MB} MB limit.`);
      setStatusType("error");
      return;
    }

    setUploading(true);
    setStatus("Uploading thumbnail…");
    setStatusType("idle");

    const result = await uploadThumbnailViaApi(file);

    if ("url" in result) {
      setValue(result.url);
      setStatus("Thumbnail uploaded successfully.");
      setStatusType("success");
    } else {
      setStatus(result.error);
      setStatusType("error");
    }

    setUploading(false);
  };

  return (
    <div className="flex flex-col gap-2">
      <input type="hidden" name={name} value={value} readOnly />
      <Input
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="cursor-pointer"
        disabled={uploading || disabled}
      />
      <div
        className={`flex items-center gap-2 text-xs ${
          statusType === "error"
            ? "text-red-500"
            : statusType === "success"
              ? "text-green-600"
              : "text-foreground/70"
        }`}
      >
        {uploading ? <LoaderCircle className="size-3 animate-spin" /> : null}
        <p>{status}</p>
      </div>
      {value ? (
        <a
          href={value}
          target="_blank"
          rel="noreferrer"
          className="text-xs font-heading text-main underline underline-offset-2"
        >
          Preview current thumbnail
        </a>
      ) : null}
    </div>
  );
}
