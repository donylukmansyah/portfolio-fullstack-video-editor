"use client";

import { useRef, useState } from "react";

import {
  createPortfolioItem,
  deletePortfolioItem,
  updatePortfolioItem,
} from "@/app/actions/admin/portfolio-items";
import { ThumbnailUploadField } from "@/components/admin/ThumbnailUploadField";
import { Input } from "@/components/ui/input";
import type { PortfolioRow, SubCategoryOption } from "@/features/admin/types";
import {
  DeleteButton,
  DialogShell,
  FeedbackAlert,
  selectClassName,
  SubmitButton,
} from "@/features/admin/components/dialogs/shared";
import { useAdminDialog } from "@/features/admin/hooks/use-admin-dialog";

function PortfolioMediaHint({ mediaType }: { mediaType: "video" | "image" }) {
  const copy =
    mediaType === "video"
      ? "Paste the YouTube URL for the modal/player. Public cards will keep the play badge."
      : "Image items do not need a YouTube URL. Public cards will render clean without a play badge.";

  return (
    <div className="rounded-base border-2 border-border bg-secondary-background px-4 py-3 text-sm text-foreground/75">
      {copy}
    </div>
  );
}

export function PortfolioCreateDialog({
  subCategories,
}: {
  subCategories: SubCategoryOption[];
}) {
  const formRef = useRef<HTMLFormElement>(null);
  const [mediaType, setMediaType] = useState<"video" | "image">("video");
  const { feedback, handleOpenChange, intent, isPending, open, runAction } = useAdminDialog();

  const handleDialogChange = (nextOpen: boolean) => {
    handleOpenChange(nextOpen);

    if (!nextOpen) {
      setMediaType("video");
    }
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);

    if (mediaType === "image") {
      formData.set("youtubeUrl", "");
    }

    runAction("save", () => createPortfolioItem(formData), () => {
      formRef.current?.reset();
      setMediaType("video");
    });
  };

  return (
    <DialogShell
      title="Add Portfolio Card"
      description="Create a new card for the public portfolio."
      triggerLabel="Add Portfolio Card"
      open={open}
      onOpenChange={handleDialogChange}
    >
      <form ref={formRef} onSubmit={handleSubmit} className="grid gap-4">
        <FeedbackAlert feedback={feedback} />
        <PortfolioMediaHint mediaType={mediaType} />

        <fieldset className="grid gap-4" disabled={isPending}>
          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <label className="mb-1 block text-sm font-heading" htmlFor="portfolio-create-title">
                Title
              </label>
              <Input id="portfolio-create-title" name="title" placeholder="Project title" required />
            </div>
            <div>
              <label className="mb-1 block text-sm font-heading" htmlFor="portfolio-create-thumbnail-label">
                Thumbnail Label
              </label>
              <Input
                id="portfolio-create-thumbnail-label"
                name="thumbnailLabel"
                placeholder="powered by @client"
                required
              />
            </div>
            <div>
              <label className="mb-1 block text-sm font-heading" htmlFor="portfolio-create-sub-category">
                Sub Category
              </label>
              <select
                id="portfolio-create-sub-category"
                name="subCategoryId"
                className={selectClassName}
                required
                defaultValue=""
              >
                <option value="">Select sub category</option>
                {subCategories.map((subCategory) => (
                  <option key={subCategory.id} value={subCategory.id}>
                    {subCategory.mainCategoryName} / {subCategory.name}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="mb-1 block text-sm font-heading" htmlFor="portfolio-create-media-type">
                Media Type
              </label>
              <select
                id="portfolio-create-media-type"
                name="mediaType"
                className={selectClassName}
                value={mediaType}
                onChange={(event) => setMediaType(event.target.value as "video" | "image")}
              >
                <option value="video">Video</option>
                <option value="image">Image</option>
              </select>
            </div>
            <div>
              <label className="mb-1 block text-sm font-heading" htmlFor="portfolio-create-youtube-url">
                YouTube URL
              </label>
              <Input
                id="portfolio-create-youtube-url"
                name="youtubeUrl"
                placeholder={
                  mediaType === "video"
                    ? "https://youtube.com/watch?v=..."
                    : "Disabled for image cards"
                }
                disabled={mediaType === "image"}
              />
            </div>
            <div>
              <label className="mb-1 block text-sm font-heading" htmlFor="portfolio-create-gradient">
                Gradient (optional)
              </label>
              <Input
                id="portfolio-create-gradient"
                name="gradient"
                placeholder="from-indigo-800 via-violet-700 to-purple-600"
              />
            </div>
          </div>
          <div>
            <label className="mb-1 block text-sm font-heading">Thumbnail Upload</label>
            <ThumbnailUploadField name="thumbnailUrl" disabled={isPending} />
          </div>
        </fieldset>

        <div className="flex justify-end">
          <SubmitButton
            label="Save Portfolio"
            pendingLabel="Saving Portfolio..."
            isPending={isPending && intent === "save"}
          />
        </div>
      </form>
    </DialogShell>
  );
}

export function PortfolioEditDialog({
  item,
  subCategories,
}: {
  item: PortfolioRow;
  subCategories: SubCategoryOption[];
}) {
  const [mediaType, setMediaType] = useState<"video" | "image">(item.mediaType);
  const { feedback, handleOpenChange, intent, isPending, open, runAction } = useAdminDialog();

  const handleDialogChange = (nextOpen: boolean) => {
    handleOpenChange(nextOpen);

    if (!nextOpen) {
      setMediaType(item.mediaType);
    }
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);

    if (mediaType === "image") {
      formData.set("youtubeUrl", "");
    }

    runAction("save", () => updatePortfolioItem(item.id, formData));
  };

  const handleDelete = () => {
    const confirmed = window.confirm(
      `Delete "${item.title}" from the public portfolio? This cannot be undone.`,
    );

    if (!confirmed) {
      return;
    }

    runAction("delete", () => deletePortfolioItem(item.id));
  };

  return (
    <DialogShell
      title="Edit Portfolio Card"
      description="Update card content, media type, and thumbnail."
      triggerLabel="Manage"
      triggerVariant="neutral"
      open={open}
      onOpenChange={handleDialogChange}
    >
      <form onSubmit={handleSubmit} className="grid gap-4">
        <FeedbackAlert feedback={feedback} />
        <PortfolioMediaHint mediaType={mediaType} />

        <fieldset className="grid gap-4" disabled={isPending}>
          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <label className="mb-1 block text-sm font-heading" htmlFor={`portfolio-title-${item.id}`}>
                Title
              </label>
              <Input id={`portfolio-title-${item.id}`} name="title" defaultValue={item.title} required />
            </div>
            <div>
              <label className="mb-1 block text-sm font-heading" htmlFor={`portfolio-thumbnail-label-${item.id}`}>
                Thumbnail Label
              </label>
              <Input
                id={`portfolio-thumbnail-label-${item.id}`}
                name="thumbnailLabel"
                defaultValue={item.thumbnailLabel}
                required
              />
            </div>
            <div>
              <label className="mb-1 block text-sm font-heading" htmlFor={`portfolio-sub-category-${item.id}`}>
                Sub Category
              </label>
              <select
                id={`portfolio-sub-category-${item.id}`}
                name="subCategoryId"
                defaultValue={item.subCategoryId}
                className={selectClassName}
                required
              >
                {subCategories.map((subCategory) => (
                  <option key={subCategory.id} value={subCategory.id}>
                    {subCategory.mainCategoryName} / {subCategory.name}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="mb-1 block text-sm font-heading" htmlFor={`portfolio-media-type-${item.id}`}>
                Media Type
              </label>
              <select
                id={`portfolio-media-type-${item.id}`}
                name="mediaType"
                value={mediaType}
                onChange={(event) => setMediaType(event.target.value as "video" | "image")}
                className={selectClassName}
              >
                <option value="video">Video</option>
                <option value="image">Image</option>
              </select>
            </div>
            <div>
              <label className="mb-1 block text-sm font-heading" htmlFor={`portfolio-youtube-url-${item.id}`}>
                YouTube URL
              </label>
              <Input
                id={`portfolio-youtube-url-${item.id}`}
                name="youtubeUrl"
                defaultValue={item.youtubeUrl ?? ""}
                placeholder={
                  mediaType === "video"
                    ? "https://youtube.com/watch?v=..."
                    : "Disabled for image cards"
                }
                disabled={mediaType === "image"}
              />
            </div>
            <div>
              <label className="mb-1 block text-sm font-heading" htmlFor={`portfolio-gradient-${item.id}`}>
                Gradient (optional)
              </label>
              <Input
                id={`portfolio-gradient-${item.id}`}
                name="gradient"
                defaultValue={item.gradient ?? ""}
              />
            </div>
          </div>
          <div>
            <label className="mb-1 block text-sm font-heading">Thumbnail Upload</label>
            <ThumbnailUploadField
              name="thumbnailUrl"
              defaultValue={item.thumbnailUrl ?? ""}
              disabled={isPending}
            />
          </div>
        </fieldset>

        <div className="flex flex-wrap justify-end gap-3">
          <DeleteButton
            label="Delete Portfolio"
            pendingLabel="Deleting..."
            isPending={isPending && intent === "delete"}
            onClick={handleDelete}
          />
          <SubmitButton
            label="Save Changes"
            pendingLabel="Saving..."
            isPending={isPending && intent === "save"}
            variant="neutral"
          />
        </div>
      </form>
    </DialogShell>
  );
}
