"use client";

import { useState } from "react";
import { LoaderCircle } from "lucide-react";

import { Input } from "@/components/ui/input";
import { uploadThumbnail } from "@/utils/supabase/client";

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
  const [uploading, setUploading] = useState(false);

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (!file) {
      return;
    }

    setUploading(true);
    setStatus("Uploading thumbnail...");

    const uploadedUrl = await uploadThumbnail(file);

    if (uploadedUrl) {
      setValue(uploadedUrl);
      setStatus("Thumbnail uploaded successfully.");
    } else {
      setStatus("Thumbnail upload failed. Please try again.");
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
      <div className="flex items-center gap-2 text-xs text-foreground/70">
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
