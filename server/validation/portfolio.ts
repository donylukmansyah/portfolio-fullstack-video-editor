import "server-only";

import { z } from "zod";

export const mediaTypeEnum = z.enum(["video", "image"]);

const emptyToUndefined = (value: unknown) => {
  if (typeof value !== "string") {
    return value;
  }

  const trimmed = value.trim();
  return trimmed === "" ? undefined : trimmed;
};

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
    gradient: z.preprocess(emptyToUndefined, z.string().max(100).optional()),
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
  });

export type MainCategoryInput = z.infer<typeof mainCategorySchema>;
export type SubCategoryInput = z.infer<typeof subCategorySchema>;
export type PortfolioItemInput = z.infer<typeof portfolioItemSchema>;
