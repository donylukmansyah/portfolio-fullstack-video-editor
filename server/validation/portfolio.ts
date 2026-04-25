import "server-only";

import { z } from "zod";

import { isSafeHttpUrl } from "@/lib/safe-url";

export const mediaTypeEnum = z.enum(["video", "image"]);

const emptyToUndefined = (value: unknown) => {
  if (value === null) {
    return undefined;
  }

  if (typeof value !== "string") {
    return value;
  }

  const trimmed = value.trim();
  return trimmed === "" ? undefined : trimmed;
};

const optionalSafeUrl = (label: string) =>
  z.preprocess(
    emptyToUndefined,
    z
      .string()
      .trim()
      .url(`${label} must be valid`)
      .refine(isSafeHttpUrl, `${label} must start with http:// or https://`)
      .optional(),
  );

export const mainCategorySchema = z.object({
  name: z.string().trim().min(2, "Name must be at least 2 characters").max(50),
});

export const subCategorySchema = z.object({
  name: z.string().trim().min(2, "Name must be at least 2 characters").max(50),
  mainCategoryId: z.string().min(1, "Main Category is required"),
});

export const portfolioItemSchema = z
  .object({
    title: z.string().trim().min(3, "Title must be at least 3 characters").max(100),
    thumbnailLabel: z
      .string()
      .trim()
      .min(3, "Thumbnail label must be at least 3 characters")
      .max(50),
    thumbnailUrl: z.preprocess(
      emptyToUndefined,
      z.string().url("Thumbnail URL must be valid").optional(),
    ),
    mediaType: mediaTypeEnum,
    youtubeUrl: z.preprocess(
      emptyToUndefined,
      z.string().url("YouTube URL must be valid").optional(),
    ),
    externalLinkName: z.preprocess(
      emptyToUndefined,
      z.string().trim().min(2, "External link name must be at least 2 characters").max(50).optional(),
    ),
    externalLinkUrl: optionalSafeUrl("External link URL"),
    externalLinkLogoUrl: optionalSafeUrl("External link logo URL"),
    subCategoryId: z.string().min(1, "Sub Category is required"),
  })
  .superRefine((data, ctx) => {
    if (data.mediaType === "video" && !data.youtubeUrl) {
      ctx.addIssue({
        code: "custom",
        path: ["youtubeUrl"],
        message: "YouTube URL is required for video items",
      });
    }

    if (data.externalLinkUrl && !data.externalLinkName) {
      ctx.addIssue({
        code: "custom",
        path: ["externalLinkName"],
        message: "External link name is required when URL is filled",
      });
    }

    if ((data.externalLinkName || data.externalLinkLogoUrl) && !data.externalLinkUrl) {
      ctx.addIssue({
        code: "custom",
        path: ["externalLinkUrl"],
        message: "External link URL is required when name or logo is filled",
      });
    }
  });

export type MainCategoryInput = z.infer<typeof mainCategorySchema>;
export type SubCategoryInput = z.infer<typeof subCategorySchema>;
export type PortfolioItemInput = z.infer<typeof portfolioItemSchema>;
